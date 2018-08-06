import React, { Component } from "react";
import "./App.css";
import Hamburger from "./Hamburger";
import GoogleMaps from "./GoogleMaps";
import Menu from "./Menu";
import * as data from "./locations.json";
import InfoWindow from "./InfoWindow";

class App extends Component {
    constructor(props) {
        super(props);
        this.filterLocations = this.filterLocations.bind(this);
        this.filterSearch = this.filterSearch.bind(this);
        this.handleShowInfoWindow = this.handleShowInfoWindow.bind(this);

    }
    state = {
        locations: data,
        filterBy: "",
        infoWindowQuery: ""
    };

    filterLocations(locationName) {
        return this.state.locations.filter(location => location.name === locationName || locationName === "");
    }

    filterSearch(param) {
        this.setState({ filterBy: param });
        // list = "";
    }

    handleShowInfoWindow(title) {
        this.setState({
            infoWindowQuery: title
        })
    }

    render() {
        let searchLocation = this.filterLocations(this.state.filterBy);
        console.log(this.state.infoWindowQuery)
        console.log(searchLocation);
        return (
            <div className="App">
                <div className="App-header">
                    <Hamburger />
                </div>

                <div className="wrapper">
                    <Menu places={searchLocation} search={this.filterSearch}  />
                    <div className="map-container">
                        <GoogleMaps places={searchLocation} handleClick={this.handleShowInfoWindow}/>
                        <InfoWindow filterQuery = {this.state.infoWindowQuery}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
