const mongoose = require("mongoose");

const trtId_registeredSchema = mongoose.Schema({
    trt_id:{
        type: Number
    }
}, {collection: 'trt_id_registered', versionKey: false});

module.exports = mongoose.model("trtId_registeredData", trtId_registeredSchema);