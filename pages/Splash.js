import *as React from 'react';
import { StatusBar, View, Image, Text, BackHandler } from "react-native"
import * as Constants from '../constants/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Splash extends React.Component {

  SwitchNavFun = async () => {
    let SwitchNav = await AsyncStorage.getItem('Switch');
    console.log(SwitchNav)
    setTimeout(() => {
      if (SwitchNav == null || SwitchNav == undefined) {
        this.props.navigation.navigate('Intro');
      } else {
        if (SwitchNav == 'Auth') {
          this.props.navigation.navigate('Auth');
        } else if (SwitchNav == 'Tabs') {
          this.props.navigation.navigate('Tabs');
        }
      }
    }, 2000);
  };
  componentDidMount() {
    this.SwitchNavFun();
  }

  disableBackButton = () => {
    BackHandler.exitApp();
    return true;
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.disableBackButton)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton)
  }
  render() {
    return (
      <>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7eab9b' }}>
          <StatusBar backgroundColor='#7eab9b' />
          <Image
            source={require('../assets/Image/sp7.png')}
            style={{ width: '85%', height: '50%' }}
            resizeMode="contain"
          />
          <Text style={{
            fontSize: 34,
            fontFamily: Constants.fonts.fontFamily,
            textAlign: 'center',
            color: 'white',
            marginTop: 15,
          }} >Provide You Best Service</Text>
        </View>
      </>
    )
  }
}