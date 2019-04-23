const mongoose = require('mongoose');
const debug = require('debug')('portModel');

const MongoUtil = require('../../utils/mongoUtil');
const portsData = require('../../constants/ports.js');

const Schema = mongoose.Schema;

const dbClient = new MongoUtil();

const PortSchema = new Schema({
  city: String,
  report: Object,
  created: {
    type: Date,
    default: () => new Date(),
  },
});

const PortModel = mongoose.model('Port', PortSchema);

function getCityPorts(ports, city) {
  return ports.filter(port => city && port.city.toUpperCase() === city.toUpperCase());
}

async function getReport(city) {
  const ports = getCityPorts(portsData, city);
  if (ports && ports.length) {
    const options = { sort: { created: -1 } };
    const limit = 1;
    const promises = ports.map(item =>
      dbClient.find('report',
        {
          garita: item.name,
        },
        options,
        limit
      )
    );
    const report = await Promise.all(promises);

    return report.map(item => item.pop());
  }
  debug(`invalid city: ${city}, ports: ${ports}`);
  return [];
}

function getEntryData(data) {
  const report = {};

  const types = [
    ['passenger_vehicle_lanes', 'vehicle'],
    ['pedestrian_lanes', 'pedestrian'],
  ];

  const entries = [
    ['standard_lanes', 'standard'],
    ['NEXUS_SENTRI_lanes', 'sentri'],
    ['ready_lanes', 'readyLane'],
  ];


  types.forEach(([keyType, type]) => {
    //
    entries.forEach(([keyEntry, entry]) => {
      const entryData = data[keyType][0][keyEntry];

      if (entryData && entryData[0]
        && entryData[0].delay_minutes && entryData[0].delay_minutes[0]
        && entryData[0].lanes_open && entryData[0].lanes_open[0]) {
        //
        if (!report[type]) {
          report[type] = {};
        }

        report[type][entry] = {
          time: entryData[0].delay_minutes[0],
          lanes: entryData[0].lanes_open[0],
        };
      }
    });
  });

  return report;
}


function isPortValid(CBPPort = {}, enablePorts = {}) {
  const { port_number: portNumber } = CBPPort;

  return portNumber && portNumber.length && enablePorts[portNumber];
}

function getPorts(CBPData = {}, ports = {}) {
  const {
    border_wait_time: {
      port: CBPPorts = [],
    } = {},
  } = CBPData;

  return CBPPorts.filter(item => isPortValid(item, ports));
}

function extractReport(data, city) {
  const cityPorts = getPorts(data, city.ports);

  const report = cityPorts.reduce((accumulator, item) => {
    accumulator[city.ports[item.port_number[0]]] = getEntryData(item); // eslint-disable-line
    return accumulator;
  }, {});

  return report;
}

async function getLast24hrs(city) {
  const startDay = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const query = {
    city,
    created: {
      $gte: new Date(startDay.toISOString()),
    },
  };

  const report = await PortModel
    .find(query)
    .sort({
      created: -1,
    });

  return report;
}

async function getHistoryFor(city, limit = 1000) {
  const query = {
    city,
  };

  const report = await PortModel
    .find(query)
    .sort({
      created: -1,
    })
    .limit(limit);

  return report;
}

module.exports = PortModel;

module.exports.getReport = getReport;
module.exports.extractReport = extractReport;
module.exports.getLast24hrs = getLast24hrs;
module.exports.getHistoryFor = getHistoryFor;
