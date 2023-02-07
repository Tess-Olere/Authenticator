const Users = require('../model/user')
const bcrypt = require('bcrypt');
const { application } = require('express');

const handleErrors = (err) => {
    // err messages and err codes - 11000
    let errors = { email: "", password: ""}
    if (err.code === 11000){
        errors.email = 'Email already in use'
        return errors;
    }
    if (err.message === 'User not registered yet') {
        errors.email = 'This Email has not been registered';
        return errors;
    }
    if (err.message === 'Invalid email or password') {
        errors.email = 'Invalid email or password';
        errors.password = 'Invalid email or password';
        return errors;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

const getregisterpage = (req, res)=>{
    res.render('signUp')
}

const getloginpage = (req, res)=>{
    res.render('login')
}

const getdashboard = (req, res)=>{
    res.render('dashboard')
}

const register = async (req, res) => {
  const { email, password } = req.body
    try {
        // const user info
        // create the user on the data base
        const user = await Users.create({ email, password })
        res.status(201).json ({success: true, data: user})
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({errors})
        // handle errors in the catch block
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            res.status(403).json({ success: false, message: 'Please provide email or password'})
        }
        const user = await Users.findOne({email})
        if (user) {
            const authenticated = await bcrypt.compare(password, user.password) 
            if (authenticated) {
               return res.status(200).json({ success: true, data: user })
            }
            throw Error('Invalid email or password')
        }
        throw Error('User not registered yet')
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({errors})
    }
}

module.exports = { register, login, getregisterpage, getloginpage, getdashboard}