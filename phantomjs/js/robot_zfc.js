"use strict";
var page = require('webpage').create(),
    system = require('system');

page.viewportSize = { width: 360, height: 640 };
page.clipRect = { top: 0, left: 0, width: 360, height: 6640 };
page.zoomFactor = 0.5;

page.settings.userAgent = 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Mobile Safari/537.36';

page.open("http://www.zuofanchi.cn", function (status) {

        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit(1);
        } else {
	    window.setTimeout(function () {
		page.render("phantom_zfc_home.png");
		phantom.outputEncoding = "utf8";
		console.log(page.content);
	    	
		page.sendEvent("click",180,500);
	    },6000);

	    window.setTimeout(function (){
			console.log("page");
			page.render("phantom_zfc_page.png");
			page.sendEvent("click",180,550);
	    },6600);
	
	    window.setTimeout(function (){
                        console.log(page.content);
                        page.render("phantom_zfc_page2.png");
			for(var i = 1;i<40;i++){
				var h = Number(1000)+i*100;
				console.log(h);
				page.sendEvent("click",180,h);
				page.sendEvent("click",180,h);
			}
			page.sendEvent("click",180,2916);
			page.sendEvent("click",180,3016);
			page.sendEvent("click",180,3116);
			page.sendEvent("click",180,3216);
			page.sendEvent("click",180,3206);
			page.sendEvent("click",180,3326);
            },9900);

	   window.setTimeout(function (){
                        console.log(page.content);
                        page.switchToChildFrame(0);
			console.log(page.content);
			for(var i = 1;i<40;i++){
                                var h = Number(1000)+i*100;
                                console.log(h);
                                page.sendEvent("click",180,h);
                                page.sendEvent("click",180,h);
                        }
			page.render("phantom_zfc_ad_dt.png");
			phantom.exit(1);
            },16600);	
	}

});


