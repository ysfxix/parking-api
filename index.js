require('dotenv').config()

const API_BASE_PATH = process.env.PARKING_API_BASE_PATH

const express = require('express')
const app = express()
const mongoose = require('mongoose')
var morgan = require('morgan')

const indexRouter = require("./routes/index")
const userRouter = require("./routes/user")
const bookRouter = require("./routes/book")
const registerRouter = require("./routes/register")
const parkingRouter = require("./routes/parking")

var bodyParser = require('body-parser')
// const auth = require("./middleware/auth")
const connectDB = require('./db')
const User = require('./models/User')

connectDB()

// app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.redirect(301, API_BASE_PATH);
});

app.use(API_BASE_PATH, indexRouter)
app.use(`${API_BASE_PATH}/register`, registerRouter)
app.use(`${API_BASE_PATH}/book`, bookRouter)
app.use(`${API_BASE_PATH}/user`, userRouter)
app.use(`${API_BASE_PATH}/parking`, parkingRouter)

app.use((req, res, next) => {
    res.status(404).json("404 (Not found)")
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

function killProcess() {
    mongoose.connection.close(() => {
        console.log('Closing DB connection on app termination');
        process.exit(0);
    });
}

process.on('SIGINT', killProcess);
process.on('SIGTERM', killProcess);
process.on('uncaughtException', function (e) {
    console.log('[uncaughtException] app will be terminated: ', e.stack);
    killProcess();
});