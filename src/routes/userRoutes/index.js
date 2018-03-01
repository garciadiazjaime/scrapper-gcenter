import express from 'express';

const router = express.Router(); //eslint-disable-line
// import TwitterUtil from '../../utils/twitterUtil';
import PeopleModel from '../../models/peopleModel';
import UserLocation from '../../models/userLocationModel';

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
  const {
    body,
  } = req;
  const userLocation = new UserLocation(body);
  userLocation.save()
    .then(() => {
      res.status(200).send();
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.get('/location', (req, res) => {
  const hours = 3;
  const queryLastNhrsUsers = {
    created: {
      $gt: new Date(Date.now() - hours * 60 * 60 * 1000),
    },
  };
  UserLocation.find(queryLastNhrsUsers).sort({ created: -1 })
    .then(userLocations => {
      res.json(userLocations);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

export default router;
