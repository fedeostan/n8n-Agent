# Credentials Inventory - Fedeostan

> **IMPORTANT**: This file documents ONLY credential names and metadata.
> NEVER store actual API keys, passwords, or secrets in this file.

## Credential Management

### How to Add a New Credential

1. Create the credential in n8n dashboard
2. Document it in this file with:
   - Name used in n8n
   - Service it connects to
   - Any rate limits or restrictions
   - Required scopes/permissions

### Credential Status Key

| Status | Meaning |
|--------|---------|
| Active | Working and ready to use |
| Expired | Needs refresh/renewal |
| Limited | Has restrictions (rate limits, etc.) |
| Missing | Not yet configured |

---

## Active Credentials

### AI & ML Services

| n8n Credential Name | Service | Status | Rate Limits | Notes |
|---------------------|---------|--------|-------------|-------|
| OpenAI API | OpenAI | REQUIRED | Standard | For GPT-4o and GPT-4o-mini agents |
| Perplexity API | Perplexity | REQUIRED | Standard | HTTP Header Auth for product search |

### Databases

| n8n Credential Name | Service | Status | Rate Limits | Notes |
|---------------------|---------|--------|-------------|-------|
| Shopping DB | PostgreSQL | REQUIRED | N/A | User data + chat memory storage |

### Communication & Notifications

| n8n Credential Name | Service | Status | Rate Limits | Notes |
|---------------------|---------|--------|-------------|-------|
| | | | | |

### CRM & Sales

| n8n Credential Name | Service | Status | Rate Limits | Notes |
|---------------------|---------|--------|-------------|-------|
| | | | | |

### Productivity & Storage

| n8n Credential Name | Service | Status | Rate Limits | Notes |
|---------------------|---------|--------|-------------|-------|
| | | | | |

### AI & ML Services

| n8n Credential Name | Service | Status | Rate Limits | Notes |
|---------------------|---------|--------|-------------|-------|
| | | | | |

### Databases

| n8n Credential Name | Service | Status | Rate Limits | Notes |
|---------------------|---------|--------|-------------|-------|
| | | | | |

### Other Services

| n8n Credential Name | Service | Status | Rate Limits | Notes |
|---------------------|---------|--------|-------------|-------|
| | | | | |

---

## Credentials to Set Up

- [ ] List credentials you plan to add

## Notes

- Document any credential-specific quirks here
- Note OAuth refresh requirements
- Track any billing/quota concerns
