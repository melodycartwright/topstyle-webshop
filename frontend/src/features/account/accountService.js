import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/me"; // ✅ matches your backend

const updateProfile = async (profileData, token) => {
  const res = await axios.put(API_URL, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const accountService = {
  updateProfile,
};

export default accountService;
