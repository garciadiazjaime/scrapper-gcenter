const D3Node = require('d3-node');
const { scaleLinear } = require('d3-scale')

const {
  getGraphData,
  setXAxis,
  setYAxis,
  setBackground,
  setHeader,
  setBars
} = require('./helper')


async function getLast24hrsImage(city) {
  const data = await getGraphData(city)
  
  const padding = 50
  const width = 320
  const height = parseInt(width * 1.6 * 2)
  const threeHoursInMins = 180
  const hoursInADay = 23

  const d3n = new D3Node()
  const svg = d3n.createSVG(width, height)
  svg.append('svg:title').text('Reporte de Garitas de las Últimas 24 horas')
  const chart = svg.append('g').attr('transform', `translate(0, 0)`)

  setBackground(chart)
  
  const y = scaleLinear()
    .domain([0, hoursInADay])
    .range([0, height - 2 * padding])
  setYAxis(chart, y, padding)

  const x = scaleLinear()
    .domain([0, threeHoursInMins]) // 3hrs
    .range([0, width - padding - 20])
  setXAxis(chart, x, padding)

  setHeader(chart)

  setBars(chart, data, padding, x, y)

  return d3n.svgString()
}

module.exports = {
  getLast24hrsImage
}
