import React from 'react';
import { template } from '@babel/core';

const convertToJson = require('xml2js').parseString;

class SelectYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = { years: [] }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentDidMount() {
        fetch('https://www.fueleconomy.gov/ws/rest/vehicle/menu/year')
        .then(response => response.text())
        .then(data => {
          convertToJson(data, (err, convertedData) => {
              console.log(convertedData);
              let yearsFromApi = convertedData.menuItems.menuItem.map((item) => {
                return {value: item.value[0], display: item.value[0]}
              });
              this.setState({
                years: [{value: '', display: '(Year)'}].concat(yearsFromApi)
              });
          })
        })
    }

    onChangeHandler(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <form>
                <select value={this.state.value} onChange={this.onChangeHandler}>
                    {this.state.years.map((year) => <option key={year.value} value={year.value}>{year.display}</option>)}
                </select>
            </form> 
        );
    }
}

export default SelectYear;