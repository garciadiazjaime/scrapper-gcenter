/* eslint max-len: [2, 500, 4] */
// import newrelic from 'newrelic';
import express from 'express';
import bodyParser from 'body-parser';
import { CronJob } from 'cron';
import cors from 'cors';
import morgan from 'morgan';

import reportRoutes from './routes/reportRoutes';
import userRoutes from './routes/userRoutes';
import stubRoutes from './routes/stubRoutes';
import scrapperController from './controllers/scrapperController';
import { openDatabase } from './utils/dbUtil';

import MongoUtil from './utils/mongoUtil';
import config from './config';

const app = express();
const mongoUtil = new MongoUtil();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cors());
app.use(morgan('tiny'));
// app.locals.newrelic = newrelic;

app.use('/report', reportRoutes);
app.use('/user', userRoutes);
app.use('/stub', stubRoutes);

app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});
app.get('*', (req, res) => {
  res.send('*');
});

app.set('ipaddress', config.get('ipaddress'));
app.set('port', config.get('port'));


const job = new CronJob('00 */15 * * * *', () => {
  scrapperController();
}, null, false, 'America/Los_Angeles');

mongoUtil.openConnection()
  .then(() => openDatabase(config.get('db.url')))
  .then(() => {
    const server = app.listen(app.get('port'), app.get('ipaddress'), (err) => {
      if (err) {
        console.log(err);
      }
      const host = server.address().address;
      const port = server.address().port;
      console.log('Example app listening at http://%s:%s', host, port);
      job.start();
    });
  })
  .catch(console.log);
