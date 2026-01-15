# Create New n8n Workflow

Create a new n8n workflow based on the following requirements:

$ARGUMENTS

## Process

1. **Understand the Requirements**
   - Analyze the user's request above
   - Identify the trigger type (webhook, schedule, manual, etc.)
   - List the integrations/services involved
   - Clarify any ambiguous requirements by asking questions

2. **Research Phase**
   - Use `search_nodes()` to find relevant nodes for each integration
   - Use `search_templates()` to find similar workflows as reference
   - Use `get_node()` to understand node configurations

3. **Design Phase**
   - Sketch out the workflow architecture
   - Identify required credentials (check client documentation)
   - Plan error handling and edge cases

4. **Build Phase**
   - Create the workflow incrementally
   - Validate each node configuration with `validate_node()`
   - Connect nodes in the correct order

5. **Validation Phase**
   - Run `n8n_validate_workflow()` to check the entire workflow
   - Fix any validation errors with `n8n_autofix_workflow()` if applicable

6. **Test Phase**
   - Create the workflow in n8n (initially inactive)
   - Test with sample data using `n8n_test_workflow()`
   - Verify outputs match expectations

7. **Deploy Phase**
   - Once testing passes, activate the workflow
   - Document the workflow in the client's folder

## Important Reminders

- Check `clients/[client]/credentials.md` for available credentials
- NEVER create workflows that require credentials the client doesn't have
- Always start with the workflow inactive for testing
- Save the workflow JSON to `clients/[client]/workflows/` for backup
