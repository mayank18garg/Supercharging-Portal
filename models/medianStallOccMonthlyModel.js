const mongoose = require("mongoose");

const medianStallOccMonthlySchema = mongoose.Schema({
    trt_id:{
        type: Number
    },
    median:{
        type: Number
    },
    stall_occupancy:{
        type: Number
    },
    event_dt:{
        type: String
    }
}, {collection: 'median_stallOcc_Monthly'});

module.exports = mongoose.model("medianStallOccMonthlyData", medianStallOccMonthlySchema);