# Modify n8n Workflow

Modify an existing workflow with the following changes:

$ARGUMENTS

## Modification Process

1. **Identify the Workflow**
   - Use `n8n_list_workflows()` to find the workflow
   - Get current workflow structure and understand its purpose

2. **Understand Current State**
   - Review existing nodes and their connections
   - Identify integration points for the modification
   - Note any dependencies that might be affected

3. **Plan the Modification**
   - Design the changes needed
   - Identify which nodes need to be:
     - Added (new functionality)
     - Modified (changed behavior)
     - Reconnected (different flow)
   - Consider impact on existing functionality

4. **Check Prerequisites**
   - Verify required credentials are available
   - Ensure new nodes are compatible with existing data flow
   - Check for potential breaking changes

5. **Implement Changes**
   - Use `n8n_update_partial_workflow()` with diff operations
   - Make changes incrementally, validating as you go
   - Preserve existing node IDs and connections where possible

6. **Validate**
   - Run `n8n_validate_workflow()` after changes
   - Check that existing functionality is preserved
   - Verify new functionality is configured correctly

7. **Test**
   - Test the modified workflow with sample data
   - Verify both existing and new functionality
   - Check edge cases and error handling

8. **Document**
   - Update workflow documentation
   - Note what was changed and why
   - Update the workflow JSON backup in `clients/[client]/workflows/`

## Types of Modifications

### Adding New Functionality
- Add new nodes at the appropriate point in the flow
- Connect to existing nodes without breaking current connections
- Add error handling for new components

### Enhancing Existing Nodes
- Update node parameters
- Add additional outputs
- Improve expressions or data transformations

### Adding Parallel Branches
- Split the flow to handle multiple paths
- Merge results if needed

### Adding Error Handling
- Add IF nodes to check for error conditions
- Add notification nodes (Slack, email) for alerts
- Implement retry logic where appropriate

## Critical Rules

- **Preserve credentials** - Never modify credential configurations
- **Incremental changes** - Use partial updates, not full replacements
- **Test before deploying** - Verify changes don't break existing functionality
