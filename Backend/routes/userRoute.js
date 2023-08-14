
const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/authentication')
const controller = require('../controller/user/userController')
const taskController = require('../controller/admin/taskController')

router.get('/v1/user/dashboard', verifyToken, controller.dashboard)

router.post('/v1/user/task/submit-task/:taskId', taskController.updateTask)

module.exports = router