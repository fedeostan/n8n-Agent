# Brainstorm Workflow Solution

Let's brainstorm and plan a solution for:

$ARGUMENTS

## Brainstorming Process

1. **Understand the Problem**
   - What is the user trying to achieve?
   - What triggers this workflow?
   - What is the desired outcome?
   - What constraints exist (budget, time, complexity)?

2. **Research Phase**
   - Search for similar workflows: `search_templates()`
   - Find relevant nodes: `search_nodes()`
   - Web search for best practices and patterns
   - Check if others have solved similar problems

3. **Identify Options**
   - List multiple approaches to solve the problem
   - Consider different trigger types
   - Evaluate various integration options
   - Think about scalability and maintenance

4. **Analyze Trade-offs**
   For each option, consider:
   - **Complexity**: How hard is it to build and maintain?
   - **Reliability**: How likely is it to fail?
   - **Cost**: Are there API limits or pricing concerns?
   - **Performance**: How fast will it execute?
   - **Flexibility**: How easy is it to modify later?

5. **Check Prerequisites**
   - What credentials are required?
   - Are those credentials available? (Check `clients/[client]/credentials.md`)
   - What external services are needed?
   - Are there rate limits to consider?

6. **Design Recommendation**
   - Recommend the best approach
   - Explain why this approach is preferred
   - Outline the workflow architecture
   - List the steps to implement

7. **Create Action Plan**
   - Break down implementation into steps
   - Identify potential challenges
   - Suggest testing strategy
   - Estimate complexity (simple/medium/complex)

## Output Format

After brainstorming, provide:

### Recommended Approach
[Description of the recommended solution]

### Workflow Architecture
[High-level flow diagram or description]

### Required Components
- Trigger: [type]
- Nodes: [list of required nodes]
- Credentials: [list of required credentials]

### Implementation Steps
1. [Step 1]
2. [Step 2]
...

### Potential Challenges
- [Challenge 1 and mitigation]
- [Challenge 2 and mitigation]

### Alternative Approaches
- [Alternative 1]: [pros/cons]
- [Alternative 2]: [pros/cons]

## After Brainstorming

Once the plan is approved:
- Use `/new-workflow` to start building
- Or `/modify` if enhancing an existing workflow
