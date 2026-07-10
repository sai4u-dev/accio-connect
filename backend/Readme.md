# Accio Connect MongoDB - Node Express, JWT, Bcryptjs, cors, doenv

```
SignUp
SignIn
Profile
```

# 📁 Backend Folder Structure

## 📂 config/

- Purpose: Holds configuration and setup files for the application.

- This folder is responsible for:

  - Database connections (e.g., MongoDB configuration)

  - Environment variable management

Any service-specific setup required before the server starts

Why it matters:
It separates low-level configuration logic from application logic, improving maintainability.

## 📂 controllers/

- Purpose: Contains the actual business logic for each route.

- Controllers handle:

  - Reading and validating input

  - Performing operations (database queries, authentication, etc.)

  - Returning responses

Why it matters:
It follows the MVC pattern and keeps routes clean by separating logic from endpoint definitions.

## 📂 middleware/

- Purpose: Holds Express middleware functions that run before request handlers.

- Examples of middleware tasks:

  - Authentication (JWT verification)

  - Access control

  - Logging

  - Input validation

Why it matters:
Middleware provides reusable logic that can be applied across multiple routes with minimal code duplication.

## 📂 models/

- Purpose: Contains all Mongoose schema definitions for the database.

- A model defines:

  - What data looks like (fields)

  - Data types

  - Validation rules

  - Indexes and constraints

Why it matters:
Models act as the single source of truth for your database structure and enable consistency across operations.

## 📂 routes/

- Purpose: Defines all API endpoints and maps them to their respective controllers.

- In routes:

  - Each URL path is created (/signUp, /signIn, etc.)

  - Each path is linked to a controller function

  - Middleware is attached where needed (e.g., protected routes)

Why it matters:
It keeps the server organized by separating endpoint definitions from logic and configuration.

## 📂 utils/

- Purpose: Stores helper functions and utility modules used across the project.

- Common utilities include:

  - Response formatter/helpers

  - Token generators

  - Reusable small functions

Why it matters:
Prevents repeating code and centralizes commonly used logic.

## 📄 app.js

- Purpose: Initializes the Express app and sets up all core middleware and routes.

- Typical tasks include:

  - Attaching middleware (CORS, JSON parser, cookies)

  - Registering routes

  - Loading global utilities (e.g., custom response functions)

Why it matters:
app.js structures the server but does not run it, keeping initialization logic separate from execution logic.

## 📄 server.js

- Purpose: Starts the server and connects to the database.

- Responsibilities:

  - Importing the configured app

  - Connecting to MongoDB

  - Listening on a specified port

  - Handling graceful shutdowns

Why it matters:
Separating server startup from the app setup improves clarity, testability, and scalability.

## 📁 config/

Holds configuration files (DB connection, environment validation, etc).

## 📁 controllers/

Contains business logic for each route.
(e.g., signup, login, profile)

## 📁 middleware/

Contains Express middleware such as JWT auth.

## 📁 models/

Holds all your Mongoose schemas.

## 📁 routes/

All route endpoints for the app.

## 📁 utils/

Reusable helper functions (custom responses, encryption helpers, token generator, etc).

## 📁 app.js

Sets up middleware, routes, and express configuration.

## 📁 server.js

Starts the server only—keeps app clean.

```
Client (Frontend / Postman)
        ↓
   Express Server
        ↓
 Middleware (CORS, Cookies, Auth)
        ↓
   Routes / Controllers
        ↓
 Business Logic (Auth, Validation)
        ↓
   MongoDB (via Mongoose)
        ↓
   Response (JSON + Cookies)
```

## **Mongoose**

```

Express → Controller → Mongoose → MongoDB
```

## **bcrypt**

```

Password → bcrypt.hash → MongoDB

Plain password → bcrypt.compare → true/false

```

## **jsonwebtoken (JWT)**

```

User verified → jwt.sign → token

Request → token → jwt.verify → allow/deny
```

## **Server StartUp Flow**

```

npm run dev
     ↓
nodemon starts server.js
     ↓
dotenv loads env vars
     ↓
MongoDB connects
     ↓
Middlewares applied
     ↓
Routes registered
     ↓
Server listens on PORT

```
