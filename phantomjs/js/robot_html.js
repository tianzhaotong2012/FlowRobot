"use strict";
var page = require('webpage').create(),
    system = require('system'),
    address, output, size;


if (system.args.length < 3 || system.args.length > 5) {
    console.log('Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]');
    console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
    console.log('  image (png/jpg output) examples: "1920px" entire page, window width 1920px');
    console.log('                                   "800px*600px" window, clipped to 800x600');
    console.log('args:',system.args);
    phantom.exit(1);
} else {
    address = system.args[1];
    output = system.args[2];
    page.viewportSize = { width: 600, height: 600 };
    if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
        size = system.args[3].split('*');
        page.paperSize = size.length === 2 ? { width: size[0], height: size[1], margin: '0px' }
                                           : { format: system.args[3], orientation: 'portrait', margin: '1cm' };
    } else if (system.args.length > 3 && system.args[3].substr(-2) === "px") {
        size = system.args[3].split('*');
        if (size.length === 2) {
            pageWidth = parseInt(size[0], 10);
            pageHeight = parseInt(size[1], 10);
            page.viewportSize = { width: pageWidth, height: pageHeight };
            page.clipRect = { top: 0, left: 0, width: pageWidth, height: pageHeight };
        } else {
            //console.log("size:", system.args[3]);
            pageWidth = parseInt(system.args[3], 10);
            pageHeight = parseInt(pageWidth * 3/4, 10); // it's as good an assumption as any
            //console.log ("pageHeight:",pageHeight);
            page.viewportSize = { width: pageWidth, height: pageHeight };
        }
    }
    if (system.args.length > 4) {
        page.zoomFactor = system.args[4];
    }

/*page.customHeaders = {  
"Referer" : "http://www.goolzhi.com",  
"User-Agent" : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/537.36 LBBROWSER 1.1"  
};*/
    page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36';	
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit(1);
        } else {

            window.setTimeout(function () {
		//保存图片	
		page.render(output);
		phantom.outputEncoding = "utf8";
		console.log(page.content);

		/*var link = document.createElement('a');  
		link.setAttribute('href', "http://www.goolzhi.com/14");
		link.setAttribute('width', "200px");
		link.setAttribute('height', "100px");
		link.innerText=123;
		document.body.appendChild(link);
		console.log(page.content);*/
		//page.sendEvent('click', link.offsetLeft + link.offsetWidth/2, link.offsetTop+link.offsetHeight/2);		
		//var evt = document.createEvent('MouseEvents');  
		//evt.initMouseEvent('click', true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, link);  
		//link.dispatchEvent(evt); 		

		//保存html到文件
		//var fs = require('fs');
		//var file = fs.open('t.txt', 'w');
		//fs.write('t.txt', page.content, 'w');
		//file.close();
		//点击事件
		//page.sendEvent("click",850,2500);
		

            }, 1000);

		window.setTimeout(function (){
			phantom.exit();
		},3600);
        }
    });

	page.onLoadFinished = function(status) {
  		console.log('Status: ' + status);
  		// Do other things here...
		var link = document.createElement('a');  
		link.setAttribute('href', "http://www.goolzhi.com/14");
		link.setAttribute('width', "200px");
		link.setAttribute('height', "100px");
		link.innerText="123444444444444444444444444444444444444444444444444444444444444444444444444444444444444";
		document.body.appendChild(link);
		//var evt = document.createEvent('MouseEvents');  
		//evt.initMouseEvent('click', true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, link);  
		//link.dispatchEvent(evt);
		page.sendEvent('click', link.offsetLeft + 100, link.offsetTop-100);
		var fs = require('fs');
		var file = fs.open('t.txt', 'w');
		fs.write('t.txt', document.body.innerHTML, 'w');
		file.close();
		page.render("t1.png");
	};

}

