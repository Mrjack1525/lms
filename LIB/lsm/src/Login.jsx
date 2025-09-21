import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi, setSession } from "./api";
import "./Login.css";

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔹 Login button clicked");
    console.log("Form data being sent:", formData);

    const data = JSON.stringify({
      email: formData.email,
      password: formData.password,
    });

    try {
      const res = await callApi(
        "POST",
        "http://localhost:7777/users/signin",
        data
      );

      console.log("🔹 Raw API response:", res);

      const rdata = res.split("::");
      console.log("🔹 Parsed response:", rdata);

      if (rdata[0] === "200") {
        console.log("✅ Login successful, saving session...");
        sessionStorage.setItem("csrid", rdata[1]);

        if (rdata[2] === "1") {
          console.log("Navigating to /adminDashboard");
          navigate("/adminDashboard");
        } else if (rdata[2] === "2") {
          console.log("Navigating to /userDashboard");
          navigate("/userDashboard");
        } else {
          console.warn("⚠️ Unknown role received:", rdata[2]);
        }
      } else {
        console.warn("❌ Login failed:", res);
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("🚨 Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <video autoPlay muted loop className="background-video">
        <source
          src="/vecteezy_4k-slow-motion-of-open-book-with-blank-page-on-black_9295506.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="login-modal">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </label>
            <div className="button-group">
              <button type="submit" className="submit-btn">
                Login
              </button>
              <button type="button" onClick={onClose} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
