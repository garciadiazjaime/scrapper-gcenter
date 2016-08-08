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
      MongoUtil.saveData('userReport', data)
        .then((results) => {
          resolve(results);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
