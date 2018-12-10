var readline = require('readline');
var fs = require("fs");
require('shelljs/global');

const r1 = readline.createInterface({
    input: fs.createReadStream(__dirname + "/domainListUniq.txt")
});

var i = 1;
r1.on('line', (line) => {
	console.log('Line from file:' + i + ":" + line);
	var execStr1 = 'timeout 60s ' + __dirname + '/node_modules/casperjs/bin/casperjs --ignore-ssl-errors=yes --ssl-protocol=any ' + __dirname + '/cnzz_xxx.js http://' + line + ' >>' + __dirname + '/log_cnzz_xxx';
	console.log(execStr1);
	var data = exec(execStr1,{silent:true}).stdout;
	i += 1;
});
