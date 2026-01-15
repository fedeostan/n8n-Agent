# Troubleshooting Guide

Solutions to common issues encountered in n8n workflow development.

## Quick Diagnostic Steps

1. **Check Execution History**: `n8n_executions()` - Look at recent runs
2. **Validate Workflow**: `n8n_validate_workflow()` - Check for configuration errors
3. **Test Individual Nodes**: Test each node in isolation
4. **Check Credentials**: Verify credentials are active and have correct permissions

---

## Common Issues

### Expression Errors

#### "Cannot read property 'X' of undefined"
**Cause**: Trying to access a field that doesn't exist in the incoming data.

**Solution**:
```javascript
// Instead of:
{{ $json.data.field }}

// Use optional chaining:
{{ $json.data?.field }}

// Or provide a default:
{{ $json.data?.field ?? "default" }}
```

#### "Expression evaluation failed"
**Cause**: Syntax error in expression.

**Common fixes**:
- Check for matching `{{ }}` brackets
- Ensure proper string quoting
- Verify variable names are correct

### Webhook Issues

#### Webhook not receiving data
**Checklist**:
- [ ] Workflow is active
- [ ] Webhook URL is correct
- [ ] Sender is using correct HTTP method (GET/POST)
- [ ] No firewall blocking

#### Webhook data in wrong location
**Solution**: For external webhooks, data is usually in `$json.body`, not directly in `$json`.

### Credential Issues

#### "Invalid credentials" or "Unauthorized"
**Common causes**:
- Token expired (especially OAuth)
- API key regenerated
- Permissions changed

**Note**: Do NOT try to fix credentials programmatically. Report to user for manual resolution.

### Connection Issues

#### "ECONNREFUSED" or "ETIMEDOUT"
**Causes**:
- Service is down
- Network issues
- Rate limiting

**Solutions**:
- Add retry logic
- Implement exponential backoff
- Check service status page

### Data Type Issues

#### "Expected string but got object"
**Solution**: Convert the data type:
```javascript
// Convert object to string
{{ JSON.stringify($json.data) }}

// Convert string to number
{{ parseInt($json.value) }}
```

---

## Issue Documentation Template

When documenting a new issue:

```markdown
## Issue: [Brief Description]

### Symptoms
What error message or behavior is observed?

### Root Cause
Why does this happen?

### Solution
Step-by-step fix.

### Prevention
How to avoid this in the future.

### Related
Links to related issues or documentation.
```

---

## Useful Debugging Techniques

### 1. Add a Code Node for Inspection
```javascript
// Log the incoming data structure
console.log(JSON.stringify($input.all(), null, 2));
return $input.all();
```

### 2. Use IF Node to Test Conditions
Split your logic to test specific conditions in isolation.

### 3. Check Raw HTTP Responses
For HTTP Request nodes, enable "Full Response" to see headers and status codes.

### 4. Test with Static Data
Replace dynamic inputs with static values to isolate the issue.
