import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          localStorage.removeItem('token');
          navigate('/');
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) return <div className="container"><h1>Loading...</h1></div>;

  return (
    <div className="container">
      <h1>Welcome!</h1>
      <p style={{ textAlign: 'center' }}>
        You are logged in as:<br />
        <strong>{user?.identifier}</strong>
      </p>
      <div style={{ marginTop: '2rem' }}>
        <button onClick={handleLogout} style={{ backgroundColor: '#6c757d' }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
