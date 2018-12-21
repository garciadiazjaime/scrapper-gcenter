GaritaCenter Scrapper
----

[![Build Status](https://travis-ci.org/garciadiazjaime/scrapper-garitacenter.svg)](https://travis-ci.org/garciadiazjaime/scrapper-garitacenter)

Run project:
----
a) let's install all packages:

`npm install`

b) let's run dev server

`npm run dev`

By default server will run on http://127.0.0.1:3000/

Code to increase jslint max line length limit
/* eslint max-len: [2, 500, 4] */

Check the current number of connections to MongoDb
db.serverStatus().connections

Docker commands
----

docker build -t garciadiazjaime/api-gcenter .
docker run -d -p 49182:3082 garciadiazjaime/api-gcenter
docker push garciadiazjaime/api-gcenter
docker pull garciadiazjaime/api-gcenter
