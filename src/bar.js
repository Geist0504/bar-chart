import React, { Component } from 'react';
import './App.css';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';
import { axisLeft } from 'd3-axis';
import { tickFormat } from 'd3-axis';
import { format } from 'd3-format';
import { transition } from 'd3-transition';

class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
      const width = this.props.size[0]
      const height = this.props.size[1]
      const dataCount = this.props.data.length
      const barWidth = width/dataCount
      const node = this.node
      let tooltip = select(".container").append("div").attr("id", "tooltip").style("opacity", 0)
      let overlay = select(".container").append('div').attr('class', 'overlay').style('opacity', 0);
      const padding = 50
      const xScale = scaleLinear()
                     .domain([1947, max(this.props.data, (d) => d[0])])
                     .range([padding, this.props.size[0] + padding]);
      const yScale = scaleLinear()
         .domain([0, max(this.props.data, (d) => d[1])])
         .range([0, this.props.size[1]])
      const yScaleAxis = scaleLinear()
         .domain([0, max(this.props.data, (d) => d[1])])
         .range([this.props.size[1], 0])
      const xAxis = axisBottom(xScale).tickFormat(format("d"));
      const yAxis = axisLeft(yScaleAxis);

   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')
   
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

   select(node).append("g").attr("transform", "translate(0, 500)").attr("id", "x-axis")
   .call(xAxis);
   
   select(node).append("g").attr("transform", "translate(50, 0)").attr("id", "y-axis")
   .call(yAxis);

   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * width/dataCount + padding)
      .attr('y', d => height - yScale(d[1]))
      .attr('height', d => yScale(d[1]))
      .attr('width', width/dataCount)
      .attr('class', 'bar')
      .attr('data-date', d => d[3][0])
      .attr('data-gdp', d => d[1])
      .on('mouseover', function(d,i){
         overlay.transition()
           .duration(0)
           .style('height', yScale(d[1]) + 'px')
           .style('width', barWidth + 'px')
           .style('opacity', .9)
           .style('left', (i * barWidth) + 70 + 'px')
           .style('top', height - yScale(d[1]) + 100 + 'px')
         tooltip.transition()
           .duration(200)
           .style('opacity', .9)
         tooltip.html(d[0] + ' ' + d[2] +  '<br>' + d[1] + ' Billion')
           .attr('data-date', d[3][0])
           .style('left', (i * width/dataCount) + 100 + 'px')
           .style('top', height - 50 + 'px')

      })
      .on('mouseout', function(d, i){
         tooltip.transition().duration(200).style('opacity', 0)
         overlay.transition().duration(200).style('opacity', 0);
      })
   }
render() {
      return(
      <div>
         <h1 id='title'> d3i dashboard</h1>
         <svg ref={node => this.node = node}
         width={800} height={550}>
         </svg>
      </div>
      )
   }
}
export default BarChart