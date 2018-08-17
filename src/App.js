import React, { Component } from "react";
import "./App.css";
import Hamburger from "./Hamburger";
import GoogleMaps from "./GoogleMaps";
import Menu from "./Menu";
import * as data from "./locations.json";
import InfoWindow from "./InfoWindow";
import { Route } from "react-router-dom";
import MediaQuery from "react-responsive";

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
        this.setState({ filteredLocations: searchLocation });
    }

    handleShowInfoWindow(title) {
        this.setState({
            infoWindowQuery: title
        });
    }

    render() {
        let infoWindow = (
            <Route
                path="/search"
                render={() => {
                    return <InfoWindow filterQuery={this.state.infoWindowQuery} />;
                }}
            />
        );

        let mainViewWithInfo = (
            <Route
                path="/"
                render={() => {
                    return (
                        <main className="Main">
                            <header className="App-header">
                                <Hamburger />
                            </header>
                            <Menu
                                places={this.state.filteredLocations}
                                search={this.filterSearch}
                                handleClick={this.handleShowInfoWindow}
                            />
                            {infoWindow}
                            <div className="map-container">
                                <GoogleMaps
                                    places={this.state.filteredLocations}
                                    handleClick={this.handleShowInfoWindow}
                                    animateMarker={this.state.infoWindowQuery}
                                />
                            </div>
                        </main>
                    );
                }}
            />
        );

        let mainView = (
            <Route
                path="/"
                exact
                render={() => {
                    return (
                        <main className="Main">
                            <header className="App-header">
                                <Hamburger />
                            </header>
                            <Menu
                                places={this.state.filteredLocations}
                                search={this.filterSearch}
                                handleClick={this.handleShowInfoWindow}
                            />
                            <div className="map-container">
                                <GoogleMaps
                                    places={this.state.filteredLocations}
                                    handleClick={this.handleShowInfoWindow}
                                    animateMarker={this.state.infoWindowQuery}
                                />
                            </div>
                        </main>
                    );
                }}
            />
        );

        return (
            <div className="App">
                <MediaQuery query="(min-device-width: 585px)">{mainViewWithInfo}</MediaQuery>

                <MediaQuery query="(max-device-width: 584px)">
                    {mainView}
                    {infoWindow}
                </MediaQuery>
            </div>
        );
    }
}

export default App;
