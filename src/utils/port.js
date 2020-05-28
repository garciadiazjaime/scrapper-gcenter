const PortModel = require('../models/portModel')

function getLast24hrsSummaryHelper(query, key) {
  return PortModel.aggregate([
    {
      $match: query,
    },
    {
      $project: {
        time: `$report.${key}.time`,
        created: 1
      }
    },
    {
      $sort: { 'time': -1 }
    },
    {
      $limit: 1
    }
  ])
}

async function getLast24hrsSummary(city) {
  const startDay = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const query = {
    city,
    created: {
      $gte: new Date(startDay.toISOString()),
    },
  };

  const [normal, readyLane, sentri, normalOtay, readyLaneOtay, sentriOtay] = await Promise.all([
    getLast24hrsSummaryHelper(query, 'sanYsidro.vehicle.standard'),
    getLast24hrsSummaryHelper(query, 'sanYsidro.vehicle.readyLane'),
    getLast24hrsSummaryHelper(query, 'sanYsidro.vehicle.sentri'),

    getLast24hrsSummaryHelper(query, 'otay.vehicle.standard'),
    getLast24hrsSummaryHelper(query, 'otay.vehicle.readyLane'),
    getLast24hrsSummaryHelper(query, 'otay.vehicle.sentri'),
  ])

  return {
    sanYsidro: {
      normal,
      readyLane,
      sentri
    },
    otay: {
      normal: normalOtay,
      readyLane: readyLaneOtay,
      sentri: sentriOtay
    }
  }
}

module.exports = {
  getLast24hrsSummary
}
