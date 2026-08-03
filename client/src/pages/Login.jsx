import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/pages/Login.css";

import { loginUser, checkEmail } from "../api/auth.api";
import { showError, showSuccess } from "../utils/toast";

export default function LoginForm({ onSwitch }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [domain, setDomain] = useState("@gmail.com");
  const [password, setPassword] = useState("");

  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [emailAvailable, setEmailAvailable] = useState(null);

  // ===============================
  // AJAX Email Check
  // ===============================

  useEffect(() => {

    if (!username.trim()) {
      setEmailStatus("");
      setEmailAvailable(null);
      return;
    }

    const finalDomain = domain.startsWith("@")
      ? domain
      : `@${domain}`;

    const email = `${username}${finalDomain}`;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailStatus("");
      setEmailAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {

      try {

        setCheckingEmail(true);

        const response = await checkEmail(email);
        // console.log(response);

        setEmailAvailable(response.available);
        setEmailStatus(!response.available ? "Email exist" : "Email not exist");

      } catch (err) {

        setEmailAvailable(null);
        setEmailStatus("");

      } finally {

        setCheckingEmail(false);

      }

    }, 500);

    return () => clearTimeout(timer);

  }, [username, domain]);

  // ===============================
  // Login
  // ===============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const finalDomain = domain.startsWith("@")
      ? domain
      : `@${domain}`;

    const email = `${username}${finalDomain}`;

    try {

      const data = await loginUser({
        email,
        password,
      });

      showSuccess(data.message);

      navigate("/gallery");

    } catch (error) {

      showError(error.message);

    }

  };

  return (

    <form onSubmit={handleSubmit}>

      <div className="form-group">
        <div className="flex gap-3">
          <label>Email</label>
          <label>
            {checkingEmail && (
              <small style={{ color: "#6b7280" }}>
                Checking email...
              </small>
            )}

            {!checkingEmail && emailStatus && (
              <small
                style={{
                  color: !emailAvailable ? "#16a34a" : "#dc2626",
                  fontWeight: 500,
                }}
              >
                {emailStatus}
              </small>
            )}
          </label>
        </div>

        <div className="email-wrapper">

          <input
            type="text"
            className="username-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="text"
            className="domain-input"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />

        </div>

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

      <button type="submit">
        Sign In
      </button>

      <p>
        Need an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
        >
          Sign Up
        </button>
      </p>

    </form>

  );
}