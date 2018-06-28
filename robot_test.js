var readline = require('readline');
var fs = require("fs");
require('shelljs/global');

const r1 = readline.createInterface({
    input: fs.createReadStream(__dirname + "/proxyIP_v2.txt")
});

var i = 1;
r1.on('line', (line) => {
	console.log('Line from file:' + i + ":" + line);
	var ipObj = JSON.parse(line)
	var execStr = 'rm -rf ' + __dirname + '/cookies_test.txt';
	var data = exec(execStr,{silent:true}).stdout;
	var type = Math.floor(Math.random()*2+5);
	var execStr7 = 'timeout 600s ' + __dirname + '/node_modules/casperjs/bin/casperjs --proxy=' + ipObj.ip + ' --cookies-file=' + __dirname + '/cookies_v2.txt ' + __dirname + '/casper7_test.js \''+ JSON.stringify(ipObj) +'\' >> ' + __dirname + '/log_test';
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
	i += 1;
});



