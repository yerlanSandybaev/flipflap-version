import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FiLogOut } from 'react-icons/fi';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="container">
      <Sidebar currentPage="home" />
      <div className="main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Welcome to flipflap</h1>
          <button className="btn btn-primary" onClick={handleLogout} style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiLogOut /> Logout
          </button>
        </div>
        
        <div style={{ maxWidth: '600px' }}>
          <div style={{
            backgroundColor: '#f5f5f5',
            border: '2px solid #000000',
            borderRadius: '12px',
            padding: '30px',
            textAlign: 'center'
          }}>
            <h2>Start Your Journey</h2>
            <p style={{ marginTop: '10px', color: '#666666' }}>
              Customize your profile, create an amazing avatar, and start connecting with others!
            </p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button className="btn btn-primary" onClick={() => navigate('/profile')}>
                Edit Profile
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/explore')}>
                Explore Users
              </button>
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>Features</h3>
            <ul style={{ marginLeft: '20px', marginTop: '15px', lineHeight: '1.8' }}>
              <li>🎨 Create and customize your avatar</li>
              <li>📝 Fill and edit your profile</li>
              <li>💬 Chat with other users in real-time</li>
              <li>🔍 Search and discover users</li>
              <li>👥 Follow and explore profiles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
