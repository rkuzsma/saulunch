const menus = require(__dirname + '/../lib/menus.js');

menus.parseMenu(__dirname + '/Wilkins_2016-06.pdf')
.then(function(menu) {
  console.log(JSON.stringify(menu, null, ' '));
})
.catch(function(err) {
  console.log(err);
});
