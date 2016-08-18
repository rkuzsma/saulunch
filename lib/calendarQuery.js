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
const Promise = require('bluebird');

module.exports.queryByDate = function(calendar, date) {
  let dateKey = date.toISOString();
  return calendar[dateKey];
}

module.exports.queryByToday = function(calendar, date) {
  let dateKey = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
  return calendar[dateKey];
}

// Return array of all remaining calendar days' entries for the current week.
module.exports.queryByThisWeek = function(calendar) {
  let today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return calendar[dateKey];
}

// Return array of all calendar items next week (Monday through Friday)
module.exports.queryByNextWeek = function(calendar) {

}
