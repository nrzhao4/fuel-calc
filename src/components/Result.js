import React from "react";

const convertToJson = require("xml2js").parseString;

class Result extends React.Component {
  constructor() {
    super();
    this.state = { results: [] };
  }

  componentDidMount(props) {
    this.props.cars.map((car) => {
      fetch(
        `https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/${car.id}`
      )
        .then((response) => response.text())
        .then((data) => {
          convertToJson(data, (err, convertedData) => {
            if (convertedData === null) {
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
    var result;

    //if no mpg data, set result to null
    if (mpg === null) {
      this.setState((prevState) => ({
        results: [
          ...prevState.results,
          { id: car.id, name: car.name, estimatedGasConsumption: null },
        ],
      }));
      return;
    }

    //Convert distance from imperial to metric if needed
    if (isMiles === "0") {
      var convertedMpg = 235.214 / mpg;
      result = Math.floor((convertedMpg * distance * 1.60934) / 100);

      this.setState((prevState) => ({
        results: [
          ...prevState.results,
          {
            id: car.id,
            name: car.name,
            estimatedGasConsumption: result + " L ",
          },
        ],
      }));
    } else {
      result = Math.floor(distance / mpg);

      this.setState((prevState) => ({
        results: [
          ...prevState.results,
          {
            id: car.id,
            name: car.name,
            estimatedGasConsumption: result + " gal. ",
          },
        ],
      }));
    }
  }

  render() {
    const results = this.state.results.map((car) => {
      if (car.estimatedGasConsumption === null) {
        return (
          <h3 key={car.id}>
            Sorry, there is no fuel economy data for {car.name}
          </h3>
        );
      } else {
        return (
          <h3 key={car.id}>
            The {car.name} will use {car.estimatedGasConsumption}
            of fuel
          </h3>
        );
      }
    });
    return (
      <div className="results">
        {this.state.mpgs !== [] && results}
        <p style={{ fontSize: "12px" }}>
          *Results displayed are estimated based on data provided by{" "}
          <a href={"https://www.fueleconomy.gov/"}>fueleconomy.gov</a>
        </p>
      </div>
    );
  }
}

export default Result;
