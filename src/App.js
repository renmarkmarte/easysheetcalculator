import React from 'react';
import logo from './logo.svg';
import './App.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      flute_direction: 'Not Important',
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculateYield = this.calculateYield.bind(this);
  }

  handleChange(name, value) {
    switch (name) {
      case 'width':
        this.setState({width: value});
        break;
      case 'height':
        this.setState({height: value});
        break;
      case 'flute_direction':
        this.setState({flute_direction: value});
      default:
        break;
    }
  }

  calculateYield(sheet_size_width, sheet_size_height) {
    var width = this.state.width;
    var height = this.state.height;
    var flute_direction = this.state.flute_direction;

    switch(flute_direction) {
      case 'Not Important':
        if(width && height > 0) {
          var width_rotate = height;
          var height_rotate = width;
          var height_yield_swap = Math.floor(sheet_size_height/height_rotate);
          var width_yield_swap = Math.floor(sheet_size_width/width_rotate);
          var total_yield_rotate = height_yield_swap * width_yield_swap;

          var height_yield = Math.floor(sheet_size_height/height);
          var width_yield = Math.floor(sheet_size_width/width);
          var total_yield = height_yield * width_yield;

          if (total_yield_rotate > total_yield) {
            return total_yield_rotate;
          } else {
            return total_yield;
          }

        }
      case 'Horizontal':
        if(width && height > 0) {
          var width_rotate = height;
          var height_rotate = width;
          var height_yield = Math.floor(sheet_size_height/height_rotate);
          var width_yield = Math.floor(sheet_size_width/width_rotate);
          return height_yield * width_yield;
        }
        break;
      case 'Vertical':
        if(width && height > 0) {
          var height_yield = Math.floor(sheet_size_height/height);
          var width_yield = Math.floor(sheet_size_width/width);
          return height_yield * width_yield;
        }
        break;
      default:
        break;
    }
    return 0;
  }

  // isLandscape() {
  //   var width = this.state.width;
  //   var height = this.state.height;
  //   if (width > height) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }




  render() {
    var width = this.state.width;
    var height = this.state.height;
    var flute_direction = this.state.flute_direction;
    var eighteen_hundred_yield = this.calculateYield(1200, 1800);
    var nine_hundred_yield = this.calculateYield(900, 2400);
    var twentyfour_hundred_yield = this.calculateYield(1200, 2400);
    return (
      <div class="container">
        <form onSubmit={this.handleSubmit}>
          <label>
            Width
            <input type="number" name="width" value={this.state.width} onChange={e => this.handleChange(e.target.name, e.target.value)}/>
          </label>
          <label>
            Height
            <input type="number" name="height" value={this.state.height} onChange={e => this.handleChange(e.target.name, e.target.value)}/>
          </label>
          <label>
            Flute Direction
            <select value={this.state.flute_direction} name="flute_direction" onChange={e => this.handleChange(e.target.name, e.target.value)}>
              <option value="Not Important">Not Important</option>
              <option value="Horizontal">Horizontal</option>
              <option value="Vertical">Vertical</option>
            </select>
          </label>
        </form>
        <div class="artwork-info">
          Width: {width}
          <br/>
          Height: {height}
          <br/>
          Flute Direction: {flute_direction}
        </div>
        <div class="sheet-info">
          Sheet Size: 1830x1220
          <br/>
          Greatest Yield: {eighteen_hundred_yield}
          <br/>
        </div>
        <div class="sheet-info">
          Sheet Size: 920x2420
          <br/>
          Greatest Yield: {nine_hundred_yield}
          <br/>
        </div>
        <div class="sheet-info">
          Sheet Size: 1220x2420
          <br/>
          Greatest Yield: {twentyfour_hundred_yield}
          <br/>
        </div>
      </div>

      )
  }
}

function App() {
  return (
    <div className="container">
      <Calculator />
    </div>
  );
}

export default App;
