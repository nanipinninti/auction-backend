const express = require("express");
const {SoldPlayer} = require("../controllers/auction.actions");
const {verifyAuctioneerToken} = require("../middleware/auctioneer.token.verification")
const router = express.Router();

router.post("/sold-player", verifyAuctioneerToken,SoldPlayer);

module.exports = router;