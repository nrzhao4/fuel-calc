import React from 'react';
import './styles.css';
import SelectCar from './components/SelectCar';
import Result from './components/Result';
import ButtonDone from './components/ButtonDone';
//import ButtonAdd from './components/ButtonAdd';
import ButtonReset from './components/ButtonReset';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showResult: false
    };
    this.onClickDone = this.onClickDone.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
  }

  onClickDone() {
    if (!this.state.showResult) {
      this.setState({ showResult: true });
    }
  }

  onClickReset() {
    this.setState({
      showResult: false
    });
  }

  render() {
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
