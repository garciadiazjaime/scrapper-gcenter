const moment = require('moment-timezone');

const {
  deepGet
} = require('./string');

function getLast24hrsReport(report, port) {
  if (!report || !report.length) {
    return []
  }
  const hourTaken = {}

  const reportByEntryHour = report.reduce((accumulator, item) => {
    const hour = new moment(item.created).tz("America/Los_Angeles").format("H")

    if (hourTaken[hour]) {
      return accumulator
    }
    const time = deepGet(item, `report.${port}.vehicle.standard.time`)
    if (time) {
      accumulator.push({
        hour: parseInt(hour),
        time: parseInt(time)
      })

      hourTaken[hour] = true
    }
    
    return accumulator;
  }, []);

  return reportByEntryHour
}

function getHistoryReport(report) {
  let results = ["city,port,type,entry,time,lanes,created\n"]
  report.map(item => {
    if (item.report) {
      Object.keys(item.report).map(port => {
        Object.keys(item.report[port]).map(type => {
          Object.keys(item.report[port][type]).map(entry => {
            results.push(`${item.city},${port},${type},${entry},${item.report[port][type][entry].time},${item.report[port][type][entry].lanes},${item.created}\n`)
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
