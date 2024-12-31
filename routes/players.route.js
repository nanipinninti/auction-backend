const express = require("express");
const {addPlayers} = require("../controllers/add.players")
const {verifyCustomerToken} = require("../middleware/customer.token.verification")
const router = express.Router();

router.post("/add",verifyCustomerToken,addPlayers)
module.exports = router;