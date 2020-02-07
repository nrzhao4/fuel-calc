import React from 'react';

const convertToJson = require('xml2js').parseString;

class SelectModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            models: [], 
            year: this.props.info.year,
            make: this.props.info.make,
            model: this.props.info.model,
            options: ''
        }
    }

    componentDidMount() {
        const source = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${this.state.year}&make=${this.state.make}&model=${this.state.model}`;
        fetch(source).then(response => response.text())
        .then(data => {
            convertToJson(data, (err, convertedData) => {
                let optionsFromApi = convertedData.menuItems.menuItem.map((item) => {
                    return {value: item.value[0], display: item.text[0]}
                });
                this.setState({
                    options: [{value: '', display: 'Select option'}].concat(optionsFromApi)
                });
            })
        })
    }

    render() {
        return (
            <form>
                <select value={this.state.value} onChange={this.props.onChangeHandler}>
                    {this.state.options !== '' && this.state.options.map((option) => 
                        <option key={option.value} value={option.value}>{option.display}</option>
                    )}
                    {this.state.options === '' && <option value=''>N/A</option>}
                </select>
            </form> 
        );
    }
}

//{this.state.options.map((option) => <option key={option.value} value={option.value}>{option.display}</option>)}

export default SelectModel;