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
  // const report = await getLast24hrs(city);
  // const data = getLast24hrsReport(report, 'sanYsidro');
  const data = [{"hour":"7","time":"30"},{"hour":"6","time":"30"},{"hour":"5","time":"30"},{"hour":"4","time":"45"},{"hour":"3","time":"30"},{"hour":"2","time":"20"},{"hour":"1","time":"20"},{"hour":"0","time":"35"},{"hour":"23","time":"20"},{"hour":"22","time":"20"},{"hour":"21","time":"60"},{"hour":"20","time":"60"},{"hour":"19","time":"70"},{"hour":"18","time":"75"},{"hour":"17","time":"80"},{"hour":"16","time":"80"},{"hour":"15","time":"80"},{"hour":"14","time":"80"},{"hour":"13","time":"60"},{"hour":"12","time":"60"},{"hour":"11","time":"60"},{"hour":"10","time":"40"},{"hour":"9","time":"10"},{"hour":"8","time":"10"}]

  return data
}

function setXAxis(chart, x, padding) {
  const xValues = [30, 60, 90, 120, 150, 180]

  const xAxis = axisBottom(x)
    .tickValues(xValues)
    .tickFormat(x => minsToHrs(x))
  
  chart.append('g')
    .call(xAxis)
    .attr('transform', `translate(${padding}, ${padding})`)
    .attr('font-size', '16px')
}

function setYAxis(chart, y, padding) {
  const yValues = getYValues()
  const yAxis = axisLeft(y)
    .tickValues(yValues)
    .tickFormat((y, i) => {
      return `${printAMFMFormat(i)}`
    })

  chart.append('g')
    .call(yAxis)
    .attr('transform', `translate(${padding}, ${padding + 45})`)
    .attr('font-size', '14px')
}

function setBackground(chart) {
  chart
    .append('rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', 'lightyellow')
}

function setHeader(chart) {
  chart.append('g')
    .append('text')
    .attr('transform', `translate(0, 0)`)
    .attr('dy', '1em')
    .style('text-anchor', 'center')
    .style('font-size', '18px')
    .text('Espera Promedio de las Últimas 24 horas')

  chart.append('g')
    .append('text')
    .attr('transform', `translate(0, 20)`)
    .attr('dy', '1em')
    .style('text-anchor', 'center')
    .style('font-size', '16px')
    .style('fill', '#333')
    .text('Garita de San Ysidro | Carro - Normal')
}

function setBars(chart, data, padding, x, y) {
  data = data.slice(0, 1)
  const barGroups = chart.selectAll()
    .data(data)
    .enter()
    .append('g')
  const barHeight = 40

  barGroups.append('rect')
    .style('fill', (d, i) => i % 2 === 0 ? 'steelblue' : 'cadetblue')
    .attr('x', padding)
    .attr('width', d => {
      return x(d.time)
    })
    .attr('y', (d) => {
      return y(d.hour - 7) + padding * 1.5
    })
    .attr('height', barHeight - 2)

  barGroups.append('text')
    .attr('fill', 'black')
    .attr('x', data => x(data.time) + padding + 25)
    .attr('y', data => y(data.hour + 1) + padding + 10)
    .attr('text-anchor', 'middle')
    .text(data => {
      return `${minsToHrs(data.time)}`
    })
}

module.exports = {
  getGraphData,
  setXAxis,
  setYAxis,
  setBackground,
  setHeader,
  setBars
}
