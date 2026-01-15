# Debug n8n Workflow

Debug the following workflow issue:

$ARGUMENTS

## Debug Process

1. **Identify the Workflow**
   - Use `n8n_list_workflows()` to find the workflow by name
   - Get the workflow ID for further operations

2. **Check Execution History**
   - Use `n8n_executions()` to see recent executions
   - Look for failed executions and their error messages
   - Note the failing node and error type

3. **Analyze the Error**
   - Common error categories:
     - **Connection errors**: API/credential issues
     - **Data errors**: Missing fields, wrong types
     - **Expression errors**: Invalid syntax, undefined references
     - **Logic errors**: Wrong conditions, missing branches

4. **Research Solutions**
   - Use web search for specific error messages
   - Check n8n documentation for node-specific issues
   - Look for similar issues in n8n community forums

5. **Diagnose Root Cause**
   - Is it a credential issue? → Inform user, don't touch credentials
   - Is it a data structure issue? → Check incoming data format
   - Is it an expression issue? → Validate expression syntax
   - Is it a node configuration issue? → Check required parameters

6. **Plan the Fix**
   - Identify the minimal change needed
   - Consider side effects on other nodes
   - Plan a test to verify the fix

7. **Apply the Fix**
   - Use `n8n_update_partial_workflow()` with targeted changes
   - NEVER rebuild the entire workflow
   - Validate after changes

8. **Test the Fix**
   - Run the workflow with test data
   - Verify the original error is resolved
   - Check that other functionality still works

9. **Document**
   - Record what was wrong and how it was fixed
   - Add to `docs/troubleshooting/` if it's a common issue

## Critical Rules

- **NEVER modify credentials** - Report credential issues to user
- **NEVER delete and recreate** - Always fix incrementally
- **Ask before major changes** - Get user approval for significant modifications
