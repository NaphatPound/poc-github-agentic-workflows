# Requirement Document: POC - GitHub Agentic Workflows Bug Fix Demo

## Project Overview

โปรเจกต์ POC (Proof of Concept) นี้มีเป้าหมายเพื่อสาธิตการใช้งาน **GitHub Agentic Workflows (gh-aw)** ในการตรวจจับและแก้ไข Bug บนเว็บไซต์จำลอง (Mock Website) โดยอัตโนมัติผ่าน AI Agent

---

## Objectives

1. สร้าง Mock Website ที่มี Bug ฝังไว้โดยตั้งใจ (Intentional Bugs)
2. ใช้ GitHub Issues เป็นช่องทางรายงาน Bug
3. ใช้ GitHub Agentic Workflows ให้ AI อ่าน Issue แล้วแก้ไข Bug อัตโนมัติ
4. สาธิต End-to-End Flow ตั้งแต่รายงาน Bug → AI วิเคราะห์ → AI สร้าง PR แก้ไข

---

## Tech Stack

| Layer        | Technology                  |
| ------------ | --------------------------- |
| Frontend     | HTML / CSS / JavaScript     |
| Hosting      | GitHub Pages (optional)     |
| CI/CD        | GitHub Actions              |
| AI Workflow  | GitHub Agentic Workflows    |
| AI Engine    | GitHub Copilot (default)    |
| CLI Tool     | GitHub CLI + gh-aw extension|

---

## Project Structure

```
poc/
├── .github/
│   └── workflows/
│       ├── triage-issue.md          # AI workflow: วิเคราะห์ Issue
│       ├── fix-bug.md               # AI workflow: แก้ไข Bug อัตโนมัติ
│       └── *.lock.yml               # Auto-generated จาก gh aw compile
├── src/
│   ├── index.html                   # หน้าหลักของ Mock Website
│   ├── style.css                    # Stylesheet
│   └── app.js                       # JavaScript (มี Bug ฝังไว้)
├── tests/
│   └── app.test.js                  # Unit tests สำหรับตรวจสอบ Bug
├── requirement.md                   # เอกสารนี้
└── README.md                        # คำอธิบายโปรเจกต์
```

---

## Mock Website Features

เว็บไซต์จำลองประกอบด้วยฟีเจอร์พื้นฐานดังนี้:

### Feature 1: Calculator (เครื่องคิดเลข)
- บวก ลบ คูณ หาร ตัวเลข 2 จำนวน
- แสดงผลลัพธ์บนหน้าเว็บ

### Feature 2: Todo List (รายการสิ่งที่ต้องทำ)
- เพิ่ม Todo item
- ลบ Todo item
- Mark as complete

### Feature 3: User Profile Card
- แสดงรูปโปรไฟล์, ชื่อ, อีเมล
- ปุ่ม Edit Profile

---

## Intentional Bugs (Bug ที่ฝังไว้โดยตั้งใจ)

เว็บไซต์จะมี Bug ต่อไปนี้เพื่อใช้ทดสอบ AI Agent:

| Bug ID | Feature      | Description                                          | Severity |
| ------ | ------------ | ---------------------------------------------------- | -------- |
| BUG-01 | Calculator   | การหารด้วย 0 ไม่มีการจัดการ Error (Division by zero) | High     |
| BUG-02 | Calculator   | ผลลัพธ์การลบคำนวณผิด (ใช้ + แทน -)                   | High     |
| BUG-03 | Todo List    | กดปุ่ม Delete แล้วลบผิดรายการ (off-by-one error)      | Medium   |
| BUG-04 | Todo List    | เพิ่ม Todo item ว่างได้ (ไม่มี input validation)       | Low      |
| BUG-05 | Profile Card | อีเมลแสดงผิดรูปแบบ (ไม่มี @ symbol)                   | Medium   |
| BUG-06 | CSS          | ปุ่มบางปุ่ม z-index ทับกัน คลิกไม่ได้                   | Medium   |

---

## GitHub Agentic Workflows Setup

### Prerequisites

```bash
# 1. ติดตั้ง GitHub CLI
brew install gh

# 2. ติดตั้ง gh-aw extension
gh extension install github/gh-aw

# 3. Login
gh auth login
```

### Initialize Project

```bash
# เริ่มต้นตั้งค่า Agentic Workflows
gh aw init --engine copilot
```

### Workflow 1: Issue Triage Agent

**ไฟล์:** `.github/workflows/triage-issue.md`

**วัตถุประสงค์:** เมื่อมี Issue ใหม่ถูกเปิด AI จะ:
1. อ่านและวิเคราะห์เนื้อหาของ Issue
2. จัดหมวดหมู่ว่าเป็น Bug / Feature Request / Question
3. ใส่ Label ที่เหมาะสม (e.g., `bug`, `enhancement`, `question`)
4. สรุปประเด็นสำคัญเป็น Comment
5. ประเมินความรุนแรง (Severity: High / Medium / Low)

```markdown
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
```

### Workflow 2: Bug Fix Agent

**ไฟล์:** `.github/workflows/fix-bug.md`

**วัตถุประสงค์:** เมื่อ Issue ถูก Label เป็น `bug` + `auto-fix` AI จะ:
1. วิเคราะห์ Bug จาก Issue description
2. ค้นหาโค้ดที่เกี่ยวข้อง
3. สร้าง Branch ใหม่
4. แก้ไขโค้ด
5. เปิด Pull Request พร้อมคำอธิบาย

```markdown
---
on:
  issues:
    types: [labeled]
permissions:
  contents: write
  pull-requests: write
  issues: write
---

# Bug Fix Agent

When an issue is labeled with both "bug" and "auto-fix":

1. Read the issue to understand the bug
2. Search the codebase for the relevant file(s)
3. Create a new branch named `fix/issue-{issue_number}`
4. Apply the fix based on the bug description
5. Ensure the fix doesn't break existing functionality
6. Create a Pull Request referencing the issue
7. Add a comment on the issue linking to the PR
```

---

## Demo Scenario (ขั้นตอนการสาธิต)

### Step 1: Deploy Mock Website
```bash
git clone <repo-url>
cd poc
# เปิด index.html ในบราวเซอร์เพื่อดู Bug
```

### Step 2: Report Bug via GitHub Issue
สร้าง Issue ใหม่บน GitHub Repository:

**Title:** `Bug: Calculator subtraction returns wrong result`

**Body:**
```
## Description
The subtraction operation in the calculator returns incorrect results.
When I input 10 - 3, it returns 13 instead of 7.

## Steps to Reproduce
1. Open the calculator on the website
2. Enter 10 in the first input
3. Select "-" (subtract) operation
4. Enter 3 in the second input
5. Click "Calculate"

## Expected Result
Result should be 7

## Actual Result
Result is 13

## File Reference
`src/app.js` - subtract function
```

### Step 3: AI Triage (อัตโนมัติ)
- AI Agent อ่าน Issue
- เพิ่ม Label: `bug`, `severity: high`
- โพสต์ Comment สรุปปัญหา

### Step 4: Trigger Auto-Fix
- เพิ่ม Label `auto-fix` ให้ Issue
- AI Agent วิเคราะห์โค้ดและสร้าง PR แก้ไข

### Step 5: Review & Merge
- ตรวจสอบ PR ที่ AI สร้าง
- Review โค้ดที่แก้ไข
- Merge PR
- Issue ถูกปิดอัตโนมัติ

---

## Compile & Deploy Workflows

```bash
# Compile Markdown workflows เป็น YAML
gh aw compile

# Commit และ Push
git add .
git commit -m "Add AI agentic workflows for bug triage and auto-fix"
git push origin main
```

---

## Success Criteria (เกณฑ์ความสำเร็จ)

| # | Criteria                                                    | Status |
| - | ----------------------------------------------------------- | ------ |
| 1 | Mock Website แสดงผลได้ปกติและมี Bug ตามที่กำหนด               | ☐      |
| 2 | เมื่อเปิด Issue → AI Triage ทำงานอัตโนมัติ (ใส่ Label + Comment) | ☐      |
| 3 | เมื่อใส่ Label `auto-fix` → AI สร้าง PR แก้ Bug ได้            | ☐      |
| 4 | PR ที่ AI สร้างแก้ Bug ได้ถูกต้อง                               | ☐      |
| 5 | End-to-End Flow ทำงานได้ภายใน 5 นาที                          | ☐      |
| 6 | AI สามารถจัดการ Bug ได้อย่างน้อย 3 รายการจากทั้งหมด 6 รายการ    | ☐      |

---

## Risks & Limitations

1. **Technical Preview** - gh-aw ยังอยู่ในสถานะ Technical Preview อาจมีการเปลี่ยนแปลง API
2. **License Required** - ต้องมี GitHub Copilot License สำหรับ AI Engine
3. **Rate Limits** - AI Agent อาจมี Rate Limit ในการเรียกใช้งาน
4. **Complex Bugs** - AI อาจไม่สามารถแก้ Bug ที่ซับซ้อนมากได้ (POC นี้ใช้ Bug ง่ายๆ)
5. **Sandboxed Environment** - AI ทำงานในสภาพแวดล้อมจำกัด ตามค่าเริ่มต้นเป็น Read-only

---

## Timeline

| Phase              | Duration | Description                              |
| ------------------ | -------- | ---------------------------------------- |
| Phase 1: Setup     | 1 day    | สร้าง Repo, ติดตั้ง gh-aw, Init project  |
| Phase 2: Website   | 1 day    | สร้าง Mock Website พร้อม Bug ฝังไว้       |
| Phase 3: Workflows | 1 day    | เขียน AI Workflows (Triage + Fix)        |
| Phase 4: Testing   | 1 day    | ทดสอบ End-to-End Flow                    |
| Phase 5: Demo      | 1 day    | เตรียมการสาธิตและเอกสาร                   |
| **Total**          | **5 days** |                                        |

---

## References

- [GitHub Agentic Workflows Documentation](https://github.github.com/gh-aw/)
- [GitHub CLI](https://cli.github.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
