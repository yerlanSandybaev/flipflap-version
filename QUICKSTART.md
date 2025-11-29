# flipflap - Quick Start Guide

## Getting Started in 5 Minutes

### Step 1: Install MongoDB
Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
Or use MongoDB Atlas (Cloud): https://www.mongodb.com/cloud/atlas

### Step 2: Start Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
echo MONGODB_URI=mongodb://localhost:27017/flipflap > .env
echo JWT_SECRET=flipflap_secret_key_2024 >> .env
echo PORT=5000 >> .env

# Start server
npm run dev
```

✅ Server running on http://localhost:5000

### Step 3: Start Frontend (New Terminal)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start React app
npm start
```

✅ Frontend running on http://localhost:3000

## Test the App

1. **Register**: Create new account with username, email, password
2. **Create Avatar**: Choose emoji, color, and style
3. **Update Profile**: Add bio, location, interests
4. **Explore**: Browse other users
5. **Chat**: Start real-time conversations
6. **Search**: Find users by username

## Default Test User (Optional)

```json
{
  "email": "test@example.com",
  "password": "test123",
  "username": "testuser"
}
```

Register and create your first avatar!

## Database Check (MongoDB Compass)

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Database: `flipflap`
4. Collections:
   - users
   - avatars
   - profiles
   - messages

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB not connecting | Start MongoDB service or use MongoDB Atlas |
| Port 5000 in use | Change PORT in .env |
| Node modules missing | Run `npm install` in server and client |
| CORS errors | Restart both server and client |

## Key Credentials

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000
- **MongoDB**: localhost:27017/flipflap

## Next Steps

- Customize colors in `client/src/App.css`
- Add more avatar styles in `server/models/Avatar.js`
- Extend features as needed
- Deploy to production

---

Happy coding! 🚀
