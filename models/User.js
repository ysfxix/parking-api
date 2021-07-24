const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, 'This email already exists'],
        match: [
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            "Please provide a valid email address"
        ]
    },
    firstName: {
        type: String,
        required: [true, "Please provide First name"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide Last name"],
    },
    registrationNumber: {
        type: String,
        required: [true, "Please provide Registration number of your car"],
        unique: [true, 'This Registration number already exists']
    },
    userCategory: {
        type: Number,
        "enum": [1, 2],
        required: [true, "Please provide User category (1 for Reserved | 2 for General)"],
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 4,
        select: false
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User;