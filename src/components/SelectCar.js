import React from 'react';

function SelectCar(props) {
    return (
        <div>
            <h2>Car {props.id}</h2>
            <p>Select year</p>
            <p>Select make</p>
            <p>Select model</p>
            <p>Select Trim</p>
        </div>
    );
}

export default SelectCar;