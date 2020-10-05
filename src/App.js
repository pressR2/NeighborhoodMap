import React, { Component } from "react";
import "./App.css";
import Hamburger from "./Hamburger";
import GoogleMaps from "./GoogleMaps";
import Menu from "./Menu";
import * as data from "./locations.json";
import InfoWindow from "./InfoWindow";
import { Route, BrowserRouter } from "react-router-dom";
import MediaQuery from "react-responsive";

class App extends Component {
    constructor(props) {
        super(props);    
        this.filterSearch = this.filterSearch.bind(this);
        this.setInfoWindowWikiTitle = this.setInfoWindowWikiTitle.bind(this);
    }
    state = {
        locations: data,
        infoWindowQuery: "",
        filteredLocations: data
    };

    /* Set the locations to display in menu */

    filterSearch(filterQuery) {
        let searchLocation = this.state.locations.filter(location => location.name.toUpperCase().includes(filterQuery.toUpperCase()) || filterQuery === "");
        this.setState({ filteredLocations: searchLocation });
    }

    /* Is used as a callback in children components */

    setInfoWindowWikiTitle(title) {
        this.setState({
            infoWindowQuery: title
        });
    }

    render() {

        /* Will be set inside MainView or as separate page depending on viewport size */

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
                                handleClick={this.setInfoWindowWikiTitle}
                            />
                            {infoWindow}
                            <div className="map-container">
                                <GoogleMaps
                                    places={this.state.filteredLocations}
                                    handleClick={this.setInfoWindowWikiTitle}
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
                                handleClick={this.setInfoWindowWikiTitle}
                            />
                            <div className="map-container">
                                <GoogleMaps
                                    places={this.state.filteredLocations}
                                    handleClick={this.setInfoWindowWikiTitle}
                                    animateMarker={this.state.infoWindowQuery}
                                />
                            </div>
                        </main>
                    );
                }}
            />
        );


        /* Media Query from react-responsive */

        return (
            <BrowserRouter basename="/NeighborhoodMap">
                <div className="App">
                    <MediaQuery query="(min-device-width: 585px)">{mainViewWithInfo}</MediaQuery>

                    <MediaQuery query="(max-device-width: 584px)">
                        {mainView}
                        {infoWindow}
                    </MediaQuery>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
