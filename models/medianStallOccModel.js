const mongoose = require("mongoose");

const medianStallOccSchema = mongoose.Schema({
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
}, {collection: 'median_stallOccupancy'});

module.exports = mongoose.model("medianStallOccData", medianStallOccSchema);