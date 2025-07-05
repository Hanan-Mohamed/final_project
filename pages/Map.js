import React from 'react';
import { StyleSheet, BackHandler,Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
navigator.geolocation = require('@react-native-community/geolocation');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [
        {
          latitude: 30.033333,
          longitude: 31.233334,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        },
        {
          latitude: 30.033333,
          longitude: 31.233334,
          latitudeDelta: 1.8,
          longitudeDelta: 1.8,
        },
      ]
      , mapSnapshot: {
        uri: ''
      }
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition((pos) => {
      let coordinates = this.state.coordinates
      const crd = pos.coords;
      let position = {
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 1.8,
        longitudeDelta: 1.8,
      }
      coordinates[0] = position
      this.setState({ coordinates: coordinates });
    })
  }

  disableBackButton = () => {
    this.props.navigation.goBack();
    return true;
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.disableBackButton)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton)
  }
  render() {
    const { img } = this.props.route.params;
    console.log(img)
    return (
      <>

        <MapView
          style={styles.map}
          initialRegion={this.state.coordinates[1]}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompasss={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          loadingEnabled={true}
          userInterfaceStyle='light'
          showsTraffic={true}
        >
          <Marker
            title='Your destination here.'
            pinColor='green'
            coordinate={this.state.coordinates[1]} >
            <Image
              source={{uri:img}}
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                resizeMode: 'contain'
              }} />
          </Marker>
          <Marker
            title='You are here.'
            coordinate={this.state.coordinates[0]} />
          <Polyline
            coordinates={this.state.coordinates}
            strokeColor="red"
            strokeWidth={3}
          />
        </MapView>
      </>
    );
  };
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'lightgray'
  },
});
