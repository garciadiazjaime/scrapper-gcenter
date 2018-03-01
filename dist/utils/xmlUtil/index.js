'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xml2js = require('xml2js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XmlUtil = function () {
  function XmlUtil() {
    _classCallCheck(this, XmlUtil);
  }

  _createClass(XmlUtil, null, [{
    key: 'parseToJson',
    value: function parseToJson(html) {
      return new Promise(function (resolve, reject) {
        (0, _xml2js.parseString)(html, function (error, result) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    }
  }]);

  return XmlUtil;
}();

exports.default = XmlUtil;