# Accio Connect

Accio Connect is a full-stack job and networking platform built as a monorepo with a React + Vite frontend and a Node.js + Express backend.

## Repository structure

- `frontend/` — React client app powered by Vite, Redux Toolkit, and Tailwind CSS.
- `backend/` — Node.js API server using Express, MongoDB, JWT authentication, and cookie handling.

## Features

- User registration and authentication
- Profile management
- Post creation and retrieval
- Protected API routes with JWT
- CORS support for frontend/backend separation

## Getting started

### Prerequisites

- Node.js 18+ installed
- npm or yarn available
- MongoDB connection string

### Backend setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with values similar to:
   ```env
   MONGO_URL=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
5. The backend runs on:
   - `http://localhost:8000`

### Frontend setup

1. Open a terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `frontend/` with:
   ```env
   VITE_BACKEND_API_URL=http://localhost:8000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. The frontend runs on:
   - `http://localhost:5173`

## Scripts

### Backend

- `npm start` — start backend with `nodemon`.

### Frontend

- `npm run dev` — run Vite development server.
- `npm run build` — build production assets.
- `npm run preview` — preview the built frontend.
- `npm run lint` — run ESLint.

## API routes

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `GET /api/auth/profile` (protected)

### Posts

- `POST /api/post` (create post)
- `GET /api/post` (list posts)

### Health and misc

- `GET /healthcheck`
- `GET /admin`
- `GET /test`

## Notes

- The backend uses CORS to allow the frontend origin at `http://localhost:5173` and a couple of deployed Vercel URLs.
- The frontend Axios client uses `withCredentials: true` to support cookie-based auth.

## Recommended workflow

1. Start MongoDB.
2. Run backend from `backend/`.
3. Run frontend from `frontend/`.
4. Sign up or sign in from the React app.

## Useful files

- `backend/src/app.js` — Express app configuration and middleware.
- `backend/src/server.js` — server startup and database connection.
- `backend/src/config/db.js` — MongoDB connection helper.
- `frontend/src/utils/axios.js` — Axios instance with backend base URL.
- `frontend/vite.config.js` — Vite configuration.
