#!/bin/sh
export PATH=$PATH:/var/www/html/node/node-v8.12.0-linux-x64/bin
for (( i = 0; i < 10; i++ ));do
	node /var/www/html/FlowRobot/collect_site.js
	sleep 10
done
