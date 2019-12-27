const { axisBottom, axisLeft } = require('d3-axis')
const moment = require('moment-timezone');

const { minsToHrs, printAMFMFormat } = require('../string')
const { getLast24hrs } = require('../../models/portModel');
const { getLast24hrsReport } = require('../report-helper');

function getYValues() {
  const currentHour = new moment().tz("America/Los_Angeles").format("H")

  const yValues = []

  for(let i = 0; i < 24; i++) {
    if (i <= currentHour) {
      yValues.push(Math.abs(i - currentHour) % 24)
    } else {
      yValues.push(24 - Math.abs(i - currentHour))
    }
  }

  return yValues
}

async function getGraphData(city) {
  const report = await getLast24hrs(city);
  const data = getLast24hrsReport(report, 'sanYsidro');
  return data
}

function setXAxis(chart, x, paddingX, paddingY) {
  const xValues = [30, 60, 90, 120, 150, 180]

  const xAxis = axisBottom(x)
    .tickValues(xValues)
    .tickFormat(x => minsToHrs(x))
  
  chart.append('g')
    .call(xAxis)
    .attr('transform', `translate(${paddingX}, ${paddingY})`)
    .attr('font-size', '16px')
}

function setYAxis(chart, y, padding) {
  const yValues = getYValues()
  const yAxis = axisLeft(y)
    .tickValues(yValues)
    .tickFormat((y, i) => `${printAMFMFormat(i)}`)

  chart.append('g')
    .call(yAxis)
    .attr('transform', `translate(${padding}, ${padding})`)
    .attr('font-size', '14px')
}

function setBackground(chart) {
  chart
    .append('rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', 'lightyellow')
}

function setBars(chart, data, padding, x, y) {
  const barGroups = chart.selectAll()
    .data(data)
    .enter()
    .append('g')
  const barHeight = 40

  barGroups.append('rect')
    .style('fill', (d, i) => i % 2 === 0 ? 'steelblue' : 'cadetblue')
    .attr('x', padding)
    .attr('width', d => x(d.time))
    .attr('y', (data, index) => y(index) + padding)
    .attr('height', barHeight - 2)

  barGroups.append('text')
    .attr('fill', 'black')
    .attr('x', data => x(data.time) + padding + 25)
    .attr('y', (data, index) => y(index) + padding * 1.5)
    .attr('text-anchor', 'middle')
    .text(data => `${minsToHrs(data.time)}`)
}

module.exports = {
  getGraphData,
  setXAxis,
  setYAxis,
  setBackground,
  setBars
}
