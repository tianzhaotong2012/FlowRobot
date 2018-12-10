#!/bin/sh
export PATH=$PATH:/var/www/html/node/node-v8.12.0-linux-x64/bin
export PATH=$PATH:/var/www/html/FlowRobot/phantomjs/bin
node /var/www/html/FlowRobot/robot_cnzz.js >> /var/www/html/FlowRobot/robot_cnzz_log
