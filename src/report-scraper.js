const mongoose = require('mongoose');
const debug = require('debug')('scraper');

const RequestUtil = require('./utils/requestUtil');
const XmlUtil = require('./utils/xmlUtil');
const PortModel = require('./models/portModel');
const { extractReport } = require('./models/portModel');

const config = require('./config');
const portsByCity = require('./constants/ports');

mongoose.Promise = global.Promise;

async function getReport(url) {
  const requestResponse = await RequestUtil.get(url);
  const data = await XmlUtil.parseToJson(requestResponse);
  return data;
}

async function getReportForCity(fullReport, city) {
  debug(`getting data for ${city.name}...`);

  const report = extractReport(fullReport, city);

  const portModel = new PortModel({
    city: city.name,
    report,
  });

  return portModel.save();
}

async function main() {
  try {
    debug('==== start ====');

    const report = await getReport(config.get('api.url'));

    const promises = portsByCity.map(city =>
      getReportForCity(report, city));

    await Promise.all(promises);

    debug('==== done ====');
  } catch (exception) {
    debug(`exception ${exception}`);
  }
}

if (require.main === module) {
  const run = async () => {
    await mongoose.connect(config.get('db.url'), { useNewUrlParser: true });
    await main();
    await mongoose.connection.close();
  };

  run();
}

module.exports = main;
