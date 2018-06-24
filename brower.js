function getOneUA(index = -1){
	var fs = require("fs")
	var uaData = fs.readFileSync("user_agent.json.txt");
	var uaDataStr =  uaData.toString()
	var uaObj = JSON.parse(uaDataStr)
	if(index != -1){
		return uaObj[index]
	}
	console.log(uaObj.length)
	var randIdx = Math.floor(Math.random()*uaObj.length)
	console.log(randIdx)
	//console.log(uaObj[randIdx])
	return uaObj[randIdx]
}

function handleUA(orignUA){
	if(orignUA.machine_type == 'android'){
		var androidVer = orignUA.agent_info.match(/Android\s\d+(\.\d+)*\;/g)
		if(androidVer.length == 1){
			orignUA.agent_info_zh = orignUA.agent_info.replace(androidVer[0],androidVer[0] + " zh-CN;");
		}
		var chromeVer  = orignUA.agent_info.match(/Chrome\/\d+(\.\d+)*/g)
		if(chromeVer != null && chromeVer.length == 1){
			orignUA.agent_info_uc = orignUA.agent_info.replace(chromeVer[0],"Chrome/57.0.2987.108 UCBrowser/12.0.2.982");
			orignUA.agent_info_sougou = orignUA.agent_info.replace(chromeVer[0],"Chrome/56.0.2924.116") + " SogouMSE,SogouMobileBrowser/5.13.5";
			var buildVer = orignUA.agent_info_sougou.match(/Build\/[A-Za-z0-9_\\-]+/g);
			if(buildVer.length == 1){
				orignUA.agent_info_sougou = orignUA.agent_info_sougou.replace(buildVer[0],buildVer[0]+"; wv");
			}
			orignUA.agent_info_qq = orignUA.agent_info.replace(chromeVer[0],"Chrome/57.0.2987.132 MQQBrowser/8.5");
			var linuxVer = orignUA.agent_info.match(/Linux\;/g);
			if(linuxVer.length == 1){
				orignUA.agent_info_uc = orignUA.agent_info_uc.replace(linuxVer[0],linuxVer[0] + " U;");
				orignUA.agent_info_qq = orignUA.agent_info_qq.replace(linuxVer[0],linuxVer[0] + " U;");
			}
		}
		//todo to check
		if(orignUA.screen_width == '1440' && orignUA.screen_height == '2560'){
                        orignUA.width = '360'
                        orignUA.height = '640'
                        orignUA.handleUARet = true
                }
		if(orignUA.screen_width == '1080' && orignUA.screen_height == '2280'){
			orignUA.width = '360'
                        orignUA.height = '760'
			orignUA.handleUARet = true
		}
		if(orignUA.screen_width == '1080' && orignUA.screen_height == '2160'){
                        orignUA.width = '360'
                        orignUA.height = '720'
			orignUA.handleUARet = true
                }
		//todo to check
		if(orignUA.screen_width == '1152' && orignUA.screen_height == '1920'){
                        orignUA.width = '360'
                        orignUA.height = '600'
                        orignUA.handleUARet = true
                }
		if(orignUA.screen_width == '1080' && orignUA.screen_height == '1920'){
                        orignUA.width = '360'
                        orignUA.height = '640'
			orignUA.handleUARet = true
                }
		if(orignUA.screen_width == '1080' && orignUA.screen_height == '1800'){
                        orignUA.width = '360'
                        orignUA.height = '600'
                        orignUA.handleUARet = true
                }
		if(orignUA.screen_width == '720' && orignUA.screen_height == '1440'){
                        orignUA.width = '360'
                        orignUA.height = '720'
                        orignUA.handleUARet = true
                }
		if(orignUA.screen_width == '720' && orignUA.screen_height == '1280'){
                        orignUA.width = '360'
                        orignUA.height = '640'
			orignUA.handleUARet = true
                }
		if(orignUA.screen_width == '540' && orignUA.screen_height == '960'){
                        orignUA.width = '360'
                        orignUA.height = '640'
			orignUA.handleUARet = true
                }
		if(orignUA.brand == 'samsung'){
			if(orignUA.screen_width == '1080' && orignUA.screen_height == '1920'){
				orignUA.width = '360'
				orignUA.height = '640'
				orignUA.handleUARet = true
			}
			if(orignUA.screen_width == '720' && orignUA.screen_height == '1280'){
                                orignUA.width = '360'
                                orignUA.height = '640'
                                orignUA.handleUARet = true
                        }
		}
		if(orignUA.brand == 'huawei'){
                        if(orignUA.screen_width == '1080' && orignUA.screen_height == '1920'){
                                orignUA.width = '360'
                                orignUA.height = '640'
                                orignUA.handleUARet = true
                        }
                        if(orignUA.screen_width == '720' && orignUA.screen_height == '1280'){
                                orignUA.width = '360'
                                orignUA.height = '640'
                                orignUA.handleUARet = true
                        }
                }
		if(orignUA.brand == 'xiaomi'){
                        if(orignUA.screen_width == '1080' && orignUA.screen_height == '1920'){
                                orignUA.width = '360'
                                orignUA.height = '640'
                                orignUA.handleUARet = true
                        }
                        if(orignUA.screen_width == '720' && orignUA.screen_height == '1280'){
                                orignUA.width = '360'
                                orignUA.height = '640'
                                orignUA.handleUARet = true
                        }
                }
		if(orignUA.brand == 'meizu'){
                        if(orignUA.screen_width == '1080' && orignUA.screen_height == '1920'){
                                orignUA.width = '360'
                                orignUA.height = '640'
                                orignUA.handleUARet = true
                        }
                        if(orignUA.screen_width == '720' && orignUA.screen_height == '1280'){
                                orignUA.width = '360'
                                orignUA.height = '640'
                                orignUA.handleUARet = true
                        }
                }
		if(orignUA.brand == 'oppo'){
                        if(orignUA.screen_width == '1080' && orignUA.screen_height == '1920'){
                                orignUA.width = '360'
                                orignUA.height = '640'
                                orignUA.handleUARet = true
                        }
                        if(orignUA.screen_width == '720' && orignUA.screen_height == '1280'){
                                orignUA.width = '360'
                                orignUA.height = '640'
                                orignUA.handleUARet = true
                        }
			if(orignUA.screen_width == '540' && orignUA.screen_height == '960'){
                                orignUA.width = '360'
                                orignUA.height = '640'
                                orignUA.handleUARet = true
                        }
                }
		if(orignUA.brand == 'vivo'){
                        if(orignUA.screen_width == '1080' && orignUA.screen_height == '1920'){
                                orignUA.width = '360'
                                orignUA.height = '640'
                                orignUA.handleUARet = true
                        }
                        if(orignUA.screen_width == '720' && orignUA.screen_height == '1280'){
                                orignUA.width = '360'
                                orignUA.height = '640'
                                orignUA.handleUARet = true
                        }
			if(orignUA.screen_width == '540' && orignUA.screen_height == '960'){
                                orignUA.width = '360'
                                orignUA.height = '640'
                                orignUA.handleUARet = true
                        }
                }
		
	}
	if(orignUA.machine_type == 'ios'){
		if(orignUA.screen_width == '1080' && orignUA.screen_height == '1920'){
			orignUA.width = '414'
			orignUA.height = '736'
			orignUA.handleUARet = true		
		}
		if(orignUA.screen_width == '750' && orignUA.screen_height == '1334'){
                        orignUA.width = '375'
                        orignUA.height = '667'
                        orignUA.handleUARet = true
                }
		if(orignUA.screen_width == '640' && orignUA.screen_height == '1136'){
                        orignUA.width = '320'
                        orignUA.height = '568'
                        orignUA.handleUARet = true
                }	
	}
	if(orignUA.machine_type == 'mac'){
		if(orignUA.screen_width == '1440' && orignUA.screen_height == '900'){
                        orignUA.width = '1440'
                        orignUA.height = '900'
                        orignUA.handleUARet = true
                }
	}
	if(orignUA.brand == 'windows'){
		if(orignUA.screen_width == '1920' && orignUA.screen_height == '1080'){
                        orignUA.width = '1920'
                        orignUA.height = '1080'
                        orignUA.handleUARet = true
                }
		if(orignUA.screen_width == '1366' && orignUA.screen_height == '768'){
                        orignUA.width = '1366'
                        orignUA.height = '768'
                        orignUA.handleUARet = true
                }
	}
	return orignUA
}

var agentArr = []
for(var i = 0; i < 100; i++){
	orignUA = getOneUA(i)
	//console.log(handleUA(orignUA))
	agentArr.push(handleUA(orignUA))
}
//console.log(agentArr)
console.log(JSON.stringify(agentArr))
