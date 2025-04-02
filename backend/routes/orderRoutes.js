// backend/routes/orderRoutes.js
import express from "express";
import { placeOrder, getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder); // 🔐 requires login
router.get("/my-orders", protect, getMyOrders); // 🔐 requires login

export default router;
