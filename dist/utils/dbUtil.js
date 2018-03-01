'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openDatabase = openDatabase;
exports.closeDatabase = closeDatabase;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

function openDatabase(dbUrl) {
  _mongoose2.default.connect(dbUrl);
}

function closeDatabase(dbUrl) {
  _mongoose2.default.closeDatabase();
}