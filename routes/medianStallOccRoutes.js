const express = require("express");
const router = express.Router();

const { getMedianStallOccData } = require("../controllers/medianStallOccController");

// router.route("/").get(getKpiDatas);

router.route("/").get(getMedianStallOccData); 

module.exports = router;