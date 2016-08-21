// Functions to query a calendar for food and events that fall within a date range.
//
// For reference:
//
// Our Calendar object's hashmap of dates are keyed off ISO formatted date strings
// with only year, month (0-based), and day specified (no time).
//
// If today is August 16, 2016, then:
//
//> new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
//> '2016-08-16T04:00:00.000Z'
//
//> new Date(2016, 7, 16).toISOString()
//> '2016-08-16T04:00:00.000Z'
//
"use strict";
const Promise = require('bluebird'),
  weekDates = require(__dirname + '/../lib/weekDates.js');

module.exports.queryByDate = function(calendar, dateObj) {
  let dateKey = dateObj.toISOString();
  return calendar[dateKey];
}

module.exports.queryByToday = function(calendar) {
  let today = new Date();
  let dateKey = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
  return calendar[dateKey];
}

module.exports.queryByTomorrow = function(calendar) {
  let today = new Date();
  let tomorrow = weekDates.dayAfter(today);
  let dateKey = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()).toISOString();
  return calendar[dateKey];
}

// Return array of all remaining calendar days' entries for the current week.
module.exports.queryByThisWeek = function(calendar) {
  let today = new Date();
  return _queryByWeek(calendar, today);
}

// Return array of all calendar items next week (Monday through Friday)
module.exports.queryByNextWeek = function(calendar) {
  let today = new Date();
  let nextSunday = weekDates.nextSunday(today);
  return _queryByWeek(calendar, nextSunday);
}

var _queryByWeek = function(calendar, dateObj) {
  let dates = weekDates.remainingWeekDates(dateObj);
  let entries = [];
  dates.forEach(date => {
    let dateKey = date.toISOString();
    let entry = calendar[dateKey];
    if (entry !== undefined) {
      entries.push(entry);
    }
  });
  return entries;
}
