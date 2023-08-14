

//* importing models
const Admin = require('../../models/adminSchema')
const User = require('../../models/userSchema')
const Message = require('../../models/messageSchema')

exports.sendMessage = async (req, res) => {
    try {
        const { message, userType } = req.body

        if (!message || !userType) return res.status(401).json({ success: true, message: "Message or User type cannot be empty" })


        //* if user undefined user type
        if(userType != "Admin" && userType != "User") return res.status(400).json({success : false , message : "User Type not defined"}) 

        //* find receiver info 
        let receiver = (userType == "Admin" ? "User" : "Admin")


        const receiverData = await eval(receiver).findById(req.params.receiverId)
        if (!receiverData) return res.status(404).json({ success: false, message: "User not found" })

        console.log(req.id);
        const sender = await eval(userType).findById(req.id)
        console.log( sender );
        const newMessage = await Message.create({
            message,
            senderId: req.id,
            senderName : sender.name,
            receiverId : receiverData._id,
        })

        res.status(200).json({ success: true, message: "Message Sent", message: newMessage })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error : Message not sent ", error: error.message })
    }
}