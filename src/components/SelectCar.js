import React from 'react';
import SelectYear from './SelectYear';

class SelectCar extends React.Component {
    constructor() {
        super();
        this.state = {
            year: '',
            make: null,
            model: null,
            trim: null
        }
    }

    render() {
        return (
        <div className='select-car'>
            <h2>Car {this.props.id}</h2>
            <div className='flexbox'>
                <label>Year: </label>
                <SelectYear />
            </div>
            
            <p>Select make</p>
            <p>Select model</p>
            <p>Select Trim</p>
        </div>
        )
    }
}

export default SelectCar;