# Contributing to Accio Connect

Thanks for contributing to **Accio Connect** — a full-stack job + networking
platform for learners (`frontend/` React + Vite, `backend/` Express + MongoDB).

Please read this guide, our [Code of Conduct](./CODE_OF_CONDUCT.md), and our
[Security Policy](./SECURITY.md) before opening a PR.

## 1. Project Overview

```text
accio-connect/
├── frontend/          # React 19 + Vite 7 + Redux Toolkit + Tailwind CSS 4
│   ├── src/app/store.js
│   ├── src/features/{auth,posts,users}/
│   ├── src/pages/{Dashboard,Profile,Users,SignIn,SignUp}.jsx
│   ├── src/components/  # Sidebar, PostCard, CreatePostModal, RecentlyPlaced…
│   └── src/utils/axios.js
├── backend/           # Node.js 18+ + Express 5 + Mongoose 9 + JWT + bcryptjs
│   └── src/
│       ├── server.js  # entry: dotenv → connectDB → listen :8000
│       ├── app.js     # cors + json + cookies + routes + error handler
│       ├── config/db.js
│       ├── routes/{auth.routes,post.routes}.js
│       ├── controllers/{auth.controller,post.controller,admin.controller}.js
│       ├── middleware/{auth.middleware,error.middleware}.js
│       ├── models/{user.model,post.model,…}.js  # only User+Post wired today
│       └── utils/response.js
├── docs/              # ARCHITECTURE.md, DATABASE_DESIGN.md, models
├── CODE_OF_CONDUCT.md / CONTRIBUTING.md / SECURITY.md / LICENSE
└── README.md
```

Full system map: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).
Data model: [`docs/DATABASE_DESIGN.md`](./docs/DATABASE_DESIGN.md).

## 2. Prerequisites

* Node.js **18+**, npm (or yarn)
* MongoDB connection string (Atlas or local)
* Git

## 3. Local Setup

```bash
git clone https://github.com/sai4u-dev/accio-connect.git
cd accio-connect

# --- backend (terminal 1) ---
cd backend
npm install
cp .env.example .env   # if no example exists, create .env manually (see below)
npm start              # nodemon src/server.js → http://localhost:8000

# --- frontend (terminal 2) ---
cd ../frontend
npm install
npm run dev            # vite → http://localhost:5173
```

Backend `.env`:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<long-random-secret-min-32-chars>
PORT=8000
NODE_ENV=development
```

Frontend `.env`:

```env
VITE_BACKEND_API_URL=http://localhost:8000/api
```

Verify: open `http://localhost:5173` → Sign up → create a post →
`GET http://localhost:8000/healthcheck` returns 200.

> Note: signin sets a `secure: true` cookie, which browsers reject over plain
> `http://localhost`. If login doesn't persist locally, see `SECURITY.md`
> hardening item #7 (env-based cookie flags) — PRs welcome.

## 4. Branching & Commits

* Branch from latest `main`:
  `feat/<scope>`, `fix/<scope>`, `docs/<scope>`, `chore/<scope>`,
  `security/<scope>`. Example: `feat/post-pagination`, `fix/logout-cookie`.
* Keep PRs small and focused (one feature/fix per PR).
* Commit messages (imperative, matches existing history like
  `fix: …`, `feat: …`, `docs: …`):
  `feat: add pagination to GET /api/post`, `fix: align clearCookie flags`.
* Never commit: `.env`, `node_modules/`, `dist/`, `*.log`, editor files
  (all covered by root `.gitignore`). Never commit real user credentials.

## 5. Coding Standards

### Backend (`backend/src`)

* Routes stay thin → controllers hold logic → models hold schemas.
* Use the response envelope: `res.success(status, message, data)` /
  `res.err(status, message, details)` (from `utils/response.js`).
* Protected routes must use `authorize` (`middleware/auth.middleware.js`);
  verify ownership for mutations (see `post.controller.js`
  `updatePost`/`deletePost` pattern).
* Validate enums against `constants.js` (`ALL_BATCH`, `LOCATION`, `COURSE_TYPE`).
* Every new model **must** `require("mongoose")`, export a model, and be
  covered by a smoke test (six existing model files currently miss the import —
  see `SECURITY.md`).

### Frontend (`frontend/src`)

* State via Redux Toolkit slices in `features/{auth,posts,users}/`
  (slice + `*API.js` + `*Thunks.js` pattern). Don't bypass the store with
  ad-hoc `fetch` in components.
* Axios: reuse a single instance with `withCredentials: true`
  (today `authAPI`, `postAPI`, `userApi` each create their own — consolidating
  into `utils/axios.js` is a welcome refactor).
* Routing: `PublicRoute` (`/login`, `/signup`) vs `ProtectedRoute`
  (`/`, `/users`, `/profile`) in `App.jsx`. Add missing `*` 404 route when
  touching the router. Dead links `/rp` and `/connetions` (Sidebar) need real
  pages or removal — don't add more dead links.
* Styling: Tailwind CSS + `framer-motion` + `lucide-react`. Keep components
  small (`PostCard`, `CreatePostModal`, `Sidebar`, `RecentlyPlaced`).

### General

* `npm run lint` (frontend) must pass. Backend: no `console.log` in new
  production paths (use a logger if adding one).
* No `//should be authorize`-style TODOs — either authorize or document why
  an endpoint is public in the PR description.

## 6. Testing Your Change

Minimum before requesting review:

```bash
# backend
cd backend && npm start
# exercise: POST /api/auth/signup → POST /api/auth/signin →
# GET /api/auth/me → POST /api/post → GET /api/post → PUT /api/post/:id/like

# frontend
cd frontend && npm run lint && npm run build && npm run dev
# exercise: signup → login → create post → like → comment → profile → logout → users
```

If you add an endpoint, document it in `README.md` (API routes table) and
`docs/ARCHITECTURE.md` (endpoint table).

## 7. Pull Request Process

1. Sync: `git fetch origin && git rebase origin/main`.
2. Push your branch and open a PR against `main` with:
   * What + why (link issue if any)
   * Screenshots/GIFs for UI changes
   * API contract changes (method, path, request/response examples)
   * Test evidence (`npm run lint`, manual endpoint checks)
   * Security impact (auth, cookies, PII, new env vars?)
3. One approval required. Maintainer (`sai4u-dev`) merges via squash.
4. After merge, delete your branch.

## 8. Good First Issues

* Fix missing `require("mongoose")` in 6 model files + add model smoke test.
* Change `router.use("/getallusers")` → `router.get` + pagination.
* Align `clearCookie` flags with signin cookie; add `auth` to logout route.
* Consolidate three Axios instances into `frontend/src/utils/axios.js`.
* Add `*` 404 route; resolve dead Sidebar links `/rp`, `/connetions`.
* Paginate `GET /api/post/`; fix `getAllPostByUserId` populate fields
  (`firstName profilePicture`, not `userName profilePic`).
* Add `helmet` + `express-rate-limit` to backend.

## 9. Code of Conduct & License

By contributing you agree to abide by the [Code of Conduct](./CODE_OF_CONDUCT.md).
Contributions are licensed under the repo's [MIT License](./LICENSE).
