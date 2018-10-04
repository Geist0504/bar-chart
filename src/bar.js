import React, { Component } from 'react';
import './App.css';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';

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
      const node = this.node
      const dataMax = max(this.props.data)
      const xScale = scaleLinear()
                     .domain([0, dataMax])
                     .range([0, this.props.size[0]]);
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])
      const xAxis = axisBottom(xScale);


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

   select(node).append("g").attr("transform", "translate(0, 10)").attr("id", "x-axis")
   .call(xAxis);
   
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25)
   }
render() {
      return(
      <div>
         <h1 id='title'> d3ia dashboard</h1>
         <svg ref={node => this.node = node}
         width={500} height={500}>
         </svg>
      </div>
      )
   }
}
export default BarChart