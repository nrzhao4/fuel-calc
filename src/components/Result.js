import React from 'react';

const convertToJson = require('xml2js').parseString;

class Result extends React.Component {

  componentDidMount(props) {
    console.log(this.props);
    const carId = this.props.cars[0].id;
    const source = `https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/${carId}`
    console.log(source);
    fetch(source)
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
  }

            

  render() {
    //const result = this.state.result.yourMpgVehicle.avgMpg[0]
    return (
      <div>
        <h3>Calculated result</h3>
      </div>
    );
  }
}

export default Result;
