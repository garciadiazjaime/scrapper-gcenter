const _ = require('lodash');

module.exports = class QueryUtil {

  static saveReport(data, city, garita) {
    return _.isArray(data) && data.length && city && city.length && garita && garita.length ? {
      city,
      garita,
      content: data[0],
      created: new Date(),
    } : null;
  }
}
