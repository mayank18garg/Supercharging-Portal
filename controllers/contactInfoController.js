const asyncHandler = require("express-async-handler");
const transporter = require("./emailServer");

const updateContactInfo = asyncHandler(async (req, res) => {

    const emailText = JSON.stringify(req.body);

    const message = {
        from: "no-reply@supercharging-portal.com",
        to: "mgarg20@asu.edu",
        subject: `Update Contact Info`,
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

module.exports = {updateContactInfo};