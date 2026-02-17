# Bug Log - POC Mock Website

## Test Run: 2026-02-17

### Summary
- **Total Bugs:** 6
- **Detected by Tests:** 5/6
- **Browser-only Bug:** 1 (BUG-06)
- **Test Results:** 5 passed, 8 failed (failures = intentional bugs detected)

---

### BUG-01: Division by Zero Not Handled
- **File:** `src/app.js` - `divide()` function (line 23)
- **Severity:** High
- **Issue:** `divide(10, 0)` returns `Infinity` instead of an error message
- **Fix:** Add check `if (b === 0) return 'Error: Division by zero'`
- **Test Status:** DETECTED

### BUG-02: Subtraction Returns Wrong Result
- **File:** `src/app.js` - `subtract()` function (line 13)
- **Severity:** High
- **Issue:** Uses `a + b` instead of `a - b`. Example: `subtract(10, 3)` returns 13 instead of 7
- **Fix:** Change `return a + b` to `return a - b`
- **Test Status:** DETECTED (3 test cases failed)

### BUG-03: Delete Todo Off-by-One Error
- **File:** `src/app.js` - `deleteTodo()` function (line 65)
- **Severity:** Medium
- **Issue:** `todos.splice(index + 1, 1)` removes the item AFTER the intended one
- **Fix:** Change to `todos.splice(index, 1)`
- **Test Status:** DETECTED

### BUG-04: Empty Todo Input Allowed
- **File:** `src/app.js` - `addTodo()` function (line 57)
- **Severity:** Low
- **Issue:** No validation — empty strings can be added as todo items
- **Fix:** Add `if (!text.trim()) return;` before pushing to array
- **Test Status:** DETECTED

### BUG-05: Email Missing @ Symbol
- **File:** `src/app.js` - `formatEmail()` function (line 95)
- **Severity:** Medium
- **Issue:** Returns `user + domain` (e.g., "john.doeexample.com") instead of `user + '@' + domain`
- **Fix:** Change to `return user + '@' + domain`
- **Test Status:** DETECTED

### BUG-06: Edit Profile Button Unclickable (CSS z-index)
- **File:** `src/style.css` - `#edit-profile-btn` (line 153)
- **Severity:** Medium
- **Issue:** `z-index: -1` makes the button render behind the card, making it unclickable
- **Fix:** Change `z-index: -1` to `z-index: 1`
- **Test Status:** Requires browser testing (CSS-only bug)
