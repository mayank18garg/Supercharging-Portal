const asyncHandler = require("express-async-handler");
const medianStallOccData = require("../models/medianStallOccModel");


const getMedianStallOccData = asyncHandler(async (req, res) => {

    const trt_id = parseInt(req.query.trt_id);
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    // console.log(start_date, end_date, trt_id);
    const data = await medianStallOccData.aggregate([
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
    // console.log(data);
    let current_date = new Date(start_date);
    let ends_date = new Date(end_date);
    let i = 0;
    let ans = [];

    while(current_date <= ends_date){
        let date = current_date.toISOString().split('T')[0];
        // console.log(date);
        if(i < data.length && date == data[i].event_dt){
            ans.push({"median": data[i].median, "stallOccupancy": data[i].stall_occupancy, "week": date});
            i++;
        }
        else{
            ans.push({"median": 0, "stallOccupancy": 0, "week": date});
        }

        current_date.setDate(current_date.getDate() + 7);
    }

    res.status(200).json(ans);
});

module.exports = { getMedianStallOccData };