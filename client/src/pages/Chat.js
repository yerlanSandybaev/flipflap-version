import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import Sidebar from '../components/Sidebar';

let socket;

function Chat() {
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(searchParams.get('user'));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem('userId');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket = io('http://localhost:5000');
    socket.emit('user-online', currentUserId);

    socket.on('receive-message', (data) => {
      setMessages((prev) => [...prev, {
        from: data.from,
        to: currentUserId,
        content: data.content,
        createdAt: data.timestamp
      }]);
    });

    return () => socket.disconnect();
  }, [currentUserId]);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetchMessages();
      fetchUserDetails();
    }
  }, [selectedUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const response = await axios.get('/api/messages/conversations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages/conversation/${selectedUserId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/api/profiles/${selectedUserId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUserId) return;

    try {
      await axios.post('/api/messages/send', {
        to: selectedUserId,
        content: newMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const message = {
        from: currentUserId,
        to: selectedUserId,
        content: newMessage,
        createdAt: new Date()
      };

      setMessages((prev) => [...prev, message]);
      setNewMessage('');

      // Emit via socket for real-time
      socket.emit('send-message', {
        from: currentUserId,
        to: selectedUserId,
        content: newMessage,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="container">
      <Sidebar currentPage="chat" />
      <div className="main-content">
        <div className="chat-container">
          <div className="conversations-list">
            <h3>Conversations</h3>
            {loading ? (
              <p>Loading...</p>
            ) : conversations.length === 0 ? (
              <p>No conversations yet</p>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.userId}
                  className={`conversation-item ${selectedUserId === conv.userId ? 'active' : ''}`}
                  onClick={() => setSelectedUserId(conv.userId)}
                >
                  <div style={{ fontWeight: 'bold' }}>{conv.username}</div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    {conv.lastMessage?.substring(0, 30)}...
                  </div>
                  {conv.unread > 0 && (
                    <div style={{
                      backgroundColor: '#000',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      marginTop: '5px'
                    }}>
                      {conv.unread}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {selectedUserId ? (
            <div className="chat-window">
              <div className="chat-header">
                {selectedUser?.user?.username || 'User'}
              </div>
              <div className="messages-area">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.from === currentUserId ? 'sent' : 'received'}`}>
                    {msg.content}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSendMessage} className="message-input-area">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button type="submit">Send</button>
              </form>
            </div>
          ) : (
            <div className="chat-window">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#666'
              }}>
                Select a conversation to start chatting
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
