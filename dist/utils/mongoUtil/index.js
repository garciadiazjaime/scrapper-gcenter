'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongodb = require('mongodb');

var _logUtil = require('../logUtil');

var _logUtil2 = _interopRequireDefault(_logUtil);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dbClient = void 0;

var MongoUtil = function () {
  function MongoUtil() {
    _classCallCheck(this, MongoUtil);
  }

  _createClass(MongoUtil, [{
    key: 'openConnection',
    value: function openConnection() {
      return new Promise(function (resolve, reject) {
        if (!dbClient) {
          _mongodb.MongoClient.connect(_config2.default.get('db.url'), function (err, db) {
            if (err) {
              reject(err);
            } else {
              dbClient = db;
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    }
  }, {
    key: 'insertOne',
    value: function insertOne(collectionName, data) {
      return new Promise(function (resolve, reject) {
        if (dbClient) {
          var collection = dbClient.collection(collectionName);
          collection.insertOne(data, function (err, result) {
            if (err) {
              _logUtil2.default.log('Error insertOne ' + err);
              reject({ status: false });
            } else {
              resolve(result.result);
            }
          });
        } else {
          _logUtil2.default.log('Error :: DB must be open');
          reject({ status: false });
        }
      });
    }
  }, {
    key: 'findOne',
    value: function findOne(collectionName, filter, options) {
      return new Promise(function (resolve, reject) {
        if (dbClient) {
          var collection = dbClient.collection(collectionName);
          collection.findOne(filter, options, function (err, document) {
            if (err) {
              reject(err);
            } else {
              resolve(document);
            }
          });
        } else {
          _logUtil2.default.log('Error :: DB must be open');
          reject({ status: false });
        }
      });
    }
  }, {
    key: 'find',
    value: function find(collectionName, filter, options, skip, limit) {
      return new Promise(function (resolve, reject) {
        if (dbClient) {
          var collection = dbClient.collection(collectionName);
          collection.find(filter || {}, options || {}).skip(skip || 0).limit(limit || 0).toArray(function (err, documents) {
            if (err) {
              reject(err);
            } else {
              resolve(documents);
            }
          });
        } else {
          _logUtil2.default.log('Error :: DB must be open');
          reject({ status: false });
        }
      });
    }
  }, {
    key: 'closeConnection',
    value: function closeConnection() {
      dbClient.close();
    }
  }]);

  return MongoUtil;
}();

exports.default = MongoUtil;