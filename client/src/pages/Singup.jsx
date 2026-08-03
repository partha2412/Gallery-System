import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/pages/Signup.css";

import { checkEmail, registerUser } from "../api/auth.api";
import { showError, showSuccess } from "../utils/toast";

export default function SignupForm({ onSwitch }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [domain, setDomain] = useState("@gmail.com");
  const [mobile, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [emailAvailable, setEmailAvailable] = useState(null);

  useEffect(() => {

    const finalDomain = domain.startsWith("@")
      ? domain
      : `@${domain}`;

    const email = `${username}${finalDomain}`;

    if (!username.trim()) {
      setEmailStatus("");
      setEmailAvailable(null);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailStatus("");
      setEmailAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {

      try {

        setCheckingEmail(true);
        const finalDomain = domain.startsWith("@")
          ? domain
          : `@${domain}`;

        const email = `${username}${finalDomain}`;

        const data = await checkEmail(email);

        setEmailStatus(data.message);
        setEmailAvailable(data.available);

      } catch {

        setEmailStatus("");
        setEmailAvailable(null);

      } finally {

        setCheckingEmail(false);

      }

    }, 500);

    return () => clearTimeout(timer);

  }, [username, domain]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    if (emailAvailable === false) {
      showError("Email already exists");
      return;
    }

    try {
      const finalDomain = domain.startsWith("@")
        ? domain
        : `@${domain}`;

      const email = `${username}${finalDomain}`;
      const res = await registerUser({
        name,
        email,
        password,
        mobile,
      });

      showSuccess(res.message);

      navigate("/gallery");

    } catch (err) {

      showError(err.message);

    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="form-group">
        <label>Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

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
                  color: emailAvailable ? "#16a34a" : "#dc2626",
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
        <label>Phone</label>

        <input
          type="tel"
          value={mobile}
          onChange={(e) => setPhone(e.target.value)}
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

      <div className="form-group">
        <label>Confirm Password</label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={checkingEmail || emailAvailable === false}
      >
        {checkingEmail ? "Checking..." : "Create Account"}
      </button>

      <p>
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
        >
          Log In
        </button>
      </p>

    </form>
  );
}