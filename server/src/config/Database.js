import mongoose from "mongoose"

export const DataBaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.log("MongoDB connection failed:", err);
    }
};