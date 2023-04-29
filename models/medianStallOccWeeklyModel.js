const mongoose = require("mongoose");

const medianStallOccWeeklySchema = mongoose.Schema({
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
}, {collection: 'median_stallOcc_Weekly'});

module.exports = mongoose.model("medianStallOccWeeklyData", medianStallOccWeeklySchema);