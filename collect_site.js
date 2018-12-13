var request = require("request");
var iconv = require('iconv-lite');
var fs = require("fs");
require('shelljs/global');

for(var page = 400;page <600;page++){
	var iurl = 'https://api.zoomeye.org/web/search?query=app:DedeCMS&page=' + page  + '&facets=webapp,frontend,component';
	var options = {
	        method: 'GET',
	        url: iurl,
		proxy: 'http://14.118.135.10:808',
	        gzip: true,
	        encoding: null,
	        headers: {
	                'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IjEzMzc3MjYwODVAcXEuY29tIiwiaWF0IjoxNTQ0Njc0MDIxLCJuYmYiOjE1NDQ2NzQwMjEsImV4cCI6MTU0NDcxNzIyMX0.aNkJHS9MJ9_M7FdoP7Zyax6epquv3r8pHTuiDAdoO0Q'
	        },
	};

	request(options, function (error, response, body){
		try{
			if (error) throw error;
			body = iconv.decode(body, 'utf8');
			console.log(body);
			var data = eval('(' + body + ')');
			var matches = data.matches;
			for(i in matches){
				console.log(matches[i].site);
				fs.appendFileSync(__dirname + "/domainList.txt", matches[i].site + "\n");
			}
		}catch( e ){
				
		}
	});

	//uniq domainList
	var execStr = 'sort -u ' + __dirname + '/domainList.txt > ' + __dirname + '/domainListUniq.txt';
	exec(execStr,{silent:true}).stdout;
	
	setTimeout(function() {
	      console.log('sleep 10s');
        }, 10000);

}

