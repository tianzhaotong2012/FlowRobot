var system = require('system');
console.log('args:',system.args);
if (system.args.length < 5 ){
	console.log('Usage: bin/casperjs cnzz_XXX.js URL');
	console.log('args:',system.args);
    	phantom.exit(1);	
}
var targetUrl = system.args[4];
window.frUrl = system.args[4];
console.log('targetUrl:',targetUrl);

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
  casper.page.evaluate(function(language,iwidth,iheight) {
        navigator.systemLanguage = language
        navigator.language = language
        window.screen = {width: iwidth, height: iheight};
      },ilanguage,width,height);
};

casper.start('https://www.sogou.com/web?query=site%3Awww.musicleft.com');

casper.then(function() {
   this.capture(__dirname + '/cnzz_search.png');
});

casper.then(function(){
	this.evaluate(function(itargetUrl){
		console.log("URL:",itargetUrl);
		var link = document.createElement('a');
		link.setAttribute('href', itargetUrl);
		link.setAttribute('id', "myTargetUrl");
		link.innerHTML=itargetUrl;
		document.body.appendChild(link);
	},targetUrl);
});

casper.then(function() {
   this.capture(__dirname + '/cnzz_search_add_a.png');
});

casper.then(function() {
		this.click('a#myTargetUrl');
});

casper.then(function() {

	this.wait(2000,function(){
		this.capture(__dirname + '/cnzz_xxxx.png');
	});

});

casper.run();
