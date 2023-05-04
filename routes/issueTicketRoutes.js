const express = require("express");
const router = express.Router();
const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {createTicket, getissueTickets, feedbackForm} = require("../controllers/issueTicketController");


router.route("/").post(upload.single('file'), createTicket); 
router.route("/").get(getissueTickets);
router.route("/feedback").put(feedbackForm);

module.exports = router;