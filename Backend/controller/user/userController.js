
const User = require("../../models/userSchema")
const Task = require("../../models/taskSchema")

exports.dashboard = async (req, res) => {
    try {
        const user = await User.findById(req.id)
        if (!user) return res.status(404).json({ success: false, message: "User doesn't exists" })

        const tasks = await Task.find({ userId: req.id })

        res.status(200).json({ success: true, message: "Welcome to the dashboard", user, tasks })
    } catch (error) {
        res.status(500).json({ success: true, message: "Failed to fetch data of dashboard", error: error.message })
    }
}