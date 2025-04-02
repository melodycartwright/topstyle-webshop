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
    category: "Clothing",
  },
  {
    title: "White Sneakers",
    description: "Comfortable and versatile white sneakers.",
    price: 89.99,
    image: "/images/sneakers.jpg",
    category: "Shoes",
  },
  {
    title: "Denim Jacket",
    description: "Classic denim jacket for your casual days.",
    price: 59.99,
    image: "/images/jacket.jpg",
    category: "Jackets",
  },
  {
    title: "White Boots",
    description: "Stay stylish with these boots.",
    price: 129.99,
    image: "/images/boots.jpg",
    category: "Shoes",
  },
  {
    title: "Cozy Hoodie",
    description: "A soft and comfy hoodie for every day.",
    price: 49.99,
    image: "/images/hoodie.jpg",
    category: "Clothing",
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