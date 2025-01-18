const express = require("express");
const {SoldPlayers,UnSoldPlayers,TopBuys,CurrentStatus} = require("../controllers/auction.details")
const router = express.Router();

router.get("/sold-players",SoldPlayers);
router.get("/un-sold-players",UnSoldPlayers);
router.get("/top-buys",TopBuys);
router.get("/status",CurrentStatus);

module.exports = router;