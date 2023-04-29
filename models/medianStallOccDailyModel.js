const mongoose = require("mongoose");

const medianStallOccDailySchema = mongoose.Schema({
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
}, {collection: 'median_stallOcc_Daily'});

module.exports = mongoose.model("medianStallOccDailyData", medianStallOccDailySchema);