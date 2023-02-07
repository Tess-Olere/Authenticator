// email- string, unique, required, validate
// password- string, unique, required, minlenght

const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

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

// mongoose hooks(or middleware)
// functions that protect user information before saving
// gen salt, hash using the salt
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


module.exports = mongoose.model('User', userSchema)