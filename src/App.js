import React from 'react';
import SelectCar from './components/SelectCar';
import Result from './components/Result';
import ButtonDone from './components/ButtonDone';
import ButtonAdd from './components/ButtonAdd';

const convertToJson = require('xml2js').parseString;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            selectCars: [
                {id:1}
            ],
            result: null
        }
        this.onClickDone = this.onClickDone.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
    }

    onClickDone() {
        if (this.state.result === null) {
        fetch('https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/26425')
            .then(response => response.text())
            .then(data => {
                convertToJson(data, (err, convertedData) => {
                    console.log(convertedData);
                    this.setState({
                        result: convertedData
                    })
                });
            });
        }
    }

    onClickAdd() {
        const numOfCars = this.state.selectCars.length;
        this.setState(prevState => ({
            selectCars: [...prevState.selectCars, {id: numOfCars+1}]
        }));
    }

    render() {
        const selectCars = this.state.selectCars.map(car => 
            <SelectCar key={car.id} id={car.id}/>
        );
        return (
            <div>
                {selectCars}
                <ButtonDone onClickDone={this.onClickDone} />
                <ButtonAdd onClickAdd={this.onClickAdd} />
                {(this.state.result !== null) && <Result data={this.state.result}/>}  
            </div>
        );
    }
}

export default App;