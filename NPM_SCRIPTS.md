# flipflap - npm Scripts Guide

## Backend Scripts (server/package.json)

### Available Commands

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Usage

#### Development Mode (Recommended for Development)
```bash
cd server
npm run dev
```
- Auto-restarts server on file changes
- Shows console logs
- Better for debugging
- Port: 5000

#### Production Mode
```bash
cd server
npm start
```
- Single process startup
- Optimized for performance
- Port: 5000

### What Each Command Does

| Command | Purpose | Use Case |
|---------|---------|----------|
| `npm run dev` | Development with auto-reload | During coding |
| `npm start` | Run once, no reload | Production |
| `npm install` | Install dependencies | Initial setup |
| `npm update` | Update packages | Maintenance |

---

## Frontend Scripts (client/package.json)

### Available Commands

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### Usage

#### Development Mode
```bash
cd client
npm start
```
- Starts React development server
- Hot reload on file changes
- Opens browser automatically
- Port: 3000

#### Production Build
```bash
cd client
npm run build
```
- Creates optimized build folder
- Minifies and bundles code
- Ready for deployment
- Output: `build/` folder

#### Run Tests
```bash
cd client
npm test
```
- Runs Jest test suite
- Watch mode by default
- Press `q` to exit

#### Eject Configuration
```bash
cd client
npm run eject
```
⚠️ **WARNING**: One-way operation - cannot be undone!
- Exposes all webpack configuration
- Gives full control over build process
- Only use if you know what you're doing

---

## Combined Development Setup

### Setup All at Once

```bash
# 1. Install backend
cd server
npm install

# 2. Install frontend
cd client
npm install

# 3. Create .env file
cd ../server
echo MONGODB_URI=mongodb://localhost:27017/flipflap > .env
echo JWT_SECRET=your_secret_key >> .env
echo PORT=5000 >> .env
```

### Run All at Once

**Option 1: Separate Terminals (Recommended)**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm start
```

Terminal 3 - MongoDB (Optional):
```bash
mongosh
use flipflap
```

**Option 2: Concurrent (if you have concurrently installed)**

```bash
# From root directory
npm install -g concurrently

# In root package.json
{
  "scripts": {
    "dev": "concurrently \"cd server && npm run dev\" \"cd client && npm start\""
  }
}

npm run dev
```

---

## Dependency Installation

### Install All Dependencies at Once

```bash
# Backend
cd server
npm install

# Frontend  
cd client
npm install
```

### Install Single Dependency

```bash
# Backend
cd server
npm install package-name

# Frontend
cd client
npm install package-name
```

### Install Development Dependency

```bash
# Backend
cd server
npm install --save-dev package-name

# Frontend
cd client
npm install --save-dev package-name
```

---

## Backend Dependencies (server)

### Production Dependencies
```json
{
  "express": "^4.18.2",           // Web framework
  "mongoose": "^7.0.0",            // MongoDB ODM
  "bcryptjs": "^2.4.3",            // Password hashing
  "jsonwebtoken": "^9.0.0",        // JWT auth
  "cors": "^2.8.5",                // CORS middleware
  "dotenv": "^16.0.3",             // Environment variables
  "socket.io": "^4.6.1"            // Real-time chat
}
```

### Development Dependencies
```json
{
  "nodemon": "^2.0.22"             // Auto-restart on changes
}
```

### Installation
```bash
cd server
npm install
```

---

## Frontend Dependencies (client)

### Production Dependencies
```json
{
  "react": "^18.2.0",              // UI Framework
  "react-dom": "^18.2.0",          // React DOM
  "react-router-dom": "^6.12.0",   // Routing
  "axios": "^1.4.0",               // HTTP client
  "socket.io-client": "^4.6.1",    // WebSocket client
  "react-icons": "^4.10.1"         // Icon library
}
```

### Development Dependencies
```json
{
  "react-scripts": "5.0.1"         // Build scripts
}
```

### Installation
```bash
cd client
npm install
```

---

## Useful npm Tips

### Clear npm Cache
```bash
npm cache clean --force
```

### Check Outdated Packages
```bash
npm outdated
```

### Update All Packages
```bash
npm update
```

### Uninstall Package
```bash
npm uninstall package-name
```

### List Installed Packages
```bash
npm list
```

### Check Package Info
```bash
npm info package-name
```

---

## Troubleshooting npm Issues

### Issue: npm command not found
```bash
# Reinstall Node.js from nodejs.org
# Or check PATH environment variable
```

### Issue: Module not found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port already in use
```bash
# Change port in .env (backend)
# React uses port 3000 by default
# If needed, set PORT env variable:
PORT=3001 npm start
```

### Issue: npm start very slow
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

---

## npm Configuration

### View Current npm Settings
```bash
npm config list
```

### Set Registry (if behind proxy)
```bash
npm config set registry https://registry.npmjs.org/
```

### Set Timeout (for slow connections)
```bash
npm config set fetch-timeout 120000
```

---

## Global npm Packages (Optional)

### Useful Global Packages
```bash
# Development tools
npm install -g nodemon              # Auto-restart Node
npm install -g concurrently         # Run multiple commands
npm install -g kill-port            # Kill process by port

# Utility
npm install -g http-server          # Simple HTTP server
npm install -g serve                # Serve static files

# Deployment
npm install -g heroku               # Heroku CLI
npm install -g vercel               # Vercel CLI
```

### Install Global Package
```bash
npm install -g package-name
```

### Uninstall Global Package
```bash
npm uninstall -g package-name
```

### List Global Packages
```bash
npm list -g --depth=0
```

---

## NPM Workflow Summary

### Initial Setup
```bash
cd server && npm install
cd ../client && npm install
```

### Daily Development
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm start
```

### Production Build
```bash
cd client && npm run build
# Deploy 'build' folder to hosting
```

### Maintenance
```bash
# Check for updates
npm outdated

# Update packages
npm update

# Clean cache
npm cache clean --force
```

---

## Quick Reference Card

| Task | Command |
|------|---------|
| Install deps (backend) | `cd server && npm install` |
| Install deps (frontend) | `cd client && npm install` |
| Start backend | `cd server && npm run dev` |
| Start frontend | `cd client && npm start` |
| Build frontend | `cd client && npm run build` |
| Run tests | `cd client && npm test` |
| Clear cache | `npm cache clean --force` |
| Update packages | `npm update` |
| Check outdated | `npm outdated` |
| List packages | `npm list` |

---

## Pro Tips

✅ **Always run `npm install` in project directories before first use**

✅ **Use `npm run dev` during development for auto-reload**

✅ **Use `npm start` for production deployments**

✅ **Keep dependencies updated for security patches**

✅ **Use `--save` flag when installing new dependencies**

✅ **Commit `package-lock.json` to version control**

✅ **Don't commit `node_modules` folder**

---

**Last Updated**: November 2024

For more info, visit: https://docs.npmjs.com/
