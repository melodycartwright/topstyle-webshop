// src/features/orders/orderService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

const placeOrder = async (orderData, token) => {
  const res = await axios.post(API_URL, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getOrders = async (token) => {
  const res = await axios.get(`${API_URL}/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const orderService = {
  placeOrder,
  getOrders,
};

export default orderService;
