const mongoose = require("mongoose")

const {Schema, model} = mongoose

const adminSchema = new Schema({
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
    role : {
        type : String,
        enum : ['admin'],
        default : 'admin'
    },
    address : {
        type : String,
    },
    profileImage : {
        type : String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    name : {
        type : String,
        required :true
    }
}, {timestamps : true})

const Admin = new model('Admin', adminSchema)

module.exports = Admin