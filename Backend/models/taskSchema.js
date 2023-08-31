const mongoose = require("mongoose")

const { Schema, model } = mongoose

const taskSchema = new Schema({
    adminId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Admin'
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    priorityLevel: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'completed']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    estimateTime: {
        type: Number,
        required: true
    },
    comments: [String]

}, { timestamps: true })

const Task = new model('Task', taskSchema)

module.exports = Task