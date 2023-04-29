const mongoose = require("mongoose");

const uptimePercDailySchema = mongoose.Schema({
    trt_id:{
        type: Number
    },
    uptime_perc:{
        type: Number
    },
    event_dt:{
        type: String
    }
}, {collection: 'uptime_percentage_daily'});

module.exports = mongoose.model("uptimePercDailyData", uptimePercDailySchema);