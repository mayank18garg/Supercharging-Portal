const express = require("express");
const router = express.Router();

const { getUptimePercData } = require("../controllers/uptimePercController");


router.route("/").get(getUptimePercData); 

module.exports = router;