import React, { useState } from "react";
import { callApi } from "./api";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const data = JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });

    try {
      const res = await callApi("POST", "http://localhost:7777/users/signup", data);
      const [status, message] = res.split("::");

      alert(message);

      if (status === "200") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("An error occurred during sign-up.");
    }
  };

  return (
    <div className="signup-container">
      {/* 🔹 Background Video */}
      <video autoPlay muted loop className="background-video">
        <source
          src="/vecteezy_4k-slow-motion-of-open-book-with-blank-page-on-black_9295506.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="signup-modal">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Full Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </label>
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
            <label>
              Confirm Password:
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
            </label>
            <label>
              Select Role*
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Role --</option>
                <option value="1">Admin</option>
                <option value="2">User</option>
              </select>
            </label>
            <br />
            <div className="button-group">
              <button type="submit" className="submit-btn">Register</button>
              <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            </div>

            {/* 🔹 Extra Buttons */}
            <div className="extra-buttons">
              <button
                type="button"
                className="login-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                type="button"
                className="home-btn"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
