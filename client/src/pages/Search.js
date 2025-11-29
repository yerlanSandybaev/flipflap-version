import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const token = localStorage.getItem('token');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.length < 2) return;

    try {
      const response = await axios.get(`/api/search/users/${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults(response.data);
      setSearched(true);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    }
  };

  return (
    <div className="container">
      <Sidebar currentPage="search" />
      <div className="main-content">
        <h1>Search Users</h1>
        
        <form onSubmit={handleSearch} style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by username..."
              style={{
                flex: 1,
                padding: '12px 15px',
                border: '2px solid #000000',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>
              Search
            </button>
          </div>
        </form>

        {searched && (
          <>
            {results.length === 0 ? (
              <p>No users found matching "{query}"</p>
            ) : (
              <div className="grid">
                {results.map((user) => (
                  <div key={user._id} className="user-card">
                    <div className="user-card-header">
                      <span className="username">{user.username}</span>
                    </div>
                    <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => window.location.href = `/profile?user=${user._id}`}
                        style={{ flex: 1 }}
                      >
                        View Profile
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => window.location.href = `/chat?user=${user._id}`}
                        style={{ flex: 1 }}
                      >
                        Chat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
