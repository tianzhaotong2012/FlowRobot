var request = require("request");
var iconv = require('iconv-lite');
var fs = require("fs");
require('shelljs/global');

var options = {
	method: 'GET',
	url: 'https://api.zoomeye.org/web/search?query=app:DedeCMS&page=3&facets=webapp,frontend,component',
	gzip: true,
        encoding: null,
        headers: {
		'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IjEzMzc3MjYwODVAcXEuY29tIiwiaWF0IjoxNTQ0MDA1MjYwLCJuYmYiOjE1NDQwMDUyNjAsImV4cCI6MTU0NDA0ODQ2MH0.6o0cf7X0CRdmMFK9mXkcv-5mX0uePTtiyP9CpG6qmaU'
	},
};

request(options, function (error, response, body){
	body = iconv.decode(body, 'utf8');
	var data = eval('(' + body + ')');
	var matches = data.matches;
	for(i in matches){
		console.log(matches[i].site);
		fs.appendFileSync(__dirname + "/domainList.txt", matches[i].site + "\n");
	}
});

//uniq domainList
var execStr = 'uniq ' + __dirname + '/domainList.txt >> ' + __dirname + '/domainListUniq.txt';
exec(execStr,{silent:true}).stdout;
