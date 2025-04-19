import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import bookRoutes from './src/routes/book.route.js';
import orderRoutes from './src/routes/order.route.js';
import userRoutes from './src/routes/user.route.js';
import adminRoutes from './src/routes/admin.stats.js';
import { DataBaseConnection } from './src/config/Database.js';



const app=express()


// middleware
dotenv.config()
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:8000'],
    credentials: true
}))



// Routes
app.get("/", (req, res) => {
    res.send("Book Store Server is running!");
});



app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await DataBaseConnection()
  
    console.log(`Server is running on port ${PORT}`);
});