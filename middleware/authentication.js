

//* required models
const Admin = require("../models/adminSchema")
const User = require("../models/userSchema")

//* using jwt for auth
const jwt = require("jsonwebtoken")

exports.verifyToken = async  (req, res, next) => {
    try {
            const token = req.headers['authorization'] ? req.headers['authorization'].split(" ")[1] : false

            if(!token) return res.status(401).json({success : true, message : "Token not provided "})

            const decoded = await jwt.verify(token, process.env.AUTH_SECRET_KEY)
            req.id = decoded.id
            req.userType = decoded.userType
            next()
    } catch (error) {
        res.status(500).json({ success: false, message: 'Authentication failed ', error: error.message });
    }
}


exports.isAdmin =async (req,res,next) =>{
    try {
            const adminExits = await Admin.findById(req.id)
            if(!adminExits) return res.status(404).json({success : true, message : "Admin does not exist"})
            next()
    } catch (error) {
        res.status(500).json({ success: false, message: 'Authentication failed ', error: error.message });
    }
}


exports.isUser =async (req,res,next) =>{
    try {
            const userExits = await User.findById(req.id)
            if(!userExits) return res.status(404).json({success : true, message : "User does not exist"})
            next()
    } catch (error) {
        res.status(500).json({ success: false, message: 'Authentication failed ', error: error.message });
    }
}