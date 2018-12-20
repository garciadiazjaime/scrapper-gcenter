const express = require('express');
const bodyParser = require('body-parser');
const { CronJob } = require('cron');

const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');
const stubRoutes = require('./routes/stubRoutes');
const scrapperHelper = require('./main');

const MongoUtil = require('./utils/mongoUtil');
const config = require('./config');

const app = express();
const mongoUtil = new MongoUtil();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));


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
  scrapperHelper();
}, null, false, 'America/Los_Angeles');

mongoUtil.openConnection()
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
  }, () => {
    console.log('Error :: No DB connection open');
  });
