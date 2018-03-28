# FlowRobot

node_modules/casperjs/bin/casperjs casper6.js

node proxyList.js && node robot.js

export PATH=$PATH:/var/www/html/FlowRobot/phantomjs/bin

timeout 120s node /var/www/html/FlowRobot/proxyList.js 

node /var/www/html/FlowRobot/robot.js >> /var/www/html/FlowRobot/log
