var request = require("request");
var iconv = require('iconv-lite');
var Promise = require("bluebird");
var fs = require("fs");
require('shelljs/global');

var execStr = 'rm -rf ' + __dirname + '/proxyIP_v2.txt && touch ' + __dirname + '/proxyIP_v2.txt';
var data = exec(execStr,{silent:true}).stdout;

function getProxyList() {
    var apiURL = 'http://www.66ip.cn/mo.php?sxb=&tqsl=100&port=&export=&ktip=&sxa=&submit=%CC%E1++%C8%A1&textarea=http%3A%2F%2Fwww.66ip.cn%2F%3Fsxb%3D%26tqsl%3D100%26ports%255B%255D2%3D%26ktip%3D%26sxa%3D%26radio%3Dradio%26submit%3D%25CC%25E1%2B%2B%25C8%25A1';

    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: apiURL,
            gzip: true,
            encoding: null,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
                'User-Agent': 'Mozilla/8.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
                'referer': 'http://www.66ip.cn/'
            },

        };

        request(options, function (error, response, body) {


            try {

                if (error) throw error;

                if (/meta.*charset=gb2312/.test(body)) {
                    body = iconv.decode(body, 'gbk');
                }

                var ret = body.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g);


                resolve(ret);

            } catch (e) {
                return reject(e);
            }


        });
    })
}


getProxyList().then(function (proxyList) {

    var targetOptions = {
        method: 'GET',
        //url: 'http://ip.chinaz.com/getip.aspx',
	  //url: 'http://47.90.92.126/MonitorProxy/monitor_search.php',
        timeout: 8000,
        encoding: null,
    };

    //这里修改一下，变成你要访问的目标网站
    proxyList.forEach(function (proxyurl) {

        console.log(`testing ${proxyurl}`);

        //targetOptions.proxy = 'http://' + proxyurl;
        var ipArr = proxyurl.split(':');
        targetOptions.url = 'http://ip.taobao.com/service/getIpInfo.php?ip=' + ipArr[0]; 
        request(targetOptions, function (error, response, body) {
            try {
                if (error) throw error;
                body = body.toString();
                //console.log(body);
                eval(`var ret = ${body}`);
                if (ret) {
                    ret.address = ret.data.country;
                    console.log(`验证成功${proxyurl}==>> ${ret.address}`);
                    var isChina = ret.address.match(/中国/g);
                    var language;
                    if(isChina != null){
                        language = 'zh-cn';
                    }else{
                        language = 'en-us';
                    }
                    var isAmerica = ret.address.match(/美国/g);
                    if(isAmerica != null){
                        language = 'en-us';
                    }
                    var isGermany = ret.address.match(/德国/g);
                    if(isGermany != null){
                        language = 'de-de'
                    }
                    var isRussia = ret.address.match(/俄罗斯/g);
                    if(isRussia != null){
                        language = 'ru-ru'
                    }
                    var isTaiwan = ret.address.match(/台湾/g);
                    if(isTaiwan != null){
                        language = 'zh-tw'
                    }
                    var isHongkong = ret.address.match(/香港/g);
                    if(isHongkong != null){
                        language = 'zh-hk'
                    }
                    var isKorean = ret.address.match(/韩国/g);
                    if(isKorean != null){
                        language = 'ko-kr'
                    }
                    var isJapan = ret.address.match(/日本/g);
                    if(isJapan != null){
                        language = 'ja-jp'
                    }
                    var isBrazil = ret.address.match(/巴西/g);
                    if(isBrazil != null){
                        language = 'pt-br'
                    }
                    var isPoland = ret.address.match(/波兰/g);
                    if(isPoland != null){
                        language = 'pl-pl'
                    }
                    var isSingapore = ret.address.match(/新加坡/g);
                    if(isSingapore != null){
                        language = 'en-sg'
                    }
                    var isNorway = ret.address.match(/挪威/g);
                    if(isNorway != null){
                        language = 'en-no'
                    }
                    var isThailand = ret.address.match(/泰国/g);
                    if(isThailand != null){
                        language = 'en-th'
                    }
                    var isHoland = ret.address.match(/荷兰/g);
                    if(isHoland != null){
                        language = 'nl-nl'
                    }
                    var isCanada = ret.address.match(/加拿大/g);
                    if(isCanada != null){
                        language = 'en-ca'
                    }
                    var isUK = ret.address.match(/英国/g);
                    if(isUK != null){
                        language = 'en-gb'
                    }
                    var isChech = ret.address.match(/捷克/g);
                    if(isChech != null){
                        language = 'cs-cz'
                    }
                    var isIndia = ret.address.match(/印度/g);
                    if(isIndia != null){
                        language = 'en-in'
                    }
                    var isTr = ret.address.match(/土耳其/g);
                    if(isTr != null){
                        language = 'tr-tr'
                    }
                    var isIreland = ret.address.match(/爱尔兰/g);
                    if(isIreland != null){
                        language = 'en-ie'
                    }
                    var isFr = ret.address.match(/法国/g);
                    if(isFr != null){
                        language = 'fr-fr'
                    }
                    var acceptLanguage = language + "," + language.substring(0,2) + ";q=0.9"; 
                    var curIpInfo = {
                        ip:proxyurl,
                        address:ret.address,
                        language:language,
                        acceptLanguage: acceptLanguage
                    };
                    fs.appendFileSync(__dirname + "/proxyIP_v2.txt",JSON.stringify(curIpInfo)+ "\n");
                }else{
			 //console.log(`${body}`);	
			}
            } catch (e) {
                 //console.error(e);
            }


        });

    });
}).catch(e => {
    console.log(e);
})

