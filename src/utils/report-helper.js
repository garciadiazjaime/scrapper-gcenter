const { deepGet } = require('./string');

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

  // return entries.reduce((accumulator, entry) => {
  //   const response = [...Array(24).keys()].map(hour => {
  //     const { time, count } = reportByEntryHour[port].vehicle[entry][hour] || {};
  //     if (count > 0) {
  //       return Math.round(time / count * 100) / 100;
  //     }
  //     return 0;
  //   });
  // })
}

module.exports = {
  getLast24hrsReport
}
