import _ from 'lodash';

export default class QueryUtil {

  static saveReport(data, garita) {
    return _.isArray(data) && data.length && garita && garita.length ? {
      garita,
      content: data[0],
      created: new Date(),
    } : null;
  }
}
