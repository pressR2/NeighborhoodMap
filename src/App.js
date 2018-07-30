import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import GoogleMaps from "./GoogleMaps";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">Neighborhood Map</h1>
        </div>

        
        <div className="map-container">
        <GoogleMaps/>
          
        </div>

        <div className="list-content">
          <div className="list">
            <h3 className="list-title">Burgers bar</h3>
            <input type="text" placeholder="Bar location"/>
            <button className="filter">Filter</button>
            <ol className="burgers-list">
            
              <li className="burger">Eat Me</li>
              <li className="burger">Awasome burger</li>
              <li className="burger">Burger the best</li>
              <li className="burger">Vege burger</li>
              <li className="burger">Muuu</li>
            
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
