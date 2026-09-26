# Security Policy

## Supported Versions

Accio Connect is a monorepo (`frontend/` + `backend/`) under active development.
Security fixes are applied to the latest `main` branch only.

| Component | Version / Branch | Supported |
| --------- | ---------------- | --------- |
| `frontend` (React 19 + Vite 7, `accio-connect-frontend@0.0.0`) | `main` (latest) | ✅ |
| `backend` (Express 5 + Mongoose 9, `accio-connect-server@1.0.0`) | `main` (latest) | ✅ |
| Older tags / forks / deployed previews | — | ❌ (upgrade to `main`) |

Key dependencies to keep current: `express`, `mongoose`, `jsonwebtoken`,
`bcryptjs`, `cookie-parser`, `cors`, `dotenv`, `axios`, `react-router-dom`,
`@reduxjs/toolkit`, `vite`.

## Reporting a Vulnerability

**Please do not open a public GitHub issue for a security vulnerability.**

Report privately via one of these channels:

1. GitHub → **Security tab → Report a vulnerability** (private advisory), or
2. Open an issue titled `[SECURITY]` only if it contains **no exploit details**,
   and ask the maintainer for a private contact — or contact repository owner
   `sai4u-dev` directly via their GitHub profile email.

Include:

* Affected component (`frontend` / `backend`), file + line if known
  (e.g. `backend/src/app.js:26`, `backend/src/middleware/auth.middleware.js`)
* Steps to reproduce / proof-of-concept (redact real credentials)
* Impact assessment (auth bypass, data leak, XSS, CSRF, etc.)
* Suggested fix, if any

You can expect:

* Acknowledgement within **72 hours**
* A fix or mitigation plan on `main` within **14 days** for High/Critical issues
* Credit in the release notes if desired (or anonymity on request)

## Security Architecture (Current State)

* **Auth:** JWT (`JWT_SECRET`, 7-day expiry) issued at `POST /api/auth/signin`,
  transported in `accioConnectToken` cookie (`httpOnly`, `secure`, `sameSite:none`)
  and optionally as `Authorization: Bearer <token>`. Verified in
  `backend/src/middleware/auth.middleware.js`, which loads the full `User`
  (minus password) onto `req.user`.
* **Passwords:** Hashed with `bcryptjs` (cost 12) in
  `backend/src/controllers/auth.controller.js`. Never returned
  (`select: false` + explicit strip before `res.success`).
* **Transport:** CORS allowlist in `backend/src/app.js`:
  `http://localhost:5173` + two Vercel production origins, `credentials: true`.
  Cookie-based auth requires HTTPS in production (`secure: true`).
* **Input validation:** Batch / location / course-type enums checked against
  `backend/src/constants.js` (`OBH_1/2/3`, 5 centres, `mern/java/da`);
  required-field + unique-email/phone checks on signup.
* **Responses:** Standard envelope via `backend/src/utils/response.js`
  (`res.success` / `res.err`); unhandled errors via
  `backend/src/middleware/error.middleware.js` (stack traces only when
  `NODE_ENV=development`).

## Known Hardening Backlog (Contributors: Good First Security Issues)

These are real observations from the current codebase — do not exploit them,
please fix them via PR:

1. `GET /admin` (`backend/src/app.js`) is **unauthenticated** and reads a log
   file asynchronously with a race condition (`admin.controller.js`).
   → Require auth + admin role, fix async flow, move logs out of `src/`.
2. `POST /api/auth/logout` has **no `auth` middleware** and `clearCookie`
   options (`secure:false, sameSite:lax`) don't match `signin` cookie options
   (`secure:true, sameSite:none`) — the session cookie may persist.
   → Add `auth` middleware, align cookie flags, handle HTTPS vs localhost.
3. Six model files (`connection`, `conversation`, `message`, `notification`,
   `placement`, `referral`) are **missing `require("mongoose")`** and crash if
   imported. They are currently dead code (only `User` + `Post` are wired).
   → Add the import, add tests that `require()` every model.
4. No rate limiting / brute-force protection on `/api/auth/signin|signup`,
   no account lockout (the enterprise `userSchema.js` design has
   `loginAttempts` but is unwired). → Add `express-rate-limit`.
5. `GET /api/auth/getallusers` uses `router.use` (matches all verbs), has no
   pagination, and returns all users via raw `res.json` (bypasses envelope).
   → Change to `router.get`, add pagination + field projection + role check.
6. `GET /api/post/` (list all posts) is public with no pagination.
   → Consider auth + pagination (`limit`/`page`) before dataset grows.
7. `secure: true` cookies **fail over `http://localhost`** during local dev.
   → Document env-based cookie flags (`secure: NODE_ENV==="production"`).
8. No `helmet`, no input sanitization library, `PORT` hardcoded to `8000`
   (ignores `process.env.PORT`), MongoDB connects via a single `MONGO_URI`
   with no allowlist documentation.

## Secure Development Requirements

All PRs must follow these rules:

* **Never commit secrets.** `.env`, `.env.*`, `*.env` are gitignored at the
  repo root (see `.gitignore`). Required vars:
  * Backend: `MONGO_URI`, `JWT_SECRET` (long random string, ≥32 bytes)
  * Frontend: `VITE_BACKEND_API_URL` (e.g. `http://localhost:8000/api`)
* **Never commit real credentials or dumps.** The repo contains a `user.txt`
  with demo emails/passwords — do not extend it with real user data.
  Rotate any credential that was ever committed.
* **Validate + authorize server-side.** Every `POST/PUT/DELETE /api/post/*`
  (except public `GET /api/post/`) must keep `authorize`; add ownership checks
  (`post.user.toString() === req.user.id`) as done in `updatePost`/`deletePost`.
* **Keep auth cookies safe.** `httpOnly` always; `secure` + `sameSite:none`
  in production (HTTPS); test logout clears the exact same flags.
* **Least privilege queries.** Use `.select("-password")`, paginate list
  endpoints, never return password hashes or backup codes/MFA secrets.
* **Update dependencies.** Run `npm audit` in `backend/` and `frontend/`
  before release PRs; fix High/Critical findings.

## Local Security Checklist

```bash
# backend/.env (never commit)
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/accio-connect
JWT_SECRET=<openssl rand -hex 32>
PORT=8000
NODE_ENV=development

# frontend/.env (never commit)
VITE_BACKEND_API_URL=http://localhost:8000/api
```
