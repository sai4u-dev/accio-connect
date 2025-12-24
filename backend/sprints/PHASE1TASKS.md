---
## 🔹 Phase 1 – Full Stack Development Plan
---

## 🔧 Backend Development

### **Day 1 – Wednesday (17 Dec)**

- Clone the repository
- Understand the complete code flow
- Update **Sign In API** to send token in the response
- Create at least **one API to create a post**

---

### **Day 2 – Thursday (18 Dec)**

- Create API to **get all posts**
- Create API to **get all posts by a given userId**

---

### **Day 3 – Friday (19 Dec)**

- Create API to **get all referral posts**
- Create APIs to **update likes and comments**

---

### **Day 4 – Saturday (20 Dec)**

- Create API to **delete a post**

---

## 🎨 Frontend + Backend Integration

### **Day 6 – Monday (22 Dec)**

- Create **Sign Up** and **Sign In** UI
- Implement working forms
- Integrate authentication APIs
- Store token in **local storage after sign in**

---

### **Day 7 – Tuesday (23 Dec)**

- Create **Home Page**

  - Header
  - Sidebar

- Implement **Create Post**

  - On click, open popup/modal
  - Take details based on Post model
  - Call Create Post API

---

### **Day 8 – Wednesday (24 Dec)**

- Complete **Create Post flow**
- Complete remaining application flows

---

### **Day 9 – Thursday (25 Dec)**

- Call **Get All Posts API**
- Display posts on home page
- Display **likes and comments**
- Implement **like and comment functionality**
- Integrate respective APIs

---

### **Day 10 – Friday (26 Dec)**

- On clicking profile:

  - Redirect to **Profile Page**
  - Call **User Profile API**
  - Call **User Posts API (by userId)**
  - Render data on page load

---

### **Day 11 – Saturday (27 Dec)**

- Update **Post APIs**:

  - Caption
  - isLikeDisabled
  - isCommentDisabled

- Update **User APIs**:

  - isPlaced
  - organizationName
  - role
  - password
  - profilePicture
  - firstName
  - lastName

---

### **Day 12 – Sunday (28 Dec)**

- Complete the full flow
- Test application end-to-end
- Fix errors and edge cases
- Define **Accio Connect’s unique purpose**

  - Example:

    - LinkedIn → Professional networking
    - Instagram → Social content

  - Identify how **Accio Connect** serves a **different, Accio-focused purpose**

---

---

# ✅ Scalable Phase-1 Architecture (Senior View)

## 1️⃣ High-Level Architecture

```

Frontend (React)
↓
BFF / API Layer (Express)
↓
Domain Services
↓
Repositories
↓
MongoDB
↓
Async Events (future-ready)

```

**Why this scales**

- Frontend is decoupled from DB
- Business rules live in services
- APIs can evolve without breaking UI
- Easy to add mobile app later

---

## 2️⃣ Backend – Scalable Folder Structure

```

src/
├── app.js
├── server.js
├── config/
│ ├── db.js
│ ├── env.js
│ └── constants.js
├── modules/
│ ├── auth/
│ │ ├── auth.controller.js
│ │ ├── auth.service.js
│ │ ├── auth.routes.js
│ │ └── auth.schema.js
│ ├── user/
│ │ ├── user.model.js
│ │ ├── user.controller.js
│ │ ├── user.service.js
│ │ ├── user.repository.js
│ │ ├── user.routes.js
│ │ └── user.dto.js
│ ├── post/
│ │ ├── post.model.js
│ │ ├── post.controller.js
│ │ ├── post.service.js
│ │ ├── post.repository.js
│ │ ├── post.routes.js
│ │ └── post.dto.js
├── middlewares/
│ ├── auth.middleware.js
│ ├── error.middleware.js
│ └── rateLimit.middleware.js
├── utils/
│ ├── jwt.js
│ ├── logger.js
│ └── asyncHandler.js

```

➡️ Each **module owns its logic**
➡️ No cross-module DB access
➡️ Easy to scale into microservices later

---

## 3️⃣ API Design (Scalable & Versioned)

### Auth

```

POST /api/v1/auth/signup
POST /api/v1/auth/signin
POST /api/v1/auth/refresh

```

### Users

```

GET /api/v1/users/:id
PUT /api/v1/users/:id

```

### Posts

```

POST /api/v1/posts
GET /api/v1/posts
GET /api/v1/posts/user/:userId
GET /api/v1/posts/referrals
PUT /api/v1/posts/:id/like
PUT /api/v1/posts/:id/comment
PUT /api/v1/posts/:id
DELETE /api/v1/posts/:id

```

✅ Clear responsibilities
✅ Backward compatible (`v1`)
✅ Frontend-safe contracts

---

## 4️⃣ Data Modeling (Future-Proof)

### User

```js
{
  firstName,
    lastName,
    email,
    passwordHash,
    role,
    isPlaced,
    organizationName,
    profilePicture,
    createdAt;
}
```

### Post

```js
{
  userId,
    caption,
    media,
    likesCount,
    commentsCount,
    isLikeDisabled,
    isCommentDisabled,
    isReferral,
    createdAt;
}
```

### Comment (separate collection → scalable)

```js
{
  postId, userId, text, createdAt;
}
```

➡️ **Counts instead of arrays** (performance)
➡️ Separate collections = scalable reads

---

## 5️⃣ Frontend – Scalable Structure

```
src/
 ├── api/
 │    ├── auth.api.js
 │    ├── user.api.js
 │    └── post.api.js
 ├── pages/
 │    ├── SignIn.jsx
 │    ├── Home.jsx
 │    ├── Profile.jsx
 ├── components/
 │    ├── PostCard.jsx
 │    ├── CreatePostModal.jsx
 │    └── Sidebar.jsx
 ├── context/
 │    └── AuthContext.jsx
 ├── utils/
 │    └── token.js
```

✅ No API calls inside UI components
✅ Reusable components
✅ Easy to add role-based UI later

---

## 6️⃣ Phase-1 Execution (Scalable Order)

### Backend First (Days 1–4)

1. Auth & token flow
2. Post CRUD
3. Likes & comments
4. Referral logic

### Frontend Integration (Days 6–10)

1. Auth pages
2. Home + Create Post
3. Feed rendering
4. Profile page

### Hardening (Days 11–12)

- Update APIs
- Edge cases
- Performance check
- Define **Accio Connect’s unique purpose**

---

## 7️⃣ Senior-Level Scalability Decisions (Important)

✔ Soft delete instead of hard delete
✔ Token via HTTP-only cookie (upgrade later)
✔ Pagination everywhere
✔ Centralized error handling
✔ Logs instead of console.log
✔ DTOs for API contracts

---

## 🧠 Key Senior Insight

> **Phase-1 should be simple, but never careless.
> Scalable doesn’t mean complex — it means intentional.**

---

If you want next:

- **Actual code skeleton** (ready to commit)
- **DB indexes & performance tips**
- **How to scale Phase-2 (notifications, chat, jobs)**

Just tell me what you want to build next.
