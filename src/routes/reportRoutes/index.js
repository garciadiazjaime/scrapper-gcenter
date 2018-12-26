const express = require('express');
const debug = require('debug')('reportRoutes');

const router = express.Router(); // eslint-disable-line

const PortModel = require('../../models/portModel');

router.get('/', async (req, res) => {
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
    res.send(JSON.stringify(report));
  } else {
    debug(`city not found: ${city}`);
    res.sendStatus(500);
  }
});

module.exports = router;
