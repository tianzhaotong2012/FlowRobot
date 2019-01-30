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
cd /var/www/html/node
wget "https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x64.tar.xz" --no-check-certificate
tar xvf node-v8.12.0-linux-x64.tar

