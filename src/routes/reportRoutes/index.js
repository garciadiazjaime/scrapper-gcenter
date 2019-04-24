const express = require('express');
const debug = require('debug')('reportRoutes');
const cors = require('cors');

const router = express.Router(); // eslint-disable-line

const PortModel = require('../../models/portModel');
const { getLast24hrs, getHistoryFor } = require('../../models/portModel');
const { getLast24hrsReport, getHistoryReport } = require('../../utils/report-helper');

router.get('/', cors(), async (req, res) => {
  const city = req.param('city');
  if (city) {
    const report = await PortModel.find({
      city,
    })
    .sort({
      created: -1,
    })
    .limit(1);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(report && report[0]));
  } else {
    debug(`city not found: ${city}`);
    res.sendStatus(500);
  }
});

router.get('/last-24hrs', cors(), async (req, res) => {
  const city = req.param('city');
  if (city) {
    const report = await getLast24hrs(city);
    const response = getLast24hrsReport(report, 'sanYsidro');

    res.setHeader('Content-Type', 'application/json');
    res.send(response);
  } else {
    debug(`city not found: ${city}`);
    res.sendStatus(500);
  }
});

router.get('/history', async (req, res) => {
  const city = req.param('city');
  const key = req.param('key');
  const limit = parseInt(req.param('limit'), 10);
  if (city && key === 'mintitmedia') {
    const report = await getHistoryFor(city, limit);
    const response = getHistoryReport(report);
    res.setHeader('Content-Type', 'text/csv');
    response.forEach(line => res.write(line));
    res.end();
  } else {
    debug(`city not found: ${city}`);
    res.sendStatus(500);
  }
});

module.exports = router;
