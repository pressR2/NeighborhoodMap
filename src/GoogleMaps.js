import React from "react";

class GoogleMaps extends React.Component {
    constructor(props) {
        super(props);

        this.initMap = this.initMap.bind(this);

    }

    state = {
        markers: [],
        map: {},
        google: {}
    };

    initMap() {
        this.setState({ google: window.google });
        let newMap = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 51.107885, lng: 17.038538 },
            zoom: 13
        });

        this.setState({
            map: newMap
        })

        let newMarkers = []

        for (var i = 0; i < this.props.places.length; i++) {
            var position = this.props.places[i].location;
            var marker = new window.google.maps.Marker({
                position: position,
                map: newMap,
                title: this.props.places[i].name,
                wikiQueryPart: this.props.places[i].title,
                animation: window.google.maps.Animation.DROP,
                id: i
            });

            newMarkers.push(marker);

            this.setState( {
                markers: newMarkers
            })

            let f = this.props.handleClick

            marker.addListener("click", (function(marker) {
                return function() {
                    f(marker.wikiQueryPart)
                }
            }(marker)));

        }
    }

    componentDidMount() {
        window.initMap = this.initMap;
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDWGkqpNu4mZAh80NZrhQnVsbAHxj-AzCE&callback=initMap");
    }

    componentDidUpdate() {
        this.state.markers.forEach(marker => {
            // console.log(this.props.places) 
        var foundPlaces = this.props.places.filter(place => place.title === marker.wikiQueryPart);
       
        
        if (marker.map !== undefined) {
            // console.log(foundPlaces)
            if (foundPlaces.length === 0 || foundPlaces === undefined) {
                    marker.setMap(null);
                }else {
                    marker.setMap(this.state.map);
                }
        }
         
        }) 
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
