import React, { useState } from "react";
import "../styles/AuthPage.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const toggleForm = (e) => {
    e.preventDefault();
    setIsRegister(!isRegister);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Inscription
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("User registered successfully: " + data.user.username);
        setIsRegister(false);
      } else {
        const error = await response.json();
        alert("Error: " + error.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration.");
    }
  };

  // Connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login successful!");
        window.location.href = "/";
      } else {
        const error = await response.json();
        alert("Error: " + error.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="container">
      {!isRegister ? (
        <div className="login">
          <div className="container">
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <br />
              <input type="checkbox" id="remember" />
              <span>Remember me</span>
              <a href="#forgot-password">Forgot password?</a>
              <button type="submit">Log in</button>
            </form>
            <hr />
            <p>Or Connect With</p>
            <hr />
            <ul>
              <li>
                <FacebookIcon fontSize="large" />
              </li>
              <li>
                <TwitterIcon fontSize="large" />
              </li>
              <li>
                <GitHubIcon fontSize="large" />
              </li>
              <li>
                <LinkedInIcon fontSize="large" />
              </li>
            </ul>
            <div className="clearfix"></div>
            <p>
              Don't have an account?{" "}
              <button className="toggle-button" onClick={toggleForm}>
                Register
              </button>
            </p>
          </div>
        </div>
      ) : (
        <div className="register">
          <div className="container">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={formData.role}
                onChange={handleChange}
              />
              <br />
              <input type="checkbox" id="rememberReg" />
              <span>Remember me</span>
              <a href="#forgot-password">Forgot password?</a>
              <button type="submit">Register</button>
            </form>
            <hr />
            <p>Or Register With</p>
            <hr />
            <ul>
              <li>
                <FacebookIcon fontSize="large" />
              </li>
              <li>
                <TwitterIcon fontSize="large" />
              </li>
              <li>
                <GitHubIcon fontSize="large" />
              </li>
              <li>
                <LinkedInIcon fontSize="large" />
              </li>
            </ul>
            <div className="clearfix"></div>
            <p>
              Already have an account?{" "}
              <button className="toggle-button" onClick={toggleForm}>
                Log in
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;