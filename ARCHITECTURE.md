# flipflap - Architecture Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              React Frontend (Port 3000)                │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  Pages: Login, Register, Avatar, Home, etc.     │  │ │
│  │  │  Components: Sidebar, Navigation                │  │ │
│  │  │  Styling: Black & White Theme                   │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │         ↓         ↓         ↓                            │ │
│  │      Axios    Socket.io   LocalStorage                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↓                                    │
└──────────────────────────┼────────────────────────────────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         HTTP/REST    WebSocket    Token Auth
              │            │            │
┌─────────────┴─────────────┴────────────┴──────────────────────┐
│                    NETWORK/INTERNET                            │
└─────────────┬─────────────┬────────────┬──────────────────────┘
              │            │            │
┌─────────────┴─────────────┴────────────┴──────────────────────┐
│                 Express Backend (Port 5000)                   │
├─────────────────────────────────────────────────────────────┐ │
│                                                               │ │
│  ┌─────────────────────────────────────────────────────┐   │ │
│  │         API Routes (5 files)                        │   │ │
│  │  ├─ /api/auth/* (Register, Login)                 │   │ │
│  │  ├─ /api/avatars/* (CRUD)                         │   │ │
│  │  ├─ /api/profiles/* (Manage Profiles)             │   │ │
│  │  ├─ /api/messages/* (Chat)                        │   │ │
│  │  └─ /api/search/* (Search & Explore)              │   │ │
│  └─────────────────────────────────────────────────────┘   │ │
│         ↓              ↓              ↓                      │ │
│  ┌─────────────┐  ┌──────────┐  ┌───────────────┐          │ │
│  │  Models    │  │Middleware│  │  Socket.io    │          │ │
│  │ (4 files)  │  │ (Auth)   │  │  (Real-time)  │          │ │
│  │ ├─ User    │  │          │  │ Send/Receive  │          │ │
│  │ ├─ Avatar  │  │JWT Check │  │ Messages      │          │ │
│  │ ├─ Profile │  │          │  │               │          │ │
│  │ └─ Message │  │          │  │               │          │ │
│  └─────────────┘  └──────────┘  └───────────────┘          │ │
│         ↓                                                    │ │
│  ┌─────────────────────────────────────────────────────┐   │ │
│  │     Mongoose ORM & MongoDB Connection              │   │ │
│  └─────────────────────────────────────────────────────┘   │ │
│                           ↓                                  │ │
└───────────────────────────┼──────────────────────────────────┘
                            │
              ┌─────────────┴──────────────┐
              │                            │
┌─────────────────────────────────────┐  ┌──────────────────┐
│   MongoDB Database (Port 27017)     │  │ MongoDB Compass  │
│                                     │  │ (GUI Tool)       │
│  Collections:                       │  │                  │
│  ├─ users                           │  │ Visual Database  │
│  ├─ avatars                         │  │ Browser          │
│  ├─ profiles                        │  │                  │
│  └─ messages                        │  │                  │
└─────────────────────────────────────┘  └──────────────────┘
```

---

## User Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER REGISTRATION                         │
└─────────────────────────────────────────────────────────────┘
                          ↓
              ┌──────────────────────────┐
              │  User fills form:        │
              │  - Username              │
              │  - Email                 │
              │  - Password              │
              └──────────────────────────┘
                          ↓
              ┌──────────────────────────────────────┐
              │  POST /api/auth/register             │
              │  Check if user exists                │
              │  Hash password (bcryptjs)            │
              │  Create user in DB                   │
              │  Create default profile              │
              └──────────────────────────────────────┘
                          ↓
              ┌──────────────────────────┐
              │  Generate JWT Token      │
              │  (7-day expiration)      │
              └──────────────────────────┘
                          ↓
              ┌──────────────────────────────────────┐
              │  Response: {token, user}             │
              │  Store token in localStorage         │
              │  Redirect to /create-avatar          │
              └──────────────────────────────────────┘
                          ↓
              ┌──────────────────────────┐
              │  CREATE AVATAR           │
              │  - Choose emoji          │
              │  - Select color          │
              │  - Pick style            │
              │  - Save avatar           │
              └──────────────────────────┘
                          ↓
              ┌──────────────────────────┐
              │  Redirect to /home       │
              │  User ready to explore!  │
              └──────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        USER LOGIN                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
              ┌──────────────────────────┐
              │  User fills form:        │
              │  - Email                 │
              │  - Password              │
              └──────────────────────────┘
                          ↓
              ┌──────────────────────────────────────┐
              │  POST /api/auth/login                │
              │  Find user by email                  │
              │  Verify password (bcrypt.compare)    │
              └──────────────────────────────────────┘
                          ↓
                    ┌─────┴─────┐
                    │           │
              Success       Failure
                    │           │
                    ↓           ↓
          ┌──────────────┐  Error Message
          │ Generate JWT │
          │ (7-day)      │
          └──────────────┘
                    ↓
          ┌──────────────────┐
          │ localStorage:    │
          │ - token          │
          │ - userId         │
          │ - username       │
          └──────────────────┘
                    ↓
          ┌──────────────────┐
          │ Redirect to      │
          │ /home            │
          └──────────────────┘
```

---

## Real-time Chat Flow

```
┌──────────────────────────────────────────────────────────────┐
│              REAL-TIME MESSAGING (Socket.io)                 │
└──────────────────────────────────────────────────────────────┘

USER A                                         USER B
(Browser)                                      (Browser)
   │                                              │
   │ 1. Connect Socket.io                       │
   ├──────────────────────────────────────────→ Socket Server
   │ socket.emit('user-online', userId)         │
   │                                              │
   │                                         2. Connect Socket.io
   │                                         ←──────────────────┤
   │                                         socket.emit(...)   │
   │                                              │
   │ 3. Send Message (POST API)                  │
   ├─────────────────────────────────────────→  Server
   │ POST /api/messages/send                     │
   │ Save to MongoDB                             │
   │                                              │
   │ 4. Send Real-time (Socket.io)              │
   ├─────────────────────────────────────────→  Socket Server
   │ socket.emit('send-message',                 │
   │   {from, to, content})                      │
   │                                              │
   │                                         5. Receive Message
   │                                         ←──────────────────┤
   │                                         socket.on(...)     │
   │                                              │
   │                                         6. Display Message
   │                                              │
   │ Message appears instantly!                  Message appears!
   │                                              │
```

---

## Data Flow Diagram

```
┌────────────────────────────────────────────────────────────┐
│                  COMPLETE DATA FLOW                         │
└────────────────────────────────────────────────────────────┘

User Action
    ↓
Component Renders
    ↓
Event Handler Triggered
    ├─ Form Submission
    ├─ Button Click
    └─ Socket Message
    ↓
Axios Request / Socket Emit
    ├─ GET/POST/PUT
    ├─ Headers with Token
    └─ JSON Data
    ↓
Express Route Handler
    ├─ authMiddleware (verify JWT)
    ├─ Validate Input
    └─ Access Control Check
    ↓
Business Logic
    ├─ Hash passwords
    ├─ Create/Update records
    └─ Follow/Unfollow users
    ↓
Mongoose Operations
    ├─ Create: User, Avatar, Profile, Message
    ├─ Read: Find by ID, Query
    ├─ Update: Modify fields
    └─ Delete: Remove records
    ↓
MongoDB Database
    ├─ Store/Retrieve Data
    ├─ Index Queries
    └─ Ensure Consistency
    ↓
Response Generated
    ├─ JSON Response (REST)
    ├─ Socket Event (Real-time)
    └─ HTTP Status Code
    ↓
Frontend Receives
    ├─ Update State
    ├─ Re-render Component
    └─ Show to User
    ↓
User Sees Result
```

---

## Component Interaction Map

```
┌────────────────────────────────────────────────────────────┐
│              FRONTEND COMPONENT STRUCTURE                   │
└────────────────────────────────────────────────────────────┘

App.js (Main)
│
├─ Router (React Router v6)
│  │
│  ├─ <Login /> ──────────────────────→ POST /api/auth/login
│  │
│  ├─ <Register /> ────────────────────→ POST /api/auth/register
│  │
│  ├─ <CreateAvatar />
│  │  │
│  │  └─────────────────────────────→ POST /api/avatars
│  │
│  └─ <Layout> (Contains Sidebar)
│     │
│     ├─ <Sidebar /> (Navigation)
│     │  ├─ Home
│     │  ├─ Explore
│     │  ├─ Chat
│     │  ├─ Profile
│     │  └─ Search
│     │
│     ├─ <Home />
│     │  └─────────────────────────→ Dashboard Overview
│     │
│     ├─ <Explore />
│     │  ├─────────────────────────→ GET /api/search/explore
│     │  └─────────────────────────→ POST /api/profiles/:id/follow
│     │
│     ├─ <Chat />
│     │  ├─────────────────────────→ GET /api/messages/conversations
│     │  ├─────────────────────────→ GET /api/messages/conversation/:id
│     │  ├─────────────────────────→ POST /api/messages/send
│     │  └─ Socket.io ──────────────→ Real-time messaging
│     │
│     ├─ <Profile />
│     │  ├─────────────────────────→ GET /api/profiles/:id
│     │  └─────────────────────────→ PUT /api/profiles/:id
│     │
│     └─ <Search />
│        └─────────────────────────→ GET /api/search/users/:query

App.css
│
├─ Global Styles
├─ Sidebar Styling
├─ Form Styling
├─ Card Components
├─ Chat Styling
├─ Responsive Design
└─ Black & White Theme
```

---

## Database Relationships

```
┌────────────────────────────────────────────────────────────┐
│             MONGODB COLLECTION RELATIONSHIPS                │
└────────────────────────────────────────────────────────────┘

┌──────────────────┐
│     USERS        │
├──────────────────┤
│ _id              │
│ username         │
│ email            │
│ password         │
│ avatar ──────────┼──────→ AVATARS._id
│ profile ─────────┼──────→ PROFILES._id
│ friends[] ───────┼──────→ USERS._id (array)
│ createdAt        │
└──────────────────┘

┌──────────────────┐
│    AVATARS       │
├──────────────────┤
│ _id              │
│ user ────────────┼──────→ USERS._id
│ name             │
│ color            │
│ emoji            │
│ style            │
│ createdAt        │
└──────────────────┘

┌──────────────────┐
│    PROFILES      │
├──────────────────┤
│ _id              │
│ user ────────────┼──────→ USERS._id (unique)
│ bio              │
│ location         │
│ website          │
│ interests[]      │
│ followers[] ─────┼──────→ USERS._id (array)
│ following[] ─────┼──────→ USERS._id (array)
│ updatedAt        │
└──────────────────┘

┌──────────────────┐
│    MESSAGES      │
├──────────────────┤
│ _id              │
│ from ────────────┼──────→ USERS._id
│ to ──────────────┼──────→ USERS._id
│ content          │
│ read             │
│ createdAt        │
└──────────────────┘
```

---

## API Request/Response Cycle

```
┌───────────────────────────────────────────────────────────┐
│                REQUEST CYCLE (Example)                     │
└───────────────────────────────────────────────────────────┘

1. CLIENT REQUEST
   ┌─────────────────────────────────┐
   │ POST /api/messages/send         │
   │ Headers: {                      │
   │   "Authorization": "Bearer JWT" │
   │   "Content-Type": "application/ │
   │                      json"      │
   │ }                               │
   │ Body: {                         │
   │   "to": "userId",               │
   │   "content": "message"          │
   │ }                               │
   └─────────────────────────────────┘
                ↓
2. SERVER PROCESSING
   ┌──────────────────────────────┐
   │ authMiddleware               │
   │ ├─ Verify JWT token          │
   │ └─ Extract userId            │
   │                               │
   │ Route Handler                │
   │ ├─ Validate input            │
   │ ├─ Check recipient exists    │
   │ └─ Create message            │
   │                               │
   │ Database Operation           │
   │ ├─ Save to MongoDB           │
   │ ├─ Get populated docs        │
   │ └─ Return result             │
   └──────────────────────────────┘
                ↓
3. SERVER RESPONSE
   ┌──────────────────────────────┐
   │ HTTP 201 Created             │
   │ Headers: {                   │
   │   "Content-Type":            │
   │   "application/json"         │
   │ }                            │
   │ Body: {                      │
   │   "message": "Message sent", │
   │   "data": { message object } │
   │ }                            │
   └──────────────────────────────┘
                ↓
4. CLIENT HANDLES
   ┌──────────────────────────────┐
   │ axios response interceptor   │
   │ ├─ Check status code         │
   │ └─ Update component state    │
   │                               │
   │ Component re-renders         │
   │ ├─ Add message to list       │
   │ ├─ Clear input field         │
   │ └─ Scroll to bottom          │
   │                               │
   │ User sees message!           │
   └──────────────────────────────┘
```

---

## Deployment Architecture

```
┌────────────────────────────────────────────────────────────┐
│              PRODUCTION DEPLOYMENT                          │
└────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  FRONTEND (Vercel / Netlify)                            │
│  ┌────────────────────────────────────────────────────┐ │
│  │  React App (Optimized Build)                       │ │
│  │  Static Files (HTML, CSS, JS)                      │ │
│  │  CDN Distribution                                  │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
           ↓ HTTPS Encrypted Connection ↓
┌─────────────────────────────────────────────────────────┐
│  BACKEND (Heroku / Railway)                             │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Node.js + Express Server (Production)             │ │
│  │  Environment Variables (Secrets)                   │ │
│  │  HTTPS / SSL Certificate                           │ │
│  │  Auto-scaling / Load Balancing                     │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
           ↓ Secure Connection ↓
┌─────────────────────────────────────────────────────────┐
│  DATABASE (MongoDB Atlas)                               │
│  ┌────────────────────────────────────────────────────┐ │
│  │  MongoDB Cloud (Multi-region)                      │ │
│  │  Automatic Backups                                 │ │
│  │  Security: Encryption, IP Whitelist                │ │
│  │  Monitoring & Alerts                               │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

Optional Services:
├─ Sentry: Error Tracking
├─ Google Analytics: User Analytics
├─ Stripe: Payments (if needed)
└─ SendGrid: Email Service
```

---

## Error Handling Flow

```
┌────────────────────────────────────────────────────────────┐
│                 ERROR HANDLING                              │
└────────────────────────────────────────────────────────────┘

API Request
    ↓
┌─────────────────────┐
│ Error Occurs?       │
└─────────────────────┘
    │          │
   NO          YES
    │           │
    ↓           ↓
Success    ┌──────────────────┐
Response   │ Error Type?      │
           └──────────────────┘
           /    |      |      \
          /     |      |       \
     Validation Network Auth  Server
     Error     Error   Error   Error
       │        │       │        │
       ↓        ↓       ↓        ↓
     400      500    401/403   500
       │        │       │        │
       ↓        ↓       ↓        ↓
    Client    Retry  Re-login  Fallback
    Updates   Toast  Redirect  Message
```

---

These diagrams provide a visual understanding of how flipflap works!

**For detailed explanations, see DEVELOPMENT.md**
