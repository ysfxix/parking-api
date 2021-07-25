const express = require("express")
const router = express.Router()
// const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Booking = require('../models/Booking')
const Parking = require('../models/Parking')

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

            //  TODO 1: 
            /*
            If the user fails to reach parking within 15/30 min then cancel his booking

            Find all bookings whose booking expiry date has expired and
            mark those parking number as available (isBooked = false)
           */

            // let expiredBookings = await Booking.deleteMany({ dateBookingExpiry: { $lte: new Date() } })


            //  TODO 2: [DONE]
            /*
             find total number of occupied slots.
             if total number of occupied slots >= 60  (50%) 
             then waiting time reduced to 15 mins from 30 mins
            */

            totalBookedSlots = await Parking.countDocuments({ isBooked: 1 })
            let bookingExpiryDuration = (totalBookedSlots >= 60) ? 15 : 30



            //  1 : Find an empty parking slot
            let availableParkingSlot = await Parking.findOne({ isReserved: user.userCategory, isBooked: 0 })
            // console.log('availableParkingSlot', availableParkingSlot);

            let objBooking = {
                userID: user._id,
                parkingNumber: availableParkingSlot.parkingNumber,
                dateBookingExpiry: Date.now() + (bookingExpiryDuration * 60000)
            }

            // 2: Do a booking for user 
            let booking = await Booking.create(objBooking)
            // console.log("Booking", booking);

            // 3: Mark the slot as booked
            availableParkingSlot.isBooked = true
            await availableParkingSlot.save()


            // let payloadBooking = {
            //     parkingNumber: booking.parkingNumber,
            //     bookingDate: booking.dateBooked,
            //     expiryDate: booking.dateBookingExpiry
            // }

            return res.status(200).json({
                success: true,
                booking
            })
        }
        else {
            return res.status(403).json({
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