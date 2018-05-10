function x(xpath) { return { type: 'xpath', path: xpath }; }

var casper = require('casper').create();
var fs = require('fs');
var __dirname = fs.dirname(fs.absolute(phantom.casperScript));
console.log(__dirname);

casper.options.waitTimeout = 900000;

var userAgentArr = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36',
    'Mozilla/5.0(Windows;U;WindowsNT6.1;en-us)AppleWebKit/534.50(KHTML,likeGecko)Version/5.1Safari/534.50',
    'Mozilla/5.0(Macintosh;IntelMacOSX10.6;rv:2.0.1)Gecko/20100101Firefox/4.0.1',
    'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; U; Android 4.0.3; zh-cn; M032 Build/IML74K) AppleWebKit/533.1 (KHTML, like Gecko)Version/4.0 MQQBrowser/4.1 Mobile Safari/533.1',
    'Mozilla/5.0 (Linux; U; Android 4.0.3; zh-cn; M032 Build/IML74K) UC AppleWebKit/534.31 (KHTML, like Gecko) Mobile Safari/534.31'
];

var index = Math.floor(Math.random() * userAgentArr.length + 1)-1;

casper.userAgent(userAgentArr[index]);  

casper.options.viewportSize = {width: 1920, height: 965};

casper.start('http://m.baidu.com/');

casper.then(function() {
   this.capture(__dirname + '/baidu-start.png');
});

casper.then(function() {
   this.fill('form[id="index-form"]', { word: '做饭吃美食网' }, true);//填入form，进行搜索
});

casper.then(function() {  
  this.click('button[id="index-bn"]');  
  this.echo('saerch...'); 
  this.wait(1000,function() {  
    this.echo('search Successfully.'); 
  });  
}); 

casper.then(function() {
   this.capture(__dirname + '/baidu-search-results.png');
});

casper.then(function() {

casper.waitForSelector(x('//span[contains(text(),"www.zuofanchi.cn")]/../../../a'), function() {
        console.log('button shown');

        casper.click(x('//span[contains(text(),"www.zuofanchi.cn")]/../../../a'));
	  this.wait(3000,function() {  
    			this.echo('search Successfully.'); 
			casper.capture(__dirname + '/ok.png');
  	   });  
});

});

var type = Math.floor(Math.random()*2+5);


if (type == 5) {

casper.then(function() {

var elementArr = ['body > div > div.row.padding > div.side-menu > div.col-md-2.col-md-offset-1 > nav > ul > li:nth-child(11) > a','body > div > div.row.padding > div.side-menu > div.col-md-2.col-md-offset-1 > nav > ul > li:nth-child(4) > a','body > div > div.row.padding > div.side-menu > div.col-md-2.col-md-offset-1 > nav > ul > li:nth-child(1) > a','body > div > div.row.padding > div.side-menu > div.col-md-2.col-md-offset-1 > nav > ul > li:nth-child(9) > a','body > div > div.row.padding > div.side-menu > div.col-md-2.col-md-offset-1 > nav > ul > li:nth-child(17) > a'];
var n = Math.floor(Math.random() * elementArr.length + 1)-1;
console.log(elementArr[n]);  

casper.waitForSelector(elementArr[n], function() {
    this.click(elementArr[n]);
},function(){
    this.echo('failed founding #nocaptcha', 'INFO');
});

});

casper.then(function() {

casper.waitForSelector('body > div.container > div > div.side-menu > div.col-md-5 > div > div:nth-child(3) > a', function() {
        console.log('button shown');

        casper.click('body > div.container > div > div.side-menu > div.col-md-5 > div > div:nth-child(3) > a');
    this.wait(6000,function() {  
          this.echo('search Successfully.'); 
      casper.capture(__dirname + '/ok.png');
       });  
});

});

};



if (type == 6) {
  
casper.then(function() {

casper.waitForSelector('body > div > div.row.padding > div.side-menu > div.col-md-5 > div.section-1 > div.row > div:nth-child(7) > a', function() {
        console.log('button shown');

        casper.click('body > div > div.row.padding > div.side-menu > div.col-md-5 > div.section-1 > div.row > div:nth-child(7) > a');
    this.wait(6000,function() {  
          this.echo('search Successfully.'); 
      casper.capture(__dirname + '/ok.png');
       });  
});

});


};



casper.then(function() {
   this.capture(__dirname + '/baidu-click-results.png');
}); 

casper.run();
