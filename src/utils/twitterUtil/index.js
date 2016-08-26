var Twitter = require('twitter');
import { toTitleCase } from '../string';

// var client = new Twitter({
//   consumer_key: 'j9KGOKjeCHr2TpuC52lld1U2l',
//   consumer_secret: 'yH19HEUHxeaH9jkMvncaqUvqpA7WEr9MfIzrVMBQ6vV1nNolsN',
//   access_token_key: '764671720926044160-RHYr36phFAGOrVCpwT58UDZPbfotDgw',
//   access_token_secret: 'BIZlLBTuxaF4PVbvBZcaQZSTVeIFkuJIdAlSprBQ08iMR',
// });
//
// // var params = {screen_name: 'garita_center'};
// // client.get('statuses/user_timeline', params, function(error, tweets, response) {
// //   console.log('error', error);
// //   console.log('tweets', tweets);
// // });
//
// // var params = {screen_name: 'garita_center'};
// // client.get('account/settings', params, function(error, tweets, response) {
// //   console.log('error', error);
// //   console.log('tweets', tweets);
// // });
//
// var data = {
//   entry: 'ready_lane',
//   place: 'place_b',
//   port: 'san_ysidro',
//   time: 'time_b',
//   type:'car',
// };
//
// var lat = data.port === 'san_ysidro' ? '32.5413122' : '32.5452122'
// var long = data.port === 'san_ysidro' ? '-117.0363838' : '-116.9546235';
//
// var postData = {
//   status: `Usuario en Garita de ${data.port},
//     por ${data.entry} - ${data.type}, reporta que desde ${data.place} lleva ${data.time} mins.`,
//   lat,
//   long,
//   display_coordinates: true,
//   geo_enabled: true,
// };
//
//
// client.post('statuses/update', postData,  function(error, tweet, response) {
//   console.log('error', error);
//   console.log('tweet', tweet);  // Tweet body.
//   // console.log('response', response);  // Raw response object.
// });

export default class TwitterUtil {

  constructor() {
    this.client = new Twitter({
      consumer_key: 'j9KGOKjeCHr2TpuC52lld1U2l',
      consumer_secret: 'yH19HEUHxeaH9jkMvncaqUvqpA7WEr9MfIzrVMBQ6vV1nNolsN',
      access_token_key: '764671720926044160-RHYr36phFAGOrVCpwT58UDZPbfotDgw',
      access_token_secret: 'BIZlLBTuxaF4PVbvBZcaQZSTVeIFkuJIdAlSprBQ08iMR',
    });
  }

  getTweets(screen_name) {
    // const params = {screen_name: 'garita_center'};
    const params = {
      screen_name,
    };
    return new Promise((resolve, reject) => {
      this.client.get('statuses/user_timeline', params, (error, tweets) => {
        if (error) {
          reject(error);
        } else {
          resolve(tweets)
        }
      });
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
