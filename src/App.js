import React from 'react';
import SelectCar from './components/SelectCar';
import Result from './components/Result';
import ButtonDone from './components/ButtonDone';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            selectCars: [
                {id:1}
            ],
            showResult: false
        }
        this.onClickDone = this.onClickDone.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
    }

    onClickDone() {
        this.setState(prevState => {
            if (!prevState.showResult) {
                return {
                    ...prevState,
                    showResult: true
                }
            }
        });
    }

    onClickAdd() {
        const numOfCars = this.state.selectCars.length;
        this.setState(prevState => {
            return {
                selectCars: [...prevState.selectCars, {id: numOfCars+1}],
                showResult: prevState.showResult
            }
        });
    }

    render() {
        const selectCars = this.state.selectCars.map(car => 
            <SelectCar key={car.id} id={car.id}/>
        );
        return (
            <div>
                {selectCars}
                <ButtonDone onClickDone={this.onClickDone}/>
                <button onClick={this.onClickAdd}>Add another car</button>
                {this.state.showResult && <Result />}
            </div>
        );
    }
}

export default App;