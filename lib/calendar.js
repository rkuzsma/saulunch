"use strict";
const Promise = require('bluebird'),
  menuParser = require(__dirname + '/../lib/menuParser.js'),
  fs = Promise.promisifyAll(require('fs')),
  readFile = Promise.promisify(require("fs").readFile);

// Convert days into "dd" format. For example, convert "7" to "07".
const padZeroes = function(n) {
  return n < 10 ? '0' + n : n;
}

// Return a single map of (date, food on that date) from an array of menu PDF files.
// pdfMenus: e.g. [ yyyy-mm-iso-8601: '2016-12' absoluteFilePath: '/foo/menu.pdf' ]
module.exports.generateCalendar = function(pdfMenus) {
  return new Promise((resolve, reject) => {
    let promises = [];
    let calendar = {};
    pdfMenus.forEach(pdf => {
      console.log(`Loading menu PDF ${pdf.absoluteFilePath}`);
      promises.push(menuParser.parseMenu(pdf.absoluteFilePath)
        .then(menu => {
          Object.keys(menu.days).forEach(key => {
            let value = menu.days[key];
            // Create a date relative to the school's time zone (EST).
            // The EST or EDT date will always match UTC date for our purposes,
            // so no explicit conversion needed.
            // Note: The month portion of an ISO-8601 date starts at 01 (Jan)
            let dayPart = padZeroes(value.date);
            let date = `${pdf['yyyy-mm-iso-8601']}-${dayPart}`;
            calendar[date] = value;
          });
          return resolve(calendar);
        })
        .catch(err => {
          return reject(err);
        }));
    });
    return Promise.all(promises)
      .then(result => {
        return resolve(calendar);
      })
      .catch(err => {
        return reject(err);
      });
  });
}

// Read a calendar.json file, i.e. ../resources/generate/calendar.json
// See generate-calendar.js, which generates a calendar.json file.
module.exports.readCalendar = function(calendarJsonPath) {
  return new Promise((resolve, reject) => {
    return readFile(calendarJsonPath, 'utf8')
    .then(function(contents) {
      let obj = JSON.parse(contents);
      return resolve(obj);
    })
    .catch(err => {
      return reject(err);
    });
  });
}

// Write a calendar to a local JSON file
module.exports.saveCalendar = function(calendar, outputFilePath) {
  let json = JSON.stringify(calendar, null, ' ');
  return fs.writeFileAsync(outputFilePath, json, {});
}
