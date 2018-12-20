function getOneUA(){
        var fs = require("fs");
        var __dirname = fs.dirname(fs.absolute(phantom.casperScript));
        var ins = fs.open(__dirname + "/handle_user_agent.json.txt",'r');
        var uaData = ins.readLine();
        var uaDataStr =  uaData.toString();
        var uaObj = JSON.parse(uaDataStr);
        var randIdx = Math.floor(Math.random()*uaObj.length);
        return uaObj[randIdx];
}

function getCurIp(){
    var fs = require('fs');
    var __dirname = fs.dirname(fs.absolute(phantom.casperScript));
    var ins = fs.open(__dirname + "/curIP.txt",'r');
    var ipInfoData = ins.readLine();
    var ipInfoDataStr =  ipInfoData.toString();
    var ipInfoObj = JSON.parse(ipInfoDataStr);
    return ipInfoObj;
}

function getHandleUA(){
    var curUA;

    while(1){
      var ua = getOneUA();
      if(ua.handleUARet == true){
        curUA = ua;
        break;
      } 
    }

    var curIpInfo = getCurIp();
    var finalLanguage = curIpInfo.language;

    if(curUA.machine_type == 'android'){
      var randAgentArr = [];
      randAgentArr.push(curUA.agent_info);
      if(curUA.agent_info_uc){
        randAgentArr.push(curUA.agent_info_uc)
      }
      if(curUA.agent_info_sougou){
                randAgentArr.push(curUA.agent_info_sougou)
      }
      if(curUA.agent_info_qq){
                randAgentArr.push(curUA.agent_info_qq)
      }
      var index = Math.floor((Math.random()*randAgentArr.length)); 
      curUA.finalAgent = randAgentArr[index];   
    }

    if(curUA.machine_type == 'android'){
      var androidVer = curUA.finalAgent.match(/Android\s\d+(\.\d+)*\;/g)
      if(androidVer.length == 1){
                curUA.finalAgent = curUA.finalAgent.replace(androidVer[0],androidVer[0] +  " " + finalLanguage +";");
      }
    }

    if(curUA.machine_type == 'ios'){
      curUA.finalAgent = curUA.agent_info;  
    }

    if(curUA.machine_type == 'mac'){
      curUA.finalAgent = curUA.agent_info;
    }

    if(curUA.brand == 'windows'){
      curUA.finalAgent = curUA.agent_info;
    }
    return curUA;
}

function x(xpath) { return { type: 'xpath', path: xpath }; }

var casper = require('casper').create();
var fs = require('fs');
var __dirname = fs.dirname(fs.absolute(phantom.casperScript));
console.log(__dirname);

casper.options.waitTimeout = 900000;

console.log("================================");
var finalAgent = getHandleUA();
console.log(JSON.stringify(finalAgent));

casper.userAgent(finalAgent.finalAgent);  

casper.options.viewportSize = {width: finalAgent.width, height: finalAgent.height};

var curIP = getCurIp();
console.log('curIP:'+JSON.stringify(curIP)); 
var ilanguage = curIP.language; 
console.log('language:'+ilanguage);  
var acceptLanguage = curIP.acceptLanguage;
var width = finalAgent.width;
var height = finalAgent.height;

casper.options.onPageInitialized = function(){
  casper.page.customHeaders = {"Accept-Language": "en-US,en;q=0.9"};
  casper.page.injectJs("includes/jquery.min.js");
  casper.page.evaluate(function(language,iwidth,iheight) {
        navigator.systemLanguage = language
        navigator.language = language
        window.screen = {width: iwidth, height: iheight};
      },ilanguage,width,height);
};

casper.start('https://m.baidu.com/');

casper.then(function() {
   this.capture(__dirname + '/ga-baidu-start-v2.png');
});

casper.then(function() {
   casper.waitForSelector(x('//*[@id="index-kw"]'), function() {
   	var type = Math.floor(Math.random()*3+1);
   	if(type == 1){
        	 this.fill('form[id="index-form"]', { word: 'girlalbum.com' }, true);//填入form，进行搜索
   	}
   	if(type == 2){
        	 this.fill('form[id="index-form"]', { word: 'www.girlalbum.com' }, true);//填入form，进行搜索
   	}
   	if(type == 3){
		 this.fill('form[id="index-form"]', { word: 'www.girlalbum.com' }, true);
   	}
   });
});

casper.then(function() {  
  this.click(x('//*[@id="index-bn"]'));  
  this.echo('saerch...'); 
  this.wait(1000,function() {  
    this.echo('search Successfully.'); 
  });  
}); 

casper.then(function() {
   this.capture(__dirname + '/ga-baidu-search-results-v2.png');
});

casper.then(function() {

casper.waitForSelector(x('//span[contains(text(),"girlalbum.com")]/../../a'), function() {
        console.log('button shown');

        casper.click(x('//span[contains(text(),"girlalbum.com")]/../../a'));
	  this.wait(3000,function() {  
    			this.echo('search Successfully.'); 
			
			this.echo('Page title is: ' + this.evaluate(function() {
				return window.screen.width;
			}), 'INFO'); 
			casper.capture(__dirname + '/ga-ok-v2.png');
  	   });  
});

});

casper.then(function() {

        var elementArr = [
           '#menu-item-12 > a',
           '#menu-item-15 > a',
           '#menu-item-16 > a',
           '#menu-item-17 > a',
           '#menu-item-537371 > a',
           '#menu-item-537376 > a'
        ];

        var n = Math.floor(Math.random() * elementArr.length + 1)-1;
        
	this.wait(2000,function(){
		console.log(elementArr[n]);
	});

	this.capture(__dirname + '/ga-capture-homepage-v2.png');

        casper.waitForSelector(elementArr[n], function() {
            this.click(elementArr[n]);
        },function(){
            this.echo('failed founding #nocaptcha', 'INFO');
        });

});

casper.then(function() {
   this.capture(__dirname + '/ga-capture-catpage-v2.png');
}); 

for(var i=0;i<10;i++){

        casper.then(function() {
                casper.waitForSelector('#pagenavi > a:last-child', function() {
                        this.click('#pagenavi > a:last-child');
                },function(){
                        console.log("next page");
                });
        });

}

casper.then(function() {
    	this.echo("ad click");
	this.evaluate(function() {
		setTimeout(function () { $("brde").each(function () { $(this).find('a img').first().trigger("click"); console.log($(this).find('a').first()) }) },1000);
	}); 
});

casper.then(function() {

        var elementArr = [
	         '#postlist > div:nth-child(1) > div:nth-child(1) > a',
           '#postlist > div:nth-child(2) > div:nth-child(1) > a',
           '#postlist > div:nth-child(3) > div:nth-child(1) > a',
           '#postlist > div:nth-child(4) > div:nth-child(1) > a',
           '#postlist > div:nth-child(5) > div:nth-child(1) > a',
           '#postlist > div:nth-child(6) > div:nth-child(1) > a',
           '#postlist > div:nth-child(7) > div:nth-child(1) > a'
        ];

        var n = Math.floor(Math.random() * elementArr.length + 1)-1;
        console.log(elementArr[n]); 
	
	this.wait(4000,function(){
		console.log(elementArr[n]);
	});	


        casper.waitForSelector(elementArr[n], function() {
            this.click(elementArr[n]);
        },function(){
            console.log("failed founding"+elementArr[n]);
            this.echo('failed founding #nocaptcha', 'INFO');
        });

	this.wait(9000,function(){
                this.capture(__dirname + '/ga-capture-singlepage-v2.png');
                console.log("Finish!");
        });
});

casper.run();
