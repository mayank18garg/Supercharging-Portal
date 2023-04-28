const moment = require("moment")


function getWeekStartDate(dateString){
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

function getYearStartDate(dateString) {
    const date = moment(dateString, 'YYYY-MM--DD');
    const yearStart = date.startOf('year');
    return yearStart.format('YYYY-MM-DD');
}

function getYearEndDate(dateString) {
    const date = moment(dateString, 'YYYY-MM--DD');
    const yearEnd = date.endOf('year');
    return yearEnd.format('YYYY-MM-DD');
}

module.exports = { getWeekStartDate, getWeekEndDate, getMonthStartDate, getMonthEndDate, getYearStartDate, getYearEndDate};