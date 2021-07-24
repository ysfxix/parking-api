const mongoose = require("mongoose");
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateBooked: {
        type: Date,
        default: Date.now()
    },
    dateBookingExpiry: {
        type: Date,
        default: Date.now() + (30 * 60000)
    },
    parkingNumber: {
        type: Number,
        required: [true, "parkingNumber not provided"],
    },
    dateEntry: {
        type: Date,
        default: null
    },
    dateExit: {
        type: Date,
        default: null
    }
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking;