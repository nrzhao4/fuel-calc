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
              mpgs: [...prevState.mpgs,
                {id: car.id, name: car.name, mpg: convertedData.yourMpgVehicle.avgMpg[0]}]
            }))
          } else {
            this.setState(prevState => ({
              mpgs: [...prevState.mpgs, {id: car.id, name: car.name, mpg: null}]
            }))
          }
        })
      })
    });
  }

  render() {
    const results = this.state.mpgs.map(car => {
      if (car.mpg === null) {
        return (<h3 key={car.id}>There is no fuel economy data for {car.name}</h3>)
      } else {
        return (<h3 key={car.id}> {car.name}: {car.mpg} mpg</h3>)
      }
    })
    return (
      <div>
        {this.state.mpgs !== [] && results}
      </div>
    );
  }
}

export default Result;
