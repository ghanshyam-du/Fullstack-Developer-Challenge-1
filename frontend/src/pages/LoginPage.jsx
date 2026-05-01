import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [type, setType] = useState('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    if (!identifier) return 'Identifier is required';
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) return 'Invalid email format';
    } else if (type === 'phone') {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(identifier)) return 'Phone must be 10 digits';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, type }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('pending_identifier', identifier);
        navigate('/verify');
      } else {
        setError(data.error || data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Connection error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>
        <div className="form-group">
          <label>{type === 'email' ? 'Email Address' : 'Phone Number'}</label>
          <input
            type={type === 'email' ? 'email' : 'text'}
            placeholder={type === 'email' ? 'example@mail.com' : '1234567890'}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          {error && <div className="error">{error}</div>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Sending OTP...' : 'Get OTP'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
