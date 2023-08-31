
const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/authentication')
const controller = require('../controller/user/userController')
const taskController = require('../controller/admin/taskController')
const userController = require('../controller/admin/userController')
router.get('/v1/user/dashboard', verifyToken, controller.dashboard)

router.put('/v1/user/task/submit-task/:taskId', verifyToken, taskController.updateTask)

router.put('/v1/user/update', verifyToken, userController.updateUser)

module.exports = router