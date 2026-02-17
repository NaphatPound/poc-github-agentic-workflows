# POC - GitHub Agentic Workflows Bug Fix Demo

A Proof of Concept demonstrating **GitHub Agentic Workflows (gh-aw)** for automated bug detection and fixing via AI agents.

## Overview

This project contains a mock website with **6 intentional bugs** embedded in the code. When bugs are reported as GitHub Issues, AI agents automatically:

1. **Triage** - Classify the issue, assess severity, and add labels
2. **Fix** - Analyze the bug, create a branch, fix the code, and open a Pull Request

## Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd poc

# Open the website in a browser
open src/index.html

# Run tests (to see all bugs detected)
node tests/app.test.js
```

## Project Structure

```
poc/
├── .github/workflows/
│   ├── triage-issue.md       # AI workflow: analyze & classify issues
│   └── fix-bug.md            # AI workflow: auto-fix bugs via PR
├── src/
│   ├── index.html            # Main website page
│   ├── style.css             # Stylesheet (contains BUG-06)
│   └── app.js                # JavaScript logic (contains BUG-01 to BUG-05)
├── tests/
│   └── app.test.js           # Unit tests that detect all bugs
├── requirement.md            # Full requirements document
└── README.md                 # This file
```

## Website Features

| Feature | Description |
|---------|-------------|
| Calculator | Basic arithmetic: add, subtract, multiply, divide |
| Todo List | Add, delete, and complete todo items |
| Profile Card | Display user profile with name and email |

## Intentional Bugs

| Bug ID | Feature | Description | Severity |
|--------|---------|-------------|----------|
| BUG-01 | Calculator | Division by zero not handled | High |
| BUG-02 | Calculator | Subtraction uses `+` instead of `-` | High |
| BUG-03 | Todo List | Delete removes wrong item (off-by-one) | Medium |
| BUG-04 | Todo List | Empty todo items can be added | Low |
| BUG-05 | Profile | Email missing `@` symbol | Medium |
| BUG-06 | CSS | Edit Profile button unclickable (z-index) | Medium |

## GitHub Agentic Workflows Setup

### Prerequisites

```bash
brew install gh
gh extension install github/gh-aw
gh auth login
```

### Initialize

```bash
gh aw init --engine copilot
gh aw compile
```

### Demo Flow

1. Open a GitHub Issue describing a bug
2. AI Triage Agent auto-classifies and labels the issue
3. Add `auto-fix` label to trigger the Bug Fix Agent
4. AI creates a PR with the fix
5. Review, approve, and merge

## Running Tests

```bash
node tests/app.test.js
```

Tests will detect BUG-01 through BUG-05 (BUG-06 requires browser testing).

## Tech Stack

- **Frontend:** HTML / CSS / JavaScript
- **CI/CD:** GitHub Actions
- **AI Workflow:** GitHub Agentic Workflows
- **AI Engine:** GitHub Copilot
