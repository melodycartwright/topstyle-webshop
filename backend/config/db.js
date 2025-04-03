// Set up for MongoDB  
//Connects to the database using mongoose and shows a message when connected.
import mongoose from "mongoose";
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected ✅ ");
    } catch (error) {
        console.error("MongoDB connection error ❌", error.message);
        process.exit(1);
    }
};

export default connectDB;