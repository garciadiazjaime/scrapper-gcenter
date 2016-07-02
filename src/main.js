import runGenerator from './utils/runGenerator';
import RequestUtil from './utils/requestUtil';
import XmlUtil from './utils/xmlUtil';
import PortModel from './models/portModel';
import MongoUtil from './utils/mongoUtil';
import QueryUtil from './utils/mongoUtil/queryUtil';
import config from './config';
import logUtil from './utils/logUtil';
const ports = require('./constants/ports.json');

import 'babel-polyfill';

function startRequest(port) {
  return new Promise((resolve, reject) => {
    (runGenerator(function *() {
      try {
        logUtil.log(`getting data for ${port.name}...`);
        const requestResponse = yield RequestUtil.get(config.get('api.url'));

        const jsonData = yield XmlUtil.parseToJson(requestResponse);

        const portData = PortModel.extractData(jsonData, port.id);

        const data = QueryUtil.saveReport(portData, port.name);

        const results = yield MongoUtil.save(data);

        if (results) {
          logUtil.log(`...Garita ${port.name} updated`);
          resolve();
        } else {
          logUtil.log(`...Error on garita ${port.name}`);
          reject();
        }
      } catch (exception) {
        logUtil.log(`exception ${exception}`);
      }
    }))();
  });
}

const promises = [];
logUtil.log('==== start ====');
for (let i = 0, len = ports.length; i < len; i++) {
  ((port) => {
    promises.push(startRequest(port));
  })(ports[i]);
}

Promise.all(promises)
  .then(() => {
    logUtil.log('==== done ====');
  })
  .catch(error => {
    logUtil.log(`promise error ${error}`);
  });
