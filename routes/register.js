const express = require("express")
const router = express.Router()
const User = require('../models/User')

router.post("/", async (req, res) => {
    // const { registrationNumber, password } = req.body; console.log(req.body);
    const registrationData = req.body

    try {
        const user = await User.create(registrationData)

        console.log('User created: ', user)
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        console.log('[DB Error]: ', error.message)
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})

module.exports = router