var readline = require('readline');
var fs = require("fs");
require('shelljs/global');

const r1 = readline.createInterface({
    input: fs.createReadStream(__dirname + "/proxyIP.txt")
});

var i = 1;
r1.on('line', (line) => {
	console.log('Line from file:' + i + ":" + line);
	var execStr = 'rm -rf ' + __dirname + '/cookies.txt';
	var data = exec(execStr,{silent:true}).stdout;
	var type = Math.floor(Math.random()*2+5);
	//var execStr5 = 'timeout 600s node_modules/casperjs/bin/casperjs --proxy=' + line + ' --cookies-file=./cookies.txt casper5.js';
	//var execStr6 = 'timeout 600s node_modules/casperjs/bin/casperjs --proxy=' + line + ' --cookies-file=./cookies.txt casper6.js';
      	var execStr5 = 'timeout 600s ' + __dirname + '/node_modules/casperjs/bin/casperjs --proxy=' + line + ' --cookies-file=' + __dirname + '/cookies.txt ' + __dirname + '/casper5.js';
	var execStr6 = 'timeout 600s ' + __dirname + '/node_modules/casperjs/bin/casperjs --proxy=' + line + ' --cookies-file=' + __dirname + '/cookies.txt ' + __dirname + '/casper6.js';
	var execStr7 = 'timeout 600s ' + __dirname + '/node_modules/casperjs/bin/casperjs --proxy=' + line + ' --cookies-file=' + __dirname + '/cookies.txt ' + __dirname + '/casper7.js';
	if(type == 5){
		console.log("55555");
		console.log(execStr7);
		var data = exec(execStr7,{silent:true}).stdout;
	}
	if(type == 6){
		console.log("66666");
		console.log(execStr7);
		var data = exec(execStr7,{silent:true}).stdout;
	}
	var data = exec(execStr,{silent:true}).stdout;
	i += 1;
});



