/*
 * RETRY CLIENT LOOKUP - FIXED VERSION v4.2
 * =========================================
 * If client creation failed because client exists, try to find and use it
 *
 * FIX v4.2:
 * - Improved name matching with normalization (remove accents, trim, lowercase)
 * - Added search by razonSocial field
 * - Better cliente_id extraction handling different API response formats
 * - More robust comparison logic
 */

const input = $json;
const lookupData = input.lookupData;
const accessToken = lookupData.access_token;

const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
};

let existingClient = null;
let debugInfo = ['Retry lookup triggered due to duplicate error'];

// Helper function to normalize names for comparison
function normalizeName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .trim()
    // Remove accents/diacritics
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Remove multiple spaces
    .replace(/\s+/g, ' ');
}

// Helper function to get client ID from various response formats
function getClientId(client) {
  return client.cliente_id || client.clienteId || client.ID || client.id;
}

// Search by email
const email = lookupData.customer?.email;
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
      debugInfo.push(`Found client by email on retry: ${getClientId(existingClient)}`);
    }
  } catch (error) {
    debugInfo.push(`Retry email search error: ${error.message}`);
  }
}

// Search by CUIT if still not found
if (!existingClient && lookupData.documentData?.document?.number) {
  try {
    const allClients = await this.helpers.request({
      method: 'GET',
      uri: 'https://xubio.com/API/1.1/clienteBean',
      headers,
      json: true
    });
    const docNumber = lookupData.documentData.document.number;
    existingClient = allClients.find(c => {
      const clientCuit = (c.cuit || '').replace(/[^0-9]/g, '');
      return clientCuit === docNumber;
    });
    if (existingClient) {
      debugInfo.push(`Found client by CUIT on retry: ${getClientId(existingClient)}`);
    }
  } catch (error) {
    debugInfo.push(`Retry CUIT search error: ${error.message}`);
  }
}

// Search by name as last resort - IMPROVED MATCHING
if (!existingClient && lookupData.customer?.fullName) {
  try {
    const allClients = await this.helpers.request({
      method: 'GET',
      uri: 'https://xubio.com/API/1.1/clienteBean',
      headers,
      json: true
    });

    const searchName = normalizeName(lookupData.customer.fullName);
    const firstName = normalizeName(lookupData.customer.nombre);
    const lastName = normalizeName(lookupData.customer.apellido);

    debugInfo.push(`Searching for name: "${searchName}" (first: "${firstName}", last: "${lastName}")`);

    // Try multiple matching strategies
    existingClient = allClients.find(c => {
      // Strategy 1: Exact match on 'nombre' field
      const clientNombre = normalizeName(c.nombre);
      if (clientNombre === searchName) {
        debugInfo.push(`Exact match on nombre: "${c.nombre}"`);
        return true;
      }

      // Strategy 2: Exact match on 'razonSocial' field
      const clientRazonSocial = normalizeName(c.razonSocial);
      if (clientRazonSocial === searchName) {
        debugInfo.push(`Exact match on razonSocial: "${c.razonSocial}"`);
        return true;
      }

      // Strategy 3: Match first + last name separately
      const clientPrimerNombre = normalizeName(c.primerNombre);
      const clientPrimerApellido = normalizeName(c.primerApellido);
      if (firstName && lastName &&
          clientPrimerNombre === firstName &&
          clientPrimerApellido === lastName) {
        debugInfo.push(`Match on primerNombre + primerApellido: "${c.primerNombre} ${c.primerApellido}"`);
        return true;
      }

      // Strategy 4: Contains match (both directions) - as fallback
      if (clientNombre.includes(searchName) || searchName.includes(clientNombre)) {
        if (clientNombre.length > 3 && searchName.length > 3) { // Avoid short false positives
          debugInfo.push(`Partial match on nombre: "${c.nombre}" contains/in "${searchName}"`);
          return true;
        }
      }

      return false;
    });

    if (existingClient) {
      debugInfo.push(`Found client by name on retry: ${getClientId(existingClient)} (${existingClient.nombre})`);
    } else {
      debugInfo.push(`Name search failed. Available clients: ${allClients.slice(0, 5).map(c => c.nombre).join(', ')}...`);
    }
  } catch (error) {
    debugInfo.push(`Retry name search error: ${error.message}`);
  }
}

if (existingClient) {
  const clientId = getClientId(existingClient);
  return {
    json: {
      cliente_id: clientId,
      invoiceData: lookupData,
      recoveredFromError: true,
      debug: debugInfo
    }
  };
}

// Could not find client even on retry - this needs notification
return {
  json: {
    success: false,
    fatalError: true,
    errorMessage: 'Client creation failed and retry lookup also failed',
    lookupData,
    debug: debugInfo,
    requiresNotification: true,
    errorType: 'RETRY_FAILED'
  }
};
