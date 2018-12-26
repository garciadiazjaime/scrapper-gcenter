const express = require('express');
const bodyParser = require('body-parser');
const { CronJob } = require('cron');
const mongoose = require('mongoose');
const debug = require('debug')('server');

const reportRoutes = require('./routes/reportRoutes');
const stubRoutes = require('./routes/stubRoutes');
const reportScraper = require('./report-scraper');

const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/report', reportRoutes);
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
  await mongoose.connect(config.get('db.url'), { useNewUrlParser: true });

  const server = app.listen(app.get('port'), app.get('ipaddress'), (err) => {
    if (err) {
      debug(err);
    }
    const host = server.address().address;
    const port = server.address().port;
    debug(`Example app listening at http://${host}:${port}`);
    job.start();
  });
}

main();
