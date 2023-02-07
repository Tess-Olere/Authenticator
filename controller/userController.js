const User = require('../model/user');
const bcrypt = require('bcrypt');
// error handling
//integrate views
// authentication - jsonwebtoken



const register = async (req, res) => {
    const { email, password } = req.body;
    // make sure they provide email and password
    if (!email || !password) {
        res.status(400).json({success: false, message: 'Please provide necessary information'})
    }
    // email hasn't been registered
    const userExist = await User.findOne({email})
    if (userExist) {
        return res.status(400).json({success: false, message: 'Email already exists'})
    }
    // protect user information - hashing algorithms
    const salt = await bcrypt.genSalt()
    const hashedPassword =await bcrypt.hash(password, salt)

    // create the user
    try {
        const user = await User.create({email, password: hashedPassword})
        res.status(201).json({success: true, data: user})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error})
    }
}

const login = async (req, res) => {
    // email and password
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({success: false, message: 'Please provide necessary email and password'})
    }
    // user has registered
    const user = await User.findOne({email: email})
    if (!user) {
        return res.status(400).json({success: false, message: 'email not found, Please go and register'})
    }
    // provide the correct details, email and password
    const authenticated = user.email === email && (await bcrypt.compare(password, user.password))
    if(authenticated) {
        user.password = ' '
        return res.status(200).json({success: true, data: user})
    } else {
        res.status(401).json({success: false, message: 'Invalid password or email'})
    }
}

module.exports = {register, login}