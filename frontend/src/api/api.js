import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

//  User Authentication API Calls
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

export const registerUser = async (userData) => {
  console.log("userData", userData);
  
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  console.log("response", response);
  
  return response.data;
};

//  Application Tracking API Calls
export const fetchApplications = async (token) => {
  const response = await axios.get(`${API_URL}/applications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const submitApplication = async (applicationData, token) => {
  const response = await axios.post(`${API_URL}/applications`, applicationData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//  Ensure `updateApplicationStatus` is correctly defined & exported**
export const updateApplicationStatus = async (appId, status, token) => {
  const response = await axios.put(
    `${API_URL}/applications/${appId}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

//  Apply for Scholarship
export const applyForScholarship = async (scholarshipId, token) => {
  const response = await axios.post(
    `${API_URL}/scholarships/apply/${scholarshipId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Fetch Scholarships
export const fetchScholarships = async (token) => {
  const response = await axios.get(`${API_URL}/scholarships`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//  AI Profile Matcher API Calls
export const fetchProfileMatches = async (profileData) => {
  const response = await axios.post(`${API_URL}/ai-profile-matcher`, profileData);
  return response.data;
};

// ✅ Get Profile API (Fix Missing Export)
export const getProfile = async (token) => {
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};  
