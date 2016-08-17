"use strict";
const Promise = require('bluebird');
const PDFParser = require("pdf2json");

var isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var isUpperCase = function(str) {
  var i = str.length;
  while (i--) {
    var character = str.charAt(i);
    if (isNumeric(character) || character == ' ') {
      // ignore numbers and spaces
    }
    else {
      if (character == character.toLowerCase()) {
        return false;
      }
    }
  }
  return true;
}

module.exports.parseMenu = function(pdfFilePath) {
  return new Promise((resolve, reject) => {
    let pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", errData => {
      console.log("PDF Parse Error:");
      if (errData.parserError) {
        console.log(errData.parserError);
        reject(errData.parserError);
      }
      else {
        console.log(errData);
        reject(errData);
      }
    });
    pdfParser.on("pdfParser_dataReady", pdfData => {
      var page = pdfData.formImage.Pages[0];
      var texts = page.Texts;
      // Here's the mess we're parsing:
      // console.log(JSON.stringify(texts, null, ' '));
      //
      // We start parsing after the word "Friday",
      // then parse each day, concatenating each line.
      // Concatenate strings that are on the same y coordinate.
      // Add a newline between strings that are on different y coordinates.
      // URL-decode all strings.
      var days = {};
      var menu = {
        school: decodeURIComponent(texts[0].R[0].T).trim(),
        month: decodeURIComponent(texts[1].R[0].T).trim(),
        days: days
      }
      var day = {};
      var date = '';
      var item = {};
      var state = 'AWAIT_FRIDAY';
      var prevY = 0;
      texts.forEach(text => {
        var line = text.R[0].T;
        var y = text.y;
        if (state == 'AWAIT_FRIDAY') {
          if (line == 'Friday') {
            state = 'PROCESSING_DAYS';
          }
        }
        else if (state == 'PROCESSING_DAYS') {
          if (isNumeric(line)) {
            // New day
            date = line;
            day = { date: date, food: [], events: [] };
            days[line] = day;
            item = null;
          }
          else {
            var decodedLine = decodeURIComponent(line);
            var isEvent = isUpperCase(decodedLine);
            var isNewItem = (prevY != y || !item);
            if (isNewItem) {
              item = { text: '' };
              if (isEvent) {
                day.events.push(item);
              }
              else {
                day.food.push(item);
              }
            }
            item.text += decodedLine;
            prevY = y;
          }
        }
      });
      resolve(menu);
    });
    pdfParser.loadPDF(pdfFilePath);
  });
}
