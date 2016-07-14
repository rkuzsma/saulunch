"use strict";
const Promise = require('bluebird');

module.exports.fetchMenus = function(kmsid, plaintextValue) {
  return new Promise(function (resolve, reject) {
    try {
      let menus = [];
      menus.push({
        menu: {
          month: 'July',
          days: [
            {
              lunch: {
                text: "Burgers and Fries"
              }
            },
            {
              lunch: {
                text: "Mac and Cheese"
              }
            }
          ]
        }
      });
      resolve(menus);
    }
    catch(err) {
      console.log(err, err.stack);
      throw err;
    }
  });
}
