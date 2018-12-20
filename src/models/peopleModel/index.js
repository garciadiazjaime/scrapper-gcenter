/* eslint max-len: [2, 500, 4] */
const MongoUtil = require('../../utils/mongoUtil');

module.exports = class PeopleModel {

  constructor() {
    this.mongoUtil = new MongoUtil();
  }

  getReport(data) {
    return new Promise((resolve) => {
      const d = new Date();
      const today = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} 01:00`;
      const top = new Date(new Date(today).toJSON());
      console.log('top', top);
      const filter = {
        city: data,
        created: {
          $gte: top,
        },
      };
      const options = {
        sort: [['created', 'desc']],
      };
      const skip = null;
      const limit = 50;
      this.mongoUtil.find('userReport', filter, options, skip, limit)
        .then(results => resolve(results))
        .catch((e) => resolve({ status: false, message: e }));
    });
  }

  saveReport(data) {
    return new Promise((resolve, reject) => {
      if (data.port && data.place && data.time) {
        this.mongoUtil.insertOne('userReport', data)
          .then((results) => {
            if (results.ok && results.n === 1) {
              resolve({ status: true });
            } else {
              reject({ status: false });
            }
          })
          .catch(() => {
            resolve({ status: false });
          });
      } else {
        reject({ status: false });
      }
    });
  }

  static extractData(data) {
    const peopleData = data && data.pedestrian_lanes ? data.pedestrian_lanes.pop() : null;
    return peopleData && peopleData.standard_lanes && peopleData.ready_lanes ? {
      peopleNormal: peopleData.standard_lanes.pop(),
      peopleReady: peopleData.ready_lanes.pop(),
    } : {};
  }

  static formatData(normal, ready) {
    return normal && normal.delay_minutes && normal.lanes_open && ready && ready.delay_minutes && ready.lanes_open ? {
      normal: {
        time: normal.delay_minutes.pop(),
        lanes: normal.lanes_open.pop(),
      },
      readyLine: {
        time: ready.delay_minutes.pop(),
        lanes: ready.lanes_open.pop(),
      },
    } : null;
  }
};
