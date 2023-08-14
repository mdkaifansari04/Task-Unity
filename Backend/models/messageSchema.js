const mongoose = require("mongoose")

const {Schema, model} = mongoose

const messageSchema = new Schema({
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Admin'
    },
    receiverId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    senderName : {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, {timestamps : true})

const Message = new model('Message', messageSchema)

module.exports = Message