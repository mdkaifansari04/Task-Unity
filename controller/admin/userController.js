
const User = require('../../models/userSchema');
const bcrypt = require('bcrypt');

//? User CRUD 

//* Register User

exports.registerUser = async (req, res) => {
    try {
        const {
            email,
            password,
            phoneNo,
            type,
            languages,
            occupation,
            dob,
            role,
            skills,
            qualification,
            permanentAddress,
            correspondingAddress,
            name,
        } = req.body;

        // Check for required fields
        if (!email || !password || !phoneNo || !type || !name) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        if (password.length < 8) return res.status(400).json({ success: true, message: "Password must be at least 8 characters long" })

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            email,
            password: hashedPassword,
            phoneNo,
            type,
            languages,
            occupation,
            dob,
            role,
            skills,
            qualification,
            permanentAddress,
            correspondingAddress,
            name
        });

        // Response
        res.status(200).json({ success: true, message: 'User Created Successfully', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to register user', error: error.message });
    }
};


exports.updateUser = async (req, res) => {
    try {
        // Check if the user exists
        const existingUser = await User.findById(req.params.userId);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const updateUser = await User.findByIdAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true })

        res.status(200).json({success : true , message : "User updated successfully", user : updateUser})

    } catch (error) {
        res.status(500).json({ success: true, message: "Failed to update user", error: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming userId is part of the route

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete user, retry', error: error.message });
    }
};
