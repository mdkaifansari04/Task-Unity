
//* Using .env file
require("dotenv").config()


//* Express for routing
const express = require("express")
const PORT = 3000 || process.env.PORT
const app = express()


//* app using 
app.use(express.json())

//* importing routes 
const authRoute = require('./routes/authRoute')

//*DB Connection
const connectDB = require('./DB/connection');
connectDB();   


//* Authentication route
app.use('/api', authRoute)


//* App listening
app.listen(PORT, ()=>{
    console.log(`PORT is running on http://localhost:${PORT}`);
})