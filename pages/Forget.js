import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ToastAndroid,
  BackHandler
} from 'react-native';
const color = '#7eab9b';
import axios from 'axios';
import validator from 'validator';
const { width, height } = Dimensions.get('screen');
import PhoneInput from 'react-native-phone-number-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  fonts,
  touchableOpacityStyle,
  statusBar,
} from '../constants/Constants';
export default class Forget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_phone: '',
      error_phone: ' ',
      disabled:true,
      back_done: false,
      id: 11,
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
  validatePhoneNumber = number => {
    const isValidPhoneNumber = validator.isMobilePhone(number);
    return isValidPhoneNumber;
  };
  handleFocus = () => this.setState({ isFocused: true });

  handleBlur = () => this.setState({ isFocused: false });

  post_data() {
    data_to_sent = {
      user_phone: this.state.user_phone,
    };
    axios
      .post(
        'https://esraatarek.000webhostapp.com/Services/ResetPass_checkUser.php',
        data_to_sent,
      )
      .then(res => {
        if (res.status == 200) {
          if (
            // res.data != 'user not found' ||
            // res.data != 'no data sent' ||
            res.data == 'user found'
          ) {
            console.log(res.data + ' done');

            this.setState({ back_done: true });
          } else {
            console.log('try again  ' + res.data);
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
      <View style={styles.view_continer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={statusBar.backgroundColor}
        />
        <View
          style={{
            height: height * 0.1,
            width: width,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: width * 0.05,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ width: width * 0.73 }} />
          <View style={{ width: width * 0.1, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Ionicons name="arrow-undo" color={'#7eab9b'} size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: '44%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -30,
          }}>
          <Image
            source={require('../assets/Image/forget.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.text1}>هل نسيت كلمة المرور</Text>
            <Text style={styles.text2}>
              الرجاء ادخال رقم الهاتف الخاص بك لارسال كود التاكيد
            </Text>
            <View
              style={{
                width: '90%',
                height: 40,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 30,
                borderBottomWidth: 1.5,
                borderBottomColor:
                  this.state.isFocused && this.state.user_phone != ''
                    ? color
                    : '#eee',
              }}>
              <PhoneInput
                ref={this.state.phoneInput}
                placeholder="Phone number"
                defaultValue={this.state.user_phone}
                defaultCode="EG"
                // layout="first"
                onChangeText={phone => {
                  this.setState({ user_phone: phone, isFocused: true });
                  setTimeout(() => {
                    if (this.state.user_phone == '') {
                      this.setState({ checkphone: 0 });
                    } else {
                      this.setState({ checkphone: 1 });
                    }
                  }, 100);
                  if (this.validatePhoneNumber(this.state.user_phone) && this.state.user_phone.length == 11) {
                    this.setState({ error_phone: ' ',disabled:false });
                  }else if (this.state.user_phone.length<10){
                    this.setState({ error_phone: 'رقم الهاتف غير صحيح !' ,disabled:true})
                }
                }}
                onChangeFormattedText={text => {
                  this.setState({ formattedValue: text });
                }}
                containerStyle={{
                  width: '100%',
                  height: 40,
                  marginBottom: 2,
                }}
                codeTextStyle={{
                  height: 20,
                }}
                flagButtonStyle={{
                  width: 55,
                }}
                textInputStyle={{
                  width: '80%',
                  height: 40,
                }}
                withDarkTheme
                withShadow
                autoFocus
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />
            </View>
            {/* {this.state.error_phone.length > 0 && ( */}
              <Text
                style={{
                  fontSize: fonts.fontSize_14,
                  color: '#f00',
                  fontFamily: fonts.fontFamily3,
                  marginTop: 4,
                  textAlign: 'center',
                }}>
                {this.state.error_phone}
              </Text>
            {/* )} */}
            <TouchableOpacity
              style={[
                styles.touchableopicty2,
                { backgroundColor: this.state.disabled ? '#888' : color },
              ]}
              disabled={this.state.disabled}
              onPress={() => {
                let phoneError = this.state.error_phone;
                let phone = this.state.user_phone;
                
                if (phone.length == 11){
                  this.props.navigation.navigate('Verify');
                  this.notifyMessage(' تم إرسال كود التاكيد'), this.post_data();
                }else if (phone.length > 11) {
                   phoneError = 'رقم الهاتف يجب ألا يزيد عن 11 رقم';
                 } else {
                  phoneError =  'رقم الهاتف غير صحيح !'
                }

                this.setState({
                  error_phone: phoneError,
                });
              }}>
              <Text style={[styles.text1, { color: '#fff' }]}>إرسال</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view_continer: {
    flex: height,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
  },
  text1: {
    fontSize: fonts.mainFontSize,
    fontFamily: fonts.fontFamily,
    color: fonts.mainColor,
    textAlign: 'center',
    marginBottom: 5,
  },
  text2: {
    fontSize: fonts.fontSize_18,
    fontFamily: fonts.fontFamily3,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 5,
  },
  touchableopicty2: {
    width: touchableOpacityStyle.width,
    height: 40,
    alignSelf: 'center',
    marginTop: 60,
    borderRadius: touchableOpacityStyle.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
