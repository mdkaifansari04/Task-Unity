
const express = require('express')
const router = express.Router()
const controller = require('../controller/messages/messageController')
const { verifyToken } = require('../middleware/authentication')

// router.post("/v1/chat/send-message/:receiverId",verifyToken, controller.sendMessage)

router.post("/v1/chat/send-message/:receiverId", controller.sendMessage)
router.get("/v1/chat/messages", controller.getMyMessage)

module.exports = router