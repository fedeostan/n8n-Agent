# Search n8n Nodes

Find n8n nodes for:

$ARGUMENTS

## Search Process

1. **Understand the Need**
   - What functionality is required?
   - What service/platform needs to be integrated?
   - What specific operation is needed?

2. **Search Strategies**

   ### By Service Name
   ```
   search_nodes({ query: "hubspot" })
   search_nodes({ query: "google sheets" })
   search_nodes({ query: "slack" })
   ```

   ### By Functionality
   ```
   search_nodes({ query: "send email" })
   search_nodes({ query: "http request" })
   search_nodes({ query: "transform data" })
   ```

   ### By Category
   ```
   search_nodes({ query: "trigger" })
   search_nodes({ query: "ai" })
   search_nodes({ query: "database" })
   ```

3. **Get Node Details**
   - For each relevant result, use `get_node()` to see:
     - Available operations
     - Required parameters
     - Credential requirements
     - Example configurations

4. **Present Results**
   - List matching nodes with descriptions
   - Highlight recommended options
   - Note credential requirements
   - Show example configurations

## Common Node Categories

### Triggers
- Webhook, Schedule, Manual, App-specific triggers

### Communication
- Email (Gmail, SMTP), Slack, Discord, Teams, Telegram

### CRM & Sales
- HubSpot, Salesforce, Pipedrive, Zoho CRM

### Productivity
- Google Sheets, Airtable, Notion, Asana, Trello

### Data Processing
- Code (JavaScript/Python), IF, Switch, Merge, Split

### AI & ML
- OpenAI, Anthropic, AI Agent, Text Classifier

### Databases
- MySQL, PostgreSQL, MongoDB, Supabase, Firebase

### File Storage
- Google Drive, Dropbox, S3, FTP

### HTTP & APIs
- HTTP Request, Webhook Response, GraphQL

## Output Format

### Recommended Node: [Node Name]
- **Purpose**: [What it does]
- **Operations**: [Available operations]
- **Credentials**: [Required credentials]
- **Key Parameters**: [Important parameters]

### Alternative Options
- [Alternative 1]: [When to use it]
- [Alternative 2]: [When to use it]

### Example Configuration
```json
{
  "node": "example",
  "operation": "example"
}
```

## After Finding Nodes

Once you've identified the right nodes:
- Use `/new-workflow` to create a workflow using them
- Or `/modify` to add them to an existing workflow
