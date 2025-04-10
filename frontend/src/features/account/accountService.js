import axios from "axios";



const updateProfile = async (profileData, token) => {
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/account`;
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
