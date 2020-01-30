import React from 'react';

const convertToJson = require('xml2js').parseString;

class Result extends React.Component {
  constructor() {
    super();
    this.state = {
      result: null,
      fetched: false
    };
  }

  componentDidMount() {
    if (!this.state.fetched) {
      fetch('https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/26425')
        .then(response => response.text())
        .then(data => {
          convertToJson(data, (err, convertedData) => {
            this.setState({
              result: convertedData,
              fetched: true
            });
          });
        });
    }
  }

  render() {
    //const result = this.state.result.yourMpgVehicle.avgMpg[0]
    return (
      <div>
        <h3>Calculated result</h3>
        {this.state.fetched && (
          <p>{this.state.result.yourMpgVehicle.avgMpg[0]}</p>
        )}
      </div>
    );
  }
}

export default Result;
