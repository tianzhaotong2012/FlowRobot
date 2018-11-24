var request = require("request");
var iconv = require('iconv-lite');

var options = {
	method: 'GET',
	url: 'https://api.zoomeye.org/web/search?query=app:DedeCMS&page=3&facets=webapp,frontend,component',
	gzip: true,
        encoding: null,
        headers: {
		'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IjEzMzc3MjYwODVAcXEuY29tIiwiaWF0IjoxNTQzMDQxODk0LCJuYmYiOjE1NDMwNDE4OTQsImV4cCI6MTU0MzA4NTA5NH0.tZRqFZRPSdlh0sZEqI3MEV0WNzcd9l6dgJT8R8a9img'
	},
};

request(options, function (error, response, body){
	body = iconv.decode(body, 'utf8');
	var data = eval('(' + body + ')');
	var matches = data.matches;
	for(i in matches){
		console.log(matches[i].site);
	}
}
);
