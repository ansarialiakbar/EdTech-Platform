import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Welcome, <span className="text-blue-500">{user ? user.email : "User"}</span>!
        </h2>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white font-semibold p-3 rounded-lg 
                     hover:bg-red-600 transition duration-200 shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
