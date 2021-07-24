const express = require("express")
const router = express.Router()
// const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Booking = require('../models/Booking')

router.post("/", async (req, res) => {
    let { email, password } = req.body; //console.log(req.body);

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: "[1] Please provide email and password"
        })
    }

    try {
        let user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(400).json({
                success: false,
                error: "Invalid credentials [email not found] "
            })
        }
        // console.log('User found', user);

        const isMatch = await user.matchPasswords(password)
        // console.log('Password match?: ', isMatch)

        // Password matched!
        if (isMatch) {
            let payload = user.toJSON()
            delete payload['password']
            delete payload['dateAdded']
            delete payload['emailVerified']
            delete payload['__v']
            // console.log('user', user); // console.log('payload', payload);

            // TODO 1 : Find an empty parking slot
            // TODO 2 : Do a booking for user  

            let objBooking = {
                userID: user._id,
                parkingNumber: 12,
            }
            let booking = await Booking.create(objBooking)

            console.log("Booking", booking);

            return res.status(200).json({
                success: true,
                booking
            })
        }
        else {
            res.status(403).json({
                success: false,
                error: "Invalid credentials [Password do not match]"
            })
        }
    } catch (error) {
        console.log(`Error: ${error.message}`)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

module.exports = router