const express = require('express');
const debug = require('debug')('reportRoutes');
const cors = require('cors');

const router = express.Router(); // eslint-disable-line

const PortModel = require('../../models/portModel');

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

router.get('/last-7-days', cors(), async (req, res) => {
  const city = req.param('city');
  if (city) {
    const startDay = new Date();
    startDay.setDate(startDay.getDate() - 7);
    const query = {
      city,
      created: {
        $gte: startDay.toISOString(),
      },
    };

    const report = await PortModel
      .find(query)
      .sort({
        created: -1,
      });

    const data = report.reduce((accumulator, item) => {
      const reportByHour = { ...accumulator };
      const date = new Date(item.created);
      const dayKey = date.getDate();

      if (!reportByHour[dayKey]) {
        reportByHour[dayKey] = {};
      }

      const hourKey = date.getHours();
      if (!reportByHour[dayKey][hourKey]) {
        reportByHour[dayKey][hourKey] = {};
      }

      reportByHour[dayKey][hourKey] = item;

      return reportByHour;
    }, {});

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  } else {
    debug(`city not found: ${city}`);
    res.sendStatus(500);
  }
});

module.exports = router;
