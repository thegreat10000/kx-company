# Threat Model

## Project Overview

KX Location is a full-stack TypeScript web application for a car-rental business. A React/Vite frontend serves a public catalogue and booking form, and an Express backend exposes a small JSON API that lists cars, returns individual car details, and accepts booking submissions that are forwarded by email via SMTP.

Production scope for this scan is limited to code that runs when `NODE_ENV === "production"`: `server/index.ts`, `server/routes.ts`, `server/static.ts`, the built client, and shared schema/route definitions. Development-only Vite middleware in `server/vite.ts`, local mockup assets, and other non-production tooling should be ignored unless production reachability is demonstrated. Platform-managed TLS is assumed for client-to-server traffic in production.

## Assets

- **Business contact and booking pipeline** — incoming booking requests and the ability to receive them by email. Abuse or disruption can block reservations and revenue.
- **Vehicle catalogue data** — the list of cars, pricing, conditions, and images returned by `/api/cars`. Integrity matters because the site depends on this data to operate.
- **Application secrets** — SMTP credentials and any future database or third-party credentials loaded from environment variables. Compromise would allow account abuse and impersonation.
- **Customer-submitted personal data** — names, email addresses, phone numbers, and requested dates submitted through the booking form. This is PII and should be handled minimally and safely.

## Trust Boundaries

- **Browser to API** — all `/api/*` requests originate from untrusted clients. The server must validate every request body and must not rely on frontend-only checks.
- **Public visitor to privileged functionality** — catalogue reads are intentionally public, but any destructive or administrative actions must be protected server-side.
- **Server to SMTP provider** — the backend uses stored credentials to send mail through an external service. Secrets and outbound content cross this boundary.
- **Source tree to deployment environment** — secrets belong in the Replit secrets store or deployment environment, not in tracked files. Anything committed to the repo should be treated as potentially exposed.

## Scan Anchors

- **Production entry points:** `server/index.ts`, `server/routes.ts`, `server/static.ts`, `client/src/main.tsx`
- **Highest-risk code areas:** booking submission and email generation in `server/routes.ts`; secret handling in `.env`; public API data flow in `client/src/components/BookingForm.tsx`
- **Public surfaces:** `GET /api/cars`, `GET /api/cars/:id`, `POST /api/bookings`, static frontend routes
- **Privileged/admin boundary:** any destructive route such as `DELETE /api/cars` must be treated as admin-only even if no auth system exists yet
- **Usually dev-only:** `server/vite.ts`, Vite plugins, local build/dev scripts

## Threat Categories

### Spoofing

This application does not expose a user-login system today, but it still has a service identity boundary: the backend can act as the business when it sends mail through SMTP. SMTP credentials must remain secret and must only be loaded from the deployment environment. Any future webhook or admin functionality must authenticate the caller server-side.

### Tampering

Public visitors can submit booking data, so all booking fields must be validated on the server before they are used in business logic or inserted into generated content. Destructive operations such as deleting the vehicle catalogue must never be exposed to unauthenticated callers.

### Information Disclosure

Booking submissions contain customer PII, and the project uses SMTP credentials to reach an external mail service. Sensitive values must not be committed to the repository, reflected back in verbose error responses, or logged unnecessarily. Responses should expose only what a caller needs.

### Denial of Service

The catalogue and booking pipeline are the service’s core availability targets. Public endpoints must not allow anonymous callers to delete inventory, flood the business mailbox, or trigger repeated expensive outbound work without safeguards.

### Elevation of Privilege

Even without formal roles yet, the application still has privileged capabilities: sending business mail and mutating server-side catalogue state. Those capabilities must be reachable only through explicit server-side authorization and narrowly validated inputs.