Review the current file or the files mentioned in $ARGUMENTS against Freelancia's HCI principles. If no arguments are given, review all recently changed UI files (check git diff for modified files in apps/web/src/).

For each principle below, scan the relevant code and report:
- **PASS** — the principle is satisfied
- **FAIL** — with the exact file:line and a concrete fix
- **N/A** — not applicable to the code in scope

---

## HCI Checklist

### 1. Visibility of system status
- Are loading states shown during data fetches (skeleton, spinner, or disabled state)?
- Are success/error toasts fired after every mutation?
- Is there a non-empty empty-state UI when lists return no results?

### 2. Match between system and real world
- Is all copy written in plain language (no raw enum values, developer jargon, or internal IDs shown to users)?
- Are dates formatted for locale (not raw ISO strings) and budgets formatted as currency?

### 3. User control and freedom
- Do all destructive/irreversible actions (delete, reject) have a confirmation step?
- Can multi-step flows (apply to job, create portfolio item) be cancelled without data loss?

### 4. Consistency and standards
- Are the same button variants, form layouts, and heading hierarchy used as on other pages?
- Is navigation (breadcrumbs, back links) consistent with equivalent pages?

### 5. Error prevention
- Are form fields validated inline on blur, before submission?
- Are submit buttons disabled while a mutation is in-flight?

### 6. Recognition over recall
- Is filter/search state reflected in the URL query string?
- Do all form inputs have a visible label — not just placeholder text?

### 7. Flexibility and efficiency
- Is the primary action (apply, view profile) reachable in ≤ 2 clicks/interactions?
- Does keyboard navigation work for the main flow on this page?

### 8. Aesthetic and minimalist design
- Is there a single clear primary CTA per page/section?
- Are raw metadata values (IDs, enum strings, timestamps) hidden from the user?

### 9. Help users recognize, diagnose, and recover from errors
- Are backend error messages translated into human-readable UI copy before display?
- Are raw HTTP status codes and stack traces never shown to the user?

### 10. Accessibility baseline
- Do all interactive elements have an accessible label (`aria-label` or visible text)?
- Is status conveyed by both color AND text (not color alone)?
- Does text meet WCAG AA contrast (≥ 4.5:1 for normal text)?

---

After the checklist, provide a **Priority fixes** section listing the top 3 issues to address first, ordered by user impact.
