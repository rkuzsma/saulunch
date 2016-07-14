const idx = require(__dirname + '/../index.js');

var event = {event: "foo"};
var context = {};
var callback = function(arg1, arg2) {
  console.log(arg1);
  console.log(arg2);
};

idx.handler(event, context, callback);
