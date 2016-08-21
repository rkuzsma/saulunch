"use strict";
/**
JavaScript API to load SAU lunch menus calendar
*/

const calendar = require('./lib/calendar');

exports.handler = (event, context, callback) => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let calendarFilePath = __dirname + '/resources/generated/calendars.json';
    calendar.readCalendar(calendarFilePath).then(function(calendar) {
      console.log('Fetched calendar');
      callback(null, calendar);
    })
    .catch(function(err) {
      console.log(err.stack);
      callback(new Error('Error fetching calendar'));
    });
  } catch (e) {
    console.log(e.stack);
    callback(new Error('Unexpected Error'));
  }
};
