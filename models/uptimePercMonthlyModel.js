const mongoose = require("mongoose");

const uptimePercMonthlySchema = mongoose.Schema({
    trt_id:{
        type: Number
    },
    uptime_perc:{
        type: Number
    },
    event_dt:{
        type: String
    }
}, {collection: 'uptime_percentage_monthly'});

module.exports = mongoose.model("uptimePercMonthlyData", uptimePercMonthlySchema);