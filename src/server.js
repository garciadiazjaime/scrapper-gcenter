const express = require('express');
const bodyParser = require('body-parser');
const { CronJob } = require('cron');
const debug = require('debug')('server');

const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');
const stubRoutes = require('./routes/stubRoutes');
const reportScraper = require('./report-scraper');

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

app.get('*', (req, res) => {
  res.send('*');
});

app.set('ipaddress', config.get('ipaddress'));
app.set('port', config.get('port'));


const job = new CronJob('00 */15 * * * *', async () => {
  await reportScraper();
}, null, false, 'America/Los_Angeles');

async function main() {
  await mongoUtil.openConnection();

  const server = app.listen(app.get('port'), app.get('ipaddress'), (err) => {
    if (err) {
      debug(err);
    }
    const host = server.address().address;
    const port = server.address().port;
    debug(`Example app listening at http://${host}:${port}`);
    // job.start();
  });
}

main();
