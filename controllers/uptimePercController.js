const asyncHandler = require("express-async-handler");
const moment = require("moment");
const uptimePercDailyData = require("../models/uptimePercDailyModel");
const uptimePercWeeklyData = require("../models/uptimePercWeeklyModel");
const uptimePercMonthlyData = require("../models/uptimePercMonthlyModel");

const { getWeekStartDate, getWeekEndDate, getMonthStartDate, getMonthEndDate } = require("../Utils/getStartDate");

const getUptimePercData = asyncHandler(async (req, res) => {

    const trt_id = parseInt(req.query.trt_id);
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    // console.log(start_date, end_date, trt_id);

    const diffInDays = (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24) + 1;

    if(diffInDays <= 7){
        const data = await uptimePercDailyData.aggregate([
            {
                "$match":{
                    "trt_id": trt_id,
                    "event_dt":{
                        "$gte": start_date,
                        "$lte": end_date
                    }
                }
            },
            {
                "$project": {
                    "_id" : 0,
                }
            },
            {
                "$sort": { "event_dt": 1 }
            }
        ]);
        let ans = [];
        for(let i=0; i<data.length; i++){
            ans.push({
                "uptime_perc": data[i].uptime_perc.toFixed(2),
                "week": data[i].event_dt
            })
        }
        res.status(200).json(ans);
    }
    else if(diffInDays <= 56){
        const week_start_date = getWeekStartDate(start_date);
        const week_end_date = getWeekEndDate(end_date);

        const data = await uptimePercWeeklyData.aggregate([
            {
                "$match":{
                    "trt_id": trt_id,
                    "event_dt":{
                        "$gte": week_start_date,
                        "$lte": week_end_date
                    }
                }
            },
            {
                "$project": {
                    "_id" : 0,
                }
            },
            {
                "$sort": { "event_dt": 1 }
            }
        ]);
        let ans = [];
        for(let i=0; i<data.length; i++){
            ans.push({
                "uptime_perc": data[i].uptime_perc.toFixed(2),
                "week": data[i].event_dt
            })
        }
        res.status(200).json(ans);
    }
    else{
        const month_start_date = getMonthStartDate(start_date);
        const month_end_date = getMonthEndDate(end_date);

        const data = await uptimePercMonthlyData.aggregate([
            {
                "$match":{
                    "trt_id": trt_id,
                    "event_dt":{
                        "$gte": month_start_date,
                        "$lte": month_end_date
                    }
                }
            },
            {
                "$project": {
                    "_id" : 0,
                }
            },
            {
                "$sort": { "event_dt": 1 }
            }
        ]);
        let ans = [];
        for(let i=0; i<data.length; i++){
            const dateObj = moment(data[i].event_dt);
            ans.push({
                "uptime_perc": data[i].uptime_perc.toFixed(2),
                "week": dateObj.format('MMM YY')
            })
        }
        res.status(200).json(ans);
    }
});

module.exports = { getUptimePercData };