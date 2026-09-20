# Accio Connect

> A full-stack student networking platform for building profiles, sharing posts, and connecting with a community.

Accio Connect is a **full-stack web application** built as a monorepo with a React frontend and Node.js/Express backend.

The project is being developed as a practical full-stack engineering system, covering **authentication, protected APIs, MongoDB data modeling, Redux state management, post interactions, and frontend/backend separation**.

---

## 🚀 Overview

Accio Connect provides a foundation for a student-focused professional and social networking platform.

Current functionality includes:

- User registration and login
- JWT-based authentication
- HTTP-only cookie authentication
- Protected frontend routes
- User profiles
- User discovery
- Post creation and retrieval
- Post editing and deletion
- Likes / unlike
- Comments
- Authenticated API requests
- Centralized frontend state management with Redux Toolkit

The repository follows a monorepo structure:

```text
accio-connect/
│
├── frontend/     # React + Vite client
│
└── backend/      # Node.js + Express REST API
```

---

# 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │       Browser        │
                    │                      │
                    │  React + Vite        │
                    │  Redux Toolkit       │
                    │  React Router        │
                    └──────────┬───────────┘
                               │
                               │ HTTP / Axios
                               │ Credentials
                               ▼
                    ┌──────────────────────┐
                    │     Express API      │
                    │                      │
                    │ Routes               │
                    │ Controllers          │
                    │ Middleware           │
                    │ Authentication       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       MongoDB        │
                    │                      │
                    │ Users                │
                    │ Posts                │
                    │ Connections          │
                    │ Conversations        │
                    │ Messages             │
                    │ Notifications        │
                    │ Referrals            │
                    │ Placements            │
                    └──────────────────────┘
```

### Request flow

```text
User interaction
       ↓
React component
       ↓
Redux Toolkit / API layer
       ↓
Axios
       ↓
Express route
       ↓
Authentication middleware
       ↓
Controller
       ↓
Mongoose
       ↓
MongoDB
       ↓
API response
       ↓
Redux state
       ↓
React UI
```

---

# ✨ Current Features

## 🔐 Authentication

The authentication system currently supports:

- User registration
- User login
- User logout
- Password hashing with bcrypt
- JWT authentication
- HTTP-only authentication cookies
- Protected backend routes
- Authenticated user lookup
- Authentication persistence through `/api/auth/me`
- Session metadata such as login time, logout time and device information

### Authentication flow

```text
                    Sign In
                       │
                       ▼
                Express API
                       │
                       ▼
              Validate credentials
                       │
                       ▼
              bcrypt password check
                       │
                       ▼
                 Generate JWT
                       │
                       ▼
            HTTP-only Cookie
                       │
                       ▼
              Browser Request
                       │
                       ▼
          Authentication Middleware
                       │
                       ▼
                JWT Verify
                       │
                       ▼
               Fetch User
                       │
                       ▼
              Protected Route
```

The backend authentication middleware accepts the token from:

```text
Cookie:
accioConnectToken
```

or:

```text
Authorization:
Bearer <token>
```

---

# 👤 User Management

Current user functionality includes:

- Registration
- Login
- Logout
- Authentication check
- Profile retrieval
- Profile update logic
- Authenticated user discovery

Users contain information such as:

- Name
- Email
- Phone number
- Profile picture
- Batch
- Location
- Course type
- Instructor status
- Account status
- Login/logout timestamps
- Session information

---

# 📝 Posts

Authenticated users can:

- Create posts
- Edit their own posts
- Delete their own posts
- View posts
- View posts by user
- Like / unlike posts
- Add comments
- Disable likes on a post
- Disable comments on a post

Post data currently includes:

```text
Post
├── user
├── contentType
├── content
├── caption
├── type
├── isLikeDisable
├── isCommentDisable
├── likes[]
└── comments[]
```

Post ownership is checked before allowing users to update or delete their posts.

---

# ❤️ Post Interactions

### Like / Unlike

The backend checks whether the authenticated user has already liked a post.

```text
Like request
     ↓
Find post
     ↓
Check whether likes are disabled
     ↓
Find current user's like
     ↓
Already liked?
   /       \
 Yes       No
  ↓         ↓
Remove    Add like
  \         /
   ────────
      ↓
Updated likes
```

### Comments

Users can add comments to posts when commenting is enabled.

The API validates:

- Authentication
- Post existence
- Comment content
- Comment availability

---

# 🎨 Frontend

The frontend is built using:

- React 19
- Vite
- Redux Toolkit
- React Redux
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React
- React Icons

### Frontend structure

```text
frontend/src/
│
├── app/
│   └── store.js
│
├── components/
│
├── features/
│   ├── auth/
│   ├── posts/
│   └── users/
│
├── pages/
│
├── routes/
│   ├── ProtectedRoute.jsx
│   └── PublicRoute.jsx
│
├── styles/
│
└── utils/
```

---

# 🧠 State Management

Redux Toolkit is used to manage application state.

Current state domains include:

```text
Redux Store
│
├── Authentication
│   ├── user
│   ├── isAuthenticated
│   ├── loading
│   └── authChecked
│
├── Posts
│   ├── posts
│   ├── loading
│   └── error
│
└── Users
    ├── users
    ├── loading
    └── error
```

Asynchronous operations are implemented using `createAsyncThunk`.

---

# 🛡️ Route Protection

The frontend separates authenticated and public application areas.

### Protected routes

```text
ProtectedRoute
      ↓
Check authentication state
      ↓
Check whether authentication has been verified
      ↓
Authenticated?
   /          \
 Yes           No
  ↓             ↓
Render       Redirect
page         to login
```

This prevents the application from making routing decisions before the initial authentication check completes.

---

# 🗄️ Backend Architecture

The backend uses:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- CORS
- dotenv

### Backend structure

```text
backend/src/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── admin.controller.js
│   ├── auth.controller.js
│   └── post.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   └── error.middleware.js
│
├── models/
│   ├── user.model.js
│   ├── post.model.js
│   ├── connection.model.js
│   ├── conversation.model.js
│   ├── message.model.js
│   ├── notification.model.js
│   ├── placement.model.js
│   └── referral.model.js
│
├── routes/
│   ├── auth.routes.js
│   └── post.routes.js
│
├── utils/
│   └── response.js
│
├── app.js
└── server.js
```

---

# 🔌 API

## Authentication

| Method | Endpoint | Auth |
|---|---|---|
| `POST` | `/api/auth/signup` | Public |
| `POST` | `/api/auth/signin` | Public |
| `POST` | `/api/auth/logout` | Public/Auth-aware |
| `GET` | `/api/auth/profile` | Protected |
| `GET` | `/api/auth/me` | Protected |
| `GET` | `/api/auth/getallusers` | Protected |

## Posts

| Method | Endpoint | Auth |
|---|---|---|
| `POST` | `/api/post` | Protected |
| `GET` | `/api/post` | Public |
| `GET` | `/api/post/:postId` | Protected |
| `PUT` | `/api/post/:postId` | Protected |
| `DELETE` | `/api/post/:postId` | Protected |
| `GET` | `/api/post/user/:userId` | Protected |
| `PUT` | `/api/post/:postId/like` | Protected |
| `POST` | `/api/post/:postId/comment` | Protected |

## Health / utility endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/healthcheck` | Backend health check |
| `GET` | `/` | API landing response |
| `GET` | `/test` | Development test endpoint |

---

# 🔒 Security

Current security-related implementation includes:

- Password hashing with bcrypt
- JWT authentication
- HTTP-only authentication cookie
- Protected API middleware
- Ownership checks for post modification/deletion
- CORS configuration
- Environment variables for secrets
- Password exclusion from normal user queries
- Authenticated user lookup before protected operations

### Example

Passwords are stored using bcrypt rather than plaintext:

```javascript
const hashed = await bcrypt.hash(password, 12);
```

Authentication tokens are generated using JWT and stored in an HTTP-only cookie.

---

# 🧩 Data Model

The current backend contains models for several planned areas of the platform.

```text
User
 │
 ├── Posts
 │
 ├── Connections
 │
 ├── Conversations
 │       └── Messages
 │
 ├── Notifications
 │
 ├── Referrals
 │
 └── Placements
```

### Current implemented API domain

```text
Authentication
        │
        └── Users
              │
              └── Posts
                    ├── Likes
                    └── Comments
```

Additional models such as conversations, messages, connections, notifications, referrals and placements provide the foundation for future platform functionality.

---

# ⚙️ Getting Started

## Prerequisites

Install:

- Node.js 18+
- npm
- MongoDB

---

## Clone

```bash
git clone https://github.com/sai4u-dev/accio-connect.git

cd accio-connect
```

---

## Backend

```bash
cd backend
npm install
```

Create:

```text
backend/.env
```

Example:

```env
PORT=8000
MONGO_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

Start the backend:

```bash
npm start
```

Backend:

```text
http://localhost:8000
```

---

## Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create:

```text
frontend/.env
```

Example:

```env
VITE_BACKEND_API_URL=http://localhost:8000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 📜 Available Scripts

## Backend

```bash
npm start
```

Starts the backend using Nodemon.

```bash
npm test
```

> Automated tests are not implemented yet.

## Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates the production build.

```bash
npm run preview
```

Previews the production build.

```bash
npm run lint
```

Runs ESLint.

---

# 🗺️ Roadmap

Accio Connect is under active development.

Planned engineering improvements include:

### Platform

- Connections
- Messaging
- Notifications
- Referrals
- Placement workflows
- Search and discovery

### Backend

- Request validation
- Rate limiting
- Improved error handling
- Pagination
- Database indexing
- API documentation
- Automated testing
- Service-layer separation

### Authentication

- Refresh-token architecture
- Improved session management
- Password reset
- Email verification

### Media

- File upload service
- Image/video/PDF storage
- Media validation
- Object-storage integration

### Engineering

- CI/CD
- Integration tests
- API test coverage
- Logging and observability
- Production monitoring
- Performance optimization

---

# 🎯 Engineering Goals

The purpose of Accio Connect is not only to build a social platform, but also to explore practical engineering problems involved in developing a real-world application.

Key areas of focus:

- Designing REST APIs
- Authentication and authorization
- MongoDB schema design
- Frontend state management
- Protected application routes
- API error handling
- Resource ownership
- Scalable project structure
- Production-oriented development practices

---

# 🚧 Project Status

**Active Development**

The application is functional across its core authentication and post-management flows, while additional networking and platform capabilities are being developed.

---

# 👨‍💻 Author

### Sai Narendra

Software Engineer focused on:

`JavaScript` `TypeScript` `React` `Node.js` `Express` `MongoDB` `REST APIs` `DSA` `AI Integrations`

**GitHub:** https://github.com/sai4u-dev  
**LeetCode:** https://leetcode.com/u/sai4u  
**LinkedIn:** https://linkedin.com/in/Narendra-4u
