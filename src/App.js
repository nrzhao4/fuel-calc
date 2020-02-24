import React from 'react';
import './styles.css';
import SelectCar from './components/SelectCar';
import Result from './components/Result';
import ButtonDone from './components/ButtonDone';
import ButtonReset from './components/ButtonReset';
import Mileage from './components/Mileage';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showResult: false,
      toCompare: [],
      calculationInfo: null
    };
    this.onClickDone = this.onClickDone.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.onCarSelected = this.onCarSelected.bind(this);
    this.onMileageInput = this.onMileageInput.bind(this);
  }

  componentDidMount() {
    document.title = 'Fuel Calc';
  }

  onClickDone() {
    if (this.state.toCompare.length < 1) {
      alert('Select at least one car');
    } else if (this.state.calculationInfo === null) {
      alert('Please enter driving distance');
    } else if (isNaN(this.state.calculationInfo.distance)) {
      alert('Driving distance must be a numerical value');
    } else if (!this.state.showResult) {
        this.setState(prevState => ({
            ...prevState,
            showResult: true
        }));
    }
  }

  onClickReset() {
    window.location.reload();
  }

  onCarSelected(carNumber, name, vehicleId) {
    this.setState(prevState => ({
        ...prevState,
        toCompare: [...prevState.toCompare, {car: carNumber, name: name, id: vehicleId}]
    }));
  }

  onMileageInput(distance, isUnitsMiles) {
    this.setState(prevState => ({
      ...prevState,
      calculationInfo: {
        distance: distance,
        isUnitsMiles: isUnitsMiles
      }
    }));
  }

  render() {
    return (
      <div>
        <div className='flexbox'>
            <SelectCar key='1' id='1' onCarSelected={this.onCarSelected} />
            <SelectCar key='2' id='2' onCarSelected={this.onCarSelected} />         
        </div>

        <Mileage onMileageInput={this.onMileageInput}/>
        {this.state.showResult && <Result cars={this.state.toCompare} 
          info={this.state.calculationInfo} />}
        <div className='flexbox'>
          {!this.state.showResult && <ButtonDone onClickDone={this.onClickDone} />}
          <ButtonReset onClickReset={this.onClickReset} />
        </div>
        
      </div>
    );
  }
}

export default App;
