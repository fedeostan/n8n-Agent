# Switch n8n Instance

Switch to a different n8n instance:

$ARGUMENTS

## Process

1. **Parse the Target Instance**
   - Extract the instance URL from the arguments
   - Format: `https://[name].app.n8n.cloud` or custom domain

2. **Check Client Documentation**
   - Look in `clients/` folder for the client's documentation
   - If client folder doesn't exist, ask user if they want to create it

3. **Verify API Key**
   - Check if we have an API key for this instance
   - If not, ask the user to provide one

4. **Update Configuration**
   - The MCP server will use the new instance URL
   - Note: This change is session-based; to make it permanent, update `.claude/settings.local.json`

5. **Verify Connection**
   - Test the connection by listing workflows
   - Confirm the switch was successful

## Usage Examples

```
/switch-instance https://alfahackers.app.n8n.cloud
/switch-instance https://clientname.app.n8n.cloud
```

## Important Notes

- You'll need the API key for the target instance
- Each client should have their own folder in `clients/` with documentation
- The default instance (fedeostan) is always available to switch back to

## After Switching

Once connected to the new instance:
1. Use `n8n_list_workflows()` to see available workflows
2. Review the client's documentation for context
3. Check `clients/[client]/credentials.md` for available credentials

## Switching Back

To return to the default instance:
```
/switch-instance https://fedeostan.app.n8n.cloud
```
