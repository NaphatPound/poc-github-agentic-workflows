---
on:
  issues:
    types: [labeled]

safe-outputs:
  create-pull-request:
    title-prefix: "[Fix] "
    draft: false
    base-branch: "main"
  add-comment:
    target: "triggering"
    max: 1
---

# Bug Fix Agent

When an issue is labeled with both "bug" and "auto-fix":

1. Read the issue to understand the bug
2. Search the codebase for the relevant file(s)
3. Apply the fix based on the bug description
4. Ensure the fix doesn't break existing functionality
5. Create a Pull Request referencing the issue
6. Add a comment on the issue linking to the PR

## Known Bugs Reference

| Bug ID | File | Function | Issue |
|--------|------|----------|-------|
| BUG-01 | src/app.js | divide() | No division by zero handling - should return error or "Cannot divide by zero" |
| BUG-02 | src/app.js | subtract() | Uses `a + b` instead of `a - b` |
| BUG-03 | src/app.js | deleteTodo() | Off-by-one: `splice(index + 1, 1)` should be `splice(index, 1)` |
| BUG-04 | src/app.js | addTodo() | No empty input validation - should check `text.trim()` before adding |
| BUG-05 | src/app.js | formatEmail() | Missing `@` symbol - `user + domain` should be `user + '@' + domain` |
| BUG-06 | src/style.css | #edit-profile-btn | `z-index: -1` makes button unclickable - should be `z-index: 1` |

## Fix Guidelines

- Make minimal changes - only fix the specific bug
- Add a code comment explaining the fix
- Run tests with `node tests/app.test.js` to verify
- Reference the issue number in the commit message: `Fixes #<issue_number>`
