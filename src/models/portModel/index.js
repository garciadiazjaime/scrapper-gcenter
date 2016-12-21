/* eslint max-len: [2, 500, 4] */
import _ from 'lodash';

import CarModel from '../carModel';
import PeopleModel from '../peopleModel';
import MongoUtil from '../../utils/mongoUtil';
import portsData from '../../constants/ports.js';


export default class PortModel {

  constructor() {
    this.dbClient = new MongoUtil();
  }

  getReport(city) {
    return new Promise((resolve, reject) => {
      const ports = this.getCityPorts(portsData, city);
      if (_.isArray(ports) && ports.length) {
        const options = { sort: { created: -1 } };
        const skip = null;
        const limit = 1;
        const promises = ports.map((item) => this.dbClient.find('report', { garita: item.name }, options, skip, limit));
        Promise.all(promises).then(data => resolve(data));
      } else {
        reject();
      }
    });
  }

  getCityPorts(ports, city) {
    return ports.filter(port => city && port.city.toUpperCase() === city.toUpperCase());
  }

  orderByCity(data, city) {
    if (city && city.toUpperCase() === 'TIJUANA') {
      const port1 = data.filter((item) => item.garita.toUpperCase() === 'SAN_YSIDRO').pop();
      const port2 = data.filter((item) => item.garita.toUpperCase() === 'OTAY').pop();
      const port3 = data.filter((item) => item.garita.toUpperCase() === 'PEDWEST').pop();
      return [port1, port2, port3];
    }
    return data;
  }

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
    return data.port_number && data.port_number.indexOf(port.toString()) !== -1;
  }
}
