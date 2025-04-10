// Main server file  
//Loads all routes, connects to MongoDB, sets up middleware, and serves static images.
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Required for working with __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  cors({ origin: "https://topstyleshop.netlify.app", credentials: true, })
);
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));





// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
// ✅ Serve static files from the "public" folder
//app.use(express.static(path.join(__dirname, "public")));
// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running 🎉");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
