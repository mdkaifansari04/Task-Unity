
const Admin = require('../../models/adminSchema')
const User = require('../../models/userSchema')
const bcrypt = require('bcrypt');

//* Using jwt for token generation
const jwt = require('jsonwebtoken');


//? Admin Auth 

//* Register admin

exports.registerAdmin = async (req, res) => {
    try {
        const { email, password, phoneNo, role, address,name } = req.body

        //* If invalid input 
        if (!email || !password || !phoneNo || !address || !name) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        if(password.length < 8) return res.status(400).json({success : true, message : "Password must be 8 character long"})

        // //* If admin exist
        const adminExist = await Admin.find({})
        if (adminExist.length > 0) return res.status(405).json({ success: false, message: "Admin already exists..!" })

        //* Hashing password
        const hashedPassword = await bcrypt.hash(password, 10)

        //* Create Admin
        const admin = await Admin.create({
            email,
            password: hashedPassword,
            phoneNo,
            role,
            address,
            name
        })

        const token = await jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), //* expire in 30 days
            id: admin._id,
            userType: 'Admin'
        }, process.env.AUTH_SECRET_KEY);

        //* Response
        res.status(200).json({ success: true, message: "Admin Created Successfully", token, admin })
    } catch (error) {
        res.status(500).json({ success: false, message: "Admin Registration Error", error: error.message })
    }
}







//? Common Auth 

//* Login for admin and user

exports.login = async (req, res) => {
    try {
        const { email, password, userType } = req.body;

        // Check if required fields are provided
        if (!email || !password || !userType) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        let userModel, errorMessage;

        if (userType === 'admin') {
            userModel = Admin;
            errorMessage = 'Admin not found';
        } else if (userType === 'user') {
            userModel = User;
            errorMessage = 'User not found';
        } else {
            return res.status(400).json({ success: false, message: 'Invalid userType' });
        }

        // Find user by email
        const user = await userModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: errorMessage });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // Expires in 30 days
                id: user._id,
                userType: userType
            },
            process.env.AUTH_SECRET_KEY
        );

        // Respond with success and token
        res.status(200).json({ success: true, message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Login Error', error: error.message });
    }
};
