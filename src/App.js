import React from 'react';
import './styles.css';
import SelectCar from './components/SelectCar';
import Result from './components/Result';
import ButtonDone from './components/ButtonDone';
import ButtonReset from './components/ButtonReset';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showResult: false,
      toCompare: []
    };
    this.onClickDone = this.onClickDone.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.onCarSelected = this.onCarSelected.bind(this);
  }

  onClickDone() {
    if (!this.state.showResult) {
        this.setState( prevState => ({
            ...prevState,
            showResult: true
        }));
    }
  }

  onClickReset() {
    this.setState({
      showResult: false
    });
  }

  onCarSelected(carNumber, name, vehicleId) {
    this.setState( prevState => ({
        ...prevState,
        toCompare: [...prevState.toCompare, {car: carNumber, name: name, id: vehicleId}]
    }));
  }

  render() {
    return (
      <div>
        <div className='flexbox'>
            <SelectCar key='1' id='1' onCarSelected={this.onCarSelected} />
            <SelectCar key='2' id='2' onCarSelected={this.onCarSelected} />         
        </div>
        <ButtonDone onClickDone={this.onClickDone} />
        <ButtonReset onClickReset={this.onClickReset} />
        {this.state.showResult && <Result cars={this.state.toCompare} />}
      </div>
    );
  }
}

export default App;
