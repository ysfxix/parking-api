const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ParkingSchema = new Schema({
    parkingNumber: {
        type: Number,
        required: true,
        unique: true
    },
    isReserved: {
        type: Boolean,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: null
    },
    isParked: {
        type: Boolean,
        default: null
    }
})

const Parking = mongoose.model('Parking', ParkingSchema)

module.exports = Parking;