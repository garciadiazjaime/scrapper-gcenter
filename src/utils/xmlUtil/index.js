import { parseString } from 'xml2js';

export default class XmlUtil {

  static parseToJson(html) {
    return new Promise((resolve, reject) => {
      parseString(html, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}
