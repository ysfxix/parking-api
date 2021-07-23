const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_HOST_REMOTE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true
        })
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error.message)
    }
}

module.exports = connectDB;