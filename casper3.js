function x(xpath) { return { type: 'xpath', path: xpath }; }

var casper = require('casper').create();

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36');  

casper.options.viewportSize = {width: 1920, height: 965};

casper.start('http://www.baidu.com/');

casper.then(function() {
   this.capture('baidu-start.png');
});

casper.then(function() {
   this.fill('form[action="/s"]', { wd: '果知网' }, true);//填入form，进行搜索
});

casper.then(function() {  
  this.click('input[id="su"]');  
  this.echo('saerch...'); 
  this.wait(1000,function() {  
    this.echo('search Successfully.'); 
  });  
}); 

casper.then(function() {
   this.capture('baidu-search-results.png');
});

casper.then(function() {

var allA = document.getElementsByTagName("a");

for(var i = 0;i<allA.length;i++){allA[i].target="_parent"}

casper.waitForSelector(x('//a[contains(text(), "www.goolzhi.com")]'), function() {
        console.log('button shown');

        casper.click(x('//a[contains(text(), "www.goolzhi.com")]'));
	  this.wait(6000,function() {  
    			this.echo('search Successfully.'); 
			casper.capture('ok.png');
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



/*casper.waitForSelector('#1', function() {
    this.click('#1');
},function(){
    this.echo('failed founding #nocaptcha', 'INFO');
});*/


casper.then(function() {
   this.capture('baidu-click-results.png');
}); 

casper.run();
