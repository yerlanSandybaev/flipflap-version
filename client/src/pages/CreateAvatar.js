import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateAvatar() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [emoji, setEmoji] = useState('👤');
  const [style, setStyle] = useState('minimalist');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/avatars', {
        name,
        color,
        emoji,
        style
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create avatar');
    } finally {
      setLoading(false);
    }
  };

  const emojiOptions = ['👤', '😀', '😎', '🤖', '👽', '🐱', '🦊', '🐻', '🦁', '🐼'];

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Create Your Avatar</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Avatar Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Cool Avatar"
              required
            />
          </div>

          <div className="form-group">
            <label>Choose Emoji</label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {emojiOptions.map((e) => (
                <div
                  key={e}
                  onClick={() => setEmoji(e)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '30px',
                    padding: '10px',
                    border: emoji === e ? '3px solid #000' : '1px solid #ccc',
                    borderRadius: '8px'
                  }}
                >
                  {e}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Avatar Color</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <span>{color}</span>
            </div>
          </div>

          <div className="form-group">
            <label>Avatar Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px'
              }}
            >
              <option value="minimalist">Minimalist</option>
              <option value="colorful">Colorful</option>
              <option value="abstract">Abstract</option>
            </select>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p>Preview:</p>
            <div style={{
              fontSize: '60px',
              margin: '10px 0'
            }}>
              {emoji}
            </div>
          </div>

          {error && <div style={{ color: 'red', marginBottom: '10px', marginTop: '10px' }}>{error}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '20px' }}>
            {loading ? 'Creating...' : 'Create Avatar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAvatar;
