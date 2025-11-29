import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function Explore() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/search/explore', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await axios.post(`/api/profiles/${userId}/follow`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh users
      fetchUsers();
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  return (
    <div className="container">
      <Sidebar currentPage="explore" />
      <div className="main-content">
        <h1>Explore Users</h1>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="grid">
            {users.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-card-header">
                  <span className="username">{user.username}</span>
                </div>
                {user.profile?.bio && <div className="bio">{user.profile.bio}</div>}
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                  <button className="btn btn-primary" onClick={() => handleFollow(user._id)} style={{ flex: 1 }}>
                    Follow
                  </button>
                  <button className="btn btn-secondary" onClick={() => window.location.href = `/chat?user=${user._id}`} style={{ flex: 1 }}>
                    Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
