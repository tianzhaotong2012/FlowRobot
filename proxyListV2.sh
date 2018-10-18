#!/bin/sh
export PATH=$PATH:/var/www/html/node/node-v8.12.0-linux-x64/bin
node /var/www/html/FlowRobot/proxyList_v2.js >> /var/www/html/FlowRobot/proxyList_v2.log &
