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

	var _newrelic = __webpack_require__(1);

	var _newrelic2 = _interopRequireDefault(_newrelic);

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _bodyParser = __webpack_require__(3);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _stubs = __webpack_require__(4);

	var _stubs2 = _interopRequireDefault(_stubs);

	var _user = __webpack_require__(6);

	var _user2 = _interopRequireDefault(_user);

	var _portModel = __webpack_require__(17);

	var _portModel2 = _interopRequireDefault(_portModel);

	var _config = __webpack_require__(12);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)(); /* eslint max-len: [2, 500, 4] */

	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({
	  extended: false
	}));
	app.locals.newrelic = _newrelic2.default;

	(0, _stubs2.default)(app);
	(0, _user2.default)(app);

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
	});

	app.set('ipaddress', _config2.default.get('ipaddress'));
	app.set('port', _config2.default.get('port'));

	var server = app.listen(app.get('port'), app.get('ipaddress'), function (err) {
	  if (err) {
	    console.log(err);
	  }
	  var host = server.address().address;
	  var port = server.address().port;
	  console.log('Example app listening at http://%s:%s', host, port);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("newrelic");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _fs = __webpack_require__(5);

	var _fs2 = _interopRequireDefault(_fs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (app) {
	  app.get('/ports', function (req, res) {
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

	  app.get('/san-ysidro', function (req, res) {
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

	  app.get('/otay', function (req, res) {
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
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _twitterUtil = __webpack_require__(7);

	var _twitterUtil2 = _interopRequireDefault(_twitterUtil);

	var _peopleModel = __webpack_require__(14);

	var _peopleModel2 = _interopRequireDefault(_peopleModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (app) {
	  app.post('/user/report', function (req, res) {
	    var data = req.body;
	    _peopleModel2.default.saveReport(data).then(function (results) {
	      var twitterUtil = new _twitterUtil2.default();
	      var status = _twitterUtil2.default.formatStatus(data);
	      twitterUtil.postTweet(status).then(function () {
	        res.setHeader('Content-Type', 'application/json');
	        res.send(results);
	      }, function (error) {
	        res.setHeader('Content-Type', 'application/json');
	        res.send(error);
	      }).catch(function (error) {
	        res.status(200).send(error);
	      });
	    }).catch(function (error) {
	      res.status(200).send(error);
	    });
	  });

	  app.get('/user/report', function (req, res) {
	    var city = req.param('city');
	    if (city) {
	      _peopleModel2.default.getReport(city).then(function (results) {
	        res.setHeader('Content-Type', 'application/json');
	        res.send(results);
	      }, function (error) {
	        res.setHeader('Content-Type', 'application/json');
	        res.send(error);
	      }).catch(function (error) {
	        res.status(200).send(error);
	      });
	    } else {
	      res.send(':(');
	    }
	  });

	  app.get('/user/twitter/report', function (req, res) {
	    var city = req.param('city');
	    if (city) {
	      var twitterUtil = new _twitterUtil2.default();
	      twitterUtil.getTweets('garita_center').then(function (results) {
	        res.setHeader('Content-Type', 'application/json');
	        res.send(results);
	      }, function (error) {
	        res.setHeader('Content-Type', 'application/json');
	        res.send(error);
	      }).catch(function (error) {
	        res.status(200).send(error);
	      });
	    } else {
	      res.send(':(');
	    }
	  });
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _twitter = __webpack_require__(8);

	var _twitter2 = _interopRequireDefault(_twitter);

	var _lodash = __webpack_require__(9);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _moment = __webpack_require__(10);

	var _moment2 = _interopRequireDefault(_moment);

	var _string = __webpack_require__(11);

	var _config = __webpack_require__(12);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var constants = {
	  twitter: {
	    maxRequests: _config2.default.get('twitter.maxRequests'),
	    maxTime: _config2.default.get('twitter.maxTime'),
	    maxTweets: _config2.default.get('twitter.maxTweets')
	  }
	};

	var cache = {
	  tweets: {
	    updated: new Date(),
	    data: [],
	    requests: 0
	  }
	};

	var TwitterUtil = function () {
	  function TwitterUtil() {
	    _classCallCheck(this, TwitterUtil);

	    this.client = new _twitter2.default({
	      consumer_key: _config2.default.get('twitter.key'),
	      consumer_secret: _config2.default.get('twitter.secret'),
	      access_token_key: _config2.default.get('twitter.tokenKey'),
	      access_token_secret: _config2.default.get('twitter.tokenSecret')
	    });
	  }

	  _createClass(TwitterUtil, [{
	    key: 'getTweets',
	    value: function getTweets(screen_name) {
	      var _this = this;

	      var params = {
	        screen_name: screen_name
	      };
	      return new Promise(function (resolve, reject) {
	        var now = new Date();
	        // twitter docs endpoint
	        // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
	        var seconds = Math.round((0, _moment2.default)((0, _moment2.default)(now)).diff(cache.tweets.updated) / 1000);
	        if (cache.tweets.data.length == 0 || cache.tweets.requests < constants.twitter.maxRequests || seconds > constants.twitter.maxTime) {
	          _this.client.get('statuses/user_timeline', params, function (error, tweets) {
	            if (error) {
	              reject(error);
	            } else {
	              _this.addNewTweets(cache.tweets.data, tweets);
	              resolve(cache.tweets.data);
	            }
	          });
	        } else {
	          resolve(cache.tweets.data);
	        }
	      });
	    }
	  }, {
	    key: 'postTweet',
	    value: function postTweet(status) {
	      var _this2 = this;

	      return new Promise(function (resolve, reject) {
	        _this2.client.post('statuses/update', status, function (error, tweet, response) {
	          if (error) {
	            reject(error);
	          } else {
	            resolve(tweet);
	          }
	        });
	      });
	    }
	  }, {
	    key: 'addNewTweets',
	    value: function addNewTweets(currentTweets, tweetsRequested) {
	      tweetsRequested.map(function (item) {
	        var tweet = _lodash2.default.find(currentTweets, { id: item.id });
	        if (!tweet) {
	          cache.tweets.data.push(item);
	        }
	      });
	      if (cache.tweets.data.length > constants.twitter.maxTweets) {
	        var tweetsToRemove = cache.tweets.data.length - constants.twitter.maxTweets;
	        cache.tweets.data = _lodash2.default.slice(cache.tweets.data, tweetsToRemove);
	      }
	    }
	  }], [{
	    key: 'formatStatus',
	    value: function formatStatus(data) {
	      var lat = data.port === 'san_ysidro' ? '32.5413122' : '32.5452122';
	      var long = data.port === 'san_ysidro' ? '-117.0363838' : '-116.9546235';
	      return {
	        status: 'Para Garita de ' + (0, _string.toTitleCase)(data.port) + ', ' + (0, _string.toTitleCase)(data.entry) + ' en ' + (0, _string.toTitleCase)(data.type) + ', usuario reporta que desde ' + (0, _string.toTitleCase)(data.place) + ' lleva ' + (0, _string.toTitleCase)(data.time),
	        lat: lat,
	        long: long,
	        display_coordinates: true
	      };
	    }
	  }]);

	  return TwitterUtil;
	}();

	exports.default = TwitterUtil;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("twitter");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.minsToHrs = minsToHrs;
	exports.toTitleCase = toTitleCase;
	exports.timeSince = timeSince;

	function printMinutes(data) {
	  if (data < 10) {
	    return '0' + data;
	  }
	  return data;
	}

	function minsToHrs(data) {
	  if (data) {
	    var hours = Math.floor(data / 60);
	    var minutes = data % 60;
	    return hours + ':' + printMinutes(minutes);
	  }
	  return data;
	}

	function toTitleCase(data) {
	  var response = data.replace(/_/g, ' ');
	  return response.replace(/\w\S*/g, function (txt) {
	    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
	}

	function timeSince(data) {
	  var seconds = Math.floor((new Date() - new Date(data)) / 1000);
	  var interval = Math.floor(seconds / 31536000);

	  if (interval >= 1) {
	    return interval + ' año' + (interval > 1 ? 's' : '');
	  }
	  interval = Math.floor(seconds / 2592000);
	  if (interval >= 1) {
	    return interval + ' mes' + (interval > 1 ? 'es' : '');
	  }
	  interval = Math.floor(seconds / 86400);
	  if (interval >= 1) {
	    return interval + ' día' + (interval > 1 ? 's' : '');
	  }
	  interval = Math.floor(seconds / 3600);
	  if (interval >= 1) {
	    return interval + ' hora' + (interval > 1 ? 's' : '');
	  }
	  interval = Math.floor(seconds / 60);
	  if (interval > 1) {
	    return interval + ' minutos';
	  }
	  return '1 minuto';
	}

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
	    env: 'IP_ADDRESS'
	  },
	  port: {
	    doc: 'The port to bind.',
	    format: 'port',
	    default: 3000,
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint max-len: [2, 500, 4] */


	var _mongoUtil = __webpack_require__(15);

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
	        var filter = {
	          city: data
	        };
	        _mongoUtil2.default.find('userReport', filter).then(function (results) {
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mongodb = __webpack_require__(16);

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
/* 16 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint max-len: [2, 500, 4] */


	var _lodash = __webpack_require__(9);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _carModel = __webpack_require__(18);

	var _carModel2 = _interopRequireDefault(_carModel);

	var _peopleModel = __webpack_require__(14);

	var _peopleModel2 = _interopRequireDefault(_peopleModel);

	var _mongoUtil = __webpack_require__(15);

	var _mongoUtil2 = _interopRequireDefault(_mongoUtil);

	var _ports = __webpack_require__(19);

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
/* 18 */
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
/* 19 */
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

/***/ }
/******/ ]);