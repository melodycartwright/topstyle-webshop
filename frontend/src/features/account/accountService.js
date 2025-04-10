import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/account`; // ✅ matches your backend

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
