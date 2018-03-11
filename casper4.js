// 封装一下xpath对象方便调用
function x(xpath) { return { type: 'xpath', path: xpath }; }
var fs = require('fs'); // 文件系统，用来保存最后的HTML
var casper = require('casper').create({
    pageSettings: { // 没有userAgent不让访问，真是大坑！
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36'
    },
    logLevel: 'debug',
    verbose: true
});

// 避免加载被墙的资源
casper.on('resource.requested', function(reqData, req) {
    if (/facebook|google|twitter|linkedin/.test(reqData.url)) {
        req.abort();
    }
})

casper.start('https://securingtomorrow.mcafee.com/');

function addLoadMoreStep() {
    casper.waitForSelector(x('//a[contains(text(), "Load more")]'), function() {
        console.log('button shown');
        casper.capture('ok.png');

        casper.click(x('//a[contains(text(), "Load more")]'));
        addLoadMoreStep();
    }, null, 20*1000);
}

addLoadMoreStep();
casper.run(function() {
    // 执行结束后保存HTML
    fs.write("temp.html", this.getHTML(), 'w');
});
