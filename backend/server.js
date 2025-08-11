import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import taskRoutes from "./routes/taskRoutes.js";
import  userRoutes from "./routes/User.routes.js"
dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin:"http://localhost:5173/",
    credentials:true,
}));
app.use(express.json());

// Routes
app.use("/api/user",userRoutes );
app.use("/api/tasks", taskRoutes);
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "worksphere" })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
