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

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _portModel = __webpack_require__(4);

	var _portModel2 = _interopRequireDefault(_portModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var env = process.env;

	// import stubsRoutes from './routes/stubs';


	var app = (0, _express2.default)();
	// stubsRoutes(app);

	app.get('/report', function (req, res) {
	  var city = req.param('city');
	  if (city) {
	    _portModel2.default.getReport(city).then(function (data) {
	      res.setHeader('Content-Type', 'application/json');
	      res.send(JSON.stringify(data));
	    });
	  } else {
	    res.send(':(');
	  }
	});

	app.get('/health', function (req, res) {
	  res.writeHead(200);
	  res.end();
	});

	app.get('*', function (req, res) {
	  res.writeHead(200);
	  res.write(':)');
	  res.end();
	});

	app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
	  console.log('Application worker ' + process.pid + ' started...');
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint max-len: [2, 500, 4] */


	var _lodash = __webpack_require__(5);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _carModel = __webpack_require__(6);

	var _carModel2 = _interopRequireDefault(_carModel);

	var _peopleModel = __webpack_require__(7);

	var _peopleModel2 = _interopRequireDefault(_peopleModel);

	var _mongoUtil = __webpack_require__(8);

	var _mongoUtil2 = _interopRequireDefault(_mongoUtil);

	var _ports = __webpack_require__(12);

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
/* 5 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* eslint max-len: [2, 500, 4] */

	var PeopleModel = function () {
	  function PeopleModel() {
	    _classCallCheck(this, PeopleModel);
	  }

	  _createClass(PeopleModel, null, [{
	    key: "extractData",
	    value: function extractData(data) {
	      var peopleData = data && data.pedestrian_lanes ? data.pedestrian_lanes.pop() : null;
	      return peopleData && peopleData.standard_lanes && peopleData.ready_lanes ? {
	        peopleNormal: peopleData.standard_lanes.pop(),
	        peopleReady: peopleData.ready_lanes.pop()
	      } : {};
	    }
	  }, {
	    key: "formatData",
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
	  }]);

	  return PeopleModel;
	}();

	exports.default = PeopleModel;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mongodb = __webpack_require__(9);

	var _config = __webpack_require__(10);

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
	            "sort": "-created"
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
	    key: 'closeConnection',
	    value: function closeConnection(db) {
	      db.close();
	    }
	  }]);

	  return MongoUtil;
	}();

	exports.default = MongoUtil;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _convict = __webpack_require__(11);

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
	  ip: {
	    doc: 'The IP address to bind.',
	    format: 'ipaddress',
	    default: '127.0.0.1',
	    env: 'IP_ADDRESS'
	  },
	  port: {
	    doc: 'The port to bind.',
	    format: 'port',
	    default: 3030,
	    env: 'PORT'
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
	  }
	});

	// Perform validation
	config.validate({ strict: true });

	exports.default = config;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("convict");

/***/ },
/* 12 */
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
	}];

/***/ }
/******/ ]);