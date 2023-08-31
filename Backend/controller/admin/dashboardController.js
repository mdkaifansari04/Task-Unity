
const Task = require('../../models/taskSchema')
const User = require('../../models/userSchema')
const Admin = require('../../models/adminSchema')
const bcrypt = require("bcrypt")


//? Dashboard

// exports.dashboard = async (req, res) => {
//     try {
//         const users = await User.find({})
//         const tasks = await Task.find({})
//         const activeTask = await Task.find({status : "active"})
//         const pendingTask = await Task.find({status : "pending"})
//         const completedTask = await Task.find({status : "completed"})

//         res.status(200).json({ success: true, message: "Welcome to dashboard", tasks, users, pendingTask : pendingTask.length , completedTask : completedTask.length })
//     } catch (error) {
//         res.status(500).json({ success: true, message: "Dashboard error", error: error.message })
//     }
// }

exports.dashboard = async (req, res) => {
    try {

        const allUser = await  User.find({})
        const allTask = await  Task.find({})
        const dashboardData = await Task.aggregate([
            {
                $group: {
                    _id: null,
                    totalTasks: { $sum: 1 },
                    users: { $addToSet: "$userId" },
                    activeTasks: { $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] } },
                    pendingTasks: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
                    completedTasks: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } }
                }
            }
        ])

        if (!dashboardData) {
            return res.status(404).json({ success: false, message: "No dashboard data found" });
        }

        const { totalTasks, users, activeTasks, pendingTasks, completedTasks } = dashboardData[0]
        
        const data = {
            totalTasks,
            user : allUser.length,
            activeTasks,
            pendingTasks,
            completedTasks
        }
        res.status(200).json({
            success: true,
            message: "Welcome to dashboard",
            users : allUser,
            tasks : allTask,
            data
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch dashboard details", error: error.message });
    }
}


exports.updateAdmin = async(req,res) =>{
    try {
            const updatedAdmin = await Admin.findByIdAndUpdate({ _id: req.id },{ $set: req.body }, { new: true })

            if(!updatedAdmin) return res.status(400).json({success : false , message : "Admin not updated"})

            res.status(200).json({success : true, message : "Updated Account Successfully", admin : updatedAdmin})
            
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update admin", error: error.message })
    }
}

exports.getAdmin = async(req,res) =>{
    try {
            const admin = await Admin.findById(req.id)

            if(!admin) return res.status(400).json({success : false , message : "Admin not found"})

            res.status(200).json({success : true, message : "Admin data", admin})
            
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update admin", error: error.message })
    }
}