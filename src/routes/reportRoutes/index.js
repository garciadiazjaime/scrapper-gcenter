const express = require('express');
const debug = require('debug')('reportRoutes');
const cors = require('cors');

const router = express.Router(); // eslint-disable-line

const PortModel = require('../../models/portModel');
const { getVehicleAverageTime } = require('../../models/portModel');

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
    const startDay = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const query = {
      city,
      created: {
        $gte: new Date(startDay.toISOString()),
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

      const hourKey = date.getHours();
      if (!reportByHour[hourKey]) {
        reportByHour[hourKey] = {
          time: 0,
          count: 0,
        };
      }

      reportByHour[hourKey].time += getVehicleAverageTime(item);
      reportByHour[hourKey].count += 1;

      return reportByHour;
    }, {});

    const response = [...Array(24).keys()].map(hr => {
      const { time, count } = data[hr] || {};
      if (count > 0) {
        return Math.round(time / count * 100) / 100;
      }
      return 0;
    });

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
  } else {
    debug(`city not found: ${city}`);
    res.sendStatus(500);
  }
});

module.exports = router;
