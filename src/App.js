import React, { Component } from 'react';
import './App.css';
import BarChart from './bar'


class App extends Component {

  process(data) {
    let dataArr = []
    data.forEach((val) => {
      let date = val[0].split('-')
      switch(date[1]){
        case '01':
          dataArr.push([date[0], val[1], 'Q1'])
        case '04':
          dataArr.push([date[0], val[1], 'Q2'])
        case '07':
          dataArr.push([date[0], val[1], 'Q3'])
        case '10':
          dataArr.push([date[0], val[1], 'Q4'])
        default:
          console.log('ERROR')
      }})
    }
  render() {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',false);
    Httpreq.send(null);

    var json_obj = JSON.parse(Httpreq.responseText)
    console.log(json_obj.data)
    return (
      <div className="App">
        <div className='App-header'>
          <h2>d3ia dashboard</h2>
        </div>
        <div>
          <BarChart data={json_obj.data} size={[500,500]} />
        </div>
      </div>
    );
  }
}

export default App;
