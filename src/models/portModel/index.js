/* eslint max-len: [2, 500, 4] */
import _ from 'lodash';

import CarModel from '../carModel';
import PeopleModel from '../peopleModel';

export default class PortModel {

  static extractData(data, port) {
    const response = [];
    if (this.isDataValid(data)) {
      const ports = data.border_wait_time.port;
      ports.map((item) => {
        if (this.isPortValid(item, port)) {
          const { carNormal, carSentri, carReady } = CarModel.extractData(item);
          const { peopleNormal, peopleReady } = PeopleModel.extractData(item);
          if (carNormal && carSentri && carReady && peopleNormal && peopleReady) {
            const carReport = CarModel.formatData(carNormal, carSentri, carReady);
            const peopleReport = PeopleModel.formatData(peopleNormal, peopleReady);
            response.push({
              car: carReport,
              people: peopleReport,
            });
          }
        }
        return null;
      });
    }
    return response;
  }

  static isDataValid(data) {
    if (data && data.border_wait_time && _.isArray(data.border_wait_time.port) && data.border_wait_time.port.length) {
      return true;
    }
    return false;
  }

  static isPortValid(data, port) {
    return data.port_number && data.port_number.indexOf(port) !== -1;
  }
}
