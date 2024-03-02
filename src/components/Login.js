import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${api}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();

        // Store the token in localStorage
        localStorage.setItem("yourAuthToken", token);

        console.log("Login successful!");
        navigate("/main");
      } else {
        const errorMessage = await response.text();
        console.error("Login failed:", errorMessage);
        alert("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border rounded p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 block mx-auto"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
