const express = require("express")
const router = express.Router()
const User = require('../models/User')
const Parking = require('../models/Parking')

router.get("/status", async (req, res) => {
    try {
        let [slotsOccupied, slotsAvailable] = await Promise.all([
            Parking.countDocuments({ isBooked: 1 }),
            Parking.countDocuments({ isBooked: 0 })
        ]);

        return res.status(200).json({
            success: true,
            slotsOccupied,
            slotsAvailable
        })
    } catch (error) {
        console.log(`Error: ${error.message}`)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

router.get("/availableslots", async (req, res) => {
    try {
        let slotsAvailable = await Parking.find({ isBooked: 0 })

        return res.status(200).json({
            success: true,
            slotsAvailable
        })
    } catch (error) {
        console.log(`Error: ${error.message}`)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})


router.get("/occupiedslots", async (req, res) => {
    try {
        let slotsOccupied = await Parking.find({ isBooked: 1 })

        return res.status(200).json({
            success: true,
            slotsOccupied
        })
    } catch (error) {
        console.log(`Error: ${error.message}`)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

module.exports = router