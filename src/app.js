const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const database = require("./database/mongoConfig")


const salaoDeBelezaRoutes = require("./routes/salaoDeBelezaRoutes")
const salaoAutenRoutes = require("./routes/salaoAutenRoutes");

const app = express()
database.connect()
dotenv.config()
app.use(cors())
app.use(express.json())

app.use("/salaoDeBeleza", salaoDeBelezaRoutes)
app.use("/salaoDeBeleza", salaoAutenRoutes);


module.exports = app