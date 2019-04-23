const {
  deepGet
} = require('./string');

function getLast24hrsReport(report, port) {
  if (!report || !report.length) {
    return []
  }

  const entries = ['standard', 'sentri', 'readyLane']

  const reportByEntryHour = report.reduce((accumulator, item) => {
    const date = new Date(item.created);

    const hour = date.getHours();

    entries.forEach(entry => {
      if (!accumulator[port].vehicle[entry][hour]) {
        accumulator[port].vehicle[entry][hour] = {
          time: [],
        };
      }
      const entryReport = accumulator[port].vehicle[entry][hour]
      entryReport.time.push(parseInt(deepGet(item, `report.${port}.vehicle.${entry}.time`)));
    })

    return accumulator;
  }, {
    [port]: {
      vehicle: {
        standard: {},
        sentri: {},
        readyLane: {}
      }
    }
  });

  return reportByEntryHour
}

function getHistoryReport(report) {
  let results = "city,port,type,entry,time,lanes,created\n"
  report.map(item => {
    if (item.report) {
      Object.keys(item.report).map(port => {
        Object.keys(item.report[port]).map(type => {
          Object.keys(item.report[port][type]).map(entry => {
            results += `${item.city},${port},${type},${entry},${item.report[port][type][entry].time},${item.report[port][type][entry].lanes},${item.created}\n`
          })
        })
      })
    }
  })

  return results
}

module.exports = {
  getLast24hrsReport,
  getHistoryReport
}
