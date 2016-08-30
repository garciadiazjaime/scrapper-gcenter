import Twitter from 'twitter';
import _ from 'lodash';
import moment from 'moment';

import { toTitleCase } from '../string';
import config from '../../config';
const constants = {
  twitter: {
    maxRequests: config.get('twitter.maxRequests'),
    maxTime: config.get('twitter.maxTime'),
    maxTweets: config.get('twitter.maxTweets'),
  }
};

const cache = {
  tweets: {
    updated: new Date(),
    data: [],
    requests: 0,
  },
};

export default class TwitterUtil {

  constructor() {
    this.client = new Twitter({
      consumer_key: config.get('twitter.key'),
      consumer_secret: config.get('twitter.secret'),
      access_token_key: config.get('twitter.tokenKey'),
      access_token_secret: config.get('twitter.tokenSecret'),
    });
  }

  getTweets(screen_name) {
    const params = {
      screen_name,
    };
    return new Promise((resolve, reject) => {
      const now = new Date();
      // twitter docs endpoint
      // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
      const seconds = Math.round(moment(moment(now)).diff(cache.tweets.updated) / 1000);
      if (cache.tweets.data.length == 0 || cache.tweets.requests < constants.twitter.maxRequests || seconds > constants.twitter.maxTime ) {
        this.client.get('statuses/user_timeline', params, (error, tweets) => {
          if (error) {
            reject(error);
          } else {
            this.addNewTweets(cache.tweets.data, tweets);
            resolve(cache.tweets.data);
          }
        });
      } else {
        resolve(cache.tweets.data)
      }
    });
  }

  postTweet(status) {
    return new Promise((resolve, reject) => {
      this.client.post('statuses/update', status, function(error, tweet, response) {
        if (error) {
          reject(error);
        } else {
          resolve(tweet);
        }
      });
    });
  }

  addNewTweets(currentTweets, tweetsRequested) {
    tweetsRequested.map((item) => {
      const tweet = _.find(currentTweets, {id: item.id});
      if (!tweet) {
        cache.tweets.data.push(item);
      }
    });
    if (cache.tweets.data.length > constants.twitter.maxTweets) {
      const tweetsToRemove = cache.tweets.data.length - constants.twitter.maxTweets;
      cache.tweets.data = _.slice(cache.tweets.data, tweetsToRemove);
    }
  }

  static formatStatus(data) {
    const lat = data.port === 'san_ysidro' ? '32.5413122' : '32.5452122';
    const long = data.port === 'san_ysidro' ? '-117.0363838' : '-116.9546235';
    return {
      status: `Para Garita de ${toTitleCase(data.port)}, ${toTitleCase(data.entry)} en ${toTitleCase(data.type)}, usuario reporta que desde ${toTitleCase(data.place)} lleva ${toTitleCase(data.time)}`,
      lat,
      long,
      display_coordinates: true,
    };
  }
}
