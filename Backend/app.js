
//* Using .env file
require("dotenv").config()


//* Express for routing
const express = require("express")
const PORT = 8000 || process.env.PORT
const app = express()


//* app using 
app.use(express.json())

//* importing routes 
const authRoute = require('./routes/authRoute')
const adminRoute = require("./routes/adminRoute")
const messageRoute = require('./routes/messageRoute')
const userRoute = require('./routes/userRoute')

//*DB Connection
const connectDB = require('./DB/connection');
connectDB();   


//* Using cors for security purpose
const cors = require('cors');
app.use(cors());


//* Authentication route
app.use('/api', authRoute)

//* Admin route
app.use('/api', adminRoute)

//* User route
app.use('/api', userRoute)

//* Message route
app.use('/api', messageRoute)

//* App listening
app.listen(PORT, ()=>{
    console.log(`PORT is running on http://localhost:${PORT}`);
})