const mongoose = require("mongoose")

const {Schema, model} = mongoose

const userSchema = new Schema({
    email :{
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    phoneNo : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        enum : ['member', 'associate']
    },
    completedTask: {
        type : Number,
        default : 0,
    },
    pendingTask : {
        type : Number,
        default : 0
    },
    languages : [String],
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task' 
    }],
    occupation: {
        type: String
    },
    dob: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String
    },
    skills: [{
        type: String
    }],
    qualification: {
        type: String
    },
    profileImage : String,
    permanentAddress : String,
    correspondingAddress : String,

}, {timestamps : true})

const User = new model('User', userSchema)

module.exports = User