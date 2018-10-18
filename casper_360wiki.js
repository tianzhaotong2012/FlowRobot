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
	//casper.page.injectJs("includes/util.js");
  casper.page.evaluate(function(language,iwidth,iheight) {
        //"window.screen = {width: " + finalAgent.width + ", height: " + finalAgent.height + "}";
        //window.screen = {width: gWidth, height: gHeight};
        navigator.systemLanguage = language
        navigator.language = language
        window.screen = {width: iwidth, height: iheight};
        //window.screen = {width: finalAgent.width, height: finalAgent.height};
      },ilanguage,width,height);
};

casper.start('http://m.baidu.com/');

// casper.open('http://127.0.0.1/request.php',{
//     headers: {
//         'Accept-Language': 'en-US,en;q=0.9'
//     }
// }).then(function() {  
// this.echo('GOT it.');  
// });  

casper.then(function() {
   this.capture(__dirname + '/baidu-start-360wiki-v2.png');
});

casper.then(function() {
   var type = Math.floor(Math.random()*3+1);
   if(type == 1){
         this.fill('form[id="index-form"]', { word: '360wiki' }, true);//填入form，进行搜索
   }
   if(type == 2){
          this.fill('form[id="index-form"]', { word: '360wiki.cn' }, true);//填入form，进行搜索
   }
   if(type == 3){
	  this.fill('form[id="index-form"]', { word: '360wiki(www.360wiki.cn)' }, true);
   }
   
});

// casper.then(function() {
//    this.fill('form[id="index-form"]', { word: '在家烹饪' }, true);//填入form，进行搜索
// });

casper.then(function() {  
  this.click('button[id="index-bn"]');  
  this.echo('saerch...'); 
  this.wait(1000,function() {  
    this.echo('search Successfully.'); 
  });  
}); 

casper.then(function() {
   this.capture(__dirname + '/baidu-search-360wiki-results-v2.png');
});

casper.then(function() {

casper.waitForSelector(x('//span[contains(text(),"www.360wiki.cn")]/../../../a'), function() {
        console.log('button shown');

        casper.click(x('//span[contains(text(),"www.360wiki.cn")]/../../../a'));
	  this.wait(3000,function() {  
    			this.echo('search Successfully.'); 
			
			this.echo('Page title is: ' + this.evaluate(function() {
				return window.screen.width;
			}), 'INFO'); 
			casper.capture(__dirname + '/ok-360wiki-v2.png');
  	   });  
});

});

/*var type = Math.floor(Math.random()*2+5);


if (type == 5) {

      casper.then(function() {

            casper.waitForSelector('body > div.container.svg-icon-box > div > div:nth-child(6) > a', function() {
                  this.click('body > div.container.svg-icon-box > div > div:nth-child(6) > a');
            },function(){
                  this.echo('failed founding #nocaptcha', 'INFO');
            });

      });

      casper.then(function() {

            casper.waitForSelector('#leftcolumn > ul:nth-child(11) > li:nth-child(9) > a', function() {
                console.log('button shown');

                casper.click('#leftcolumn > ul:nth-child(11) > li:nth-child(9) > a');
                this.wait(6000,function() {  
                      this.echo('search Successfully.'); 
                      casper.capture(__dirname + '/ok-360wiki-v2.png');
                });  
            });

      });

};



if (type == 6) {
  
      casper.then(function() {

          casper.waitForSelector('body > div.container.svg-icon-box > div > div:nth-child(6) > a', function() {
              console.log('button shown');

              casper.click('body > div.container.svg-icon-box > div > div:nth-child(6) > a');
              this.wait(6000,function() {  
                  this.echo('search Successfully.'); 
                  casper.capture(__dirname + '/ok-360wiki-v2.png');
              });  
          });

      });

};*/


casper.then(function() {

        var elementArr = [
           'body > div.container.svg-icon-box > div > div:nth-child(1) > a',
           'body > div.container.svg-icon-box > div > div:nth-child(2) > a',
           'body > div.container.svg-icon-box > div > div:nth-child(3) > a',
           'body > div.container.svg-icon-box > div > div:nth-child(4) > a',
           'body > div.container.svg-icon-box > div > div:nth-child(5) > a',
           'body > div.container.svg-icon-box > div > div:nth-child(6) > a'
        ];

        var n = Math.floor(Math.random() * elementArr.length + 1)-1;
        
	this.wait(2000,function(){
		console.log(elementArr[n]);
	});

        casper.waitForSelector(elementArr[n], function() {
            this.click(elementArr[n]);
        },function(){
            this.echo('failed founding #nocaptcha', 'INFO');
        });

});

casper.then(function() {
   this.capture(__dirname + '/baidu-click-360wiki-results-v2.png');
}); 

casper.then(function() {

        var elementArr = [
	         '#leftcolumn > ul:nth-child(2) > li:nth-child(1) > a',
           '#leftcolumn > ul:nth-child(5) > li:nth-child(1) > a',
           '#leftcolumn > ul:nth-child(5) > li:nth-child(2) > a',
           '#leftcolumn > ul:nth-child(5) > li:nth-child(3) > a',
           '#leftcolumn > ul:nth-child(8) > li:nth-child(1) > a',
           '#leftcolumn > ul:nth-child(8) > li:nth-child(2) > a',
           '#leftcolumn > ul:nth-child(8) > li:nth-child(3) > a'
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

});

casper.run();
