// Parse all available lunch PDF files and save a single calendar JSON file
// containing all food and events for all available days.
// The file is stored in ../resources/generated/calendar.json
"use strict";
const Promise = require('bluebird');
const calendarLib = require(__dirname + '/../lib/calendar.js');
const pdfMenus = require(__dirname + '/../lib/pdfMenus.js');
const outputFile = __dirname + '/../resources/generated/calendars.json';

pdfMenus.pdfMenuPaths()
.then(pdfMenus => {
  return calendarLib.generateCalendar(pdfMenus)
  .then(calendar => {
    return calendarLib.saveCalendar(calendar, outputFile)
    .then(function() {
      console.log(`All calendars saved to ${outputFile}`);
    });
  });
})
.catch(err => {
  console.log(err);
});
