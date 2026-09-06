import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser, checkEmail } from "../api/auth.api.js";
import { showSuccess, showError } from "../utils/toast.js";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [domain, setDomain] = useState("@gmail.com");
  const [password, setPassword] = useState("");

  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [emailAvailable, setEmailAvailable] = useState(null);

  const email = `${username}${domain}`;

  useEffect(() => {
    if (!username) {
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

        const response = await checkEmail(email);

        setEmailAvailable(response.available);

        setEmailStatus(
          response.available
            ? "Email does not exist"
            : "Email exists"
        );
      } catch (error) {
        console.error("Email check failed:", error);

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

    if (!username || !password) {
      showError("Please fill all fields");
      return;
    }

    if (checkingEmail) {
      showError("Please wait while checking email");
      return;
    }

    if (emailAvailable === true) {
      showError("Email does not exist");
      return;
    }

    try {
      const data = await loginUser({
        email,
        password,
      });

      login(data.user);

      showSuccess("Login successful");

      navigate("/gallery");
    } catch (error) {
      console.error("Login failed:", error);

      showError(
        error?.response?.data?.message ||
        error?.message ||
        "Login failed"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[#292825] mb-2">
          Email
        </label>

        <div className="flex h-11">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 min-w-0 px-3 rounded-l-xl border border-r-0 border-[#d9d5cd] bg-white text-sm text-[#292825] outline-none focus:border-[#8c7a5b] focus:ring-1 focus:ring-[#8c7a5b]"
          />

          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-[125px] px-2 rounded-r-xl border border-[#d9d5cd] bg-[#f7f6f3] text-sm text-[#292825] outline-none focus:border-[#8c7a5b]"
          >
            <option value="@gmail.com">@gmail.com</option>
            <option value="@outlook.com">@outlook.com</option>
            <option value="@yahoo.com">@yahoo.com</option>
          </select>
        </div>

        {/* Email Status */}
        {checkingEmail && (
          <p className="mt-2 text-[11px] font-medium text-[#8a857d]">
            Checking email...
          </p>
        )}

        {!checkingEmail && emailStatus && (
          <p
            className={`mt-2 text-[11px] font-medium ${emailAvailable === false
                ? "text-emerald-600"
                : "text-red-600"
              }`}
          >
            {emailStatus}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-[#292825] mb-2">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 px-3 rounded-xl border border-[#d9d5cd] bg-white text-sm text-[#292825] placeholder:text-[#aaa59d] outline-none focus:border-[#8c7a5b] focus:ring-1 focus:ring-[#8c7a5b]"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={checkingEmail}
        className="w-full h-11 rounded-xl bg-[#1b1b1a] text-white text-sm font-medium hover:bg-[#2b2b29] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {checkingEmail ? "Checking..." : "Log In"}
      </button>

      {/* Switch */}
      <div className="text-center pt-1">
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="text-xs text-[#77736c] hover:text-[#292825] transition-colors"
        >
          Don't have an account?{" "}
          <span className="font-medium text-[#7d6849]">
            Sign Up
          </span>
        </button>
      </div>
    </form>
  );
};

export default Login; 