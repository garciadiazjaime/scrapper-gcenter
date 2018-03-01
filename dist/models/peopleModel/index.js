'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint max-len: [2, 500, 4] */


var _mongoUtil = require('../../utils/mongoUtil');

var _mongoUtil2 = _interopRequireDefault(_mongoUtil);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PeopleModel = function () {
  function PeopleModel() {
    _classCallCheck(this, PeopleModel);

    this.mongoUtil = new _mongoUtil2.default();
  }

  _createClass(PeopleModel, [{
    key: 'getReport',
    value: function getReport(data) {
      var _this = this;

      return new Promise(function (resolve) {
        var curDate = (0, _moment2.default)().subtract(1, 'days').utc().format();
        var startDate = new Date(curDate);
        var filter = {
          city: data,
          created: {
            $gte: startDate
          }
        };
        var options = {
          sort: [['created', 'desc']]
        };
        var skip = null;
        var limit = 50;
        _this.mongoUtil.find('userReport', filter, options, skip, limit).then(function (results) {
          return resolve(results);
        }).catch(function (e) {
          return resolve({ status: false, message: e });
        });
      });
    }
  }, {
    key: 'saveReport',
    value: function saveReport(data) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (data.port && data.type && data.entry && data.time) {
          _this2.mongoUtil.insertOne('userReport', data).then(function (results) {
            if (results.ok && results.n === 1) {
              resolve({ status: true });
            } else {
              reject({ status: false });
            }
          }).catch(function () {
            resolve({ status: false });
          });
        } else {
          reject({ status: false });
        }
      });
    }
  }, {
    key: 'saveLocation',
    value: function saveLocation(data) {
      if (data && data.latitude && data.longitude) {
        return this.mongoUtil.insertOne('userLocation', data);
      }
      return Promise.reject();
    }
  }], [{
    key: 'extractData',
    value: function extractData(data) {
      var peopleData = data && data.pedestrian_lanes ? data.pedestrian_lanes.pop() : null;
      return peopleData && peopleData.standard_lanes && peopleData.ready_lanes ? {
        peopleNormal: peopleData.standard_lanes.pop(),
        peopleReady: peopleData.ready_lanes.pop()
      } : {};
    }
  }, {
    key: 'formatData',
    value: function formatData(normal, ready) {
      return normal && normal.delay_minutes && normal.lanes_open && ready && ready.delay_minutes && ready.lanes_open ? {
        normal: {
          time: normal.delay_minutes.pop(),
          lanes: normal.lanes_open.pop()
        },
        readyLine: {
          time: ready.delay_minutes.pop(),
          lanes: ready.lanes_open.pop()
        }
      } : null;
    }
  }]);

  return PeopleModel;
}();

exports.default = PeopleModel;