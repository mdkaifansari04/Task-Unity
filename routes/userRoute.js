
const express = require('express')
const router = express.Router()

// Controller

const controller = require('../controller/user/userController')

router.get('/v1/user/dashboard', controller.dashboard)


export default router;
