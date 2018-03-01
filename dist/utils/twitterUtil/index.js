'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _string = require('../string');

var _config = require('../../config');

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