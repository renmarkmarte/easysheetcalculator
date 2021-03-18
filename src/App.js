import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Calculator.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      quantity: 0,
      flute_direction: 'Not Important',
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculateNumofSheets = this.calculateNumofSheets.bind(this);
    this.calculateYield = this.calculateYield.bind(this);
    this.calculateWaste = this.calculateWaste.bind(this);
    this.getSheetClass = this.getSheetClass.bind(this);
    this.getGOTTEM = this.getGOTTEM.bind(this);
  }

  handleChange(name, value) {
    switch (name) {
      case 'width':
        this.setState({width: value});
        break;
      case 'height':
        this.setState({height: value});
        break;
      case 'quantity':
        this.setState({quantity: value});
        break;
      case 'flute_direction':
        this.setState({flute_direction: value});
        break;
      default:
        break;
    }
  }

  calculateNumofSheets(sheet_size_width, sheet_size_height) {
    var quantity = this.state.quantity;
    var total_yield = this.calculateYield(sheet_size_width, sheet_size_height);
    
    var num_of_sheets = 0;

    if(quantity > 0 && total_yield != 0) {
      num_of_sheets = Math.ceil(quantity/total_yield);
    }

    return num_of_sheets;

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

  calculateWaste(sheet_size_width, sheet_size_height) {
    var artwork_area = this.state.width * this.state.height;
    var quantity = this.state.quantity;

    var sheet_area = sheet_size_width*sheet_size_height;

    var greatest_yield = this.calculateYield(sheet_size_width, sheet_size_height);
    var num_of_sheets = this.calculateNumofSheets(sheet_size_height, sheet_size_width);
    
    if(quantity > 0 && greatest_yield > 0) {
      var area_used = Math.round((artwork_area*greatest_yield/sheet_area)*100);
      var total_waste = 100-area_used;
      
      return total_waste + "%";
    } else {
      return "N/A";
    }
  }
  
  getSheetClass(waste) {
    var result = "sheet-info-container";
    if(waste === "N/A") {
      result = "sheet-info-error";
    }
    return result;
  }
  
  getGOTTEM(waste) {
    var result = "gottem-show";
    if(waste === "N/A") {
      result = "gottem-hide";
    }
    return result;
  }




  render() {
    var width = this.state.width;
    var height = this.state.height;
    var flute_direction = this.state.flute_direction;
    
    //Total Yield
    var eighteen_hundred_yield = this.calculateYield(1200, 1800);
    var nine_hundred_yield = this.calculateYield(900, 2400);
    var twentyfour_hundred_yield = this.calculateYield(1200, 2400);

    //Total Waste
    var eighteen_hundred_waste = this.calculateWaste(1200, 1800);
    var nine_hundred_waste = this.calculateWaste(900, 2400);
    var twentyfour_hundred_waste = this.calculateWaste(1200, 2400);

    //Number of Sheets Used
    var eighteen_hundred_sheets = this.calculateNumofSheets(1200, 1800) + " sheet(s)";
    var nine_hundred_sheets = this.calculateNumofSheets(900, 2400) + " sheet(s)";
    var twentyfour_hundred_sheets = this.calculateNumofSheets(1200, 2400) + " sheet(s)";

    var eighteen_sheet_info_class = this.getSheetClass(eighteen_hundred_waste);
    var nine_sheet_info_class = this.getSheetClass(nine_hundred_waste);
    var twentyfour_sheet_info_class = this.getSheetClass(twentyfour_hundred_waste);
    
    var GOTTEM = this.getGOTTEM(eighteen_hundred_waste);


    return (
      <div class="container-calculator">
        <div class="header-container">
          <Row className="header">
            <Col xs={12}>
              <h1>EasySheet Calculator</h1>
            </Col>
          </Row>
          <Row className="artwork-form-row text-center">
            <Col xs={12} className="artwork-form-col">
              <form class="form-inline justify-content-center align-items-center" onSubmit={this.handleSubmit}> 
                <div class="form-group">
                  <label>Width: </label> 
                  <input type="number" name="width" value={this.state.width} onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                </div>
                <div class="form-group">
                  <label>Height: </label>
                  <input type="number" name="height" value={this.state.height} onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                </div>
                <div class="form-group">
                  <label>Quantity: </label>
                  <input type="number" name="quantity" value={this.state.quantity} onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                </div>
                <div class="form-group">
                  <label>Flute Direction: </label>
                  <select value={this.state.flute_direction} name="flute_direction" onChange={e => this.handleChange(e.target.name, e.target.value)}>
                    <option value="Not Important">Not Important</option>
                    <option value="Horizontal">Horizontal</option>
                    <option value="Vertical">Vertical</option>
                  </select>
                </div>
              </form>
            </Col>
          </Row>
        </div>

        <Row className={GOTTEM}>
          <Col className="gottem-img" xs={12} sm={12} md={12} lg={12}>
            <h1>GOT 'EM</h1>
            <img src="https://www.dictionary.com/e/wp-content/uploads/2018/03/circle_game-1-300x300.jpg"/>
          </Col>
        </Row>

        <Row className="sheet-info-row">
          <Col className="sheet-col" xs={12} sm={12} md={4} lg={4}>
            <div class={eighteen_sheet_info_class}>
              <h3>1830x1220</h3>
              <p>Greatest Yield: {eighteen_hundred_yield} per sheet</p>
              <p>Number of Sheets: {eighteen_hundred_sheets}</p>
              <p>Waste: {eighteen_hundred_waste}</p>
              
            </div>
          </Col>
          <Col className="sheet-col" xs={12} sm={12} md={4} lg={4}>
            <div class={nine_sheet_info_class}>
              <h3>920x2420</h3>
              <p>Greatest Yield: {nine_hundred_yield} per sheet</p>
              <p>Number of Sheets: {nine_hundred_sheets}</p>
              <p>Waste: {nine_hundred_waste}</p>
            </div>
          </Col>
          <Col className="sheet-col" xs={12} sm={12} md={4} lg={4}>
            <div class={twentyfour_sheet_info_class}>
              <h3>1220x2420</h3>
              <p>Greatest Yield: {twentyfour_hundred_yield} per sheet</p>
              <p>Number of Sheets: {twentyfour_hundred_sheets}</p>
              <p>Waste: {twentyfour_hundred_waste}</p>
            </div>
          </Col>
        </Row>
      </div>

      )
  }
}

class CalculatorACP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
  }
  
  handleChange(name, value) {
    switch (name) {
      case 'width':
        this.setState({width: value});
        break;
      case 'height':
        this.setState({height: value});
        break;
      default:
        break;
    }
  }
  
  render () {
    var width = this.state.width;
    var height = this.state.height;
    return (
      <div>
      {width}
      {height}
      <Row className="artwork-form-row text-center">
            <Col xs={12} className="artwork-form-col">
              <form class="form-inline justify-content-center align-items-center" onSubmit={this.handleSubmit}> 
                <div class="form-group">
                  <label>Width: </label> 
                  <input type="number" name="width" value={this.state.width} onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                </div>
                <div class="form-group">
                  <label>Height: </label>
                  <input type="number" name="height" value={this.state.height} onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                </div>
              </form>
            </Col>
          </Row>
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
