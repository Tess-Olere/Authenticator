require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const notFound = require('./middleware/notFound')
//const userRouter = require('./routes/userRouter')
const newRouter = require('./routes/newUserRouter');
const cookieparser = require('cookie-parser');
mongoose.set('strictQuery', true);

//configuring view engine
app.set("view engine", "ejs");
// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser())

// routes
app.use(newRouter)

//set cookies
app.get('/example', (req, res) => {
    res.cookie('isAdmin', true);
    //milliseconds
    res.cookie('another', false, {maxAge: 24 * 60 * 60 * 1000, secure: true, httpOnly: true});
    res.send('cookie set')  
})
app.get('/get', (req, res) => {
    const cookies = req.cookies;
    // to destructure
    const { isAdmin} = cookies
    res.json(cookies)
})

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

