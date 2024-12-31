const express = require("express");
const {addAuction,addSets,addFranchises,addAuctioneers} = require("../controllers/add.auction")
const {verifyCustomerToken} = require("../middleware/customer.token.verification")
const router = express.Router();

router.post("/add-auction",verifyCustomerToken,addAuction)
router.post("/add-sets",verifyCustomerToken,addSets)
router.post("/add-franchises",verifyCustomerToken,addFranchises)
router.post("/add-auctioneers",verifyCustomerToken,addAuctioneers)
module.exports = router;