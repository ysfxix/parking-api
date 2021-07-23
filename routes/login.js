const express = require("express")
const router = express.Router()
// const jwt = require('jsonwebtoken');
const User = require('../models/User')

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

        // Password matched! Create a JWT token and send it back
        if (isMatch) {
            let payload = user.toJSON()
            delete payload['password']
            delete payload['dateAdded']
            delete payload['emailVerified']
            delete payload['__v']
            // console.log('user', user); // console.log('payload', payload);

            jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
                if (err) {
                    console.log(err.message)
                    return res.status(500).json({
                        success: false,
                        error: err.message
                    })
                }
                else {
                    console.log(`${user.username} logged in [${Date.now()}]`);
                    res.status(200).json({
                        success: true,
                        token
                    })
                }
            });
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