import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-lg text-white py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
        {/* Logo / Brand Name */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-white hover:text-gray-300 transition">
          EdTech Platform
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/dashboard" className="text-lg hover:text-blue-400 transition">Dashboard</Link>

              {user.role === "student" && (
                <Link to="/scholarships" className="text-lg hover:text-blue-400 transition">Scholarships</Link>
              )}

              {(user.role === "student" || user.role === "agent" || user.role === "admin") && (
                <Link to="/applications" className="text-lg hover:text-blue-400 transition">Applications</Link>
              )}

              {user.role === "student" && (
                <Link to="/profile-matcher" className="text-lg hover:text-blue-400 transition">AI Profile Matcher</Link>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-300 
                           hover:bg-red-600 active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login Button */}
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all 
                           duration-300 hover:from-purple-600 hover:to-indigo-700 hover:shadow-lg active:scale-95"
              >
                Login
              </Link>

              {/* Register Button */}
              <Link
                to="/register"
                className="border border-indigo-500 text-indigo-500 px-6 py-2 rounded-lg font-semibold transition-all 
                           duration-300 hover:bg-indigo-500 hover:text-white hover:shadow-md active:scale-95"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
