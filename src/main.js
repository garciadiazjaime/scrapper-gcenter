const runGenerator = require('./utils/runGenerator');
const RequestUtil = require('./utils/requestUtil');
const XmlUtil = require('./utils/xmlUtil');
const PortModel = require('./models/portModel');
const MongoUtil = require('./utils/mongoUtil');
const QueryUtil = require('./utils/mongoUtil/queryUtil');
const config = require('./config');
const logUtil = require('./utils/logUtil');
const portsData = require('./constants/ports');

require('babel-polyfill');

const mongoUtil = new MongoUtil();

function startRequest(port) {
  return new Promise((resolve, reject) => {
    (runGenerator(function *() {
      try {
        logUtil.log(`getting data for ${port.name}...`);

        const requestResponse = yield RequestUtil.get(config.get('api.url'));
        const jsonData = yield XmlUtil.parseToJson(requestResponse);

        const portData = PortModel.extractData(jsonData, port.id);

        const data = QueryUtil.saveReport(portData, port.city, port.name);

        // yield mongoUtil.openConnection();
        const results = yield mongoUtil.insertOne('report', data);

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

module.exports = function () {
  const promises = [];
  logUtil.log('==== start ====');
  for (let i = 0, len = portsData.length; i < len; i++) {
    ((port) => {
      promises.push(startRequest(port));
    })(portsData[i]);
  }

  Promise.all(promises)
    .then(() => {
      // mongoUtil.closeConnection();
      logUtil.log('==== done ====');
    })
    .catch(error => {
      // mongoUtil.closeConnection();
      logUtil.log(`promise error ${error}`);
    });
};
