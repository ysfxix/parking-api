require('dotenv').config({ path: '../.env' })

const connectDB = require('../db')
const Parking = require('../models/Parking')
const parkingData = require('../data/parking-slots-dump.json')

const importData = async () => {
    try {
        await connectDB()
        let parking = await Parking.insertMany(parkingData)
        console.log('Data imported into MongoDB successfully!');
    } catch (error) {
        console.log('Error inserting data into MongoDB: ', error.message);
    }

    process.exit(0)
}

importData()
