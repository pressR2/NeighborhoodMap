import React from "react";

/* Allows to use browser history */

import { withRouter } from "react-router-dom";

/* Don't load google script for the second time */

let firstLoad = true;

class GoogleMaps extends React.Component {
    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this);
    }

    state = {
        markers: [],
        map: {}
    };

    /* Callback for google maps */

    initMap() {

        /* Create a new map passing an element to insert into */

        let newMap = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 51.109990, lng: 17.053},
            zoom: 13
        });

        this.setState({
            map: newMap
        });

        const newMarkers = [];

        let anim = window.google.maps.Animation.DROP;

        if (firstLoad === false) {
            anim = null;
        }

        /* Create markers */

        for (let i = 0; i < this.props.places.length; i++) {

            /* Bind new markers to the map */

            const marker = new window.google.maps.Marker({
                    position: this.props.places[i].location,
                    map: newMap,
                    title: this.props.places[i].name,
                    wikiQueryPart: this.props.places[i].title,
                    id: i,
                    animation: anim
            });

            newMarkers.push(marker);

            this.setState({
                markers: newMarkers
            });

            /* onclick - set the animation to bounce, open infoWindow */

            let openInfoWindowCallback = this.props.handleClick;
            marker.addListener(
                "click",
                (function(marker, history) {
                    return function() {

                        openInfoWindowCallback(marker.wikiQueryPart);

                        if (marker.getAnimation() == null) 
                            marker.setAnimation(window.google.maps.Animation.BOUNCE);

                        setTimeout(function() {
                            marker.setAnimation(null);
                            history.push("/search");
                        }, 1250);
                    };
                })(marker, this.props.history)
            );

        }

        firstLoad = false;
    }

    componentDidMount() {
        window.initMap = this.initMap;
        window.gm_authFailure = handleError;
        if (firstLoad) {
            loadScript('<your GOOGLE MAPS API KEY HERE>');
        } else {
            this.initMap();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.places !== prevProps.places) {
            this.state.markers.forEach(marker => {
                const foundPlaces = this.props.places.filter(place => place.title === marker.wikiQueryPart);

                /* If marker was not found in the places array, don't show it */

                if (marker.map !== undefined) {
                    if (foundPlaces.length === 0 || foundPlaces === undefined) {
                        marker.setMap(null);
                    } else {
                        marker.setMap(this.state.map);
                    }
                }
            });
        }
    }

    render() {

        /* Bounce the currently selected marker */

        this.state.markers.filter(marker => marker.wikiQueryPart === this.props.animateMarker).forEach(marker => {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 1250);
        });

        return <div id="map" role="application" />;
    }
}

/* Insert script into DOM */

const loadScript = function(src) {
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = src;
    tag.onerror = handleError

    document.getElementsByTagName("body")[0].appendChild(tag);
};

const handleError = function() {
        const map = document.getElementById("map");
        if (map != null) {         

            const text = document.createTextNode("Google Maps couldn't load");
            map.innerHTML = '';
            map.appendChild(text);
        }
    }

export default withRouter(GoogleMaps);
