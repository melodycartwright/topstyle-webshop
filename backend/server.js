import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";




dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Register your routes here (not inside any other function)
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ✅ Simple test route
app.get("/", (req, res) => {
  res.send("API is running 🎉");
});
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
