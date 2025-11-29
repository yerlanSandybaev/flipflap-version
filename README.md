# flipflap - Social Media MVP

A modern social media application where users create avatars, build profiles, and chat with other users in real-time.

## Features

✨ **Core Features:**
- 👤 User Authentication (Register/Login) with JWT
- 🎨 Avatar Creation & Customization
- 📝 User Profile Management
- 💬 Real-time Chat with Socket.io
- 🔍 User Search & Discovery
- 👥 Follow/Unfollow System
- 🎯 Explore Feed
- 📱 Responsive Design with Black & White Theme

## Technology Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

### Frontend
- **React 18** - UI Framework
- **React Router v6** - Navigation
- **Axios** - HTTP Client
- **Socket.io-client** - Real-time messaging
- **React Icons** - Icon library
- **CSS3** - Styling with Black & White theme

## Project Structure

```
flipflap-version/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Avatar.js
│   │   ├── Profile.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── avatars.js
│   │   ├── profiles.js
│   │   ├── messages.js
│   │   └── search.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── client/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── CreateAvatar.js
    │   │   ├── Home.js
    │   │   ├── Explore.js
    │   │   ├── Chat.js
    │   │   ├── Profile.js
    │   │   └── Search.js
    │   ├── components/
    │   │   └── Sidebar.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── public/
    │   └── index.html
    ├── package.json
    └── .gitignore
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Cloud)
- npm or yarn

### 1. MongoDB Setup

**Local MongoDB:**
```bash
# Install MongoDB Community Edition
# Start MongoDB service
# Default connection: mongodb://localhost:27017/flipflap
```

**MongoDB Compass (GUI):**
- Download from https://www.mongodb.com/products/compass
- Connect to `mongodb://localhost:27017`
- Create database: `flipflap`

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/flipflap
# JWT_SECRET=your_secret_key_here
# PORT=5000

# Start server (development with nodemon)
npm run dev

# Or for production
npm start
```

Server runs on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Start React app
npm start
```

Frontend runs on: `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Avatars
- `POST /api/avatars` - Create avatar (auth required)
- `GET /api/avatars/user/:userId` - Get user's avatar
- `PUT /api/avatars/:avatarId` - Update avatar (auth required)

### Profiles
- `GET /api/profiles/:userId` - Get user profile
- `PUT /api/profiles/:userId` - Update profile (auth required)
- `POST /api/profiles/:userId/follow` - Follow user (auth required)
- `POST /api/profiles/:userId/unfollow` - Unfollow user (auth required)

### Messages
- `GET /api/messages/conversation/:userId` - Get messages with user
- `GET /api/messages/conversations` - Get all conversations (auth required)
- `POST /api/messages/send` - Send message (auth required)

### Search
- `GET /api/search/users/:query` - Search users (auth required)
- `GET /api/search/explore` - Get users to explore (auth required)

## Socket.io Events

### Client Events
- `user-online` - Notify user is online
- `send-message` - Send real-time message
- `user-typing` - Notify user is typing

### Server Events
- `receive-message` - Receive message
- `user-status` - User online/offline status
- `user-typing` - User is typing notification

## Usage Guide

### 1. Register & Create Avatar
1. Go to `/register`
2. Fill in username, email, password
3. Create your custom avatar with emoji, color, and style
4. You're ready to go!

### 2. Update Profile
1. Go to Profile page from sidebar
2. Edit bio, location, website, interests
3. Save changes

### 3. Explore & Connect
1. Visit Explore page to discover users
2. Click Follow to follow users
3. Click Chat to start messaging

### 4. Search
1. Use Search page to find specific users
2. View profiles or start conversations

### 5. Chat in Real-time
1. Go to Chat page
2. Select a conversation or start new one
3. Send and receive messages in real-time

## Customization

### Color Scheme
Edit `client/src/App.css` to modify colors:
- Primary: Black (`#000000`)
- Secondary: White (`#ffffff`)
- Accent: Gray (`#f5f5f5`, `#e0e0e0`)

### Avatar Styles
Add more styles in `server/models/Avatar.js`:
```javascript
style: {
  type: String,
  enum: ['minimalist', 'colorful', 'abstract', 'your-style'],
  default: 'minimalist'
}
```

## Environment Variables

### Server (.env)
```
MONGODB_URI=mongodb://localhost:27017/flipflap
JWT_SECRET=your_jwt_secret_key_123456
PORT=5000
NODE_ENV=development
```

## Known Limitations

- Single avatar per user (can be extended to multiple avatars)
- No image upload (uses emoji-based avatars)
- No notification system (can be added)
- No private messaging requests
- No friend requests (direct follow system)

## Future Enhancements

- [ ] Image upload for avatars and profile pictures
- [ ] Post/Feed functionality
- [ ] Like and comment system
- [ ] Push notifications
- [ ] Video calls
- [ ] User blocking
- [ ] Admin dashboard
- [ ] Advanced search filters
- [ ] Hashtag support
- [ ] Message reactions

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
- Start MongoDB service
- Check MONGODB_URI in .env
- Verify MongoDB is running on correct port
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
- Check proxy in client/package.json points to server
- Verify server CORS settings
```

### Socket.io Connection Error
```
WebSocket is closed before the connection is established
- Start server first
- Check server is running on port 5000
- Verify Socket.io is initialized in server.js
```

### Port Already in Use
```
EADDRINUSE: address already in use :::5000
- Change PORT in .env
- Or kill process using port: npx kill-port 5000
```

## Deployment

### Deploy Server (Heroku)
```bash
cd server
heroku create flipflap-server
git push heroku main
```

### Deploy Client (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy build folder to Vercel or Netlify
```

## License

MIT License - Feel free to use for personal or commercial projects

## Support

For issues or questions, please create a GitHub issue or contact the development team.

---

**Enjoy using flipflap! 🎉**
