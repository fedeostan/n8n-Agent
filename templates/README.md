# Workflow Templates

This folder contains reusable workflow templates that can be adapted for different clients.

## How to Use Templates

1. Find a template that matches your use case
2. Use `/adapt-workflow ./templates/[template-name].json` to customize it
3. Modify as needed for the specific client requirements

## Template Naming Convention

```
[category]-[purpose].json
```

Examples:
- `crm-contact-sync.json`
- `notification-slack-alerts.json`
- `data-spreadsheet-backup.json`

## Template Categories

### CRM & Sales
- Contact synchronization
- Lead scoring
- Deal tracking

### Communication
- Slack notifications
- Email alerts
- Multi-channel messaging

### Data Processing
- Spreadsheet automation
- Data transformation
- Backup routines

### AI & Automation
- AI agent workflows
- Content generation
- Classification pipelines

## Creating New Templates

When a workflow is particularly useful and reusable:

1. Export the workflow JSON from n8n
2. Remove client-specific data (credentials, API keys, etc.)
3. Add placeholder comments for customizable parts
4. Save here with a descriptive name
5. Document in this README

## Template Checklist

Before saving a template:
- [ ] Removed all credential references (use placeholders)
- [ ] Removed client-specific data
- [ ] Added comments for customization points
- [ ] Tested that it validates correctly
- [ ] Documented purpose and usage
