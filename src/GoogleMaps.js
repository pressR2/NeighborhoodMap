import React  from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

export class GoogleMaps extends React.Component {

render() {
    const styles = {
        width: '100%',
        height: '100%'
    };
    return (
           <Map
         
                google={this.props.google}
                zoom={15}
                style={styles}
                initialCenter={{
                    lat: 51.126858,
                    lng: 16.986331
                }}
          />
    
    )
}
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyADMO5nZRIo1qyxLxlV1UAeTtEtr6osOuw')
})(GoogleMaps)