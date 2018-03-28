#!/bin/sh
export PATH=$PATH:/usr/local/src/node-v6.11.0-linux-x64/bin
node /var/www/html/FlowRobot/proxyList.js >> /var/www/html/test/node_cron.log &
