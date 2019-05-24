import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SmartSelect from './smart-select';

class App extends Component {
  state = {
    items: [
      { value: 'apple', text: "Apple" },
      { value: 'banana', text: 'Banana' },
      { value: 'coconut', text: 'Coconut' },
      { value: 'grapes', text: 'Grapes' },
      { value: 'mango', text: 'Mango' },
    ],
    selectedFruit: null,
    pickedFruits: [],
  }

  onFruitSelect = (fruit) => {
    console.error('SELECTED', fruit);
    this.setState({
      selectedFruit: fruit
    });
  }

  pick = () => {
    this.setState({
      pickedFruits: [...this.state.pickedFruits, this.state.selectedFruit],
    });
  }

  get isPickButtonDisabled() {
    return !this.state.selectedFruit;
  }

  get pickedFruits() {
    const { pickedFruits } = this.state;

    if (!pickedFruits.length) {
      return '[empty]';
    }

    return (
      <ul>
        {pickedFruits.map((fruit) => {
          return (
            <li key={fruit}>
              {fruit}
              <button type="button" onClick={this.removeFruit(fruit)}>X</button>
            </li>
          );
        })}
      </ul>
    );
  }

  removeFruit = (fruit) => () => {
    const newFruitList = this.state.pickedFruits.filter(f => f !== fruit); 

    this.setState({
      pickedFruits: [...newFruitList]
    });
  }

  render() {
    const { items, pickedFruits } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">

          <SmartSelect items={items} invisibleValues={pickedFruits} onSelect={this.onFruitSelect} />

          <button type="button" onClick={this.pick} disabled={this.isPickButtonDisabled} >Pick fruit</button>

        </p>
        <h5>Selected fruit: {this.state.selectedFruit || '[empty]'}</h5>
        <h5>Picked fruits: {this.pickedFruits}
        </h5>
      </div>
    );
  }
}

export default App;
