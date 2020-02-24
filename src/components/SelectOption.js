import React from 'react';

const convertToJson = require('xml2js').parseString;

class SelectModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            options: [], 
            year: this.props.info.year,
            make: this.props.info.make,
            model: this.props.info.model,
        }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        const selectedYear = this.state.year;
        const selectedMake = this.state.make;
        const selectedModel = this.state.model;
        const source = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${selectedYear}&make=${selectedMake}&model=${selectedModel}`;
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

    componentDidMount() {
        if(this.state.model !== '') {
            this.fetchData();
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.info.model !== prevProps.info.model) {
            console.log('fetching options');
            this.setState({
                options: [], 
                year: this.props.info.year, 
                make: this.props.info.make,
                model: this.props.info.model
            }, () => {
                this.fetchData()
            });
        }
    }

    render() {
        return (
            <div>
                <select className='dropdown' value={this.state.value} onChange={this.props.onChangeHandler}>
                    {this.state.options !== '' && this.state.options.map((option) => 
                        <option key={option.value} value={option.value}>{option.display}</option>
                    )}
                    {this.state.options === '' && <option value=''>N/A</option>}
                </select> 
            </div>
        );
    }
}

//{this.state.options.map((option) => <option key={option.value} value={option.value}>{option.display}</option>)}

export default SelectModel;