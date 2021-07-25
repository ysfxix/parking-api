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
        default: 0
    },
    isParked: {
        type: Boolean,
        default: 0
    }
})

const Parking = mongoose.model('Parking', ParkingSchema)

module.exports = Parking;