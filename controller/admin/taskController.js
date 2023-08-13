

const Task = require('../../models/taskSchema')
const User = require('../../models/userSchema')
const bcrypt = require('bcrypt');

//? Task CRUD 
exports.createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priorityLevel,
            estimateTime,
        } = req.body;

        if (!title || !description || !priorityLevel || !estimateTime) return res.status(401).json({ success: false, message: "Missing required fields" })

        //* Priority must be between 1 to 5
        if (priorityLevel < 0 || priorityLevel > 5) return res.status(401).json({ success: true, message: "Priority must be between 1 to 5" })

        const task = await Task.create({
            adminId: req.id,
            userId: req.params.userId,
            title,
            description,
            priorityLevel,
            status: "active",
            createdAt: new Date(),
            estimateTime
        })
        res.status(200).json({ success: true, message: "Task created successfully", task })
    } catch (error) {
        res.status(500).json({ success: true, message: "Failed to create the task , retry", error: error.message })
    }
}


exports.updateTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priorityLevel,
            estimateTime,
        } = req.body;

        if (!title || !description || !priorityLevel || !estimateTime) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const taskId = req.params.taskId; // Assuming taskId is part of the route
        const updatedFields = {
            title,
            description,
            priorityLevel,
            estimateTime
        };

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: updatedFields },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.status(200).json({ success: true, message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update the task , retry", error: error.message });
    }
}


exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId; // Assuming taskId is part of the route

        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.status(200).json({ success: true, message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete the task , retry", error: error.message });
    }
}
