import request from 'request';

export default class RequestUtil {

  static request(url) {
    return new Promise((resolve, reject) => {
      request(url, (error, response, html) => {
        if (error) {
          reject(error);
        } else {
          resolve(html);
        }
      });
    });
  }
}
