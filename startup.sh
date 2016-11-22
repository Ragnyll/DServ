#!/bin/sh
printf "============================== Checking all node packages are up to date =============================="
npm install # makes sure all node packages are up to date
printf "============================== Starting nginx =============================="
sudo service start nginx # starts nginx
printf "============================== Starting node =============================="
node GServ/app.js # runs the node application
