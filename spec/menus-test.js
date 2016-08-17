// TODO Actually make this test case assert some real test conditions
const menuParser = require(__dirname + '/../lib/menuParser.js');

menuParser.parseMenu(__dirname + '/../resources/pdf/Wilkins_2016-06.pdf')
.then(function(menu) {
  console.log(JSON.stringify(menu, null, ' '));
})
.catch(function(err) {
  console.log(err);
});
