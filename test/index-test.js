// TODO Actually make this test case assert some real test conditions
const idx = require(__dirname + '/../index.js');

describe("API Integration Test", function() {
  xit("returns a JSON calendar", function() {
    var event = {event: "foo"};
    var context = {};
    var callback = function(arg1, arg2) {
      console.log(arg1);
      console.log(arg2);
    };

    idx.handler(event, context, callback);
  });
});
