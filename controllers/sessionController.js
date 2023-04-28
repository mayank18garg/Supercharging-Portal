const asyncHandler = require("express-async-handler");
const sessionData = require("../models/sessionModel");
const moment = require('moment');

const getSessionDatas = asyncHandler(async (req, res) => {
    const data = await sessionData.find().limit(10);
    res.status(200).json(data);
});

function getWeekStartDate(dateString) {
    const date = moment(dateString, 'YYYY-MM-DD');
    const weekStart = date.isoWeekday(1);
    return weekStart.format('YYYY-MM-DD');
}

function getWeekEndDate(dateString) {
    const date = moment(dateString, 'YYYY-MM-DD');
    const weekEnd = date.isoWeekday(7);
    return weekEnd.format('YYYY-MM-DD');
}

function getMonthStartDate(dateString) {
    const date = moment(dateString, 'YYYY-MM--DD');
    const monthStart = date.startOf('month');
    return monthStart.format('YYYY-MM-DD');
}

function getMonthEndDate(dateString) {
    const date = moment(dateString, 'YYYY-MM--DD');
    const monthEnd = date.endOf('month');
    return monthEnd.format('YYYY-MM-DD');
}

const getSessionData = asyncHandler(async (req, res) => {
    
    const trt_id = parseInt(req.query.trt_id);
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    
    const diffInDays = (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24) + 1;
    // console.log(diffInDays) ;
    
    if(diffInDays <= 7){
        const data = await sessionData.aggregate([
            {
                "$match":{
                    "trt_id": trt_id,
                    "charge_date": {
                        "$gte": start_date,
                        "$lte": end_date
                    }
                }
            },
            {
                "$group": {
                    "_id": {
                        "vehicle_id": "$vehicle_id",
                        "charge_date": "$charge_date"
                    },
                    "min_charge_date" : { "$first" : "$min_charge_date"}
                }
            },
            {
                "$group": {
                    "_id" : {
                        "charge_date" : "$_id.charge_date"
                    },
                    "new_user" : {"$sum" : {"$cond" : { "if" : {"$eq": ["$_id.charge_date", "$min_charge_date"]}, "then":1, "else":0  }} },
                    "distinct_user" : { "$sum" : 1}
                }
            },
            {
                "$project": {
                    "_id" : 0,
                    "charge_date" : "$_id.charge_date",
                    "new_user" : 1,
                    "distinct_user" : 1
                }
            },
            {
                "$sort": { "charge_date": 1 }
            }

        ]);
        let ans = [];
        let current_date = new Date(start_date);
        let ends_date = new Date(end_date);
        let i = 0;
        while(current_date <= ends_date){
            let date = current_date.toISOString().split('T')[0];
            if(i < data.length && date === data[i].charge_date){
                ans.push({"new_user" : data[i].new_user, "returning_user" : data[i].distinct_user - data[i].new_user, "week" : date});
                i++;
            }
            else ans.push({"new_user" : 0, "returning_user" : 0, "week" : date});

            current_date.setDate(current_date.getDate() + 1);
        }
        res.status(200).json(ans);
    }
    else if(diffInDays <= 56) {
        const week_start_date = getWeekStartDate(start_date);
        const week_end_date = getWeekEndDate(end_date);
        const data = await sessionData.aggregate([
            {
                "$match":{
                    "trt_id": trt_id,
                    "charge_date":{
                        "$gte": week_start_date,
                        "$lte": week_end_date
                    }
                }
            },
            {
                "$addFields":{
                    "charge_date":{ "$toDate" : "$charge_date" },
                    "min_charge_date":{ "$toDate":"$min_charge_date" }
                }
            },
            {
                "$addFields":{
                    "week_bin_charge_date":{
                        "$dateTrunc":{
                            "date": "$charge_date",
                            "unit" : "week",
                            "startOfWeek": "Monday"
                        }
                    },
                    "week_bin_min_charge_date":{
                        "$dateTrunc":{
                            "date": "$min_charge_date",
                            "unit": "week",
                            "startOfWeek": "Monday"
                        }
                    }
                }
            },
            {
                "$group": {
                    "_id": {
                        "vehicle_id": "$vehicle_id",
                        "week": "$week_bin_charge_date"
                    },
                    "week_bin_min_charge_date" : { "$first" : "$week_bin_min_charge_date"}
                }
            },
            {
                "$group": {
                    "_id" : {
                        "week" : "$_id.week"
                    },
                    "new_user" : {"$sum" : {"$cond" : { "if" : {"$eq": ["$_id.week", "$week_bin_min_charge_date"]}, "then":1, "else":0  }} },
                    "distinct_user" : { "$sum" : 1}
                }
            },
            {
                "$project": {
                    "_id" : 0,
                    "week" : { "$dateToString" : {"date": "$_id.week", "format": "%Y-%m-%d"}},
                    "new_user" : 1,
                    "distinct_user" : 1
                }
            },
            {
                "$sort": { "week": 1 }
            }
        ]);

        // let current_date = new Date(start_date);
        // let ends_date = new Date(end_date);
        // let i = 0;
        let ans = [];

        // while( current_date <= ends_date){
        //     // current_date.setMinutes(current_date.setMinutes() + current_date.getTimezoneOffset());
        //     let date = current_date.toISOString().split('T')[0];
        //     // console.log(current_date);
        //     if(i < data.length && date === data[i].week){
        //         ans.push({"new_user" : data[i].new_user, "returning_user" : data[i].distinct_user - data[i].new_user, "week" : date});
        //         i++;
        //     }
        //     else ans.push({"new_user" : 0, "returning_user" : 0, "week" : date});
        //     current_date.setDate(current_date.getDate() + 7);
        // }
        // console.log(ans);
        // if(!data || Object.keys(data).length === 0){
        //     res.status(404);
        //     throw new Error("Session_data not found");
        // }

        for(let i=0; i<data.length; i++){
            ans.push({
                "new_user": data[i].new_user,
                "returning_user": data[i].distinct_user - data[i].new_user,
                "week": data[i].week
            })
        }
        res.status(200).json(ans);
    }
    else{
        const month_start_date = getMonthStartDate(start_date);
        const month_end_date = getMonthEndDate(end_date);
        
        const data = await sessionData.aggregate([
            {
                "$match":{
                    "trt_id": trt_id,
                    "charge_date":{
                        "$gte": month_start_date,
                        "$lte": month_end_date
                    }
                }
            },
            {
                "$addFields":{
                    "charge_date":{ "$toDate" : "$charge_date" },
                    "min_charge_date":{ "$toDate":"$min_charge_date" }
                }
            },
            {
                "$addFields":{
                    "month_bin_charge_date":{
                        "$dateTrunc":{
                            "date": "$charge_date",
                            "unit" : "month",
                        }
                    },
                    "month_bin_min_charge_date":{
                        "$dateTrunc":{
                            "date": "$min_charge_date",
                            "unit": "month",
                        }
                    }
                }
            },
            {
                "$group": {
                    "_id": {
                        "vehicle_id": "$vehicle_id",
                        "month": "$month_bin_charge_date"
                    },
                    "month_bin_min_charge_date" : { "$first" : "$month_bin_min_charge_date"}
                }
            },
            {
                "$group": {
                    "_id" : {
                        "month" : "$_id.month"
                    },
                    "new_user" : {"$sum" : {"$cond" : { "if" : {"$eq": ["$_id.month", "$month_bin_min_charge_date"]}, "then":1, "else":0  }} },
                    "distinct_user" : { "$sum" : 1}
                }
            },
            {
                "$project": {
                    "_id" : 0,
                    "month" : { "$dateToString" : {"date": "$_id.month", "format": "%Y-%m-%d"}},
                    "new_user" : 1,
                    "distinct_user" : 1
                }
            },
            {
                "$sort": { "month": 1 }
            }
        ]);

        let ans = [];
        for(let i=0; i<data.length; i++){
            ans.push({
                "new_user": data[i].new_user,
                "returning_user": data[i].distinct_user - data[i].new_user,
                "week": data[i].month
            })
        }
        res.status(200).json(ans);

    }
});


module.exports = { getSessionDatas, getSessionData };