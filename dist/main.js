'use strict';

var _runGenerator = require('./utils/runGenerator');

var _runGenerator2 = _interopRequireDefault(_runGenerator);

var _requestUtil = require('./utils/requestUtil');

var _requestUtil2 = _interopRequireDefault(_requestUtil);

var _xmlUtil = require('./utils/xmlUtil');

var _xmlUtil2 = _interopRequireDefault(_xmlUtil);

var _portModel = require('./models/portModel');

var _portModel2 = _interopRequireDefault(_portModel);

var _mongoUtil = require('./utils/mongoUtil');

var _mongoUtil2 = _interopRequireDefault(_mongoUtil);

var _queryUtil = require('./utils/mongoUtil/queryUtil');

var _queryUtil2 = _interopRequireDefault(_queryUtil);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _logUtil = require('./utils/logUtil');

var _logUtil2 = _interopRequireDefault(_logUtil);

var _ports = require('./constants/ports');

var _ports2 = _interopRequireDefault(_ports);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoUtil = new _mongoUtil2.default();

function startRequest(port) {
  return new Promise(function (resolve, reject) {
    (0, _runGenerator2.default)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var requestResponse, jsonData, portData, data, results;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              _logUtil2.default.log('getting data for ' + port.name + '...');
              _context.next = 4;
              return _requestUtil2.default.get(_config2.default.get('api.url'));

            case 4:
              requestResponse = _context.sent;
              _context.next = 7;
              return _xmlUtil2.default.parseToJson(requestResponse);

            case 7:
              jsonData = _context.sent;
              portData = _portModel2.default.extractData(jsonData, port.id);
              data = _queryUtil2.default.saveReport(portData, port.city, port.name);
              _context.next = 12;
              return mongoUtil.openConnection();

            case 12:
              _context.next = 14;
              return mongoUtil.insertOne('report', data);

            case 14:
              results = _context.sent;


              if (results) {
                _logUtil2.default.log('...Garita ' + port.name + ' updated');
                resolve();
              } else {
                _logUtil2.default.log('...Error on garita ' + port.name);
                reject();
              }
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context['catch'](0);

              _logUtil2.default.log('exception ' + _context.t0);

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 18]]);
    }))();
  });
}

var promises = [];
_logUtil2.default.log('==== start ====');
for (var i = 0, len = _ports2.default.length; i < len; i++) {
  (function (port) {
    promises.push(startRequest(port));
  })(_ports2.default[i]);
}

Promise.all(promises).then(function () {
  mongoUtil.closeConnection();
  _logUtil2.default.log('==== done ====');
  process.exit();
}).catch(function (error) {
  mongoUtil.closeConnection();
  _logUtil2.default.log('promise error ' + error);
  process.exit();
});