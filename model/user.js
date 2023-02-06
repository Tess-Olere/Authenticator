// email- string, unique, required, validate
// password- string, unique, required, minlenght

const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'This email has already been registered'],
        required: [true, 'Please provide an email'],
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide an email'],
        minlength: [10, 'The minimum length of the password is 10']
    },
    
},
 {timestamps: true}
)
module.exports = mongoose.model('User', userSchema)