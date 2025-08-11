import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task"}] 
});

export default mongoose.model("User", UserSchema);
