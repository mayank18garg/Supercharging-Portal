const asyncHandler = require("express-async-handler");

const medianStallOccDailyData = require("../models/medianStallOccDailyModel");
const medianStallOccWeeklyData = require("../models/medianStallOccWeeklyModel");
const medianStallOccMonthlyData = require("../models/medianStallOccMonthlyModel");

const { getWeekStartDate, getWeekEndDate, getMonthStartDate, getMonthEndDate } = require("../Utils/getStartDate");

const getMedianStallOccData = asyncHandler(async (req, res) => {

    const trt_id = parseInt(req.query.trt_id);
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    // console.log(start_date, end_date, trt_id);

    const diffInDays = (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24) + 1;

    if(diffInDays <= 7){
        const data = await medianStallOccDailyData.aggregate([
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
                "median": data[i].median.toFixed(2),
                "stallOccupancy": data[i].stall_occupancy,
                "week": data[i].event_dt
            })
        }
        res.status(200).json(ans);
    }
    else if(diffInDays <= 56){
        const week_start_date = getWeekStartDate(start_date);
        const week_end_date = getWeekEndDate(end_date);

        const data = await medianStallOccWeeklyData.aggregate([
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
                "median": data[i].median.toFixed(2),
                "stallOccupancy": data[i].stall_occupancy,
                "week": data[i].event_dt
            })
        }
        res.status(200).json(ans);

    }
    else{
        const month_start_date = getMonthStartDate(start_date);
        const month_end_date = getMonthEndDate(end_date);

        const data = await medianStallOccMonthlyData.aggregate([
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
            ans.push({
                "median": data[i].median.toFixed(2),
                "stallOccupancy": data[i].stall_occupancy,
                "week": data[i].event_dt
            })
        }
        res.status(200).json(ans);
    }
});

module.exports = { getMedianStallOccData };