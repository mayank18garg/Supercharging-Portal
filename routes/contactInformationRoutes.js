const express = require("express");
const router = express.Router();

const {updateContactInfo} = require("../controllers/contactInfoController");

router.route("/updateContact").put(updateContactInfo);

module.exports = router;