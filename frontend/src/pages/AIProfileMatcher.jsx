import React, { useState } from "react";
import { fetchProfileMatches } from "../api/api";

const AIProfileMatcher = () => {
  const [profile, setProfile] = useState({ field: "", grade: "", interest: "" });
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchProfileMatches(profile);
    setSuggestions(data.suggestions);
  };

  return (
    <div className="pt-14 min-h-screen flex flex-col items-center py-10 relative -top-10">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-3xl w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">AI Profile Matcher</h2>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Field of Study"
            value={profile.field}
            onChange={(e) => setProfile({ ...profile, field: e.target.value })}
            required
            className="bg-white/20 text-black px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Grades (GPA)"
            value={profile.grade}
            onChange={(e) => setProfile({ ...profile, grade: e.target.value })}
            required
            className="bg-white/20 text-black px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Interests"
            value={profile.interest}
            onChange={(e) => setProfile({ ...profile, interest: e.target.value })}
            required
            className="bg-white/20 text-black px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 rounded-md transition duration-300 
                       hover:bg-blue-600 active:scale-95"
          >
            Find Matches
          </button>
        </form>

        {/* Suggestions List */}
        {suggestions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Suggested Matches:</h3>
            <ul className="space-y-2">
              {suggestions.map((s, index) => (
                <li key={index} className="bg-white/20 p-3 rounded-md shadow-md">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIProfileMatcher;
