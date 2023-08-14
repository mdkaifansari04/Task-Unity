
const User = require("../../models/userSchema")
const Task = require("../../models/taskSchema")

exports.dashboard = async (req, res) => {
    try {
        const [user, tasks, delayedTasks, activeTasks] = await Promise.all([
            User.findById(req.id).lean(),
            Task.find({ userId: req.id }).lean(),
            Task.find({ status: "pending" }).lean(),
            Task.find({ status: "active" }).lean()
        ]);

        res.status(200).json({ success: true, message: "Welcome to the dashboard", user, tasks, delayedTasks, activeTasks })
    } catch (error) {
        res.status(500).json({ success: true, message: "Failed to fetch data of dashboard", error: error.message })
    }
}