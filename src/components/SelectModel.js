import React from 'react';

const convertToJson = require('xml2js').parseString;

class SelectModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            models: [], 
            year: this.props.info.year,
            make: this.props.info.make 
        }
    }

    componentDidMount() {
        if(this.state.make !== '') {
            const source = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${this.state.year}&make=${this.state.make}`;
            fetch(source).then(response => response.text())
            .then(data => {
                convertToJson(data, (err, convertedData) => {
                    let modelsFromApi = convertedData.menuItems.menuItem.map((item) => {
                        return {value: item.value[0], display: item.value[0]}
                    });
                    this.setState({
                        models: [{value: '', display: 'Select model'}].concat(modelsFromApi)
                    });
                })
            })
        }
    }

    render() {
        return (
            <form>
                <select value={this.state.value} onChange={this.props.onChangeHandler}>
                    {this.state.models.map((model) => <option key={model.value} value={model.value}>{model.display}</option>)}
                </select>
            </form> 
        );
    }
}

export default SelectModel;