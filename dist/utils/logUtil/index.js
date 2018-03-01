'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import loggly from 'loggly';


// const logglyClient = loggly.createClient({
//   token: config.get('loggly.token'),
//   subdomain: config.get('loggly.subdomain'),
//   auth: {
//     username: config.get('loggly.username'),
//     password: config.get('loggly.password'),
//   },
//   tags: ['scrapper-gcenter'],
// });

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _guidUtil = require('../guidUtil');

var _guidUtil2 = _interopRequireDefault(_guidUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var guid = _guidUtil2.default.generate();

var LogUtil = function () {
  function LogUtil() {
    _classCallCheck(this, LogUtil);
  }

  _createClass(LogUtil, null, [{
    key: 'log',
    value: function log(data) {
      var date = new Date().toJSON();
      var message = date + ' :: ' + guid + ' :: ' + data;
      // logglyClient.log(message);
      console.log(message);
    }
  }]);

  return LogUtil;
}();

exports.default = LogUtil;