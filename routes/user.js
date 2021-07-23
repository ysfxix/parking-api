const express = require("express")
const router = express.Router()
const User = require('../models/User')

router.get("/", async (req, res) => {
    try {
        let users = await User.find({})
        // console.log(users);

        return res.status(200).json({
            success: true,
            users
        })



        if (!users) {
            return res.status(400).json({
                success: false,
                error: "Invalid credentials [email not found] "
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