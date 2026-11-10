# Pusapati Group — TanStack Start

A [TanStack Start](https://tanstack.com/start) app (React 19, plain JavaScript) with file-based routes and server rendering. It supports Base44/Cloudflare and Vercel deployments; public form submissions are stored in Neon Postgres.

## What is in the starter

| Route | File |
| --- | --- |
| `/` | `src/routes/index.jsx` — a server-rendered page whose loader calls a server function |
| `GET /api/time` | `src/routes/api/time.js` — a server route: a raw HTTP endpoint next to the pages |

## Run locally

```bash
npm install
base44 login   # one-time per machine
base44 link    # one-time per clone
base44 secrets set DATABASE_URL
base44 dev     # local app runtime
```

Create the `intake_submissions` table by running [`db/schema.sql`](./db/schema.sql) in the Neon SQL Editor. Set `DATABASE_URL` to the Neon connection string as a server-side secret before running the app. Form submissions are written by a server function; the database credential is never sent to the browser.

## Admin dashboard setup

The admin dashboard is available at `/admin`; the sign-in page is `/login`. Firebase Email/Password sign-in is enabled for accounts explicitly listed in the server-side `ADMIN_EMAILS` allowlist. There is no public registration form. The dashboard reads and writes website content and existing form submissions in the same Neon database used by the public forms. Drafts remain drafts until published; publishing updates the public site's Neon-backed content overlay. Deleting website content creates a tombstone so it is hidden publicly without removing the database record. Deleting a business submission marks it hidden from the admin inbox while keeping its data in Neon for recordkeeping. Admin changes do not change the existing Web3Forms or n8n notification flow.

Before using the dashboard locally:

1. In Firebase Console, create or select the project, enable **Authentication → Email/Password**, and create the administrator account for `pusapatigroup@gmail.com`. Do not add a public registration route. The sign-in page sends an email verification link if the account is not verified.
2. Copy `.env.example` to `.env.local` and fill in the Firebase web app values from Firebase Console. These `VITE_FIREBASE_*` values are public client configuration, not service-account credentials.
3. Keep the existing Neon `DATABASE_URL` and notification settings unchanged. For Base44, add or confirm the server-side secrets `FIREBASE_PROJECT_ID` (same project as the web config) and `ADMIN_EMAILS` (`pusapatigroup@gmail.com`). For Vercel, add those same names as server-side project environment variables, at least for Production. Do not put server secrets in `.env.local` or share passwords/private keys in chat.
4. In the SQL Editor for the existing Neon database, run [`db/admin-dashboard.sql`](./db/admin-dashboard.sql) after [`db/schema.sql`](./db/schema.sql), then run [`db/normalize-intake-submissions.sql`](./db/normalize-intake-submissions.sql). The second migration creates a separate column-based table for each form type and copies legacy submissions without deleting or changing the original `intake_submissions` rows. Confirm the selected Neon project/database is the one configured in the app's `DATABASE_URL` before running it.
5. Start the app with `base44 dev`, open the local URL printed by the CLI, and append `/login`. Sign in, then open `/admin`. The first run cannot load admin data until Firebase configuration, secrets, and the migration are in place.

Website pages continue rendering their source content if there are no published CMS rows. Published records are fetched from Neon after hydration, so visitors initially still receive the existing server-rendered website.

## Build and publish

```bash
npm run build         # -> dist/client (assets) + dist/server (the Worker)
base44 deploy         # or publish from the Base44 builder
```

There is no `index.html`: the HTML document is rendered on the server from `src/routes/__root.jsx`. The build runs through the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), so dev and build both execute server code in `workerd`.

## Deploy to Vercel

Vercel builds use Nitro to produce the TanStack Start server functions; the existing Cloudflare plugin remains enabled for Base44 builds. `vercel.json` selects the TanStack Start framework preset, and Vercel sets `VERCEL=1` to choose the Nitro build.

Import the GitHub repository into Vercel and use the repository root as the project root. Leave the build command and output directory at their framework defaults. Preserve the existing `DATABASE_URL` and notification settings; add `FIREBASE_PROJECT_ID` and `ADMIN_EMAILS` as server-side project environment variables for the admin dashboard. Also add `N8N_WEBHOOK_URL` and `N8N_WEBHOOK_AUTH_KEY` when using WhatsApp alerts, and `VITE_WEB3FORM_ACCESS_KEY` for browser-side email submission. Environment-variable changes apply only to a new deployment; redeploy only after the required checks and explicit approval.

## How the pieces fit

- **Pages** are files in `src/routes/`. A route's `loader` runs on the server for a document request and in the browser for a client navigation; `Route.useLoaderData()` gives the component the resolved data.
- **Form submissions** are validated by `src/lib/server-fns.js` and inserted into Neon by the server-only `src/lib/neon.server.js` helper. The `DATABASE_URL` secret stays on the server.
- **Form submissions** are stored in `quote_enquiries`, `contact_messages`, `vendor_applications`, `career_applications`, and `investor_requests`, with individual form fields as SQL columns. Quote requirements that have multiple items are stored as rows in `quote_enquiry_items`. The legacy `intake_submissions` table remains intact as a backup/archive; new submissions use the separate tables. The Web3Forms email flow is unchanged.
- **Intake notifications** are attempted after the database save. Email and WhatsApp delivery run independently, so a provider outage does not lose a submission; failed alerts are reported in the server logs.
- **Secrets** are read in server code with `import { secrets } from "base44:runtime"` → `secrets.get("NAME")`, inside a handler. Never `process.env`.
- **Server routes** (`src/routes/api/*.js`) are raw HTTP endpoints for URLs something other than the app's own code requests (webhooks, downloads, feeds); the app's pages call server functions. `src/start.js` runs every request through `base44RequestMiddleware`, so their `server.handlers` receive the same `context.getBase44()` (`({ request, params, context }) => …`).
- **Server-only code** lives in `*.server.js` files (TanStack refuses to bundle them for the browser).
- **Auth** is resolved client-side after hydration (`useAuth()`); the server is anonymous on a document request, so give per-user pages `ssr: false`.
- **Sign-in and gated pages** are not wired in the starter: `src/components/auth/` holds the pages (login, register, password reset, MCP consent) and a login gate for `src/routes/_authed/`, to add when the app needs them. See **Adding Authentication** in `AGENTS.md`.
- **AI**: TanStack AI is installed and runs on the Base44 AI gateway, with no API key and usage billed to the app's AI credits. `gatewayModel(context.getBase44())` in `src/lib/ai.server.js` builds the adapter; `AGENTS.md` has a streaming chat example (a server route plus `useChat`).
- **Caching**: the platform caches only what a route opts into via `headers()` (`Cache-Control: public, s-maxage=…`). Everything else is served fresh.

## Configure intake alerts

Email alerts are sent from the browser through Web3Forms, which avoids server-side API restrictions. In Vercel, add `VITE_WEB3FORM_ACCESS_KEY` under Project → Settings → Environment Variables, and configure the recipient for that access key in the Web3Forms dashboard. This access key is included in the public browser bundle by design; enable Web3Forms' available spam protections. The API request uses the submitter's email as the reply-to address when provided.

Each intake submission is saved to Neon on the server and triggers one owner alert through Web3Forms in the browser. The alert sends the submitter's name, actual request summary, and individual form fields so Web3Forms no longer receives a generic message in place of the customer's name or enquiry. Existing Web3Forms submissions are not rewritten. Customer confirmation emails are not sent by this integration. Redeploy after adding or changing the environment variable.

Career applications may include an optional PDF, DOC, or DOCX CV up to 5 MB. CV files are kept in the project's private Vercel Blob store; only admins can download them from the Careers & HR record in `/admin`. Neon stores the file metadata and private Blob pathname, not the document bytes. The Web3Forms free plan continues to send the regular application email with the CV filename, but cannot attach the file. After upgrading Web3Forms to Pro, set `VITE_WEB3FORM_ATTACHMENT_ENABLED=true` in the Vercel Production environment and redeploy to attach CVs to those emails. Leave it unset or `false` while using the free plan so existing email alerts continue normally. Run [`db/career-cv-storage.sql`](./db/career-cv-storage.sql) against the same production Neon database before accepting uploads.

For WhatsApp alerts, create and publish the n8n intake-alert workflow, then configure these server-side environment variables in Vercel:

- `N8N_WEBHOOK_URL`: the workflow's production webhook URL.
- `N8N_WEBHOOK_AUTH_KEY`: the secret value configured in the workflow's Header Auth credential. The app sends it in the `x-pusapati-alert-key` header.

Configure the WhatsApp Business Cloud credential, sender phone-number ID, and approved template in n8n, not in Vercel. The template must have exactly one body-text placeholder for the submission summary. Alerts go to `+91 93905 64371`; the sender number must be separate from the recipient number, and the recipient must be eligible to receive messages from the configured Business account. Keep the workflow unpublished until its Header Auth and WhatsApp settings are complete.

If either provider is not configured or rejects a request, the submission remains saved and the failure is recorded in the server logs. Do not put provider credentials in client code or share them in chat.
