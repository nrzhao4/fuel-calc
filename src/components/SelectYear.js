import React from 'react';

const convertToJson = require('xml2js').parseString;

class SelectYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = { years: [] }

    }

    componentDidMount() {
        fetch('https://www.fueleconomy.gov/ws/rest/vehicle/menu/year')
        .then(response => response.text())
        .then(data => {
          convertToJson(data, (err, convertedData) => {
              let yearsFromApi = convertedData.menuItems.menuItem.map((item) => {
                return {value: item.value[0], display: item.value[0]}
              });
              this.setState({
                years: [{value: '', display: 'Select Year'}].concat(yearsFromApi)
              });
          })
        })
    }

    render() {
        return (
            <div>
                <select className='dropdown' value={this.state.value} onChange={this.props.onChangeHandler}>
                    {this.state.years.map((year) => <option key={year.value} value={year.value}>{year.display}</option>)}
                </select>
            </div>
            
        );
    }
}

export default SelectYear;