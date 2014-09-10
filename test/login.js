var t = require('../index.js');
var taringa = new t('USERNAME', 'PASSWORD');

taringa.on('logged',function(){
	console.log("logueado");
  taringa.shout.add("Test - #NodeJS");
});
