const express = require('express');
const debug = require('debug')('reportRoutes');
const cors = require('cors');

const router = express.Router(); // eslint-disable-line

const PortModel = require('../../models/portModel');
const { getLast24hrs } = require('../../models/portModel');
const { deepGet } = require('../../utils/string');
const { getLast24hrsReport } = require('../../utils/report-helper');

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

module.exports = router;
