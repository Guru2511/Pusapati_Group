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

## Build and publish

```bash
npm run build         # -> dist/client (assets) + dist/server (the Worker)
base44 deploy         # or publish from the Base44 builder
```

There is no `index.html`: the HTML document is rendered on the server from `src/routes/__root.jsx`. The build runs through the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), so dev and build both execute server code in `workerd`.

## Deploy to Vercel

Vercel builds use Nitro to produce the TanStack Start server functions; the existing Cloudflare plugin remains enabled for Base44 builds. `vercel.json` selects the TanStack Start framework preset, and Vercel sets `VERCEL=1` to choose the Nitro build.

Import the GitHub repository into Vercel and use the repository root as the project root. Leave the build command and output directory at their framework defaults. Add the server-side environment variables used by the app in Vercel Project Settings → Environment Variables: `DATABASE_URL`, `WEB3FORM_ACCESS_KEY`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_API_VERSION`, and `WHATSAPP_TEMPLATE_NAME`; `WHATSAPP_TEMPLATE_LANGUAGE` is optional and defaults to `en_US`. These Vercel variables are separate from Base44 secrets. Redeploy after adding or changing them.
## How the pieces fit

- **Pages** are files in `src/routes/`. A route's `loader` runs on the server for a document request and in the browser for a client navigation; `Route.useLoaderData()` gives the component the resolved data.
- **Form submissions** are validated by `src/lib/server-fns.js` and inserted into Neon by the server-only `src/lib/neon.server.js` helper. The `DATABASE_URL` secret stays on the server.
- **Intake notifications** are attempted after the database save. Email and WhatsApp delivery run independently, so a provider outage does not lose a submission; failed alerts are reported in the server logs.
- **Secrets** are read in server code with `import { secrets } from "base44:runtime"` → `secrets.get("NAME")`, inside a handler. Never `process.env`.
- **Server routes** (`src/routes/api/*.js`) are raw HTTP endpoints for URLs something other than the app's own code requests (webhooks, downloads, feeds); the app's pages call server functions. `src/start.js` runs every request through `base44RequestMiddleware`, so their `server.handlers` receive the same `context.getBase44()` (`({ request, params, context }) => …`).
- **Server-only code** lives in `*.server.js` files (TanStack refuses to bundle them for the browser).
- **Auth** is resolved client-side after hydration (`useAuth()`); the server is anonymous on a document request, so give per-user pages `ssr: false`.
- **Sign-in and gated pages** are not wired in the starter: `src/components/auth/` holds the pages (login, register, password reset, MCP consent) and a login gate for `src/routes/_authed/`, to add when the app needs them. See **Adding Authentication** in `AGENTS.md`.
- **AI**: TanStack AI is installed and runs on the Base44 AI gateway, with no API key and usage billed to the app's AI credits. `gatewayModel(context.getBase44())` in `src/lib/ai.server.js` builds the adapter; `AGENTS.md` has a streaming chat example (a server route plus `useChat`).
- **Caching**: the platform caches only what a route opts into via `headers()` (`Cache-Control: public, s-maxage=…`). Everything else is served fresh.

## Configure intake alerts

Email alerts are sent through Web3Forms. In Vercel, add `WEB3FORM_ACCESS_KEY` under Project → Settings → Environment Variables, and configure the recipient for that access key in the Web3Forms dashboard. The API request uses the submitter's email as the reply-to address when provided.

Each intake submission triggers one owner alert. Customer confirmation emails are not sent by this integration. Redeploy after adding or changing the environment variable.

For WhatsApp alerts, configure a Meta WhatsApp Business Cloud API sender and set:

```bash
base44 secrets set WHATSAPP_ACCESS_TOKEN
base44 secrets set WHATSAPP_PHONE_NUMBER_ID
base44 secrets set WHATSAPP_API_VERSION
base44 secrets set WHATSAPP_TEMPLATE_NAME
base44 secrets set WHATSAPP_TEMPLATE_LANGUAGE
```

The approved WhatsApp message template must have one body-text placeholder for the submission summary. `WHATSAPP_TEMPLATE_LANGUAGE` must match the template language (it defaults to `en_US` if unset). Alerts go to `+91 93905 64371`; the Cloud API sender number must be a separate number, not the same WhatsApp number receiving the alert. The recipient must also be eligible to receive messages from the configured Business account.

If either provider is not configured or rejects a request, the submission remains saved and the failure is recorded in the server logs. Do not put provider credentials in client code or share them in chat.
