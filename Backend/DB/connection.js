const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`DB is Connected 🚀`);
    } catch (error) {
        console.error('Error on DB connection:', error);
        // Exit the process if the database connection fails
        process.exit(1);
    }
};

module.exports = connectDB;
