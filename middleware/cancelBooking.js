const Booking = require('../models/Booking')
const Parking = require('../models/Parking')

const cancelBooking = async (req, res, next) => {
    try {
        let expiredBookings = await Booking.find({ dateBookingExpiry: { $lte: new Date() } })
        // console.log(expiredBookings)

        expiredBookings.forEach(async (element) => {
            try {
                // console.log(element.parkingNumber)
                let parkingSlot = await Parking.findOne({ parkingNumber: element.parkingNumber })
                parkingSlot.isBooked = false
                parkingSlot.isParked = false
                await parkingSlot.save()
                console.log(`Parking slot ${element.parkingNumber} available now`);
            } catch (error) {
                console.log(`cancelBooking.js: ${error.message}`);
            }
        });

        let deletedExpiredBookings = await Booking.deleteMany({ dateBookingExpiry: { $lte: new Date() } })
        if (deletedExpiredBookings.count > 0) console.log(`${deletedExpiredBookings.count} expired booking(s) deleted`);


        next()
    } catch (error) {
        console.log(`cancelBooking.js: ${error.message}`);
    }
}

module.exports = cancelBooking