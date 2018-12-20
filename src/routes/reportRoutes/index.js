const express = require('express');
/*eslint-disable */
const router = express.Router();
/*eslint-enable */
const PortModel = require('../../models/portModel');
const logUtil = require('../../utils/logUtil');


router.get('/', (req, res) => {
  const city = req.param('city');
  if (city) {
    const portModel = new PortModel();
    portModel.getReport(city)
      .then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
      })
      .catch((error) => {
        logUtil.log(`/report ${error}`);
        res.send(':(');
      });
  } else {
    res.send(':(');
  }
});

module.exports = router;
