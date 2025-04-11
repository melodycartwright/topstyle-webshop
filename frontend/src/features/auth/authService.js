import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

const register = async (userData) => {
  const res = await axios.post(API_URL + "register", userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);
  return res.data;
};

const authService = {
  register,
  login,
};

export default authService;
