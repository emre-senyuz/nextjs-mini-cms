# Margin · nextjs-mini-cms

A complete local editorial dashboard built with Next.js App Router, strict TypeScript, Tailwind CSS, lucide-react, SQLite (`better-sqlite3`), Zod, and Server Actions.

## Local setup

Use Node.js **22 LTS or 24 LTS** and npm. From this project directory:

```sh
npm ci
npm run db:setup
npm run dev
```

Open http://127.0.0.1:3000/admin for the dashboard, or http://127.0.0.1:3000/blog for the public journal. `/` redirects to `/admin`. No environment variables or external services are needed.

To check and run a production build locally:

```sh
npm run typecheck
npm run build
npm start
```

Stop the development server first if it already occupies port 3000. Both server scripts bind to loopback by default.

## Features

- Create and edit plain-text articles with required titles (up to 160 characters) and content (up to 50,000 characters).
- Search article titles and filter published/draft entries using the Filter button. Searches and filters can be combined and are preserved in the URL.
- Publish/unpublish from the article list or editor. Drafts are excluded from both public lists and direct public article URLs.
- Unique generated slugs with numeric collision suffixes; non-Latin-only titles fall back to `article`. Slugs remain stable after title edits.
- Created and last-saved UTC timestamps, reading-time estimates, pending states, validation messages, and recoverable action errors.
- Accessible native deletion confirmation dialog. Deleting permanently removes the article.
- Responsive dashboard, editor, public journal, empty states, and missing-page handling. Content is rendered as text, not HTML or Markdown.

## Database and seed

`npm run db:setup` (alias: `npm run db:seed`) creates `data/cms.db` and inserts five sample articles: three published and two drafts. Re-running it skips existing sample slugs and preserves their edits; deleted samples are recreated. The app also creates an empty schema automatically if setup was skipped.

SQLite uses WAL mode, prepared parameterized queries, a unique slug constraint, and a transaction for collision allocation plus insertion. Data survives server restarts. Back up the database with the app stopped (including any remaining WAL sidecar files). To reset locally, stop the app, delete the `data` directory, then run setup again.

`better-sqlite3` is a native dependency. Supported Node LTS versions normally have prebuilt binaries. If your platform requires compilation, install the platform's C++ build prerequisites and Python, then run `npm ci` again. This project does not fall back to volatile memory or silently discard persistence.

## Structure

```text
src/app/actions.ts                 Validated Server Action entrypoints
src/app/admin/                     Dashboard and create/edit routes
src/app/blog/                      Published list and full article routes
src/components/                    Client forms and confirmation controls
src/lib/database.ts                Connection and schema
src/lib/articles.ts                Server-only read queries
src/lib/mutations.ts               Server-only database mutations
scripts/seed.ts                    Non-destructive sample setup
```

All data entrypoints validate on the server with Zod. Database errors are logged on the server while forms receive a generic recovery message. The low-level connection is shared with the seed CLI; browser-facing code accesses data only through server-only modules. Public pages and admin pages are dynamically rendered, and successful mutations invalidate their routes.

## Demo security disclaimer

**`/admin` is intentionally unprotected and is intended only for this local development portfolio demo. Do not deploy this app publicly or expose its port to other users.** There is no authentication or authorization. Anyone who can reach the server can read drafts and create, change, publish, or delete articles through its admin pages and Server Actions. Input validation is not access control.

This is a single-user demo, not a production multi-user CMS. Concurrent edits are last-write-wins. There are no uploads, paid APIs, remote storage, tests, or deployment configuration. `.gitignore` excludes database files, dependencies, build artifacts, and environment/secret files.

## Verification performed

Verified on Windows with Node.js 24.11.1:

- Dependency installation, native SQLite loading, strict typecheck, and production build passed.
- Setup inserted five articles; a second seed inserted zero duplicates.
- Browser checks covered creation, whitespace validation, title editing, slug collisions and stability, publish/unpublish, and confirmed deletion. Temporary verification data was removed.
- Production HTTP checks returned 200 for the dashboard, public list, and published article; a draft article URL returned 404. Combined title/status filtering returned the expected single article.
- A fresh server process read the persisted five articles (three published, two drafts). Desktop dashboard and journal layouts were visually inspected; mobile breakpoints are implemented but were not separately browser-verified.

The dependency download and Next.js Windows path resolution required execution outside the restricted tool sandbox. No persistence fallback was needed. No automated test suite was added.
