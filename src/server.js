/* eslint max-len: [2, 500, 4] */
import newrelic from 'newrelic';
import express from 'express';

import bodyParser from 'body-parser';
import stubsRoutes from './routes/stubs';
import userRoutes from './routes/user';
import PortModel from './models/portModel';
import config from './config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.locals.newrelic = newrelic;

stubsRoutes(app);
userRoutes(app);

app.get('/report', (req, res) => {
  const city = req.param('city');
  console.log('/report', city);
  if (city) {
    PortModel.getReport(city)
      .then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
      });
  } else {
    res.send(':(');
  }
});

app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});

app.get('*', (req, res) => {
  res.send(':)');
});

app.set('ipaddress', config.get('ipaddress'));
app.set('port', config.get('port'));

const server = app.listen(app.get('port'), app.get('ipaddress'), (err) => {
  if (err) {
    console.log(err);
  }
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
