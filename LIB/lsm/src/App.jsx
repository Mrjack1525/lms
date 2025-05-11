// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import UserDashboard from "./UserDashboard";
import Home2 from "./Home2";
import AdminDashboard from "./AdminDashboard";

const App = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home2/>
          }
        />
        <Route
          path="/login"
          element={
            <Login
              formData={formData}
              setFormData={setFormData}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              formData={formData}
              setFormData={setFormData}
            />
          }
        />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
