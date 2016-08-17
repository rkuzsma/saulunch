"use strict";
const Promise = require('bluebird');
const readFile = Promise.promisify(require("fs").readFile);
const pdfDir = __dirname + '/../resources/pdf';

// Returned promise resolves to an array of all available menu PDF local files
// and their individual month and years.
module.exports.pdfMenuPaths = function() {
  return new Promise((resolve, reject) => {
    return readFile(pdfDir + '/index.json', 'utf8')
    .then(function(contents) {
      let obj = JSON.parse(contents);
      obj.forEach(pdfMenu => {
        pdfMenu.absoluteFilePath = `${pdfDir}/${pdfMenu.filePath}`;
      });
      return resolve(obj);
    })
    .catch(err => {
      return reject(err);
    });
  });
}
