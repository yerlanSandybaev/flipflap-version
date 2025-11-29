# Development Setup Notes

## Architecture Overview

### Backend Architecture
```
Express Server
├── Routes
│   ├── Auth (Register, Login)
│   ├── Avatars (CRUD)
│   ├── Profiles (User info, Follow/Unfollow)
│   ├── Messages (Chat, Conversations)
│   └── Search (User discovery)
├── Models
│   ├── User (user account)
│   ├── Avatar (user avatar)
│   ├── Profile (user profile info)
│   └── Message (chat messages)
├── Middleware
│   └── Auth (JWT verification)
└── Socket.io (Real-time messaging)
```

### Frontend Architecture
```
React App
├── Pages
│   ├── Auth (Login, Register)
│   ├── CreateAvatar
│   ├── Home
│   ├── Explore
│   ├── Chat
│   ├── Profile
│   └── Search
├── Components
│   └── Sidebar (Navigation)
└── Styles (App.css - Black & White theme)
```

## Database Schema

### Users
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  avatar: ObjectId ref Avatar,
  profile: ObjectId ref Profile,
  friends: [ObjectId],
  createdAt: Date
}
```

### Avatars
```javascript
{
  _id: ObjectId,
  user: ObjectId ref User,
  name: String,
  color: String (hex),
  emoji: String,
  style: String (minimalist|colorful|abstract),
  createdAt: Date
}
```

### Profiles
```javascript
{
  _id: ObjectId,
  user: ObjectId ref User (unique),
  bio: String,
  location: String,
  website: String,
  interests: [String],
  followers: [ObjectId ref User],
  following: [ObjectId ref User],
  updatedAt: Date
}
```

### Messages
```javascript
{
  _id: ObjectId,
  from: ObjectId ref User,
  to: ObjectId ref User,
  content: String,
  read: Boolean,
  createdAt: Date
}
```

## API Flow Examples

### User Registration & Avatar Creation
1. `POST /api/auth/register` → User account created, default profile created
2. Redirect to `/create-avatar`
3. `POST /api/avatars` → Avatar created and linked to user

### Real-time Chat
1. Client connects via Socket.io: `socket.emit('user-online', userId)`
2. User sends message: `POST /api/messages/send`
3. Socket emits: `socket.emit('send-message', {from, to, content})`
4. Recipient receives: `socket.on('receive-message', data)`

### User Discovery
1. `GET /api/search/explore` → Get list of all users
2. `GET /api/search/users/:query` → Search by username
3. `POST /api/profiles/:userId/follow` → Follow user

## Authentication Flow

1. User registers → Password hashed with bcrypt
2. JWT token generated and stored in localStorage
3. Token sent in Authorization header for protected routes
4. Backend verifies JWT using authMiddleware
5. User data extracted from token for operations

## Socket.io Events

### Connecting User
```javascript
socket.emit('user-online', userId)
// Server tracks user in userSockets Map
```

### Sending Message
```javascript
socket.emit('send-message', {
  from: userId,
  to: recipientId,
  content: 'message',
  timestamp: Date
})
// Server forwards to recipient socket
```

### User Status
```javascript
io.emit('user-status', {
  userId: userId,
  status: 'online|offline'
})
// Notify all connected clients
```

## Styling Guidelines

### Color Palette
- Primary Black: `#000000`
- White Background: `#ffffff`
- Light Gray: `#f5f5f5`
- Border Gray: `#e0e0e0`
- Dark Gray: `#222222`, `#333333`
- Text Gray: `#666666`

### Components
- Sidebar: Black background, white text
- Cards: White background, black border
- Buttons: Black text/bg with hover states
- Inputs: White background, black border on focus
- Messages: Black (sent), Light gray (received)

## Performance Optimizations

1. **Frontend**
   - Use React Router for page caching
   - Lazy load components
   - Optimize re-renders with React.memo
   - Debounce search queries

2. **Backend**
   - Paginate results
   - Index MongoDB collections
   - Cache frequently accessed data
   - Use connection pooling

3. **Real-time**
   - Batch socket updates
   - Disconnect unused connections
   - Implement message acknowledgments
   - Rate limit messages per user

## Testing Checklist

- [ ] Register new user
- [ ] Login existing user
- [ ] Create avatar with different styles
- [ ] Update profile information
- [ ] Search for users
- [ ] Follow/unfollow users
- [ ] Send real-time messages
- [ ] View chat conversations
- [ ] Logout functionality
- [ ] Token refresh on page reload

## Common Issues & Solutions

### Issue: Messages not updating in real-time
**Solution**: Check Socket.io connection, verify server is receiving events

### Issue: Avatar not saving
**Solution**: Check user is authenticated, verify MongoDB connection

### Issue: Profile image not appearing
**Solution**: Ensure avatar creation happened before profile update

### Issue: Chat scroll not working
**Solution**: Check messagesEndRef is properly assigned and scrollIntoView works

## Extending the App

### Add Image Uploads
1. Install multer and sharp for image processing
2. Add file routes to backend
3. Update Avatar and Profile models
4. Modify create avatar form to accept files

### Add Notifications
1. Create Notification model
2. Add socket event: `user-notification`
3. Create notification UI component
4. Add notification bell to sidebar

### Add Posts/Feed
1. Create Post model
2. Add like/comment models
3. Create feed route
4. Add Feed page to React app

### Add Video Chat
1. Integrate WebRTC (Agora, Twilio)
2. Add video call model
3. Update Socket.io events
4. Create video call UI

## Deployment Considerations

- Environment variables for production
- Rate limiting
- Input validation and sanitization
- HTTPS/SSL certificates
- Database backups
- CDN for static assets
- Error logging and monitoring
- Analytics integration

---

Last Updated: November 2024
