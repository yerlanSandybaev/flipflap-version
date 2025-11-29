# flipflap - Complete Project Structure

## 📁 Directory Tree

```
flipflap-version/
│
├── 📄 README.md                    # Main documentation (START HERE)
├── 📄 QUICKSTART.md                # 5-minute setup guide
├── 📄 DEVELOPMENT.md               # Development reference
├── 📄 PROJECT_OVERVIEW.md          # Project details
├── 📄 COMMANDS.md                  # All available commands
│
├── 📂 server/                      # Backend (Node.js + Express)
│   │
│   ├── 📂 models/                  # Database models
│   │   ├── User.js                 # User account model
│   │   ├── Avatar.js               # Avatar model
│   │   ├── Profile.js              # User profile model
│   │   └── Message.js              # Chat message model
│   │
│   ├── 📂 routes/                  # API routes
│   │   ├── auth.js                 # Register & Login
│   │   ├── avatars.js              # Avatar CRUD
│   │   ├── profiles.js             # Profile management
│   │   ├── messages.js             # Chat & messaging
│   │   └── search.js               # Search & explore
│   │
│   ├── 📂 middleware/              # Custom middleware
│   │   └── auth.js                 # JWT authentication
│   │
│   ├── 📄 server.js                # Main server file
│   ├── 📄 package.json             # Dependencies
│   ├── 📄 .env.example             # Environment template
│   └── 📄 .gitignore               # Git ignore rules
│
└── 📂 client/                      # Frontend (React)
    │
    ├── 📂 src/                     # Source code
    │   │
    │   ├── 📂 pages/               # Page components
    │   │   ├── Login.js            # Login page
    │   │   ├── Register.js         # Registration page
    │   │   ├── CreateAvatar.js     # Avatar creation
    │   │   ├── Home.js             # Home/Dashboard
    │   │   ├── Explore.js          # User discovery
    │   │   ├── Chat.js             # Real-time chat
    │   │   ├── Profile.js          # User profile
    │   │   └── Search.js           # User search
    │   │
    │   ├── 📂 components/          # Reusable components
    │   │   └── Sidebar.js          # Main navigation
    │   │
    │   ├── 📄 App.js               # Main app component
    │   ├── 📄 App.css              # Global styles (White & Black theme)
    │   └── 📄 index.js             # React entry point
    │
    ├── 📂 public/                  # Static files
    │   └── index.html              # HTML template
    │
    ├── 📄 package.json             # Dependencies
    ├── 📄 .gitignore               # Git ignore rules
    └── 📄 .env.example             # Environment template
```

## 📊 Component Breakdown

### Backend (server/)

#### Models (4 files)
| File | Purpose | Collections |
|------|---------|-------------|
| User.js | User accounts | users |
| Avatar.js | User avatars | avatars |
| Profile.js | Profile data | profiles |
| Message.js | Chat messages | messages |

#### Routes (5 files)
| File | Endpoints | Function |
|------|-----------|----------|
| auth.js | /api/auth/* | Register, Login |
| avatars.js | /api/avatars/* | Create, Read, Update avatars |
| profiles.js | /api/profiles/* | Manage profiles, Follow |
| messages.js | /api/messages/* | Send, receive, view chat |
| search.js | /api/search/* | Search users, explore |

#### Middleware (1 file)
| File | Purpose |
|------|---------|
| auth.js | JWT verification |

### Frontend (client/src/)

#### Pages (8 files)
| File | Route | Features |
|------|-------|----------|
| Login.js | /login | User authentication |
| Register.js | /register | New account creation |
| CreateAvatar.js | /create-avatar | Avatar customization |
| Home.js | /home | Dashboard & overview |
| Explore.js | /explore | Discover users |
| Chat.js | /chat | Real-time messaging |
| Profile.js | /profile | Profile management |
| Search.js | /search | Search users |

#### Components (1 file)
| File | Purpose |
|------|---------|
| Sidebar.js | Navigation menu |

#### Styling (1 file)
| File | Purpose |
|------|---------|
| App.css | Global styles, theme |

## 🔌 API Endpoints Summary

### Authentication (2 endpoints)
```
POST   /api/auth/register      Register new user
POST   /api/auth/login         Login user
```

### Avatars (3 endpoints)
```
POST   /api/avatars            Create avatar
GET    /api/avatars/user/:id   Get user avatar
PUT    /api/avatars/:id        Update avatar
```

### Profiles (4 endpoints)
```
GET    /api/profiles/:id       Get profile
PUT    /api/profiles/:id       Update profile
POST   /api/profiles/:id/follow    Follow user
POST   /api/profiles/:id/unfollow  Unfollow user
```

### Messages (3 endpoints)
```
GET    /api/messages/conversations         Get all chats
GET    /api/messages/conversation/:id      Get chat history
POST   /api/messages/send                  Send message
```

### Search (2 endpoints)
```
GET    /api/search/users/:query   Search users
GET    /api/search/explore        Get all users
```

**Total: 14 API Endpoints**

## 🗄️ Database Collections (4 collections)

### users
- Stores user accounts
- Links to avatar and profile
- Tracks friends list

### avatars
- Stores avatar customization
- Linked to user
- Contains: name, emoji, color, style

### profiles
- Stores profile information
- Bio, location, website, interests
- Followers and following lists

### messages
- Stores chat messages
- Links from/to users
- Contains: content, read status, timestamp

## 🎯 Key Features by File

| Feature | Files | Files Count |
|---------|-------|------------|
| Authentication | auth.js (routes), auth.js (middleware) | 2 |
| Avatar Management | avatars.js (routes), Avatar.js (model) | 2 |
| Profile Management | profiles.js (routes), Profile.js (model) | 2 |
| Real-time Chat | Chat.js (page), messages.js (routes), Message.js (model), server.js | 4 |
| Search & Explore | search.js (routes), Search.js, Explore.js (pages) | 3 |
| Navigation | Sidebar.js (component) | 1 |
| UI/Styling | App.css | 1 |

## 📋 File Statistics

### Backend
```
Total Files: 12
- Models: 4
- Routes: 5  
- Middleware: 1
- Config: 2 (server.js, package.json)
Lines of Code: ~1,200
```

### Frontend
```
Total Files: 12
- Pages: 8
- Components: 1
- Styles: 1
- Config: 2 (App.js, index.js)
Lines of Code: ~1,500
```

### Documentation
```
Total Files: 5
- README.md
- QUICKSTART.md
- DEVELOPMENT.md
- PROJECT_OVERVIEW.md
- COMMANDS.md
```

**Total Project Files: 29**

## 🚀 Getting Started Paths

### Path 1: Quick Start (5 minutes)
1. Read `QUICKSTART.md`
2. Run `npm install` in server and client
3. Start server and client
4. Create account and test

### Path 2: Full Understanding (30 minutes)
1. Read `README.md`
2. Review `PROJECT_OVERVIEW.md`
3. Check `DEVELOPMENT.md`
4. Run and explore the app

### Path 3: Deep Dive (2 hours)
1. Read all documentation
2. Review backend models and routes
3. Study frontend pages and components
4. Examine CSS styling
5. Test API endpoints
6. Modify and extend features

## 🔄 Data Flow Diagram

```
Frontend (React)
    ↓
Axios HTTP Requests
    ↓
Backend (Express)
    ↓
Mongoose ORM
    ↓
MongoDB Database
    ↓
↑ JSON Response
Socket.io (Real-time)
    ↑
Frontend Components (Update)
```

## 🎨 Technology Stack by Purpose

### User Interface
- React 18 (UI Framework)
- CSS3 (Styling)
- React Router (Navigation)

### Communication
- Axios (HTTP Requests)
- Socket.io (Real-time Chat)

### Backend
- Express.js (Web Framework)
- Node.js (Runtime)

### Database
- MongoDB (NoSQL)
- Mongoose (ODM)

### Security
- JWT (Authentication)
- bcryptjs (Encryption)

### Utilities
- React Icons (Icons)
- dotenv (Config)
- CORS (Cross-origin)

## 📈 Scalability Checkpoints

### Current (MVP)
- ✅ Single user avatar
- ✅ Direct messaging
- ✅ Basic search
- ✅ Profile following

### Next Phase
- 🔲 Image uploads
- 🔲 Notifications
- 🔲 Feed/Posts
- 🔲 Friend requests

### Future
- 🔲 Video calls
- 🔲 Group chats
- 🔲 Advanced analytics
- 🔲 Admin panel

---

## 📞 Quick Reference

| Need | File |
|------|------|
| API Docs | README.md |
| Setup | QUICKSTART.md |
| Backend Info | DEVELOPMENT.md |
| Commands | COMMANDS.md |
| Feature List | PROJECT_OVERVIEW.md |

**Total Project Size**: ~35KB (Code) + Documentation

**Ready to Deploy**: ✅ Yes

**Production Ready**: ⚠️ Needs: HTTPS, Rate Limiting, Error Monitoring

---

Version: 1.0.0 | Updated: November 2024
