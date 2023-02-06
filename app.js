require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const notFound = require('./middleware/notFound')
const userRouter = require('./routes/userRouter')
mongoose.set('strictQuery', true);

// middleware
app.use(express.json())

// routes
app.use(userRouter)

// error found
app.use(notFound)

const start = async () => {
    try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}...`);   
    })
} catch (error) {
    console.log(error);
}
}
start();