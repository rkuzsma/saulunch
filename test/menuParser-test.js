const menuParser = require(__dirname + '/../lib/menuParser.js'),
  expect = require('chai').expect,
  Promise = require('bluebird'),
  suppressLogs = require(__dirname + '/suppressLogs.js').suppressLogs;

describe("Menu Parser", function() {
  it("parses a PDF lunch menu", function() {
    return menuParser.parseMenu(__dirname + '/../resources/pdf/Wilkins_2016-06.pdf')
    .then(function(menu) {
      //console.log(JSON.stringify(menu, null, ' '));
      expect(menu.school).to.equal("Wilkins School");
      expect(menu.month).to.equal("June");
      expect(menu.days['1'].food[0].text).to.equal("Mini Pancakes");
      expect(menu.days['1'].food[1].text).to.equal("with Syrup Cup");
    })
    .catch(function(err) {
      should.fail('Should not throw error');
    });
  });
  it("throws an error for a missing PDF file", function() {
    return suppressLogs(function() {
      return menuParser.parseMenu('FILE_NOT_FOUND.pdf')
      .then(function(menu) {
        should.fail('Should not succeed');
      })
      .catch(function(err) {
        expect(err).to.not.equal(undefined);
      });
    });
  });
});
