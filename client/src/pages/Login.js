import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      // Debug log: inspect response shape in case server returns unexpected structure
      // (this helps when login appears to succeed but navigation doesn't happen)
      // eslint-disable-next-line no-console
      console.log('Login response', response?.data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('username', response.data.user.username);

      // Navigate via React Router and also provide a fallback full-page redirect
      // in case route-based navigation isn't triggering (helps when app state
      // doesn't re-evaluate immediately in some environments).
      navigate('/home');
      // Fallback: if the location hasn't changed after a short delay, force navigation
      setTimeout(() => {
        if (window.location.pathname !== '/home') {
          // eslint-disable-next-line no-console
          console.warn('Fallback redirect to /home');
          window.location.href = '/home';
        }
      }, 400);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>flipflap</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
