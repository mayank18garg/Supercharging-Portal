const express = require("express");
const router = express.Router();
const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {createTicket, getissueTickets} = require("../controllers/issueTicketController");


router.route("/").post(upload.single('file'), createTicket); 
router.route("/").get(getissueTickets);

module.exports = router;