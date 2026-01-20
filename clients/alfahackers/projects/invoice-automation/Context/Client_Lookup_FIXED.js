/*
 * CLIENT LOOKUP & INVOICE PREP v4.2 - FIXED
 * ==========================================
 * Added name-based search to prevent duplicate errors
 */

const accessToken = $('Xubio_Token1').first().json.access_token;
const customerData = $json;
const shopifyData = $('Shopify Trigger3').first().json;

const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
};

let debugInfo = [];
let existingClient = null;

// Helper function to normalize names for comparison
function normalizeName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

// Helper function to get client ID
function getClientId(client) {
  return client.cliente_id || client.clienteId || client.ID || client.id;
}

// 1. Search for existing client by email
const email = customerData.customer.email;
if (email) {
  try {
    const searchUrl = `https://xubio.com/API/1.1/clienteBean?email=${encodeURIComponent(email)}`;
    const data = await this.helpers.request({
      method: 'GET',
      uri: searchUrl,
      headers,
      json: true
    });
    if (Array.isArray(data) && data.length > 0) {
      existingClient = data[0];
      debugInfo.push(`Found client by email: ${getClientId(existingClient)}`);
    }
  } catch (error) {
    debugInfo.push(`Email search error: ${error.message}`);
  }
}

// 2. If not found, search by CUIT/DNI
if (!existingClient && customerData.documentData.document.number) {
  try {
    const allClients = await this.helpers.request({
      method: 'GET',
      uri: 'https://xubio.com/API/1.1/clienteBean',
      headers,
      json: true
    });
    const docNumber = customerData.documentData.document.number;
    existingClient = allClients.find(c => {
      const clientCuit = (c.cuit || '').replace(/[^0-9]/g, '');
      return clientCuit === docNumber;
    });
    if (existingClient) {
      debugInfo.push(`Found client by CUIT: ${getClientId(existingClient)}`);
    }
  } catch (error) {
    debugInfo.push(`CUIT search error: ${error.message}`);
  }
}

// 3. NEW: If still not found, search by NAME (prevents duplicate errors!)
if (!existingClient && customerData.customer.fullName) {
  try {
    let allClients;
    // Check if we already fetched all clients
    if (!allClients) {
      allClients = await this.helpers.request({
        method: 'GET',
        uri: 'https://xubio.com/API/1.1/clienteBean',
        headers,
        json: true
      });
    }

    const searchName = normalizeName(customerData.customer.fullName);
    const firstName = normalizeName(customerData.customer.nombre);
    const lastName = normalizeName(customerData.customer.apellido);

    debugInfo.push(`Searching by name: "${searchName}"`);

    existingClient = allClients.find(c => {
      const clientNombre = normalizeName(c.nombre);
      const clientRazonSocial = normalizeName(c.razonSocial);
      const clientPrimerNombre = normalizeName(c.primerNombre);
      const clientPrimerApellido = normalizeName(c.primerApellido);

      // Exact match on nombre or razonSocial
      if (clientNombre === searchName || clientRazonSocial === searchName) {
        return true;
      }

      // Match first + last name
      if (firstName && lastName &&
          clientPrimerNombre === firstName &&
          clientPrimerApellido === lastName) {
        return true;
      }

      return false;
    });

    if (existingClient) {
      debugInfo.push(`Found client by name: ${getClientId(existingClient)} (${existingClient.nombre})`);
    }
  } catch (error) {
    debugInfo.push(`Name search error: ${error.message}`);
  }
}

// 4. Get Punto de Venta
let puntoVentaId = null;
let puntoVentaCodigo = '00001';
try {
  const pvData = await this.helpers.request({
    method: 'GET',
    uri: 'https://xubio.com/API/1.1/puntoVentaBean',
    headers,
    json: true
  });
  if (Array.isArray(pvData) && pvData.length > 0) {
    const pv = pvData[0];
    puntoVentaId = pv.puntoVentaId ?? pv.puntoVenta_id ?? pv.ID ?? pv.id;
    puntoVentaCodigo = pv.puntoVenta || pv.codigo || '00001';
    debugInfo.push(`PuntoVenta ID: ${puntoVentaId}, Codigo: ${puntoVentaCodigo}`);
  }
} catch (error) {
  debugInfo.push(`PuntoVenta error: ${error.message}`);
}

// 5. Get talonario for invoice numbering
const letraComprobante = customerData.invoiceType || 'B';
let ultimoNumero = 0;
try {
  const talonarioUrl = `https://xubio.com/API/1.1/talonario?puntoDeVenta=${puntoVentaCodigo}&letraComprobante=${letraComprobante}&tipoComprobante=Facturas de Venta ${letraComprobante}`;
  const talonarioData = await this.helpers.request({
    method: 'GET',
    uri: talonarioUrl,
    headers,
    json: true
  });
  if (Array.isArray(talonarioData) && talonarioData.length > 0) {
    ultimoNumero = parseInt(talonarioData[0].ultimoUtilizado) || 0;
    debugInfo.push(`Ultimo utilizado Factura ${letraComprobante}: ${ultimoNumero}`);
  }
} catch (error) {
  debugInfo.push(`Talonario error: ${error.message}`);
}

const nextNumero = ultimoNumero + 1;
const numeroDocumento = `${letraComprobante}-${puntoVentaCodigo}-${String(nextNumero).padStart(8, '0')}`;

// 6. Xubio tipo comprobante mapping
const TIPO_COMPROBANTE = {
  'A': 1,
  'B': 6,
  'C': 11,
  'E': 19
};

return {
  json: {
    clientExists: !!existingClient,
    existingClientId: existingClient ? getClientId(existingClient) : null,
    existingClientName: existingClient?.nombre || null,
    customer: customerData.customer,
    documentData: customerData.documentData,
    fiscalCategory: customerData.fiscalCategory,
    invoiceType: letraComprobante,
    tipoComprobante: TIPO_COMPROBANTE[letraComprobante] || 6,
    puntoVentaId,
    puntoVentaCodigo,
    numeroDocumento,
    transaccionProductoItems: customerData.transaccionProductoItems,
    productSummary: customerData.productSummary,
    orderTotal: customerData.orderTotal,
    shopifyOrderId: customerData.shopifyOrderId,
    shopifyOrderNumber: customerData.shopifyOrderNumber,
    currency: customerData.currency,
    access_token: accessToken,
    invoiceLegend: customerData.invoiceLegend || null,
    debug: debugInfo
  }
};
