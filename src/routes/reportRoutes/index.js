const express = require('express');
const debug = require('debug')('reportRoutes');
const cors = require('cors');
const redis = require('redis');

const router = express.Router(); // eslint-disable-line
const client = redis.createClient();

const PortModel = require('../../models/portModel');

router.get('/', cors(), async (req, res) => {
  const city = req.param('city');
  if (city) {
    const cacheKey = `report:${city}`;
    client.get(cacheKey, async (err, cacheReport) => {
      let report = null;

      if (err || !cacheReport) {
        const data = await PortModel.find({
          city,
        })
        .sort({
          created: -1,
        })
        .limit(1);

        report = JSON.stringify(data);

        client.set(cacheKey, report, 'EX', 60);
      } else {
        report = cacheReport;
      }

      res.setHeader('Content-Type', 'application/json');
      res.send(report);
    });
  } else {
    debug(`city not found: ${city}`);
    res.sendStatus(500);
  }
});

module.exports = router;
