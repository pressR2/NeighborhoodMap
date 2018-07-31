import React  from 'react';

class GoogleMaps extends React.Component {

    componentDidMount() {
        window.initMap = initMap
        loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyADMO5nZRIo1qyxLxlV1UAeTtEtr6osOuw&callback=initMap')
    }

    render() {
      
        return (
            <div id='map'></div>
        )   
    }
}

const loadScript = function(src) {
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = src;
  document.getElementsByTagName('body')[0].appendChild(tag);
}

const initMap = function() {


    let ourMap = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.126858, lng: 16.986331},
        zoom:15
    })
}

export default GoogleMaps

