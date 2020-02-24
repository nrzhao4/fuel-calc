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

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        const selectedYear = this.state.year;
        const selectedMake = this.state.make;
        const source = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${selectedYear}&make=${selectedMake}`;
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

    componentDidMount() {
        if(this.state.make !== '') {
            this.fetchData();
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.info.make !== prevProps.info.make) {
            console.log('fetching models');
            this.setState({
                models: [], year: this.props.info.year, make: this.props.info.make
            }, () => {
                this.fetchData()
            });
        }
    }

    render() {
        console.log('rendered');
        return (
            <div>
                <select className='dropdown' value={this.state.value} onChange={this.props.onChangeHandler}>
                    {this.state.models.map((model) => <option key={model.value} value={model.value}>{model.display}</option>)}
                </select>
            </div> 
        );
    }
}

export default SelectModel;