# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Freelancia** — a marketplace web app for freelancers and clients. Freelancers can create profiles, list skills, and apply to jobs. Clients can post jobs and hire freelancers.

Production: https://freelancia.up.railway.app/

---

## Commands

All commands use **Yarn** (v1.22). Run dev/build from the repo root via Turbo; run test/lint/migrate from the relevant `apps/` subdirectory.

```bash
# Root (runs both apps via Turbo)
yarn dev            # start frontend (port 3000) + backend (port 3001) in watch mode
yarn build          # build both apps
yarn lint           # lint both apps

# Database (Docker required)
docker compose up   # start PostgreSQL on port 7001

# Backend — apps/api
yarn dev            # NestJS watch mode
yarn build          # prisma generate && nest build
yarn test           # Jest unit tests
yarn test:watch     # Jest watch mode
yarn test:cov       # coverage report
yarn test:e2e       # E2E tests (jest --config ./test/jest-e2e.json)
yarn migrate:deploy # prisma migrate deploy
yarn lint           # eslint --fix
yarn format         # prettier --write

# Frontend — apps/web
yarn dev            # Next.js dev with Turbopack
yarn build          # Next.js build
yarn lint           # eslint
```

### First-time setup

```bash
docker compose up -d
cd apps/api && cp .env.example .env  # fill in DATABASE_URL, JWT_SECRET, CLOUDINARY_URL
yarn install
cd apps/api && yarn prisma generate
yarn dev  # from repo root
```

---

## Architecture

### Monorepo layout

```
apps/
  api/   — NestJS backend (port 3001)
  web/   — Next.js 15 frontend (port 3000)
turbo.json
docker-compose.yml  — PostgreSQL 15 on port 7001
```

### Backend (apps/api)

- **NestJS** with Prisma 6 + PostgreSQL; all endpoints under `/api`
- **Auth**: JWT (Passport.js), bcrypt hashing. Guards: `UserGuard`, `FreelancerGuard`, `AdminGuard`
- **Uploads**: Cloudinary via multer; configured in `cloudinary` module
- **Rate limiting**: global Throttler (60 req / 60 s)
- **Swagger**: `/api-docs` in development only
- **Modules**: `auth`, `user`, `freelancer-profile`, `freelancer-skill`, `skill`, `portfolio`, `job`, `application`, `cloudinary`, `health`

**Key data model relationships:**
```
User (type: freelancer | client)
  └─ FreelancerProfile → FreelancerSkill (junction) → Skill
                       → Portfolio
                       → Application → Job (owned by client User)
```

**Job lifecycle**: Job status is `active` or `completed`; applications are `pending → accepted | rejected`.

### Frontend (apps/web)

- **Next.js 15** App Router, React 19, Tailwind CSS 4
- **Server state**: TanStack React Query v5 (`useInfiniteQuery` for paginated job/freelancer lists)
- **HTTP**: Axios instance at `NEXT_PUBLIC_API_URL`; interceptor auto-attaches `Bearer` token from `localStorage` and clears it + redirects on 401
- **Notifications**: react-toastify
- **Role-based UI**: frontend reads `userType` from `localStorage` to branch rendering between freelancer and client views

**File layout conventions:**
- `src/app/api/` — React Query hooks (one file per feature, e.g. `useJobs.ts`)
- `src/app/(routes)/` — page components using App Router conventions
- Auth state (token, userType) lives in `localStorage`

**Pagination pattern** (infinite scroll):
```ts
useInfiniteQuery({
  queryKey: ["explore-jobs", search],
  queryFn: ({ pageParam = 0 }) => api.get("/job", { params: { skip: pageParam, take: 15 } }),
  getNextPageParam: (lastPage, allPages) =>
    lastPage.length < 15 ? undefined : allPages.reduce((acc, p) => acc + p.length, 0),
})
```

### Environment variables

| Variable | Location | Purpose |
|---|---|---|
| `DATABASE_URL` | `apps/api/.env` | PostgreSQL connection string (port 7001) |
| `JWT_SECRET` | `apps/api/.env` | Required — JWT signing key |
| `CLOUDINARY_URL` | `apps/api/.env` | Image upload service |
| `NEXT_PUBLIC_API_URL` | `apps/web/.env` | Defaults to `http://localhost:3001/api` |

---

## Code style

### No explanatory comments

**Do not add comments when writing or editing code.** This includes:

- Inline `//` or `/* */` comments that explain *why* a change was made or *what* a line does
- JSX section markers like `{/* Type-first — sets context (Hick's law) */}`
- Multi-line block comments above decorators, hooks, or function declarations that justify the choice
- TODO/NOTE/FIXME comments unless the user explicitly asks for one
- "Removed", "renamed", or "see PR #X" annotations

The code itself, the commit message, and the chat reply are where rationale belongs. Comments in the file become stale, leak prompt context into the codebase, and add noise the user has to delete by hand.

**Exceptions** (apply only when genuinely needed, not by default):
- A comment that already exists in the file and would be wrong after the edit — update it.
- The user explicitly asks for a comment ("add a JSDoc here", "leave a TODO").
- A non-obvious workaround for a real bug or platform quirk where the next reader will reasonably ask "why is this here?" — keep it to one line and reference the underlying issue (e.g. `// Safari <16 strips trailing slash — keep raw`).

When in doubt, omit the comment. Do not add comments to "be helpful" or to summarize what was just done.

---

## HCI Principles — Refactoring Direction

> **The current UI does not adequately follow HCI best practices. Future work should systematically address these. When touching any UI code, apply the relevant principles below.**

### 1. Visibility of system status
- Always show loading states (skeleton loaders, spinners) when data is being fetched
- Show success/error feedback immediately after mutations (react-toastify is already wired; use it consistently)
- Display empty states with clear messaging when lists return no results

### 2. Match between system and real world
- Use plain language; avoid developer jargon in UI copy (e.g., "bid amount" is fine, "application entity" is not)
- Dates and budgets should be formatted for locale, not raw ISO strings or plain numbers

### 3. User control and freedom
- All destructive or irreversible actions (delete job, reject application) must have a confirmation step
- Users should be able to cancel multi-step flows (apply to job, create portfolio item) without losing data

### 4. Consistency and standards
- Reuse the same button variants, form layouts, and heading hierarchy site-wide; do not invent one-off styles
- Navigation patterns must be consistent — if breadcrumbs appear on one detail page, they appear on all

### 5. Error prevention
- Validate form fields inline (on blur) before submission, not only on server rejection
- Disable submit buttons while a mutation is in-flight to prevent duplicate submissions

### 6. Recognition over recall
- Filter/search state must be reflected in the URL so users can bookmark and share results
- Labels must always be visible on form inputs — do not rely on placeholder text as the only label

### 7. Flexibility and efficiency
- Keyboard navigation must work for the job browse and application flows
- Frequently performed actions (apply, view profile) should be reachable in ≤ 2 clicks

### 8. Aesthetic and minimalist design
- Each page should have a single clear primary action; avoid competing calls-to-action
- Do not surface metadata (IDs, raw enum values, timestamps) to end users

### 9. Help users recognize, diagnose, and recover from errors
- API error messages returned from the backend should be translated into human-readable UI messages before display
- Never show raw HTTP status codes or stack traces to users

### 10. Accessibility baseline
- All interactive elements must have accessible labels (`aria-label` or visible text)
- Color must not be the only means of conveying state (e.g., application status badges need both color and text)
- Minimum contrast ratio: 4.5:1 for normal text (WCAG AA)
