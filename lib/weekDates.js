// Return all remaining days in a given week.
// Assumes the week begins on Sunday, ends on Saturday.
// Inspired by http://codereview.stackexchange.com/questions/109856/get-all-remaining-days-of-the-week

"use strict";

module.exports.remainingWeekDates = function(startingDate) {
  let current = startingDate,
    dates = [];
  const SATURDAY = 6;

  function nextDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  }

  // as long we're in the same week, add 1 day
  while(current.getDay() < SATURDAY) {
    dates.push(current);
    current = nextDay(current);
  }
  dates.push(current);

  return dates;
}
