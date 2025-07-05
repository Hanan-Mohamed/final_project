import * as React from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ToastAndroid,
  BackHandler
} from 'react-native';
const color = '#7eab9b';
import axios from 'axios';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Constants from '../constants/Constants';
export default class Help_and extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opinioon: '',
      id: 11,
      back_done: true,
    };
  }
  notifyMessage(msg) {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }

  post_data() {
    let data_to_sent = {
      suggestion: this.state.opinioon,
      suggestion_user_id: this.state.id,
    };
    axios
      .post(
        'https://esraatarek.000webhostapp.com/Services/suggestion.php',
        data_to_sent,
      )
      .then(res => {
        if (res.status == 200) {
          console.log(res.data);
          if (res.data == 'inserted before' || res.data == 'inserted') {
            this.setState({back_done: false});
          }
        }
      });
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
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Constants.statusBar.backgroundColor}
        />
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={[
              Constants.header.headerStyle,
              {
                marginBottom: 40,
              },
            ]}>
            <View
              style={{
                width: width * 0.1,
              }}
            />
            <View style={{width: width * 0.7, alignItems: 'center'}}>
              <Animatable.Text
                animation={'zoomIn'}
                delay={100 * 5} 
                style={{
                  color: Constants.fonts.mainColor,
                  fontSize: Constants.fonts.mainFontSize,
                  fontFamily: Constants.fonts.fontFamily,
                }}>
                الإقتراحات
              </Animatable.Text>
            </View>
            <View style={{width: width * 0.1, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Ionicons name="arrow-undo" color={'#7eab9b'} size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.TextInput_style}>
            <TextInput
              style={{
                fontSize: Constants.search.textInputStyle.fontSize,
                fontFamily: Constants.search.textInputStyle.fontFamily,
                color: Constants.search.textInputStyle.color,
              }}
              placeholder="  ادخل إقتراحك .."
              placeholderTextColor={'#756e6e'}
              multiline={true}
              value={this.state.opinioon}
              onChangeText={value => {
                this.setState({opinioon: value});
              }}
            />
          </View>
          <TouchableOpacity
            disabled={this.state.opinioon == '' ? true : false}
            onPress={() => {
              this.notifyMessage('تم إرسال إقتراحك بنجاح .');
              this.post_data();
            }}
            style={[
              Constants.touchableOpacityStyle,
              {
                backgroundColor: '#7eab9b',
                marginTop: 45,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              },
            ]}>
            <Text
              style={[
                Constants.fonts,
                {
                  color: Constants.fonts.secondaryColor,
                  fontSize: Constants.fonts.mainFontSize,
                },
              ]}>
              إرسال
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  TextInput_style: {
    padding: 7,
    width: Constants.search.textInputStyle.width,
    backgroundColor: '#dfeeec',
    borderRadius: 15,
    alignSelf: 'center',

    height: height * 0.3,
  },
});
