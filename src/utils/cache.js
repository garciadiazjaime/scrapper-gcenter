const lastReport = {}

async function updateReport(city, generator) {
  const data = await generator()
  const time = new Date()

  lastReport[city] = {
    data,
    time
  }

  return data
}

async function getOrElse(city, generator) {
  if (!lastReport[city]) {
    return updateReport(city, generator)
  } 

  const { data, time } = lastReport[city]
  const now = new Date()
  const fiveMinutes =  1000 * 60 * 5
  if ( now - time > fiveMinutes) {
    return updateReport(city, generator)
  }

  return data
}

module.exports = {
  getOrElse
}
