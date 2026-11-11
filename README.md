# Pusapati Group

A TanStack Start application using React 19 and plain JavaScript. It is designed to deploy to Vercel with Nitro. Public form submissions and published website content use Neon Postgres; administrator sign-in uses Firebase Authentication; private CV files use Vercel Blob; Pusapati Intelligence uses OpenAI.

## Local development

```bash
npm install
npm run dev
```

Set the environment variables listed in `.env.example` in your local server environment. Do not commit credentials. For Vercel local development, use the Vercel CLI to pull the project's environment variables.

## Database setup

In the Neon SQL Editor, run the migrations in order:

1. `db/schema.sql`
2. `db/admin-dashboard.sql`
3. `db/normalize-intake-submissions.sql`
4. `db/intelligence-rate-limits.sql`

The normalization migration copies legacy submissions without deleting the original rows. Confirm the Neon project before running migrations. The Intelligence rate-limit table stores only a hashed client address and short-lived request counts.

## Environment variables

Configure these values in Vercel Project Settings → Environment Variables. Server-side values must not use a `VITE_` prefix.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon connection string for site content, forms, admin dashboard, and Intelligence rate limiting |
| `OPENAI_API_KEY` | Server-only OpenAI key for the public Intelligence chat |
| `FIREBASE_PROJECT_ID` | Firebase project used to verify admin ID tokens |
| `ADMIN_EMAILS` | Comma-separated administrator email allowlist |
| `N8N_WEBHOOK_URL` | Optional HTTPS webhook for WhatsApp intake alerts |
| `N8N_WEBHOOK_AUTH_KEY` | Optional authentication key for the n8n webhook |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob access for private CV files; configure through Vercel Blob |
| `VITE_FIREBASE_API_KEY` | Public Firebase web configuration |
| `VITE_FIREBASE_AUTH_DOMAIN` | Public Firebase web configuration |
| `VITE_FIREBASE_PROJECT_ID` | Public Firebase web configuration |
| `VITE_FIREBASE_APP_ID` | Public Firebase web configuration |
| `VITE_WEB3FORM_ACCESS_KEY` | Optional browser-side Web3Forms submission key |

Enable Firebase Email/Password sign-in and create the administrator account in Firebase Console. There is no public admin registration. The `/login` page signs in administrators; `/admin` verifies their Firebase ID token and checks the email allowlist.

## Website and admin behavior

- Pages are server-rendered from `src/routes/`; the shared document is in `src/routes/__root.jsx`.
- Published website content is loaded from the Neon `admin_site_content` table. Draft records remain private until published. Existing static page data remains the fallback when there are no published records.
- Admin content and form submissions use the same Neon database. Deleting content creates a tombstone; hiding a submission preserves its record.
- Intake forms keep their existing Web3Forms and optional n8n notification flows.
- Public image assets are served from `public/images/`.

## Pusapati Intelligence

The site has an Intelligence link, a floating launcher, and `/intelligence`. Visitors can chat without creating an account. The server validates and bounds messages, limits each IP to 10 requests per minute using Neon, retrieves relevant public website information and published CMS records, and calls OpenAI using the server-only `OPENAI_API_KEY`. Answers can cite relevant public pages.

The chat is public and AI requests incur OpenAI charges. The draft Knowledge Base PDF is intentionally excluded; do not index it unless an approved public edition is provided. Before enabling production chat, configure the OpenAI key, Neon connection, and `db/intelligence-rate-limits.sql` migration.

## Build and deploy

```bash
npm run lint
npm run build
```

Import the repository into Vercel, configure the environment variables and database migrations, then deploy using Vercel's Git integration or CLI. The repository's `vercel.json` selects the TanStack Start framework preset. Confirm the Vercel project and production environment before publishing.
