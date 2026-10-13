import React, { useState } from 'react';
import { Lock, ArrowRight, Eye, EyeOff, AlertCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import './AdminLogin.css';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password === '8080') {
      setIsSuccess(true);
      sessionStorage.setItem('crefto_admin_auth', 'true');
      setTimeout(() => {
        onSuccess();
      }, 400);
    } else {
      setError('Access Denied: Incorrect password. Please try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-bg-glow" />
      <div className="admin-login-grid-overlay" />

      <div className={`admin-login-card ${isShaking ? 'shake' : ''} ${isSuccess ? 'success' : ''}`}>
        {/* Top Header & Logo */}
        <div className="admin-login-header">
          <img src="/logo/logo-dark.png" alt="Crefto Logo" className="admin-login-logo" />
          <div className="admin-login-badge">
            <span className="admin-login-badge-dot" />
            <span>SECURE ACCESS</span>
          </div>
          <h1 className="admin-login-title">Control Panel Login</h1>
          <p className="admin-login-subtitle">
            Enter the administrator passcode to access and edit live website content.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-field-group">
            <label htmlFor="admin-password" className="admin-login-label">
              Admin Password
            </label>
            <div className={`admin-password-input-wrapper ${error ? 'has-error' : ''}`}>
              <Lock size={18} className="admin-input-icon-left" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                className="admin-login-input"
                autoFocus
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="admin-login-error-banner" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            className={`admin-login-submit-btn ${isSuccess ? 'btn-success' : ''}`}
            disabled={isSuccess || !password.trim()}
          >
            {isSuccess ? (
              <>
                <ShieldCheck size={18} />
                <span>Access Granted</span>
              </>
            ) : (
              <>
                <span>Unlock Control Panel</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="admin-login-footer">
          <button type="button" onClick={onCancel} className="admin-login-back-btn">
            <ArrowLeft size={15} />
            <span>Return to Live Website</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
