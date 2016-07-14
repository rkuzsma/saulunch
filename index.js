"use strict";
/**
JavaScript API to parse SAU lunch menus
*/

const menus = require('./lib/menus');

exports.handler = (event, context, callback) => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));

    menus.fetchMenus().then(function(result) {
      console.log('Fetched menus');
      callback(null, result);
    })
    .catch(function(err) {
      console.log(err.stack);
      callback(new Error('Error fetching menus'));
    });
  } catch (e) {
    console.log(e.stack);
    callback(new Error('Unexpected Error'));
  }
};
