import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "in-progress"],
    default: "pending",
  },
});

export default mongoose.model("Task", taskSchema);
