import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const sampleProducts = [
  {
    title: "Black T-Shirt",
    description: "A stylish black t-shirt made from organic cotton.",
    price: 29.99,
    image: "https://via.placeholder.com/300x400?text=Black+T-Shirt",
    category: "clothing",
  },
  {
    title: "White Sneakers",
    description: "Comfortable and versatile white sneakers for any occasion.",
    price: 89.99,
    image: "https://via.placeholder.com/300x400?text=White+Sneakers",
    category: "shoes",
  },
  {
    title: "Denim Jacket",
    description: "Classic denim jacket for your casual days.",
    price: 59.99,
    image: "https://via.placeholder.com/300x400?text=Denim+Jacket",
    category: "jackets",
  },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("✅ Sample products inserted!");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting products:", err);
    process.exit(1);
  }
};

seedProducts();
