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

// Return all remaining days in a given week
// TODO THIS IS NOT WORKING YET.
// Source: http://codereview.stackexchange.com/questions/109856/get-all-remaining-days-of-the-week
var remainingDays = function(weekday) {
  var current = new Date,
      year = current.getFullYear(),
      dates = [];

  // a simple helper function
  function nextDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  }

  // as long we're in the same year, keep adding 1 day,
  // and store the ones that match the weekday we're looking for
  while(current.getFullYear() === year) {
    if(current.getDay() === weekday) {
      dates.push(current);
    }
    current = nextDay(current);
  }

  return dates;
}
