const RequestUtil = require('./utils/requestUtil');
const XmlUtil = require('./utils/xmlUtil');
const PortModel = require('./models/portModel');
const MongoUtil = require('./utils/mongoUtil');
const QueryUtil = require('./utils/mongoUtil/queryUtil');
const config = require('./config');
const portsData = require('./constants/ports');

const mongoUtil = new MongoUtil();

async function scrapeCBP(port) {
  logUtil.log(`getting data for ${port.name}...`);

  const requestResponse = await RequestUtil.get(config.get('api.url'));
  const jsonData = await XmlUtil.parseToJson(requestResponse);

  const portData = PortModel.extractData(jsonData, port.id);

  const data = QueryUtil.saveReport(portData, port.city, port.name);

  return mongoUtil.insertOne('report', data);
}

async function main() {
  try {
    logUtil.log('==== start ====');
    if (config.get('env') !== 'production') {
      await mongoUtil.openConnection();
    }

    for (let i = 0, len = portsData.length; i < len; i++) {
      const port = portsData[i];
      await scrapeCBP(port);
      logUtil.log(`...Garita ${port.name} updated`);
    }

    if (config.get('env') !== 'production') {
      await mongoUtil.closeConnection();
    }

    logUtil.log('==== done ====');
  } catch (exception) {
    logUtil.log(`exception ${exception}`);
  }
}

module.exports = main();
