import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [identifier, setIdentifier] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedIdentifier = localStorage.getItem('pending_identifier');
    if (!savedIdentifier) {
      navigate('/');
    } else {
      setIdentifier(savedIdentifier);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.removeItem('pending_identifier');
        navigate('/welcome');
      } else {
        setError(data.message || 'Verification failed');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Verify OTP</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>
        Enter the 6-digit code sent to <strong>{identifier}</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="000000"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }}
          />
          {error && <div className="error">{error}</div>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
      <Link to="/" className="nav-link">Back to Login</Link>
    </div>
  );
};

export default OTPPage;
