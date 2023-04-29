const mongoose = require("mongoose");

const uptimePercWeeklySchema = mongoose.Schema({
    trt_id:{
        type: Number
    },
    uptime_perc:{
        type: Number
    },
    event_dt:{
        type: String
    }
}, {collection: 'uptime_percentage_weekly'});

module.exports = mongoose.model("uptimePercWeeklyData", uptimePercWeeklySchema);