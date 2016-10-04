import _ from 'lodash';
const express = require('express');
/*eslint-disable */
const router = express.Router();
/*eslint-enable */
import TwitterUtil from '../../utils/twitterUtil';
import PeopleModel from '../../models/peopleModel';


router.get('/report', (req, res) => {
  const city = req.param('city');
  const peopleModel = new PeopleModel();
  if (city) {
    peopleModel.getReport(city)
      .then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(results);
      }, (error) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(error);
      })
      .catch((error) => {
        res.status(200).send(error);
      });
  } else {
    res.send(':(');
  }
});

router.post('/report', (req, res) => {
  const data = req.body;
  data.created = new Date();
  const peopleModel = new PeopleModel();
  peopleModel.saveReport(data)
    .then((results) => {
      const twitterUtil = new TwitterUtil();
      const status = TwitterUtil.formatStatus(data);
      twitterUtil.postTweet(status)
        .then(() => {
          res.setHeader('Content-Type', 'application/json');
          res.send(results);
        }, () => {
          const response = _.extend({}, results, {
            twitter: false,
          });
          res.setHeader('Content-Type', 'application/json');
          res.send(response);
        })
        .catch((error) => {
          res.status(200).send(error);
        });
    })
    .catch((error) => {
      res.status(200).send(error);
    });
});

export default router;
