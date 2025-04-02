import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const sampleProducts = [
  {
    title: "Black T-Shirt",
    description: "A stylish black t-shirt made from organic cotton.",
    price: 29.99,
    image: "/images/tshirt.jpg",
    category: "clothing",
  },
  {
    title: "White Sneakers",
    description: "Comfortable and versatile white sneakers.",
    price: 89.99,
    image: "/images/sneakers.jpg",
    category: "shoes",
  },
  {
    title: "Denim Jacket",
    description: "Classic denim jacket for your casual days.",
    price: 59.99,
    image: "/images/jacket.jpg",
    category: "jackets",
  },
  {
    title: "Stylish Hat",
    description: "A minimalist hat perfect for sunny days.",
    price: 24.99,
    image: "/images/hat.jpg",
    category: "accessories",
  },
  {
    title: "White Boots",
    description: "Stay stylish with these boots.",
    price: 129.99,
    image: "/images/boots.jpg",
    category: "shoes",
  },
  {
    title: "Cozy Hoodie",
    description: "A soft and comfy hoodie for every day.",
    price: 49.99,
    image: "/images/hoodie.jpg",
    category: "clothing",
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