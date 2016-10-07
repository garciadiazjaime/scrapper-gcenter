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
        const filter = {
          $or: ports.map((item) => ({ garita: item.name })),
        };
        this.dbClient.find('report', filter)
          .then(results => resolve(results))
          .catch(() => reject());
      } else {
        reject();
      }
    });
  }

  getCityPorts(ports, city) {
    return ports.filter(port => city && port.city.toUpperCase() === city.toUpperCase());
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
