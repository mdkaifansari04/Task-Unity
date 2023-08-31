

const Task = require('../../models/taskSchema')
const User = require('../../models/userSchema')
const bcrypt = require('bcrypt');

//? Task CRUD By Admin
exports.createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priorityLevel,
            estimateTime,
            userId,
        } = req.body;

        if (!title || !userId || !description || !priorityLevel || !estimateTime) return res.status(401).json({ success: false, message: "Missing required fields" })

        //* Priority must be between 1 to 5
        if (priorityLevel < 0 || priorityLevel > 5) return res.status(401).json({ success: true, message: "Priority must be between 1 to 5" })

        //* Finding user
        const user = await User.findOne({ _id: req.body.userId })
        if (!user) return res.status(401).json({ success: false, message: "User does not exist !" })

        const task = await Task.create({
            adminId: req.id,
            userName: user.name,
            userId,
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
            status,
            userId,
            comments
        } = req.body;

        if (!title || !userId || !description || !priorityLevel || !estimateTime) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        //* Finding user
        const user = await User.findOne({ _id: req.body.userId })
        if (!user) return res.status(401).json({ success: false, message: "User does not exist !" })


        const taskId = req.params.taskId; // Assuming taskId is part of the route
        const updatedFields = {
            title,
            description,
            priorityLevel,
            userId,
            userName: user.name,
            estimateTime,
            status,
            comments
        }

        if (status === 'completed') {
            try {
                user.completedTask += 1;
                await user.save();
            } catch (error) {
                return res.status(404).json({ success: false, message: "Error : Task not updated, try again" });
            }
        }


        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: updatedFields },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Error : Task not updated" });
        }

        res.status(200).json({ success: true, message: "Task updated successfully", task: updatedTask })
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
