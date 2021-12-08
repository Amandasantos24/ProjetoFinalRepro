const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const database = require("./database/mongoConfig")


const salaoDeBelezaRoutes = require("./routes/salaoDeBelezaRoutes")

const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())

app.use("/salaoDeBeleza", salaoDeBelezaRoutes)








database.connect()

module.exports = app