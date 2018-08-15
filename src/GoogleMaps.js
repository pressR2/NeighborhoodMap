import React from "react";
import { withRouter } from "react-router-dom";

let firstLoad = true

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
        console.log('init')
        this.setState({ google: window.google });
        let newMap = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 51.107885, lng: 17.038538 },
            zoom: 13
        });

        this.setState({
            map: newMap
        })
       
        let newMarkers = []
        let anim = window.google.maps.Animation.DROP
        if (firstLoad === false) {
            anim = null
        }
        for (var i = 0; i < this.props.places.length; i++) {
            var position = this.props.places[i].location;
            var marker = new window.google.maps.Marker({
                position: position,
                map: newMap,
                title: this.props.places[i].name,
                wikiQueryPart: this.props.places[i].title,
                id: i,
                animation: anim
            });

            newMarkers.push(marker);

            this.setState( {
                markers: newMarkers
            })

            let f = this.props.handleClick
            marker.addListener("click", (function(marker, history) {
                return function() {
                    console.log("marker.wikiQueryPart" + marker.wikiQueryPart)
                    f(marker.wikiQueryPart)     
                    if (marker.getAnimation() !== null) {                        
                    } else {                        
                        marker.setAnimation(window.google.maps.Animation.BOUNCE)
                        
                    }
                    setTimeout(function () {
                        marker.setAnimation(null)
                        history.push("/search")
                    }, 1250);
                }
            }(marker, this.props.history)));


// this also works with react-router-native
        }

        firstLoad = false
    }

    componentDidMount() {
        window.initMap = this.initMap;
        if (firstLoad) {
            loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDWGkqpNu4mZAh80NZrhQnVsbAHxj-AzCE&callback=initMap");
        } else {
            this.initMap()
        }
    }

    componentDidUpdate(prevProps) {
        // this.state.markers.forEach(marker => console.log('anim:' + marker.getAnimation()))
        if (this.props.places !== prevProps.places) {

            this.state.markers.forEach(marker => {
                var foundPlaces = this.props.places.filter(place => place.title === marker.wikiQueryPart);           
                
                if (marker.map !== undefined) {
                    if (foundPlaces.length === 0 || foundPlaces === undefined) {
                            marker.setMap(null);
                        }else {
                            marker.setMap(this.state.map);
                        }
                }
         
            })     
        }
        
    }
    render() {
        this.state.markers.filter(marker => marker.wikiQueryPart === this.props.animateMarker).forEach(marker => {
            marker.setAnimation(window.google.maps.Animation.BOUNCE)
            setTimeout(function () {
                marker.setAnimation(null)  
            }, 1250);
        })
        return <div id="map" />;

    }
}

const loadScript = function(src) {
    var tag = document.createElement("script");
    tag.async = true;
    tag.src = src;
    document.getElementsByTagName("body")[0].appendChild(tag);
};

export default withRouter(GoogleMaps);
