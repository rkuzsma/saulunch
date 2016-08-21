const Calendar = require(__dirname + '/../lib/calendar.js'),
  CalendarQuery = require(__dirname + '/../lib/calendarQuery.js')
  expect = require('chai').expect,
  Promise = require('bluebird'),
  tk = require('timekeeper'),
  suppressLogs = require(__dirname + '/suppressLogs.js').suppressLogs;

let calendarFilePath = __dirname + '/../resources/generated/calendars.json';
let calendar = {};
const THU_JUNE_2_2016 = new Date(2016, 6 - 1, 2);
const WED_JUNE_8_2016 = new Date(2016, 6 - 1, 8);

describe("Calendar Query", function() {
  before(function(done) {
    return Calendar.readCalendar(calendarFilePath).then(function(cal) {
      calendar = cal;
      done();
    });
  });

  it("queries for a specific date", function() {
    let res = CalendarQuery.queryByDate(calendar, THU_JUNE_2_2016);
    expect(res.food[0].text).to.equal("Mitchell's Fresh Salsa");
  });

  it("queries for today", function() {
    tk.travel(THU_JUNE_2_2016);
    let res = CalendarQuery.queryByToday(calendar);
    tk.reset();
    expect(res).to.be.an('object');
    expect(res.food[0].text).to.equal("Mitchell's Fresh Salsa");
  });

  it("queries for tomorrow", function() {
    tk.travel(THU_JUNE_2_2016);
    let res = CalendarQuery.queryByTomorrow(calendar);
    tk.reset();
    expect(res).to.be.an('object');
    expect(res.food[0].text).to.equal("Chicken Salad Wrap");
  });

  it("queries for this week", function() {
    tk.travel(WED_JUNE_8_2016);
    let res = CalendarQuery.queryByThisWeek(calendar);
    tk.reset();
    expect(res).to.be.an('array');
    expect(res.length).to.equal(3); // wed, thu, fri
    expect(res[0].food[0].text).to.equal("Hamburger on a Bun");
    expect(res[1].food[0].text).to.equal("Chicken Fajitas");
    expect(res[2].food[0].text).to.equal("Hot Dog in a Bun");
  });

  it("queries for next week", function() {
    tk.travel(THU_JUNE_2_2016);
    let res = CalendarQuery.queryByNextWeek(calendar);
    tk.reset();
    expect(res).to.be.an('array');
    expect(res.length).to.equal(5); // mon, tue, wed, thu, fri
    expect(res[0].food[0].text).to.equal("Homemade Cheese ");
    expect(res[1].food[0].text).to.equal("Chicken Patty ");
    expect(res[2].food[0].text).to.equal("Hamburger on a Bun");
    expect(res[3].food[0].text).to.equal("Chicken Fajitas");
    expect(res[4].food[0].text).to.equal("Hot Dog in a Bun");
  });
});
