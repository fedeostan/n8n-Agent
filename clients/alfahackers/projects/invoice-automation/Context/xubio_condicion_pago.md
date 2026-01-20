# Xubio - Condición de Pago (Payment Conditions)

## Overview

This document contains the mapping of `condicionDePago` codes used in the Xubio API for invoice creation. This information was discovered through analysis of existing invoices since the Swagger documentation only listed codes 1 and 2.

## Payment Condition Codes

| Code | Name | Description | Use Case |
|------|------|-------------|----------|
| **1** | Cuenta Corriente | Credit/Account payment | Deferred payment, credit terms |
| **2** | Al Contado | Cash payment | Immediate cash payment |
| **4** | Tarjeta de Crédito | Credit Card | Card payments (Shopify, MercadoPago, etc.) |

## Discovery Method

The Swagger documentation (`swagger_xubio.json`) only documented values 1 and 2. Code 4 was discovered by:

1. Creating an investigation workflow to pull the last 20 invoices from Xubio
2. Analyzing the `condicionDePago` field in existing invoices
3. Finding that invoices from the ALFA HACKERS punto de venta predominantly use code 4

## API Usage

### Endpoint
```
POST https://xubio.com/API/1.1/comprobanteVentaBean
```

### Example Request Body
```json
{
  "tipo": 6,
  "numeroDocumento": "B-00002-00000765",
  "fecha": "2026-01-20",
  "fechaVto": "2026-01-20",
  "condicionDePago": 4,
  "descripcion": "Pedido Shopify #1570",
  "cliente": { "ID": 10207389 },
  "puntoVenta": { "ID": 169240 },
  "transaccionProductoItems": [...]
}
```

## Workflow Implementation

### Invoice Automation Workflow
- **Workflow ID**: `ZeTWv4fmCFxGQ7ONsTDZh`
- **Node**: `Create_Invoice`
- **Configuration**: Always uses `condicionDePago: 4` for Shopify orders

### Rationale
All Shopify orders are paid via card (credit or debit). Since Shopify doesn't distinguish between debit and credit cards in their API, and all payments are processed electronically, using "Tarjeta de Crédito" (code 4) is the correct accounting treatment.

## Related Fields

### From Invoice Data Analysis
```json
{
  "condicionDePago": 4,
  "transaccionInstrumentoDeCobro": [
    {
      "tipoInstrumentoDeCobro": { "ID": 6 },
      "importeInstrumento": 3200000
    }
  ]
}
```

### Payment Instrument Types (`tipoInstrumentoDeCobro`)
| ID | Type |
|----|------|
| 6 | Tarjeta de Crédito |
| (others TBD) | ... |

## Notes

- The Swagger documentation is incomplete regarding payment condition codes
- Always verify against live data when implementing new payment methods
- Code 4 appears to be the standard for card payments in Argentina

---

*Last updated: 2026-01-20*
*Source: Investigation workflow analysis of existing Xubio invoices*
