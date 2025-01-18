const express = require("express");
const {SoldPlayer,SendPlayer,StartAuction,PauseAuction,EndAuction,RaiseBid} = require("../controllers/auction.actions");
const {verifyAuctioneerToken} = require("../middleware/auctioneer.token.verification")
const {validateAuction} = require("../middleware/validate.auction")
const router = express.Router();

router.post("/sold-player", verifyAuctioneerToken,SoldPlayer);
router.post("/start-auction", verifyAuctioneerToken,validateAuction,StartAuction);
router.post("/pause-auction", verifyAuctioneerToken,validateAuction,PauseAuction);
router.post("/end-auction", verifyAuctioneerToken,validateAuction,EndAuction);
router.post("/send-player", verifyAuctioneerToken,validateAuction,SendPlayer);
router.post("/raise-bid", verifyAuctioneerToken,validateAuction,RaiseBid);

module.exports = router;