# Adapt Workflow from JSON

Adapt an existing workflow to new requirements:

$ARGUMENTS

## Adaptation Process

1. **Load the Source Workflow**
   - Read the JSON file specified in arguments
   - Parse and understand the workflow structure
   - Identify all nodes, connections, and credentials used

2. **Analyze the Workflow**
   - What does this workflow do?
   - What triggers it?
   - What integrations does it use?
   - What data transformations occur?

3. **Understand Adaptation Requirements**
   - What needs to change?
   - Different trigger?
   - Different target system?
   - Different data source?
   - Additional functionality?

4. **Map Changes**
   - List nodes that need to be replaced
   - List nodes that need configuration changes
   - List new nodes that need to be added
   - Identify credential requirements

5. **Check Prerequisites**
   - Are required credentials available?
   - Are the target systems accessible?
   - Are there API compatibility concerns?

6. **Create Adapted Workflow**
   - Start with the base workflow structure
   - Replace/modify nodes as needed
   - Update expressions for new data structures
   - Add new functionality as required

7. **Validate**
   - Run validation on the adapted workflow
   - Check all node configurations
   - Verify connections are correct

8. **Test**
   - Deploy as inactive workflow
   - Test with sample data
   - Verify expected behavior

9. **Document**
   - Save adapted workflow JSON to client folder
   - Document the adaptations made
   - Note any differences from the original

## Common Adaptation Scenarios

### Different CRM System
- Map field names between systems
- Adjust authentication method
- Update data transformation expressions

### Different Notification Channel
- Replace Slack with Teams, email, etc.
- Update message formatting
- Adjust mention/tagging syntax

### Different Data Source
- Update trigger type
- Modify data extraction expressions
- Add data validation nodes

### Adding Features to Template
- Understand original workflow purpose
- Add new branches or nodes
- Integrate with existing flow

## Usage Examples

```
/adapt-workflow ./templates/lead-scoring.json for our HubSpot setup
/adapt-workflow ./clients/fedeostan/workflows/contact-sync.json to use Salesforce instead
```

## Important Notes

- Always validate the adapted workflow before deployment
- Keep the original workflow structure where possible
- Document all changes for future reference
- Test thoroughly before activating
