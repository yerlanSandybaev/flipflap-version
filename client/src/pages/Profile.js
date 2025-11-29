import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/profiles/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setBio(response.data.bio || '');
      setLocation(response.data.location || '');
      setWebsite(response.data.website || '');
      setInterests(response.data.interests || []);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/profiles/${userId}`, {
        bio,
        location,
        website,
        interests
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest));
  };

  if (loading) return <div className="container"><div className="main-content">Loading...</div></div>;

  return (
    <div className="container">
      <Sidebar currentPage="profile" />
      <div className="main-content">
        <div className="profile-container">
          <div className="profile-header">
            <h1>{username}</h1>
            <div className="profile-avatar">👤</div>
            {profile && (
              <div className="profile-stats">
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {profile.following?.length || 0}
                  </div>
                  <div>Following</div>
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {profile.followers?.length || 0}
                  </div>
                  <div>Followers</div>
                </div>
              </div>
            )}
          </div>

          {!isEditing ? (
            <div style={{ marginTop: '30px' }}>
              <div style={{ marginBottom: '20px' }}>
                {profile?.bio && <p><strong>Bio:</strong> {profile.bio}</p>}
                {profile?.location && <p><strong>Location:</strong> {profile.location}</p>}
                {profile?.website && <p><strong>Website:</strong> {profile.website}</p>}
              </div>

              {profile?.interests && profile.interests.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <strong>Interests:</strong>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {profile.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: '#000',
                          color: '#fff',
                          padding: '8px 12px',
                          borderRadius: '20px',
                          fontSize: '14px'
                        }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="profile-edit-form" style={{ marginTop: '30px' }}>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Your location"
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Your website URL"
                />
              </div>

              <div className="form-group">
                <label>Interests</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add an interest"
                  />
                  <button type="button" className="btn btn-secondary" onClick={handleAddInterest}>
                    Add
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                  {interests.map((interest, idx) => (
                    <span key={idx} style={{
                      backgroundColor: '#000',
                      color: '#fff',
                      padding: '8px 12px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}>
                      {interest}
                      <span onClick={() => handleRemoveInterest(interest)}>×</span>
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
