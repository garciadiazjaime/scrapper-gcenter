const express = require('express');
const debug = require('debug')('reportRoutes');
/*eslint-disable */
const router = express.Router();
/*eslint-enable */
const { getReport } = require('../../models/portModel');

router.get('/', async (req, res) => {
  const city = req.param('city');
  if (city) {
    const data = await getReport(city);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  } else {
    debug(`city not found: ${city}`);
    res.status(500);
  }
});

module.exports = router;
