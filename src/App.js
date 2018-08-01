import React, { Component } from 'react';
import './App.css';
import Hamburger from './Hamburger';
import GoogleMaps from "./GoogleMaps";
import Menu from './Menu'


class App extends Component {
    constructor(props) {
        super(props);
    }

   



  render() {
    return (
      <div className="App">
        <div className="App-header">
        <Hamburger/>      
        </div>

        <div className="wrapper">
        <Menu/>
        <div className="map-container">
        <GoogleMaps/>          
        </div>
        </div>
     
      </div>
    );
  }
}

export default App;
