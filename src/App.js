import React, { Component } from "react";
import "./App.css";
import Hamburger from "./Hamburger";
import GoogleMaps from "./GoogleMaps";
import Menu from "./Menu";
import * as data from "./locations.json";
import InfoWindow from "./InfoWindow";
import { Route } from "react-router-dom";


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
        infoWindowQuery: "",
        filteredLocations: data
    };

    filterLocations(locationName) {
        return this.state.locations.filter(location => location.name.includes(locationName) || locationName === "");
    }

    filterSearch(filterQuery) {
        let searchLocation = this.filterLocations(filterQuery);
        this.setState({filteredLocations: searchLocation})
        // this.setState({ filterBy: param });
    }

    handleShowInfoWindow(title) {
        this.setState({
            infoWindowQuery: title
        })
    }

    render() {
        console.log("infoWindowQuery:" + this.state.infoWindowQuery)
        return (
            <div className="App">
                <Route 
                    exact 
                    path="/" 
                    render = {() => {
                        return (
                        <div className="Main">
                            <div className="App-header">
                                <Hamburger />
                            </div>
                            <Menu places={this.state.filteredLocations} search={this.filterSearch} handleClick={this.handleShowInfoWindow} /> 
                            <div className="map-container">
                                <GoogleMaps places={this.state.filteredLocations} handleClick={this.handleShowInfoWindow} animateMarker={this.state.infoWindowQuery}/>
                            </div>                    
                        </div>  
                        ) 
                }} />
                <Route 
                    path="/search" 
                    render = {() => {
                        return (
                            <InfoWindow filterQuery = {this.state.infoWindowQuery} />                            
                            )
                    }}

                />
            </div>
        );
    }
}

export default App;
