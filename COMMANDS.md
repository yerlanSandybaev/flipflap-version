# flipflap - Commands Reference

## Backend Commands

### Installation & Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### Running the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### Environment Variables Template
```bash
MONGODB_URI=mongodb://localhost:27017/flipflap
JWT_SECRET=your_secret_key_123
PORT=5000
NODE_ENV=development
```

## Frontend Commands

### Installation & Setup
```bash
cd client
npm install
```

### Running the App
```bash
# Development mode
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Environment Variables
Create `.env` file in client root (optional):
```bash
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

## Database Commands

### MongoDB Compass (GUI)
1. Download from: https://www.mongodb.com/products/compass
2. Connection String: `mongodb://localhost:27017`
3. Browse databases and collections visually

### MongoDB Shell
```bash
# Start MongoDB shell
mongosh

# Select database
use flipflap

# View all collections
show collections

# View users
db.users.find()

# View messages
db.messages.find()

# Count documents
db.users.countDocuments()

# Delete all messages (careful!)
db.messages.deleteMany({})
```

## Development Workflow

### Terminal 1 - Backend
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd client
npm start
# App runs on http://localhost:3000
```

### Terminal 3 - Optional MongoDB
```bash
mongosh
use flipflap
# Check database status
db.users.find()
```

## Testing the API

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Create avatar (replace TOKEN)
curl -X POST http://localhost:5000/api/avatars \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"name":"My Avatar","color":"#FF5733","emoji":"😎","style":"colorful"}'
```

### Using Postman
1. Import the following collections
2. Set variable: `token` = JWT token from login
3. Use `{{token}}` in Authorization header

#### Auth Endpoints
```
POST http://localhost:5000/api/auth/register
POST http://localhost:5000/api/auth/login
```

#### Avatar Endpoints
```
POST http://localhost:5000/api/avatars
GET http://localhost:5000/api/avatars/user/:userId
PUT http://localhost:5000/api/avatars/:avatarId
```

#### Profile Endpoints
```
GET http://localhost:5000/api/profiles/:userId
PUT http://localhost:5000/api/profiles/:userId
POST http://localhost:5000/api/profiles/:userId/follow
POST http://localhost:5000/api/profiles/:userId/unfollow
```

#### Message Endpoints
```
GET http://localhost:5000/api/messages/conversations
GET http://localhost:5000/api/messages/conversation/:userId
POST http://localhost:5000/api/messages/send
```

#### Search Endpoints
```
GET http://localhost:5000/api/search/users/:query
GET http://localhost:5000/api/search/explore
```

## Debugging

### Enable Verbose Logging

#### Backend
```javascript
// In server.js
const DEBUG = true;

if (DEBUG) {
  console.log('Request:', req.method, req.path);
}
```

#### Frontend
```javascript
// In browser console
localStorage.setItem('DEBUG', 'true');
```

### Check MongoDB Connection
```bash
mongosh --eval "db.version()"
```

### Monitor Socket.io Events
```javascript
// In browser console
socket.on('*', (event, data) => {
  console.log('Socket event:', event, data);
});
```

## Cleaning Up

### Clear Frontend Build
```bash
cd client
rm -rf node_modules build
npm install
npm start
```

### Reset Backend
```bash
cd server
rm -rf node_modules
npm install
npm run dev
```

### Clear Database
```bash
# In mongosh
db.dropDatabase()
```

### Clear Browser Storage
```javascript
// In browser console
localStorage.clear();
sessionStorage.clear();
```

## Production Build

### Build Frontend
```bash
cd client
npm run build
# Creates optimized build in 'build' folder
```

### Build Backend (if needed)
```bash
cd server
npm install --production
# Only installs production dependencies
```

### Environment for Production
```bash
# Server .env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flipflap
JWT_SECRET=long_complex_secret_key_generated_securely
PORT=5000
NODE_ENV=production
```

## Deployment Commands

### Deploy to Heroku (Server)
```bash
cd server
heroku login
heroku create flipflap-server
git push heroku main
```

### Deploy to Vercel (Frontend)
```bash
cd client
npm install -g vercel
vercel
```

### Deploy to Netlify (Frontend)
```bash
cd client
npm run build
# Drag 'build' folder to Netlify dashboard
```

## Useful Git Commands

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: flipflap MVP"

# Create branch
git branch feature/new-feature

# Switch branch
git checkout feature/new-feature

# Merge branch
git merge feature/new-feature

# View log
git log --oneline
```

## Package Management

### Update Dependencies
```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Update specific package
npm install package-name@latest
```

### Install Specific Version
```bash
npm install package-name@1.2.3
```

### Remove Package
```bash
npm uninstall package-name
```

## Performance Monitoring

### Build Analysis
```bash
# Frontend bundle size
cd client
npm install -g webpack-bundle-analyzer
npm run build
```

### API Response Time
```bash
# In server.js
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.path} - ${Date.now() - start}ms`);
  });
  next();
});
```

## Troubleshooting Commands

### Port Already in Use
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 PID

# On Windows
netstat -ano | findstr :5000
taskkill /PID PID /F
```

### MongoDB Connection Issues
```bash
# Test connection
mongosh --eval "db.adminCommand('ping')"

# View MongoDB status
systemctl status mongod
```

### Clear npm Cache
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables Checklist

### Backend Required
- ✅ MONGODB_URI
- ✅ JWT_SECRET
- ✅ PORT

### Frontend Optional
- ⚪ REACT_APP_API_URL
- ⚪ REACT_APP_SOCKET_URL

---

**Quick Reference**: Most used commands are `npm run dev` (server) and `npm start` (client)

For more details, see README.md and DEVELOPMENT.md
