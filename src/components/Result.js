import React from 'react';

const convertToJson = require('xml2js').parseString;

class Result extends React.Component {

  constructor() {
    super();
    this.state = { results: [] }
  }

  componentDidMount(props) {
    this.props.cars.map(car => {
      fetch(`https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/${car.id}`)
      .then(response => response.text())
      .then(data => {
        convertToJson(data, (err, convertedData) => {
          if(convertedData === null) {
            this.calculate(car, null);
          } else {
            const carMpg = convertedData.yourMpgVehicle.avgMpg[0];
            this.calculate(car, carMpg);
          } 
        });
      });
    });
  }

  calculate(car, mpg) {
    const distance = this.props.info.distance;
    const isMiles = this.props.info.isUnitsMiles;
    let unit;
    let result;

    //if no mpg data, set result to null
    if(mpg === null) {
      this.setState(prevState => ({
        results: [...prevState.results,
          {id: car.id, name: car.name, estimatedGasConsumption: null}]
      }));
      return;
    }
    
    //Convert distance from imperial to metric if needed
    if(!isMiles) {
      unit = 'L';
      result = mpg * 1.60934 / 3.78541 * distance;
      result = result + ' ' + unit;
    }
    else {
      unit = 'gal.'
      result = distance * mpg;
      result = result + ' ' + unit;
    }

    this.setState(prevState => ({
      results: [...prevState.results,
        {id: car.id, name: car.name, estimatedGasConsumption: result}]
    }));
  }

  render() {
    const results = this.state.results.map(car => {
      if (car.estimatedGasConsumption === null) {
        return (<h3 key={car.id}>Sorry, there is no fuel economy data for {car.name}.</h3>)
      } else {
        return (<h3 key={car.id}>The {car.name} will use {car.estimatedGasConsumption}  
          of fuel.</h3>)
      }
    })
    return (
      <div className='results'>
        {this.state.mpgs !== [] && results}
        <p style={{fontSize: '12px'}}>
          *Results displayed are estimated based on data
          provided by <a href={'https://www.fueleconomy.gov/'}>fueleconomy.gov</a>
        </p>
      </div>
    );
  }
}

export default Result;
