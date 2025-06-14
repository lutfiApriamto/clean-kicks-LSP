import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AdminRouter } from './routes/admin.js';
import { ProductRouter } from './routes/products.js';
import { OrderRouter } from './routes/Orders.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

// Log requests
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

// Routers
app.use('/admin', AdminRouter);
app.use('/product', ProductRouter);
app.use('/order', OrderRouter); // ✅ ganti dari /router ke /order

// Connect DB & Start Server
mongoose.connect('mongodb://127.0.0.1:27017/clean_kicks')
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }).catch(err => {
        console.error("Connection error", err);
    });
