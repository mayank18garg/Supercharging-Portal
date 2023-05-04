const asyncHandler = require("express-async-handler");
const issueTicketData = require("../models/issueTicketModel");


const transporter = require("./emailServer");

const createTicket = asyncHandler(async (req, res) => {
    // const {userEmail, trt_id} = req.body;
    
    // console.log(req.formdata);
    // console.log("mayank", req.body.formValue.file);
    // console.log("sanket", req.body);
    // console.log("sankejltj;lafh;lahjf;");
    const {userEmail, title, site_name} = req.body;
    // console.log(userEmail, formValue, site_name);
    const trt_id = parseInt(req.body.trt_id);
    // console.log(trt_id);
    // const imageBuffer = Buffer.from(req.body.formValue.file);
    // console.log(imageBuffer);
    // console.log(req.body);
    // console.log(req);
    // console.log(typeof req.body);
    const emailText = JSON.stringify(req.body);
    // // console.log(userEmail, title, type);
    // if(!userEmail || !title){
    //     res.status(400);
    //     throw new Error("All fields are mandatory");
    // }
    console.log(userEmail, title, site_name, trt_id);
    // console.log("mayank####$$",formValue);
    const status = "In Progress";

    const data = await issueTicketData.create({
        userEmail,
        status,
        title,
        timestamp: new Date(),
        trt_id,
        site_name
    });

    res.status(201).json({});
    if(req.file){
        const message = {
            from: "no-reply@supercharging-portal.com",
            to: "mgarg20@asu.edu",
            subject: `Issue Ticket from ${userEmail}`,
            text: emailText,
            attachments: [{
                filename: req.file.originalname,
                content: req.file.buffer,
                // encoding: 'base64'
            }]
        };
        transporter.sendMail(message).then(info => {
            console.log({info});
          }).catch(console.error);
    }
    else{
        const message = {
            from: "no-reply@supercharging-portal.com",
            to: "mgarg20@asu.edu",
            subject: `Issue Ticket from ${userEmail}`,
            text: emailText,
        };
        transporter.sendMail(message).then(info => {
            console.log({info});
          }).catch(console.error);
    }
    // // const stringMessage = JSON.stringify(message);
    // // console.log(stringMessage);
    // transporter.verify().then(console.log).catch(console.error);
    

    
});

const getissueTickets = asyncHandler(async (req, res) => {
    // console.log("bjlahfalj");

    // const userEmail = req.query.userEmail;
    const trt_id = parseInt(req.query.trt_id);
    // console.log(typeof trt_id);
    const data = await issueTicketData.find({trt_id: trt_id});
    // if(!data || Object.keys(data).length === 0){
    //     res.status(404);
    //     throw new Error("No Tickets found");
    // }
    res.status(200).json(data);
});


const feedbackForm = asyncHandler(async (req, res) => {

    const emailText = JSON.stringify(req.body);
    console.log("Hello hello hello\n");
    const message = {
        from: "no-reply@supercharging-portal.com",
        to: "mgarg20@asu.edu",
        subject: `Feedback`,
        text: emailText
    };
    // // const stringMessage = JSON.stringify(message);
    // // console.log(stringMessage);
    transporter.verify().then(console.log).catch(console.error);
    transporter.sendMail(message).then(info => {
        console.log({info});
      }).catch(console.error);

    res.status(200).json({});

});

module.exports = {createTicket, getissueTickets, feedbackForm} ;