import newrelic from 'newrelic';
import express from 'express';

import bodyParser from 'body-parser';
import stubsRoutes from './routes/stubs';
import PortModel from './models/portModel';
import PeopleModel from './models/peopleModel';
import config from './config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.locals.newrelic = newrelic;

stubsRoutes(app);

app.get('/report', (req, res) => {
  const city = req.param('city');
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

app.post('/user/report', (req, res) => {
  const data = req.body;
  PeopleModel.saveReport(data)
    .then((results) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(results);
    })
    .catch((error) => {
      res.status(200).send(error);
    });
});

app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});

app.get('*', (req, res) => {
  res.writeHead(200);
  res.write(':)');
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
