import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchScholarships, applyForScholarship } from "../api/api";

const ScholarshipFinder = () => {
  const { user, token } = useAuth();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState({});

  useEffect(() => {
    if (!token) return;

    const loadScholarships = async () => {
      try {
        setLoading(true);
        const data = await fetchScholarships(token);
        setScholarships(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching scholarships. Please try again.");
        setLoading(false);
      }
    };

    loadScholarships();
  }, [token]);

  const handleApply = async (scholarshipId) => {
    if (!token) {
      alert("Unauthorized! Please log in again.");
      return;
    }
    try {
      await applyForScholarship(scholarshipId, token);
      setApplied((prev) => ({ ...prev, [scholarshipId]: true }));
      alert("Application submitted successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error applying for scholarship.");
    }
  };

  return (
    <div className="pt-24 min-h-screen flex flex-col items-center text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Scholarship Finder</h2>

        {/* Error Message */}
        {error && <p className="text-red-400 text-center">{error}</p>}

        {/* Loading Indicator */}
        {loading && <p className="text-center text-gray-400">Loading scholarships...</p>}

        {/* Scholarship List */}
        <ul className="mt-6 space-y-4">
          {scholarships.length === 0 && !loading && (
            <p className="text-gray-300 text-center">No scholarships available.</p>
          )}
          {scholarships.map((scholarship) => (
            <li key={scholarship._id} className="bg-white/20 p-4 text-black rounded-md shadow-md flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{scholarship.name}</p>
                <p className="text-sm text-black">Amount: <span className="font-bold">${scholarship.amount}</span></p>
                <p className="text-sm text-gray-600">Eligibility: {scholarship.eligibility}</p>
              </div>

              {/* Apply Button (Only for Students) */}
              {user?.role === "student" && (
                <button
                  onClick={() => handleApply(scholarship._id)}
                  disabled={applied[scholarship._id]}
                  className={`px-4 py-1 rounded-md text-black transition duration-300 ${
                    applied[scholarship._id]
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-500 hover:bg-indigo-600 active:scale-95"
                  }`}
                >
                  {applied[scholarship._id] ? "Applied" : "Apply"}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScholarshipFinder;
