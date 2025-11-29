import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Search from './pages/Search';
import CreateAvatar from './pages/CreateAvatar';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-avatar" element={isAuthenticated ? <CreateAvatar /> : <Navigate to="/login" />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/explore" element={isAuthenticated ? <Explore /> : <Navigate to="/login" />} />
        <Route path="/chat" element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/login" />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
