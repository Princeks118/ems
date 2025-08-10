import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }
    const newTask = await Task.create({
      title,
      description,
      assignedTo: assignedTo || "Unassigned",
      status: status || "pending",
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Tasks (with optional filters)
export const getTasks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Task Status
export const updateTaskStatus = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ message: error.message });
  }
};

