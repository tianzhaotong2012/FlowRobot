#!/bin/sh
export PATH=$PATH:/usr/local/src/node-v6.11.0-linux-x64/bin
export PATH=$PATH:/var/www/html/FlowRobot/phantomjs/bin
node /var/www/html/FlowRobot/robot.js >> /var/www/html/FlowRobot/log

