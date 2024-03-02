import React, { useState } from "react";
import api from "../api/api"

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch(`${api}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log("User signed up successfully!");
      } else {
        console.error("Signup failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border rounded p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
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
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleSignup}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Signup;
