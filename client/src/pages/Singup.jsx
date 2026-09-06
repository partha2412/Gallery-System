import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser, checkEmail } from "../api/auth.api.js";
import { showSuccess, showError } from "../utils/toast.js";

const Singup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [domain, setDomain] = useState("@gmail.com");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    if (
      !name ||
      !username ||
      !mobile ||
      !password ||
      !confirmPassword
    ) {
      showError("Please fill all fields");
      return;
    }

    if (checkingEmail) {
      showError("Please wait while checking email");
      return;
    }

    if (password !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    if (emailAvailable === false) {
      showError("Email already exists");
      return;
    }

    try {
      await registerUser({
        name,
        email,
        password,
        mobile,
      });

      showSuccess("Registration successful");

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);

      showError(
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-[#292825] mb-2">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-11 px-3 rounded-xl border border-[#d9d5cd] bg-white text-sm text-[#292825] placeholder:text-[#aaa59d] outline-none focus:border-[#8c7a5b] focus:ring-1 focus:ring-[#8c7a5b]"
        />
      </div>

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
            className={`mt-2 text-[11px] font-medium ${emailAvailable === true
                ? "text-emerald-600"
                : "text-red-600"
              }`}
          >
            {emailStatus}
          </p>
        )}
      </div>

      {/* Mobile */}
      <div>
        <label className="block text-sm font-medium text-[#292825] mb-2">
          Mobile Number
        </label>

        <input
          type="tel"
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full h-11 px-3 rounded-xl border border-[#d9d5cd] bg-white text-sm text-[#292825] placeholder:text-[#aaa59d] outline-none focus:border-[#8c7a5b] focus:ring-1 focus:ring-[#8c7a5b]"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-[#292825] mb-2">
          Password
        </label>

        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 px-3 rounded-xl border border-[#d9d5cd] bg-white text-sm text-[#292825] placeholder:text-[#aaa59d] outline-none focus:border-[#8c7a5b] focus:ring-1 focus:ring-[#8c7a5b]"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-[#292825] mb-2">
          Confirm Password
        </label>

        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full h-11 px-3 rounded-xl border border-[#d9d5cd] bg-white text-sm text-[#292825] placeholder:text-[#aaa59d] outline-none focus:border-[#8c7a5b] focus:ring-1 focus:ring-[#8c7a5b]"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={
          checkingEmail ||
          emailAvailable === false
        }
        className="w-full h-11 rounded-xl bg-[#1b1b1a] text-white text-sm font-medium hover:bg-[#2b2b29] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {checkingEmail ? "Checking..." : "Create Account"}
      </button>

      {/* Switch */}
      <div className="text-center pt-1">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-xs text-[#77736c] hover:text-[#292825] transition-colors"
        >
          Already have an account?{" "}
          <span className="font-medium text-[#7d6849]">
            Log In
          </span>
        </button>
      </div>
    </form>
  );
};

export default Singup;