import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiCompass, FiMessageCircle, FiUser, FiSearch, FiLogOut } from 'react-icons/fi';

function Sidebar({ currentPage }) {
  const navigate = useNavigate();

  const menuItems = [
    { icon: FiHome, label: 'Home', page: 'home', path: '/home' },
    { icon: FiCompass, label: 'Explore', page: 'explore', path: '/explore' },
    { icon: FiMessageCircle, label: 'Chat', page: 'chat', path: '/chat' },
    { icon: FiUser, label: 'Profile', page: 'profile', path: '/profile' },
    { icon: FiSearch, label: 'Search', page: 'search', path: '/search' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #333' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>flipflap</h2>
      </div>
      
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.page}
            className={`sidebar-item ${currentPage === item.page ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <IconComponent size={20} />
            <span>{item.label}</span>
          </div>
        );
      })}

      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '2px solid #333' }}>
        <div className="sidebar-item" onClick={handleLogout}>
          <FiLogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
