---
on:
  issues:
    types: [opened]
permissions:
  issues: write
---

# Issue Triage Agent

Analyze the newly opened issue and perform the following:

1. Read the issue title and body carefully
2. Classify the issue as one of: bug, enhancement, or question
3. Add the appropriate label
4. If it's a bug, assess severity (high, medium, low) and add a severity label
5. Post a comment summarizing the issue and suggesting next steps
6. If the bug references specific code, identify the file and line number

## Guidelines

- For **bugs**: Look for reproduction steps, expected vs actual behavior, and file references. Add labels `bug` and `severity: high|medium|low`.
- For **enhancements**: Add label `enhancement`. Summarize the feature request.
- For **questions**: Add label `question`. Provide a helpful initial response.

## Context

This is a POC project with a mock website containing intentional bugs in:
- `src/app.js` - Calculator (division by zero, subtraction bug), Todo List (off-by-one delete, empty input), Profile (email format)
- `src/style.css` - CSS z-index issues

## Response Format

Post a comment with:
```
## AI Triage Summary

**Classification:** [bug/enhancement/question]
**Severity:** [high/medium/low] (if bug)
**Affected File(s):** [file path(s)]

### Analysis
[Brief analysis of the issue]

### Suggested Next Steps
[Recommended actions]
```
