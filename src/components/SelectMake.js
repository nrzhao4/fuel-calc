import React from 'react';

const convertToJson = require('xml2js').parseString;

class SelectMake extends React.Component {
    constructor(props) {
        super(props);
        this.state = { makes: [], year: this.props.info.year }

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        const selectedYear = this.state.year;
        const source = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${selectedYear}`;
        fetch(source).then(response => response.text())
        .then(data => {
            convertToJson(data, (err, convertedData) => {
                let makesFromApi = convertedData.menuItems.menuItem.map((item) => {
                    return {value: item.value[0], display: item.value[0]}
                });
                this.setState({
                    makes: [{value: '', display: 'Select make'}].concat(makesFromApi)
                });
            })
        })
    }

    componentDidMount() {
        if(this.state.year !== '') {
            this.fetchData();
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.info.year !== prevProps.info.year) {
            this.setState({
                makes: [], year: this.props.info.year
            }, () => {
                this.fetchData()
            });
        }
    }

    render() {
        return (
            <div>
                <select className='dropdown' value={this.state.value} onChange={this.props.onChangeHandler}>
                    {this.state.makes.map((make) => <option key={make.value} value={make.value}>{make.display}</option>)}
                </select>
            </div>
        );
    }
}

export default SelectMake;