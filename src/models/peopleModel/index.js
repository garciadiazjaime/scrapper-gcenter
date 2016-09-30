/* eslint max-len: [2, 500, 4] */
import MongoUtil from '../../utils/mongoUtil';

export default class PeopleModel {

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

  static saveReport(data) {
    return new Promise((resolve, reject) => {
      if (data.port && data.place && data.time) {
        MongoUtil.saveData('userReport', data)
          .then((results) => {
            if (results.result && results.result.ok && results.result.ok === 1) {
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

  static getReport(data) {
    return new Promise((resolve) => {
      const d = new Date();
      const today = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;
      const filter = {
        city: data,
        created: {
          $gte: new Date(today).toJSON(),
        },
      };
      const options = {
        sort: [['created', 'desc']],
      };
      const skip = null;
      const limit = 50;
      MongoUtil.find('userReport', filter, options, skip, limit)
        .then(results => resolve(results))
        .catch((e) => resolve({ status: e }));
    });
  }
}
