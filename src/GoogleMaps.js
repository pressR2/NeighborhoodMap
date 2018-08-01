import React from "react";
import * as data from "./locations.json";

class GoogleMaps extends React.Component {
    constructor(props) {
        super(props);

        this.initMap = this.initMap.bind(this);
    }

    state = {
        markers: [],
        locations: data,
        map: undefined
    };

    initMap() {
        this.state.map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 51.107885, lng: 17.038538 },
            zoom: 13
        });

        for (var i = 0; i < this.state.locations.length; i++) {
            var position = this.state.locations[i].location;
            var title = this.state.locations[i].name;

            var marker = new window.google.maps.Marker({
                position: position,
                map: this.state.map,
                title: title,
                animation: window.google.maps.Animation.DROP,
                id: i
            });

            this.state.markers.push(marker);
            marker.addListener("click", function() {
                console.log("marker klikniety");
                /*populateInfoWindow(this, largeInfoWindow); nie zdefiniowana jeszcze*/
            });
        }

        let markerInfo = marker => {
            var markerTitle = marker.title;
            var url = "";
        };
    }

    componentDidMount() {
        window.initMap = this.initMap;
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyADMO5nZRIo1qyxLxlV1UAeTtEtr6osOuw&callback=initMap");
    }

    render() {
        return <div id="map" />;
    }
}

const loadScript = function(src) {
    var tag = document.createElement("script");
    tag.async = true;
    tag.src = src;
    document.getElementsByTagName("body")[0].appendChild(tag);
};

export default GoogleMaps;
