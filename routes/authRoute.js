
const express = require('express')
const router = express.Router()
const controller = require('../controller/auth/authController')
const { verifyToken, isAdmin } = require('../middleware/authentication')

//* Common Route
router.post('/v1/login', controller.login)

//* Admin routes
router.post('/v1/admin/register', controller.registerAdmin)

module.exports = router;
