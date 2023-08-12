
const express = require('express')
const router = express.Router()
const controller = require('../controller/authController')


//* Common Route
router.post('/v1/login', controller.login)

//* Admin routes
router.post('/v1/admin/register', controller.registerAdmin)

//* User routes
router.post('/v1/user/register', controller.registerUser)

module.exports = router;
