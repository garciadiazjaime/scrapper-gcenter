const express = require('express');
// import _ from 'lodash';
/*eslint-disable */
const router = express.Router();
/*eslint-enable */
// import TwitterUtil from '../../utils/twitterUtil';
import PeopleModel from '../../models/peopleModel';

// const saveOnTwitter = (data) => {
//   const twitterUtil = new TwitterUtil();
//   const status = TwitterUtil.formatStatus(data);
//   twitterUtil.postTweet(status);
//     .then(() => {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(results);
//     }, () => {
//       const response = _.extend({}, results, {
//         twitter: false,
//       });
//       res.setHeader('Content-Type', 'application/json');
//       res.send(response);
//     })
//     .catch((error) => {
//       res.status(200).send(error);
//     });
// }


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
    .then(results => {
      res.json(results);
      // saveOnTwitter(data);
    })
    .catch((error) => {
      res.status(200).send(error);
    });
});

router.post('/location', (req, res) => {
  const peopleModel = new PeopleModel();
  const { body } = req;
  body.created = new Date();
  peopleModel.saveLocation(body)
    .then(results => {
      res.json(results);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

export default router;
