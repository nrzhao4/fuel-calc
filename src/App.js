import React from 'react';
import './styles.css';
import SelectCar from './components/SelectCar';
import Result from './components/Result';
import ButtonDone from './components/ButtonDone';
import ButtonAdd from './components/ButtonAdd';
import ButtonReset from './components/ButtonReset';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      //selectCars: [{ id: 1, id: 2 }],
      showResult: false
    };
    this.onClickDone = this.onClickDone.bind(this);
    //this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
  }

  onClickDone() {
    if (!this.state.showResult) {
      this.setState({ showResult: true });
    }
  }

  // Future functionality
  /*onClickAdd() {
    const numOfCars = this.state.selectCars.length;
    this.setState(prevState => ({
      selectCars: [...prevState.selectCars, { id: numOfCars + 1 }]
    }));
  }*/

  onClickReset() {
    this.setState({
      //selectCars: [{ id: 1 }],
      showResult: false
    });
  }

  render() {
    /*const selectCars = this.state.selectCars.map(car => (
      <SelectCar key={car.id} id={car.id} />));*/
    return (
      <div>
        <div className='flexbox'>
            <SelectCar key='1' id='1'/> 
            <SelectCar key='2' id='2'/>        
            </div>
        <ButtonDone onClickDone={this.onClickDone} />
        <ButtonReset onClickReset={this.onClickReset} />
        {this.state.showResult && <Result />}
      </div>
    );
  }
}

export default App;
