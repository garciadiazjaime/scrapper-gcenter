'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _peopleModel = require('../../models/peopleModel');

var _peopleModel2 = _interopRequireDefault(_peopleModel);

var _userLocationModel = require('../../models/userLocationModel');

var _userLocationModel2 = _interopRequireDefault(_userLocationModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); //eslint-disable-line
// import TwitterUtil from '../../utils/twitterUtil';


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


router.get('/report', function (req, res) {
  var city = req.param('city');
  var peopleModel = new _peopleModel2.default();
  if (city) {
    peopleModel.getReport(city).then(function (results) {
      res.setHeader('Content-Type', 'application/json');
      res.send(results);
    }, function (error) {
      res.setHeader('Content-Type', 'application/json');
      res.send(error);
    }).catch(function (error) {
      res.status(200).send(error);
    });
  } else {
    res.send(':(');
  }
});

router.post('/report', function (req, res) {
  var data = req.body;
  data.created = new Date();
  var peopleModel = new _peopleModel2.default();
  peopleModel.saveReport(data).then(function (results) {
    res.json(results);
    // saveOnTwitter(data);
  }).catch(function (error) {
    res.status(200).send(error);
  });
});

router.post('/location', function (req, res) {
  var body = req.body;

  var userLocation = new _userLocationModel2.default(body);
  userLocation.save().then(function () {
    res.status(200).send();
  }).catch(function (error) {
    res.status(500).send(error);
  });
});

router.get('/location', function (req, res) {
  var hours = 3;
  var queryLastNhrsUsers = {
    created: {
      $gt: new Date(Date.now() - hours * 60 * 60 * 1000)
    }
  };
  _userLocationModel2.default.find(queryLastNhrsUsers).sort({ created: -1 }).then(function (userLocations) {
    res.json(userLocations);
  }).catch(function (error) {
    res.status(500).send(error);
  });
});

exports.default = router;