var useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36';
var wide = 400;
var high = 300;
var timeout = 600000;
var waitTimeout = 60000;
var start_url = 'http://www.goolzhi.com';
var keyword = 'goolzhi.com'
var links = [];
var arr = [];

function getLinks() {
var links = document.querySelectorAll('a');
return Array.prototype.map.call(links,
function(e) {
return e.getAttribute('href');
});
};

function ClearLinks(links) {
var arr = [];
for (i = 0; i < links.length - 1; i++) {
if (links[i].indexOf(keyword) > 0) {
arr.push(links[i]);
};
};
return arr;
};

function getRandom(Max) {
return Math.ceil(Math.random() * Max) - 1;
};
function randomLink(arr) {
return arr[getRandom(arr.length)];
};

var casper = require('casper').create();
casper.userAgent(useragent);
casper.options.viewportSize = {
width: wide,
height: high
};
casper.options.waitTimeout = waitTimeout;
casper.options.timeout = timeout;

casper.start(start_url,
	function() {
		this.echo(this.getCurrentUrl());
		links = this.evaluate(getLinks);
		arr = ClearLinks(links);
});

casper.open('http://www.goolzhi.com/167', {
    headers: {
         "Referer" : "http://www.gool.com"
    }
});

casper.then(function(){
	this.evaluate(function(){
		var link = document.createElement('a');
		link.setAttribute('href', 'http://www.goolzhi.com/7688');
		link.setAttribute('id', "myTargetUrl")
		document.body.appendChild(link);
	});
});

casper.then(function() {
		this.click('a#myTargetUrl');
});

var count = Math.floor(Math.random() * 7) + 3;
arr = [];
for (var i = 0; i < count; i++) {
arr.push('hello');
};

casper.each(arr,
function(self) {
var interval = (Math.floor(Math.random() * 5) + 1) * 1000;
self.wait(interval,
function() {
next = randomLink(arr);
this.echo('count=' + count + '; interval=' + interval + '; next=' + next);
this.thenOpen(next,
function() {
this.echo(this.getCurrentUrl());
});
});
});

casper.run();
