// TODO Actually make this test case assert some real test conditions
const idx = require(__dirname + '/../index.js');

describe("API Integration Test", function() {
  it("returns a JSON calendar", function() {
    var event = {event: "foo"};
    var context = {};
    var callback = function(arg1, arg2) {
      expect(arg2).to.be.an('object');
    };

    idx.handler(event, context, callback);
  });
});
