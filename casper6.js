function x(xpath) { return { type: 'xpath', path: xpath }; }

var casper = require('casper').create();
var fs = require('fs');
var __dirname = fs.dirname(fs.absolute(phantom.casperScript));
console.log(__dirname);

casper.options.waitTimeout = 900000;

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36');  

casper.options.viewportSize = {width: 1920, height: 965};

casper.start('http://m.baidu.com/');

casper.then(function() {
   this.capture(__dirname + '/baidu-start.png');
});

casper.then(function() {
   this.fill('form[id="index-form"]', { word: '果知网' }, true);//填入form，进行搜索
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

casper.waitForSelector(x('//span[contains(text(),"www.goolzhi.com")]/../../../a'), function() {
        console.log('button shown');

        casper.click(x('//span[contains(text(),"www.goolzhi.com")]/../../../a'));
	  this.wait(3000,function() {  
    			this.echo('search Successfully.'); 
			casper.capture(__dirname + '/ok.png');
  	   });  
});

});



casper.then(function() {

var elementArr = ['#menu-item-1688 a','#menu-item-1689 a','#menu-item-1690 a','#menu-item-1691 a','#menu-item-516 a'];
var n = Math.floor(Math.random() * elementArr.length + 1)-1;
console.log(elementArr[n]);  

casper.waitForSelector(elementArr[n], function() {
    this.click(elementArr[n]);
},function(){
    this.echo('failed founding #nocaptcha', 'INFO');
});

});


casper.then(function() {

casper.waitForSelector('#mainbox > div:nth-child(1) > div > div > div.fg > ul > li.pbox > div.post-txt > div > h2 > a', function() {
        console.log('button shown');

        casper.click('#mainbox > div:nth-child(1) > div > div > div.fg > ul > li.pbox > div.post-txt > div > h2 > a');
	  this.wait(6000,function() {  
    			this.echo('search Successfully.'); 
			casper.capture(__dirname + '/ok.png');
  	   });  
});

});


/*casper.waitForSelector('#1', function() {
    this.click('#1');
},function(){
    this.echo('failed founding #nocaptcha', 'INFO');
});*/


casper.then(function() {
   this.capture(__dirname + '/baidu-click-results.png');
}); 

casper.run();
