// Return all remaining days in a given week.
// Assumes the week begins on Sunday, ends on Saturday.
// Inspired by http://codereview.stackexchange.com/questions/109856/get-all-remaining-days-of-the-week

"use strict";

const SATURDAY = 6, SUNDAY = 0;

module.exports.dayAfter = function(dateObj) {
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1);
}

module.exports.remainingWeekDates = function(startingDate) {
  let current = startingDate, dates = [];

  // as long we're in the same week, add 1 day
  while(current.getDay() < SATURDAY) {
    dates.push(current);
    current = this.dayAfter(current);
  }
  dates.push(current);

  return dates;
}

// Return the next available Sunday from (and excluding) startingDate
module.exports.nextSunday = function(startingDate) {
  let current = this.dayAfter(startingDate);
  while(current.getDay() != SUNDAY) {
    current = this.dayAfter(current);
  }
  return current;
}
