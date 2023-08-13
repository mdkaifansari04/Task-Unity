
const express = require('express')
const router = express.Router()
const controller = require('../controller/messages/messageController')
const { verifyToken } = require('../middleware/authentication')


router.post("/v1/chat/send-message/:receiverId",verifyToken, controller.sendMessage)


module.exports = router