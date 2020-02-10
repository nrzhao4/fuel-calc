import React from 'react';

const convertToJson = require('xml2js').parseString;

class Result extends React.Component {

  constructor() {
    super();
    this.state = { mpgs: [] }
  }

  componentDidMount(props) {
    console.log(this.props);
    this.props.cars.map(car => {
      fetch(`https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/${car.id}`)
      .then(response => response.text())
      .then(data => {
        convertToJson(data, (err, convertedData) => {
          if(convertedData !== null) {
            this.setState(prevState => ({
              mpgs: [...prevState.mpgs, convertedData.yourMpgVehicle.avgMpg[0]]
            }))
          }
        })
      })
    });
  }

  componentDidUpdate() {
    console.log('state', this.state);
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
