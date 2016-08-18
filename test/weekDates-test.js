const weekDates = require(__dirname + '/../lib/weekDates.js'),
  expect = require('chai').expect,
  chai = require('chai');

chai.use(require('chai-datetime'));

const JAN = 0, // JS Date object uses 0-based months
  AUG = 7,
  SEP = 8,
  DEC = 11;

describe("Remaining Week Dates", function() {
  it("returns Monday through Saturday given Monday", function() {
    var dates = weekDates.remainingWeekDates(new Date(2016, AUG, 15));
    expect(dates.length).to.equal(6);
    expect(dates[0]).to.equalDate(new Date(2016, AUG, 15)); // Monday
    expect(dates[1]).to.equalDate(new Date(2016, AUG, 16));
    expect(dates[2]).to.equalDate(new Date(2016, AUG, 17));
    expect(dates[3]).to.equalDate(new Date(2016, AUG, 18));
    expect(dates[4]).to.equalDate(new Date(2016, AUG, 19));
    expect(dates[5]).to.equalDate(new Date(2016, AUG, 20)); // Saturday
  });
  it("returns Sunday through Saturday given Sunday", function() {
    var dates = weekDates.remainingWeekDates(new Date(2016, AUG, 14));
    expect(dates.length).to.equal(7);
    expect(dates[0]).to.equalDate(new Date(2016, AUG, 14)); // Sunday
    expect(dates[1]).to.equalDate(new Date(2016, AUG, 15));
    expect(dates[2]).to.equalDate(new Date(2016, AUG, 16));
    expect(dates[3]).to.equalDate(new Date(2016, AUG, 17));
    expect(dates[4]).to.equalDate(new Date(2016, AUG, 18));
    expect(dates[5]).to.equalDate(new Date(2016, AUG, 19));
    expect(dates[6]).to.equalDate(new Date(2016, AUG, 20)); // Saturday
  });
  it("returns Thursday through Saturday given Thursday", function() {
    var dates = weekDates.remainingWeekDates(new Date(2016, AUG, 18));
    expect(dates.length).to.equal(3);
    expect(dates[0]).to.equalDate(new Date(2016, AUG, 18)); // Thursday
    expect(dates[1]).to.equalDate(new Date(2016, AUG, 19));
    expect(dates[2]).to.equalDate(new Date(2016, AUG, 20)); // Saturday
  });
  it("returns Saturday given Saturday", function() {
    var dates = weekDates.remainingWeekDates(new Date(2016, AUG, 20));
    expect(dates.length).to.equal(1);
    expect(dates[0]).to.equalDate(new Date(2016, AUG, 20)); // Saturday
  });
  it("supports weeks that span two months", function() {
    var dates = weekDates.remainingWeekDates(new Date(2016, AUG, 31)); // Wed
    expect(dates.length).to.equal(4);
    expect(dates[0]).to.equalDate(new Date(2016, AUG, 31)); // Wed
    expect(dates[1]).to.equalDate(new Date(2016, SEP, 1));
    expect(dates[2]).to.equalDate(new Date(2016, SEP, 2));
    expect(dates[3]).to.equalDate(new Date(2016, SEP, 3)); // Sat
  });
  it("supports weeks that span two years", function() {
    var dates = weekDates.remainingWeekDates(new Date(2015, DEC, 30)); // Wed
    expect(dates.length).to.equal(4);
    expect(dates[0]).to.equalDate(new Date(2015, DEC, 30)); // Wed
    expect(dates[1]).to.equalDate(new Date(2015, DEC, 31));
    expect(dates[2]).to.equalDate(new Date(2016, JAN, 1));
    expect(dates[3]).to.equalDate(new Date(2016, JAN, 2)); // Sat
  });
});
