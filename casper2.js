var casper = require('casper').create();
/*casper.start("http://www.goolzhi.com", function() {
    this.evaluate(function() {
       var link = document.createElement("a");
       link.id = "the-button";
       link.href= "http://www.goolzhi.com/index.php/archives/1803";
       document.body.appendChild(link);
    });
});

casper.thenClick("a#the-button", function() {
    var referrer = this.evaluate(function() {
		return document.referrer; }
     );
   console.log(referrer);
});*/

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36');  

casper.start('http://www.goolzhi.com');

var elementArr = ['#menu-item-1688 a','#menu-item-1689 a','#menu-item-1690 a','#menu-item-1691 a','#menu-item-516 a'];
var n = Math.floor(Math.random() * elementArr.length + 1)-1;
console.log(elementArr[n]);  

casper.waitForSelector(elementArr[n], function() {
    this.click(elementArr[n]);
},function(){
    this.echo('failed founding #nocaptcha', 'INFO');
});

casper.run();
