require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
var morgan = require('morgan')

const indexRouter = require("./routes/index")
const loginRouter = require("./routes/login")
const registerRouter = require("./routes/register")

var bodyParser = require('body-parser')
// const auth = require("./middleware/auth")
const connectDB = require('./db')
const User = require('./models/User')

connectDB()

// app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.redirect(301, process.env.PARKING_API_BASE_URL);
});

app.use(process.env.PARKING_API_BASE_URL, indexRouter)
app.use(`${process.env.PARKING_API_BASE_URL}/register`, registerRouter)
app.use(`${process.env.PARKING_API_BASE_URL}/login`, loginRouter)

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