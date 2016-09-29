import _ from 'lodash';

export default class QueryUtil {

  static saveReport(data, city, garita) {
    return _.isArray(data) && data.length && city && city.length && garita && garita.length ? {
      city,
      garita,
      content: data[0],
      created: new Date(),
    } : null;
  }
}
