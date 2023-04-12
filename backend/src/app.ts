import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";

import { routeNotFound } from "./middleware/routeNotFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// // Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

// Custom Handlers
app.use(routeNotFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
const start = async () => {
  try {
    app.listen(port, () => {
      console.log("Connected to MongoDB");
      mongoose.connect(process.env.MONGO_URI!);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
