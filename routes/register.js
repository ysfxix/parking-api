const express = require("express")
const router = express.Router()
const User = require('../models/User')

router.post("/", async (req, res) => {
    const { registrationNumber, password } = req.body // console.log(req.body);

    try {
        const user = await User.create({
            registrationNumber,
            password,
        })

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