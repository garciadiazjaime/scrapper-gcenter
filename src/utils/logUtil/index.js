// import loggly from 'loggly';
import config from '../../config';


// const logglyClient = loggly.createClient({
//   token: config.get('loggly.token'),
//   subdomain: config.get('loggly.subdomain'),
//   auth: {
//     username: config.get('loggly.username'),
//     password: config.get('loggly.password'),
//   },
//   tags: ['scrapper-gcenter'],
// });

import GuidUtil from '../guidUtil';
const guid = GuidUtil.generate();

export default class LogUtil {
  static log(data) {
    const date = new Date().toJSON();
    const message = `${date} :: ${guid} :: ${data}`;
    // logglyClient.log(message);
    console.log(message);
  }
}
