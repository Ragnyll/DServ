#!/bin/sh
npm install # makes sure all node packages are up to date
sudo service start nginx # starts nginx
node GServ/app.js # runs the node application
