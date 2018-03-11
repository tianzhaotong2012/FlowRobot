var readline = require('readline');
var fs = require("fs");
require('shelljs/global');

const r1 = readline.createInterface({
    input: fs.createReadStream("proxyIP.txt")
});


var i = 1;
r1.on('line', (line) => {
	console.log('Line from file:' + i + ":" + line);
	var execStr = 'rm -rf cookies.txt';
	var data = exec(execStr,{silent:true}).stdout;
	var execStr = 'timeout 900s node_modules/casperjs/bin/casperjs --proxy=' + line + ' --cookies-file=./cookies.txt casper5.js';
      var data = exec(execStr,{silent:true}).stdout;
	i += 1;
});



