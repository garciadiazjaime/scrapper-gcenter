'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _portModel = require('../../models/portModel');

var _portModel2 = _interopRequireDefault(_portModel);

var _logUtil = require('../../utils/logUtil');

var _logUtil2 = _interopRequireDefault(_logUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
/*eslint-disable */
var router = express.Router();
/*eslint-enable */


router.get('/', function (req, res) {
  var city = req.param('city');
  if (city) {
    var portModel = new _portModel2.default();
    portModel.getReport(city).then(function (data) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    }).catch(function (error) {
      _logUtil2.default.log('/report ' + error);
      res.send(':(');
    });
  } else {
    res.send(':(');
  }
});

exports.default = router;