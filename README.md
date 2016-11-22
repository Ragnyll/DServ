# GServ
The Gallowhome Webserver

This is the webserver designed to run off a raspberry pi on a home network.
It exposes an api to the outside world so that other application, like Amazon
Alexa can access devices in our home.

Tested with raspian-Jessie

Before any software is installed on the Pi make sure the file system is expanded.


First install the project dependencies:
`sudo apt-get install nodejs npm node-semver`

Runs off nginx to make port externally accessible. Install nginx with
`sudo apt-get install nginx` and start with `sudo service nginx start`

To start the node service (from the GServ home directory) run `node GServ/app.js`.
The app runs off port 3000 by default, but this can be changed in the
`GServ/app.js` file.
