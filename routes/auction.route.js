const express = require("express");
const {addAuction,addSets} = require("../controllers/add.auction")
const {verifyCustomerToken} = require("../middleware/customer.token.verification")
const router = express.Router();

router.post("/add-auction",verifyCustomerToken,addAuction)
router.post("/add-sets",verifyCustomerToken,addSets)
module.exports = router;