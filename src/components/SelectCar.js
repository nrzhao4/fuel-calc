import React from 'react';
import SelectYear from './SelectYear';
import SelectMake from './SelectMake';
import SelectModel from './SelectModel';
import SelectOption from './SelectOption';

class SelectCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: '',
            make: '',
            model: '',
            vehicleId: ''
        }
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeMake = this.onChangeMake.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeOption = this.onChangeOption.bind(this);
    }

    // When a year is selected
    onChangeYear(event) {
        const selectedYear = event.target.value;
        this.setState( prevState => ({
            //...prevState,
            year: selectedYear,
            make: '',
            model: '',
            vehicleId: ''
        }));
    }

    // When a make is selected
    onChangeMake(event) {
        const selectedMake = event.target.value;
        this.setState( prevState => ({
            //...prevState,
            make: selectedMake,
            model: '',
            vehicleId: ''
        }));
    }

    // When a model is selected
    onChangeModel(event) {
        const selectedModel = event.target.value;
        this.setState( prevState => ({
            //...prevState,
            model: selectedModel,
            vehicleId: ''
        }));
    }

    // Selecting an option will return a vehicle id
    onChangeOption(event) {
        const selectedOption = event.target.value;
        this.setState( prevState => ({
            //...prevState,
            vehicleId: selectedOption
        }));
        const selectedName = this.state.year + ' ' + this.state.make + ' ' + this.state.model;
        this.props.onCarSelected(this.props.id, selectedName, selectedOption);
    }

    render() {
        return (
        <div className='select-car'>
            <h1>Car {this.props.id}</h1>
            <div className='flexbox'>
                <label>Year: </label>
                <SelectYear info={this.state} onChangeHandler={this.onChangeYear}/>
            </div>

            <div className='flexbox'>
                <label>Make: </label>
                {this.state.year !== '' && <SelectMake info={this.state} onChangeHandler={this.onChangeMake} />}    
            </div>

            <div className='flexbox'>
                <label>Model: </label>
                {this.state.make !== '' && <SelectModel info={this.state} onChangeHandler={this.onChangeModel} />}    
            </div>

            <div className='flexbox'>
                <label>Option: </label>
                {this.state.model !== '' && <SelectOption info={this.state} onChangeHandler={this.onChangeOption} />}    
            </div>

        </div>
        )
    }
}

export default SelectCar;