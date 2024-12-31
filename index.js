const express = require("express")
const connectDB = require("./db/connectDB")
require("dotenv").config()
// import adminAuthRouter from './routes/admin.auth.route'
const app = express()

app.use(express.json()); // Add this line to parse JSON bodies

const adminAuthRouter = require('./routes/admin.auth.route')
app.use("/admin", adminAuthRouter)

const customerAuthRouter = require("./routes/customer.auth.route")
app.use("/customer",customerAuthRouter)

const auctionRouter = require("./routes/auction.route")
app.use("/auction",auctionRouter)

const playersRouter = require("./routes/players.route")
app.use("/players",playersRouter)

const franchiseAuthRouter = require('./routes/franchise.auth.route')
app.use("/franchise", franchiseAuthRouter)

const auctioneerAuthRouter = require("./routes/auctioneer.auth.route")
app.use("/auctioneer",auctioneerAuthRouter)

const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
    connectDB()
    console.log("Port running in ",PORT)
})