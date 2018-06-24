function getOneUA(index = -1){
        var fs = require("fs")
        var uaData = fs.readFileSync("handle_user_agent.json.txt");
        var uaDataStr =  uaData.toString()
        var uaObj = JSON.parse(uaDataStr)
        if(index != -1){
                return uaObj[index]
        }
        //console.log(uaObj.length)
        var randIdx = Math.floor(Math.random()*uaObj.length)
        //console.log(randIdx)
        //console.log(uaObj[randIdx])
        return uaObj[randIdx]
}

function getCurIpInfo(){
	var fs = require("fs")
        var ipData = fs.readFileSync("curIP.txt");
        var ipDataStr =  ipData.toString()
	//console.log(ipDataStr)
	var targetOptions = {
        	method: 'GET',
        	url: 'http://ip.chinaz.com/getip.aspx',
		timeout: 10000,
                encoding: null,
        };
	targetOptions.proxy = 'http://' + ipDataStr;
	var request = require("request")
        request(targetOptions, function (error, response, body) {
            try {
                if (error) throw error;
                body = body.toString();
                //console.log(body);
                eval(`var ret = ${body}`);
                if (ret) {
                	console.log(ret.address)
			var isChina = ret.address.match(/(.*省)?.*市.*区/g);
			console.log(isChina)
			var language;
			if(isChina != null){
				language = 'zh-cn';
			}else{
				language = 'en-us';
			}
			var curIpInfo = {
				ip:ipDataStr,
				address:ret.address,
				language:language
			};
			fs.writeFile(__dirname + "/curIPInfo.txt",JSON.stringify(curIpInfo));
		}else{
                     
		 }                                                                                                                                                              } catch (e) {
         	console.error(e)		
	     }  
	});      
}

var curUA;

while(1){
	ua = getOneUA();
	if(ua.handleUARet == true){
		curUA = ua;
		break;
	}	
}

console.log(curUA)
getCurIpInfo()

var finalLanguage; 

for(var i = 0; i < 200; i++){
	setTimeout(function() {  
      	 
    	}, 5000);
	var fs = require('fs')
	var ipInfoData = fs.readFileSync("curIPInfo.txt");
        var ipInfoDataStr =  ipInfoData.toString()
        var ipInfoObj = JSON.parse(ipInfoDataStr)
	var ipData = fs.readFileSync("curIP.txt");
        var ipDataStr =  ipData.toString()
	if(ipDataStr == ipInfoObj.ip){
		finalLanguage = ipInfoObj.language;
		break;
	}
}

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
console.log(curUA.finalAgent)
