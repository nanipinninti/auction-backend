const express = require("express");
const connectDB = require("./db/connectDB");
const verifyAuctioneerToken = require('./middleware/auctioneer.token.verification');
require("dotenv").config();

const app = express();
app.use(express.json());

const adminAuthRouter = require('./routes/admin.auth.route');
app.use("/admin", adminAuthRouter);

const customerAuthRouter = require("./routes/customer.auth.route");
app.use("/customer", customerAuthRouter);

const auctionRouter = require("./routes/auction.route");
app.use("/auction", auctionRouter);

const homeApis = require("./routes/home")
app.use("/auctions",homeApis)

const playersRouter = require("./routes/players.route");
app.use("/players", playersRouter);

const franchiseAuthRouter = require('./routes/franchise.auth.route');
app.use("/franchise", franchiseAuthRouter);

const auctioneerAuthRouter = require("./routes/auctioneer.auth.route");
app.use("/auctioneer", auctioneerAuthRouter);

const auctionActions = require("./routes/auction.actions");
app.use("/auction-actions", auctionActions);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    connectDB();
    console.log("Port running on", PORT);
});
