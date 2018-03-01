'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestUtil = function () {
  function RequestUtil() {
    _classCallCheck(this, RequestUtil);
  }

  _createClass(RequestUtil, null, [{
    key: 'get',
    value: function get(url) {
      return new Promise(function (resolve, reject) {
        (0, _request2.default)(url, function (error, response, html) {
          if (error) {
            reject(error);
          } else {
            resolve(html);
          }
        });
      });
    }

    /*
      Request method post
      @param {string} string
      @param {data} data
      @returns {object}
    */

  }, {
    key: 'post',
    value: function post(url, data) {
      return new Promise(function (resolve, reject) {
        (0, _request2.default)({
          url: url,
          method: 'POST',
          json: data
        }, function (error, response, body) {
          if (!error && response.statusCode === 201) {
            resolve(body);
          } else {
            reject(error || body);
          }
        });
      });
    }
  }]);

  return RequestUtil;
}();

exports.default = RequestUtil;