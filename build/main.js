module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _runGenerator = __webpack_require__(1);

	var _runGenerator2 = _interopRequireDefault(_runGenerator);

	var _requestUtil = __webpack_require__(2);

	var _requestUtil2 = _interopRequireDefault(_requestUtil);

	var _xmlUtil = __webpack_require__(4);

	var _xmlUtil2 = _interopRequireDefault(_xmlUtil);

	var _portModel = __webpack_require__(6);

	var _portModel2 = _interopRequireDefault(_portModel);

	var _mongoUtil = __webpack_require__(10);

	var _mongoUtil2 = _interopRequireDefault(_mongoUtil);

	var _queryUtil = __webpack_require__(15);

	var _queryUtil2 = _interopRequireDefault(_queryUtil);

	var _config = __webpack_require__(12);

	var _config2 = _interopRequireDefault(_config);

	var _logUtil = __webpack_require__(16);

	var _logUtil2 = _interopRequireDefault(_logUtil);

	var _ports = __webpack_require__(14);

	var _ports2 = _interopRequireDefault(_ports);

	__webpack_require__(19);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function startRequest(port) {
	  return new Promise(function (resolve, reject) {
	    (0, _runGenerator2.default)(regeneratorRuntime.mark(function _callee() {
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
	              return _mongoUtil2.default.saveReport(data);

	            case 12:
	              results = _context.sent;


	              if (results) {
	                _logUtil2.default.log('...Garita ' + port.name + ' updated');
	                resolve();
	              } else {
	                _logUtil2.default.log('...Error on garita ' + port.name);
	                reject();
	              }
	              _context.next = 19;
	              break;

	            case 16:
	              _context.prev = 16;
	              _context.t0 = _context['catch'](0);

	              _logUtil2.default.log('exception ' + _context.t0);

	            case 19:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this, [[0, 16]]);
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
	  _logUtil2.default.log('==== done ====');
	}).catch(function (error) {
	  _logUtil2.default.log('promise error ' + error);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (makeGenerator) {
	  var _this = this,
	      _arguments = arguments;

	  return function () {
	    var generator = makeGenerator.apply(_this, _arguments);

	    function handle(result) {
	      // result => { done: [Boolean], value: [Object] }
	      if (result.done) return Promise.resolve(result.value);

	      return Promise.resolve(result.value).then(function (res) {
	        return handle(generator.next(res));
	      }, function (err) {
	        return handle(generator.throw(err));
	      });
	    }

	    try {
	      return handle(generator.next());
	    } catch (ex) {
	      return Promise.reject(ex);
	    }
	  };
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _request = __webpack_require__(3);

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _xml2js = __webpack_require__(5);

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

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("xml2js");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint max-len: [2, 500, 4] */


	var _lodash = __webpack_require__(7);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _carModel = __webpack_require__(8);

	var _carModel2 = _interopRequireDefault(_carModel);

	var _peopleModel = __webpack_require__(9);

	var _peopleModel2 = _interopRequireDefault(_peopleModel);

	var _mongoUtil = __webpack_require__(10);

	var _mongoUtil2 = _interopRequireDefault(_mongoUtil);

	var _ports = __webpack_require__(14);

	var _ports2 = _interopRequireDefault(_ports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PortModel = function () {
	  function PortModel() {
	    _classCallCheck(this, PortModel);
	  }

	  _createClass(PortModel, null, [{
	    key: 'getReport',
	    value: function getReport(city) {
	      var _this = this;

	      return new Promise(function (resolve, reject) {
	        var promises = [];
	        var ports = _this.getCityPorts(_ports2.default, city);
	        promises = ports.map(function (port) {
	          return _mongoUtil2.default.getReport(port);
	        });
	        Promise.all(promises).then(function (results) {
	          resolve(results);
	        }).catch(function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'getCityPorts',
	    value: function getCityPorts(ports, city) {
	      return ports.filter(function (port) {
	        return port.city.toUpperCase() === city.toUpperCase();
	      });
	    }
	  }, {
	    key: 'extractData',
	    value: function extractData(data, port) {
	      var _this2 = this;

	      var response = [];
	      if (this.isDataValid(data)) {
	        var ports = data.border_wait_time.port;
	        ports.map(function (item) {
	          if (_this2.isPortValid(item, port)) {
	            var _CarModel$extractData = _carModel2.default.extractData(item);

	            var carNormal = _CarModel$extractData.carNormal;
	            var carSentri = _CarModel$extractData.carSentri;
	            var carReady = _CarModel$extractData.carReady;

	            var _PeopleModel$extractD = _peopleModel2.default.extractData(item);

	            var peopleNormal = _PeopleModel$extractD.peopleNormal;
	            var peopleReady = _PeopleModel$extractD.peopleReady;

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

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* eslint max-len: [2, 500, 4] */

	var CarModel = function () {
	  function CarModel() {
	    _classCallCheck(this, CarModel);
	  }

	  _createClass(CarModel, null, [{
	    key: "extractData",
	    value: function extractData(data) {
	      var carsData = data && data.passenger_vehicle_lanes ? data.passenger_vehicle_lanes.pop() : null;
	      return carsData && carsData.standard_lanes && carsData.NEXUS_SENTRI_lanes && carsData.ready_lanes ? {
	        carNormal: carsData.standard_lanes.pop(),
	        carSentri: carsData.NEXUS_SENTRI_lanes.pop(),
	        carReady: carsData.ready_lanes.pop()
	      } : {};
	    }
	  }, {
	    key: "formatData",
	    value: function formatData(normal, sentri, ready) {
	      return normal && normal.delay_minutes && normal.lanes_open && sentri && sentri.delay_minutes && sentri.lanes_open && ready && ready.delay_minutes && ready.lanes_open ? {
	        normal: {
	          time: normal.delay_minutes.pop(),
	          lanes: normal.lanes_open.pop()
	        },
	        sentry: {
	          time: sentri.delay_minutes.pop(),
	          lanes: sentri.lanes_open.pop()
	        },
	        readyLine: {
	          time: ready.delay_minutes.pop(),
	          lanes: ready.lanes_open.pop()
	        }
	      } : null;
	    }
	  }]);

	  return CarModel;
	}();

	exports.default = CarModel;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint max-len: [2, 500, 4] */


	var _mongoUtil = __webpack_require__(10);

	var _mongoUtil2 = _interopRequireDefault(_mongoUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PeopleModel = function () {
	  function PeopleModel() {
	    _classCallCheck(this, PeopleModel);
	  }

	  _createClass(PeopleModel, null, [{
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
	  }, {
	    key: 'saveReport',
	    value: function saveReport(data) {
	      return new Promise(function (resolve, reject) {
	        if (data.port && data.place && data.time) {
	          _mongoUtil2.default.saveData('userReport', data).then(function (results) {
	            if (results.result && results.result.ok && results.result.ok === 1) {
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
	    key: 'getReport',
	    value: function getReport(data) {
	      return new Promise(function (resolve) {
	        var d = new Date();
	        var today = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' 01:00';
	        var filter = {
	          city: data,
	          created: {
	            $gte: new Date(new Date(today).toJSON())
	          }
	        };
	        var options = {
	          sort: [['created', 'desc']]
	        };
	        var skip = null;
	        var limit = 50;
	        _mongoUtil2.default.find('userReport', filter, options, skip, limit).then(function (results) {
	          return resolve(results);
	        }).catch(function (e) {
	          return resolve({ status: e });
	        });
	      });
	    }
	  }]);

	  return PeopleModel;
	}();

	exports.default = PeopleModel;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mongodb = __webpack_require__(11);

	var _config = __webpack_require__(12);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MongoUtil = function () {
	  function MongoUtil() {
	    _classCallCheck(this, MongoUtil);
	  }

	  _createClass(MongoUtil, null, [{
	    key: 'openConnection',
	    value: function openConnection() {
	      return new Promise(function (resolve, reject) {
	        _mongodb.MongoClient.connect(_config2.default.get('db.url'), function (error, db) {
	          if (error) {
	            reject(error);
	          } else {
	            resolve(db);
	          }
	        });
	      });
	    }
	  }, {
	    key: 'saveReport',
	    value: function saveReport(data) {
	      var _this = this;

	      return new Promise(function (resolve, reject) {
	        _this.openConnection().then(function (db) {
	          var collection = db.collection('report');
	          collection.insert(data, function (error, results) {
	            if (error) {
	              reject(error);
	            } else {
	              resolve(results);
	            }
	            _this.closeConnection(db);
	          });
	        }).catch(function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'getReport',
	    value: function getReport(data) {
	      var _this2 = this;

	      return new Promise(function (resolve, reject) {
	        _this2.openConnection().then(function (db) {
	          var collection = db.collection('report');
	          var options = {
	            sort: [['created', 'desc']]
	          };
	          collection.findOne({ garita: data.name }, options, function (error, document) {
	            if (error) {
	              reject(error);
	            } else {
	              resolve(document);
	            }
	            _this2.closeConnection(db);
	          });
	        }).catch(function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'saveData',
	    value: function saveData(collectionName, data) {
	      var _this3 = this;

	      data.created = new Date();
	      return new Promise(function (resolve, reject) {
	        _this3.openConnection().then(function (db) {
	          var collection = db.collection(collectionName);
	          collection.insert(data, function (error, results) {
	            if (error) {
	              reject(error);
	            } else {
	              resolve(results);
	            }
	            _this3.closeConnection(db);
	          });
	        }).catch(function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'find',
	    value: function find(collectionName, filter, options, skip, limit) {
	      var _this4 = this;

	      return new Promise(function (resolve, reject) {
	        _this4.openConnection().then(function (db) {
	          var collection = db.collection(collectionName);
	          collection.find(filter || {}, options || {}).skip(skip || 0).limit(limit || 0).toArray(function (err, documents) {
	            if (err) {
	              reject(err);
	            } else {
	              resolve(documents);
	            }
	          });
	        });
	      });
	    }
	  }, {
	    key: 'closeConnection',
	    value: function closeConnection(db) {
	      db.close();
	    }
	  }]);

	  return MongoUtil;
	}();

	exports.default = MongoUtil;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _convict = __webpack_require__(13);

	var _convict2 = _interopRequireDefault(_convict);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Define a schema
	var config = (0, _convict2.default)({
	  env: {
	    doc: 'The applicaton environment.',
	    format: ['production', 'development', 'test'],
	    default: 'development',
	    env: 'NODE_ENV'
	  },
	  ipaddress: {
	    doc: 'The IP address to bind.',
	    format: 'ipaddress',
	    default: '127.0.0.1',
	    env: 'OPENSHIFT_NODEJS_IP'
	  },
	  port: {
	    doc: 'The port to bind.',
	    format: 'port',
	    default: 3000,
	    env: 'OPENSHIFT_NODEJS_PORT'
	  },
	  api: {
	    url: {
	      doc: 'API URL',
	      format: String,
	      default: 'http://127.0.0.1:3000/ports',
	      env: 'API_URL'
	    }
	  },
	  db: {
	    url: {
	      doc: 'Database hostname',
	      format: String,
	      default: 'mongodb://localhost:27017/gcenter',
	      env: 'DB_URL'
	    }
	  },
	  loggly: {
	    token: {
	      doc: 'Loggly token',
	      format: String,
	      default: '',
	      env: 'LOGGLY_TOKEN'
	    },
	    subdomain: {
	      doc: 'Loggly subdomain',
	      format: String,
	      default: '',
	      env: 'LOGGLY_SUBDOMIAN'
	    },
	    username: {
	      doc: 'Loggly username',
	      format: String,
	      default: '',
	      env: 'LOGGLY_USERNAME'
	    },
	    password: {
	      doc: 'Loggly password',
	      format: String,
	      default: '',
	      env: 'LOGGLY_PASSWORD'
	    }
	  },
	  alchemy: {
	    apiUrl: {
	      doc: 'Alchemy API URL',
	      format: String,
	      default: '',
	      env: 'ALCHEMY_API_URL'
	    },
	    token: {
	      doc: 'Alchemy token',
	      format: String,
	      default: '',
	      env: 'ALCHEMY_TOKEN'
	    }
	  },
	  secureToken: {
	    doc: 'Our token',
	    format: String,
	    default: '',
	    env: 'MINT_TOKEN'
	  },
	  twitter: {
	    key: {
	      doc: '',
	      format: String,
	      default: '',
	      env: 'TWITTER_KEY'
	    },
	    secret: {
	      doc: '',
	      format: String,
	      default: '',
	      env: 'TWITTER_SECRET'
	    },
	    tokenKey: {
	      doc: '',
	      format: String,
	      default: '',
	      env: 'TWITTER_TOKEN_KEY'
	    },
	    tokenSecret: {
	      doc: '',
	      format: String,
	      default: '',
	      env: 'TWITTER_TOKEN_SECRET'
	    },
	    maxRequests: {
	      doc: '',
	      format: String,
	      default: '',
	      env: 'TWITTER_MAX_REQUEST'
	    },
	    maxTime: {
	      doc: '',
	      format: String,
	      default: '',
	      env: 'TWITTER_MAX_TIME'
	    },
	    maxTweets: {
	      doc: '',
	      format: String,
	      default: '',
	      env: 'TWITTER_MAX_TWEETS'
	    }
	  }
	});

	// Perform validation
	config.validate({ strict: true });

	exports.default = config;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("convict");

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = [{
	  id: '250401',
	  name: 'SAN_YSIDRO',
	  city: 'TIJUANA'
	}, {
	  id: '250601',
	  name: 'OTAY',
	  city: 'TIJUANA'
	}, {
	  id: '250407',
	  name: 'PEDWEST',
	  city: 'TIJUANA'
	}];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _lodash = __webpack_require__(7);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var QueryUtil = function () {
	  function QueryUtil() {
	    _classCallCheck(this, QueryUtil);
	  }

	  _createClass(QueryUtil, null, [{
	    key: 'saveReport',
	    value: function saveReport(data, city, garita) {
	      return _lodash2.default.isArray(data) && data.length && city && city.length && garita && garita.length ? {
	        city: city,
	        garita: garita,
	        content: data[0],
	        created: new Date()
	      } : null;
	    }
	  }]);

	  return QueryUtil;
	}();

	exports.default = QueryUtil;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _loggly = __webpack_require__(17);

	var _loggly2 = _interopRequireDefault(_loggly);

	var _config = __webpack_require__(12);

	var _config2 = _interopRequireDefault(_config);

	var _guidUtil = __webpack_require__(18);

	var _guidUtil2 = _interopRequireDefault(_guidUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var logglyClient = _loggly2.default.createClient({
	  token: _config2.default.get('loggly.token'),
	  subdomain: _config2.default.get('loggly.subdomain'),
	  auth: {
	    username: _config2.default.get('loggly.username'),
	    password: _config2.default.get('loggly.password')
	  },
	  tags: ['scrapper-gcenter']
	});

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
	      logglyClient.log(message);
	      console.log(message);
	    }
	  }]);

	  return LogUtil;
	}();

	exports.default = LogUtil;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("loggly");

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* eslint max-len: [2, 500, 4] */

	var GuidUtil = function () {
	  function GuidUtil() {
	    _classCallCheck(this, GuidUtil);
	  }

	  _createClass(GuidUtil, null, [{
	    key: "generate",
	    value: function generate() {
	      return "" + this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4();
	    }
	  }, {
	    key: "s4",
	    value: function s4() {
	      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	    }
	  }]);

	  return GuidUtil;
	}();

	exports.default = GuidUtil;

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ }
/******/ ]);