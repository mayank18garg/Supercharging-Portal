const mongoose = require("mongoose");

const uptimePercSchema = mongoose.Schema({
    trt_id:{
        type: Number
    },
    uptime_perc:{
        type: Number
    },
    event_dt:{
        type: String
    }
}, {collection: 'uptime_percentage'});

module.exports = mongoose.model("uptimePercData", uptimePercSchema);