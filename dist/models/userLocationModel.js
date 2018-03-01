'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserLocationSchema = new _mongoose2.default.Schema({
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  uuid: String,
  created: { type: Date, default: Date.now }
});

var UserLocationModel = _mongoose2.default.model('userLocation', UserLocationSchema);

exports.default = UserLocationModel;