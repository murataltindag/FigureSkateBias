const {JSDOM} = require('jsdom');
const d3 = require('d3');
const barChart = require('./barChart');
const doc = new JSDOM().window.document;

function getBarChart(params) {

  const chart = new barChart(params);
  const { containerId } = params;

  d3.select(doc.body)
    .append('div')
    .attr('id', containerId)
    .call(chart.render.bind(chart));

  const svg = d3.select(doc.getElementById(containerId)).node().outerHTML;
  d3.select(doc.getElementById(containerId)).remove();

  return svg;
}

module.exports = {
  getBarChart
};

