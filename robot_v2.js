var readline = require('readline');
var fs = require("fs");
require('shelljs/global');

const r1 = readline.createInterface({
    input: fs.createReadStream(__dirname + "/proxyIP_v2.txt")
});

var i = 1;
r1.on('line', (line) => {
	var execStr = 'rm -rf ' + __dirname + '/curIP.txt';
	exec(execStr,{silent:true}).stdout;
	console.log('Line from file:' + i + ":" + line);
	var ipObj = JSON.parse(line)
	// fs.writeFile(__dirname + "/curIP.txt",JSON.stringify(ipObj)+ "\n",function (err) {
 //  			if (err) throw err;
 //  			console.log('It\'s saved!');
	// 		var execStr = 'rm -rf ' + __dirname + '/cookies_v2.txt';
	// 		var data = exec(execStr,{silent:true}).stdout;
	// 		var type = Math.floor(Math.random()*2+5);
	// 		var execStr7 = 'timeout 600s ' + __dirname + '/node_modules/casperjs/bin/casperjs --proxy=' + ipObj.ip + ' --cookies-file=' + __dirname + '/cookies_v2.txt ' + __dirname + '/casper7_v2.js >> ' + __dirname + '/log_v2';
	// 		if(type == 5){
	// 			console.log("55555");
	// 			console.log(execStr7);
	// 			var data = exec(execStr7,{silent:true}).stdout;
	// 		}
	// 		if(type == 6){
	// 			console.log("66666");
	// 			console.log(execStr7);
	// 			var data = exec(execStr7,{silent:true}).stdout;
	// 		}
	// 		var data = exec(execStr,{silent:true}).stdout;
	// 		i += 1;

	// });
	fs.writeFileSync(__dirname + "/curIP.txt",JSON.stringify(ipObj)+ "\n");
	var execStr = 'rm -rf ' + __dirname + '/cookies_v2.txt';
	var data = exec(execStr,{silent:true}).stdout;
	var type = Math.floor(Math.random()*2+5);
	var execStr7 = 'timeout 600s ' + __dirname + '/node_modules/casperjs/bin/casperjs --proxy=' + ipObj.ip + ' --cookies-file=' + __dirname + '/cookies_v2.txt ' + __dirname + '/casper7_v2.js >> ' + __dirname + '/log_v2';
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



