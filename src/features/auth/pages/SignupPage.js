import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProfilePathForUser } from "../../../lib/authSession";
import ContinueWithGoogle from "../components/ContinueWithGoogle";

export default function SignupPage() {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const user = await register(form);
      navigate(getProfilePathForUser(user));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleCredential(idToken) {
    setError("");
    setLoading(true);
    try {
      const user = await loginWithGoogle(idToken);
      navigate(getProfilePathForUser(user));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card fade-up">
        <div className="auth-brand">
          <img src="/images/polycode-logo.png" alt="PolyCode" className="auth-logo" />
          <span className="auth-brand-name">PolyCode</span>
        </div>

        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">Start mastering programming today</p>

        {error && <div className="auth-error">{error}</div>}

        <ContinueWithGoogle
          onCredential={handleGoogleCredential}
          disabled={loading}
        />

        <div className="auth-divider" role="separator">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Muhammad"
            />
          </div>
          <div className="auth-field-row">
            <div className="auth-field">
              <label htmlFor="middleName">Middle name</label>
              <input
                id="middleName"
                name="middleName"
                type="text"
                value={form.middleName}
                onChange={handleChange}
                placeholder="Saad"
              />
            </div>
            <div className="auth-field">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Amin"
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="senodroom"
              required
              minLength={3}
              maxLength={30}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? "Creating account…" : "Create Account →"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>

        <p className="auth-skip">
          <Link to="/hub" className="auth-link-muted">
            Continue without signing in →
          </Link>
        </p>
      </div>
    </div>
  );
}
