#!/bin/sh
printf "============ Checking all node packages are up to date ============== \n"
npm install # makes sure all node packages are up to date
printf "========================= Starting nginx ========================= \n "
sudo service start nginx # starts nginx
printf "========================= Starting node ========================= \n "
node GServ/app.js # runs the node application
