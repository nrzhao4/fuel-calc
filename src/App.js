import React from "react";
import "./styles.css";
import SelectCar from "./components/SelectCar";
import Result from "./components/Result";
import ButtonDone from "./components/ButtonDone";
import ButtonAdd from "./components/ButtonAdd";
import ButtonReset from "./components/ButtonReset";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectCars: [{ id: 1 }],
      showResult: false
    };
    this.onClickDone = this.onClickDone.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
  }

  onClickDone() {
    if (!this.state.showResult) {
      this.setState({ showResult: true });
    }
  }

  onClickAdd() {
    const numOfCars = this.state.selectCars.length;
    this.setState(prevState => ({
      selectCars: [...prevState.selectCars, { id: numOfCars + 1 }]
    }));
  }

  onClickReset() {
    this.setState({
      selectCars: [{ id: 1 }],
      showResult: false
    });
  }

  render() {
    const selectCars = this.state.selectCars.map(car => (
      <SelectCar key={car.id} id={car.id} />
    ));
    return (
      <div>
        <div className="flexbox">{selectCars}</div>
        <ButtonDone onClickDone={this.onClickDone} />
        <ButtonAdd onClickAdd={this.onClickAdd} />
        <ButtonReset onClickReset={this.onClickReset} />
        {this.state.showResult && <Result />}
      </div>
    );
  }
}

export default App;
