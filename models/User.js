const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    registrationNumber: {
        type: String,
        required: [true, "Please provide Registration number of your car"],
        unique: [true, 'This Registration number already exists']
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

const User = mongoose.model('User', userSchema)

module.exports = User;