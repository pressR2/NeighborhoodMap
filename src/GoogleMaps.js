import React  from 'react';

class GoogleMaps extends React.Component {

    componentDidMount() {
        window.initMap = initMap
        loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyADMO5nZRIo1qyxLxlV1UAeTtEtr6osOuw&callback=initMap')
    }

    render() {
        const styles = {
            width: '100%',
            height: '400px'
        };
        return (
            <div id='map' style={styles}></div>
        )   
    }
}

// const apiKey = 'AIzaSyADMO5nZRIo1qyxLxlV1UAeTtEtr6osOuw';

const loadScript = function(src) {
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = src;
  document.getElementsByTagName('body')[0].appendChild(tag);
}

const initMap = function() {



    let ourMap = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.126858, lng: 16.986331},
        zoom:13
    })
}

export default GoogleMaps

