const express = require('express');
const debug = require('debug')('reportRoutes');
const cors = require('cors');
const fs = require('fs')

const router = express.Router(); // eslint-disable-line

const PortModel = require('../../models/portModel');
const { getLast24hrs, getHistoryFor } = require('../../models/portModel');
const { getLast24hrsReport, getHistoryReport } = require('../../utils/report-helper');
const { getLast24hrsImage } = require('../../utils/image-generator');
const { getOrElse } = require('../../utils/cache')
const { getLast24hrsSummary } = require('../../utils/port')

router.get('/', cors(), async (req, res) => {
  const city = req.param('city');
  if (city) {
    const report = await getOrElse(city, () => PortModel.find({
        city,
      })
      .sort({
        created: -1,
      })
      .limit(1)
    )

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(report && report[0]));
  } else {
    debug(`city not found: ${city}`);
    res.sendStatus(500);
  }
});

router.get('/last-24hrs', cors(), async (req, res) => {
  const { city } = req.query;
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

router.get('/last-24hrs/summary', async (req, res) => {
  const { city } = req.query;
  if (city) {
    const report = await getLast24hrsSummary(city);

    res.setHeader('Content-Type', 'application/json');
    res.send(report);
  } else {
    debug(`city not found: ${city}`);
    res.sendStatus(500);
  }
});

router.get('/last-24hrs-image', async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.sendStatus(500);
  }

  const response = await getLast24hrsImage(city);

  res.setHeader('Content-Type', 'image/svg+xml');
  return res.send(response);
});

router.get('/history', async (req, res) => {
  const city = req.param('city');
  const key = req.param('key');
  const from = req.param('from');
  if (city && key === 'mintitmedia') {
    const report = await getHistoryFor(city, from);
    const response = getHistoryReport(report);
    res.setHeader('Content-Type', 'text/csv');
    response.forEach(line => res.write(line));
    res.end();
  } else {
    debug(`city not found: ${city}`);
    res.sendStatus(500);
  }
});

router.post('/static', async (req, res) => {
  const payload = req.body;
  if (Array.isArray(payload) && payload.length) {
    fs.writeFileSync(`./public/gc_report.json`, JSON.stringify(payload))
    res.sendStatus(200);
  } else {
    debug('static route empty params');
    res.sendStatus(500);
  }
});

module.exports = router;
