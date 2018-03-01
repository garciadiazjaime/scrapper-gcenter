'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
/*eslint-disable */
var router = express.Router();
/*eslint-enable */

router.get('/ports', function (req, res) {
  _fs2.default.readFile('resources/stubs/ports.xml', function (err, data) {
    if (!err) {
      res.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': data.length });
      res.write(data);
    } else {
      res.writeHead(404);
    }
    res.end();
  });
});

router.get('/san-ysidro', function (req, res) {
  _fs2.default.readFile('resources/stubs/cbp_san_ysidro.html', function (err, data) {
    if (!err) {
      res.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': data.length });
      res.write(data);
    } else {
      res.writeHead(404);
    }
    res.end();
  });
});

router.get('/otay', function (req, res) {
  _fs2.default.readFile('resources/stubs/cbp_otay.html', function (err, data) {
    if (!err) {
      res.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': data.length });
      res.write(data);
    } else {
      res.writeHead(404);
    }
    res.end();
  });
});

exports.default = router;