import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchApplications, submitApplication, updateApplicationStatus } from "../api/api";

const ApplicationTracking = () => {
  const { user, token } = useAuth(); // ✅ Get user and token from AuthContext
  const [applications, setApplications] = useState([]);
  const [newApplication, setNewApplication] = useState({ course: "", university: "" });
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return; // ✅ Prevent API calls if token is missing

    const loadApplications = async () => {
      try {
        setLoading(true);
        const data = await fetchApplications(token);
        setApplications(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load applications. Please try again.");
        setLoading(false);
      }
    };

    loadApplications();
  }, [token]); // ✅ Depend on token to re-fetch when available

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Unauthorized! Please log in again.");
      return;
    }
    try {
      const newApp = await submitApplication(newApplication, token);
      setApplications([...applications, newApp]); // ✅ Add new application to list
      setNewApplication({ course: "", university: "" });
    } catch (error) {
      setError("Error submitting application. Please try again.");
    }
  };

  const handleStatusUpdate = async (appId, status) => {
    try {
      await updateApplicationStatus(appId, status, token);
      setApplications(applications.map((app) =>
        app._id === appId ? { ...app, status } : app
      ));
    } catch (error) {
      setError("Failed to update application status.");
    }
  };

  return (
    <div className="pt-24 min-h-screen flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-3xl w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Application Tracking</h2>

        {/* Error Message */}
        {error && <p className="text-red-400 text-center">{error}</p>}

        {/* Loading Indicator */}
        {loading && <p className="text-center text-gray-400">Loading applications...</p>}

        {/* Student Application Form */}
        {user?.role === "student" && (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Course Name"
              value={newApplication.course}
              onChange={(e) => setNewApplication({ ...newApplication, course: e.target.value })}
              required
              className="bg-white/20 text-black px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              placeholder="University"
              value={newApplication.university}
              onChange={(e) => setNewApplication({ ...newApplication, university: e.target.value })}
              required
              className="bg-white/20 text-black px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white font-semibold py-2 rounded-md transition duration-300 
                         hover:bg-indigo-600 active:scale-95"
            >
              Submit Application
            </button>
          </form>
        )}

        {/* Applications List */}
        <ul className="mt-6 space-y-4">
          {applications.length === 0 && !loading && (
            <p className="text-gray-300 text-center">No applications found.</p>
          )}
          {applications.map((app) => (
            <li key={app._id} className="bg-white/20 p-4 rounded-md shadow-md flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{app.course} at {app.university}</p>
                <p className="text-sm text-black">
                  Status: <span className="font-bold">{app.status}</span>
                </p>
              </div>

              {/* Admin/Agent Actions */}
              {user?.role !== "student" && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(app._id, "Approved")}
                    className="bg-green-500 px-4 py-1 rounded-md text-black transition duration-300 
                               hover:bg-green-600 active:scale-95"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(app._id, "Rejected")}
                    className="bg-red-500 px-4 py-1 rounded-md text-white transition duration-300 
                               hover:bg-red-600 active:scale-95"
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApplicationTracking;
