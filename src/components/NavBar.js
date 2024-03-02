import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("yourAuthToken");

    navigate("/");
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Track Jobs</div>
      <div>
        <Link to="/main" className="ml-4">
          Dashboard
        </Link>
        <Link to="/profile" className="ml-4">
          Profile
        </Link>
        <button className="ml-4" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
