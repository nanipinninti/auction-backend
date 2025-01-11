const express = require("express");
const {UpcomingAuctions,CompletedAuctions} = require("../controllers/home")
const router = express.Router();

router.get("/upcoming",UpcomingAuctions)
router.get("/completed",CompletedAuctions)

module.exports = router;