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

	var _fs = __webpack_require__(2);

	var _fs2 = _interopRequireDefault(_fs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();

	app.get('/ports', function (req, res) {
	  _fs2.default.readFile('resources/stubs/ports.xml', function (err, data) {
	    res.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': data.length });
	    res.write(data);
	    res.end();
	  });
	});

	app.get('/san-ysidro', function (req, res) {
	  _fs2.default.readFile('resources/stubs/cbp_san_ysidro.html', function (err, data) {
	    res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
	    res.write(data);
	    res.end();
	  });
	});

	app.get('/otay', function (req, res) {
	  _fs2.default.readFile('resources/stubs/cbp_otay.html', function (err, data) {
	    res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
	    res.write(data);
	    res.end();
	  });
	});

	app.listen('3000', function () {
	  console.log('Example app listening on port 3000');
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ }
/******/ ]);