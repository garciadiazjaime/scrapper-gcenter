const express = require('express');
/*eslint-disable */
const router = express.Router();
/*eslint-enable */
import PortModel from '../../models/portModel';

router.get('/', (req, res) => {
  const city = req.param('city');
  if (city) {
    const portModel = new PortModel();
    portModel.getReport(city)
      .then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
      });
  } else {
    res.send(':(');
  }
});

export default router;
