# FlowRobot

node_modules/casperjs/bin/casperjs casper6.js

node proxyList.js && node robot.js

export PATH=$PATH:/var/www/html/FlowRobot/phantomjs/bin

timeout 120s node /var/www/html/FlowRobot/proxyList.js 

node /var/www/html/FlowRobot/robot.js >> /var/www/html/FlowRobot/log

59 * * * * sh /var/www/html/FlowRobot/proxyList.sh
50 */12 * * * sh /var/www/html/FlowRobot/robot.sh

# 部署
1、node 
mkdir -p /var/www/html/node  
cd /var/www/html/node
wget "https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x64.tar.xz" --no-check-certificate
xz -d node-v8.12.0-linux-x64.tar.xz
tar xvf node-v8.12.0-linux-x64.tar

2、node_proxy
cd /var/www/html   git clone https://github.com/tianzhaotong2012/node_proxy.git

3、pm2
export PATH=$PATH:/var/www/html/node/node-v8.12.0-linux-x64/bin  
npm install -g pm2@3.2.2   
pm2 list   
cd /var/www/html/node_proxy/
pm2 start /var/www/html/node_proxy/proxy.js

4、FlowRobot
cd /var/www/html  git clone https://github.com/tianzhaotong2012/FlowRobot.git

5、crontab
40 * * * * sh /var/www/html/FlowRobot/proxyListV2.sh
50 0,3,6,9,12,17,21,23 * * * sh /var/www/html/FlowRobot/robotV2.sh

