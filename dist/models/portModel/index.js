'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint max-len: [2, 500, 4] */


var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _carModel = require('../carModel');

var _carModel2 = _interopRequireDefault(_carModel);

var _peopleModel = require('../peopleModel');

var _peopleModel2 = _interopRequireDefault(_peopleModel);

var _mongoUtil = require('../../utils/mongoUtil');

var _mongoUtil2 = _interopRequireDefault(_mongoUtil);

var _ports = require('../../constants/ports.js');

var _ports2 = _interopRequireDefault(_ports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PortModel = function () {
  function PortModel() {
    _classCallCheck(this, PortModel);

    this.dbClient = new _mongoUtil2.default();
  }

  _createClass(PortModel, [{
    key: 'getReport',
    value: function getReport(city) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var ports = _this.getCityPorts(_ports2.default, city);
        if (_lodash2.default.isArray(ports) && ports.length) {
          var options = { sort: { created: -1 } };
          var skip = null;
          var limit = 1;
          var promises = ports.map(function (item) {
            return _this.dbClient.find('report', { garita: item.name }, options, skip, limit);
          });
          Promise.all(promises).then(function (data) {
            return resolve(data.map(function (item) {
              return item.pop();
            }));
          });
        } else {
          reject();
        }
      });
    }
  }, {
    key: 'getCityPorts',
    value: function getCityPorts(ports, city) {
      return ports.filter(function (port) {
        return city && port.city.toUpperCase() === city.toUpperCase();
      });
    }
  }], [{
    key: 'extractData',
    value: function extractData(data, port) {
      var _this2 = this;

      var response = [];
      if (this.isDataValid(data)) {
        var ports = data.border_wait_time.port;
        ports.map(function (item) {
          if (_this2.isPortValid(item, port)) {
            var _CarModel$extractData = _carModel2.default.extractData(item),
                carNormal = _CarModel$extractData.carNormal,
                carSentri = _CarModel$extractData.carSentri,
                carReady = _CarModel$extractData.carReady;

            var _PeopleModel$extractD = _peopleModel2.default.extractData(item),
                peopleNormal = _PeopleModel$extractD.peopleNormal,
                peopleReady = _PeopleModel$extractD.peopleReady;

            if (carNormal && carSentri && carReady && peopleNormal && peopleReady) {
              var carReport = _carModel2.default.formatData(carNormal, carSentri, carReady);
              var peopleReport = _peopleModel2.default.formatData(peopleNormal, peopleReady);
              response.push({
                car: carReport,
                people: peopleReport
              });
            }
          }
          return null;
        });
      }
      return response;
    }
  }, {
    key: 'isDataValid',
    value: function isDataValid(data) {
      if (data && data.border_wait_time && _lodash2.default.isArray(data.border_wait_time.port) && data.border_wait_time.port.length) {
        return true;
      }
      return false;
    }
  }, {
    key: 'isPortValid',
    value: function isPortValid(data, port) {
      return data.port_number && data.port_number.indexOf(port.toString()) !== -1;
    }
  }]);

  return PortModel;
}();

exports.default = PortModel;