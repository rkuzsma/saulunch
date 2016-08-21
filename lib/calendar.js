"use strict";
const Promise = require('bluebird'),
  menuParser = require(__dirname + '/../lib/menuParser.js'),
  fs = Promise.promisifyAll(require('fs')),
  readFile = Promise.promisify(require("fs").readFile);

// Return a single map of (date, food on that date) from an array of menu PDF files.
// pdfMenus: e.g. [ year: 2016, month: 0, absoluteFilePath: '/foo/menu.pdf' ]
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
            let date = new Date(pdf.year, pdf.month-1, value.date);
            calendar[date.toISOString()] = value; // 'day' has the food and events in it
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
