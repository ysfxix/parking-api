const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Welcome to Parking Booking API")
})


module.exports = router