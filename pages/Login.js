import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import axios from 'axios';
import validator from 'validator';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Fontisto';
import * as Constants from '../constants/Constants';
import { Colors, touchableOpacityStyle, icons, fonts } from './Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const color = '#7eab9b';
export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 11,
      secure: true,
      CheckBox: false,
      user_phone: '',
      error_phone: ' ',
      user_password: '',
      error_password: ' ',
      isFocused: false,
      isFocused2: false,
      back_done: false,
      checkPass: 0,
      checkphone: 0,
      message_back: '',
      backError: false
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
  async login() {
    let phone = this.state.user_phone;
    let Password = this.state.user_password;
    let CheckBox = this.state.CheckBox;
    let phone_error = '';
    let password_error = '';
    let numOfErrors = 0;

    if (phone == '') {
      phone_error = 'من فضلك ادخل رقم الهاتف !';
      numOfErrors++;
    } else if (!this.validatePhoneNumber(phone) || phone.length < 10) {
      phone_error = 'رقم الهاتف غير صحيح !';
      numOfErrors++;
    } else {
      phone_error = ' ';
    }

    if (Password == '') {
      password_error = 'من فضلك ادخل كلمه المرور !';
      numOfErrors++;
    } else if (Password.length < 6) {
      password_error = 'كلمه المرور غير صحيحة !';
      numOfErrors++;
    } else {
      password_error = ' ';
    }
    this.post_data();

    if (numOfErrors == 0 && this.state.back_done == true && this.state.CheckBox==true ) {
      this.notifyMessage('تم تسجيل الدخول بنجاح !');
      await AsyncStorage.setItem('Switch', 'Tabs');
      this.props.navigation.navigate('Tabs');
    } else if (this.state.back_done == false) {
      // this.setState({ checkPass: 0, checkphone: 0 });
      // this.notifyMessage('رقم الهاتف أو كلمة المرور غير صحيحة !');
      if (this.state.message_back == '') {
        this.notifyMessage('يوجد خطأ في الانترنت..حاول مره أخرى.');
      } else {
        this.notifyMessage(this.state.message_back);
      }
    }

    this.setState({
      error_phone: phone_error,
      error_password: password_error,
      // user_phone: '',
      // user_password: '',
    });
  }

  change_secure() {
    let securety = this.state.secure;
    this.setState({ secure: !securety });
  }

  change_checkbox() {
    let CheckBox = this.state.CheckBox;
    this.setState({ CheckBox: !CheckBox });
  }

  // // new
  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });
  handleFocus2 = () => this.setState({ isFocused2: true, isFocused: false });
  handleBlur2 = () => this.setState({ isFocused2: false });

  post_data() {
    let data_to_sent = {
      user_phone: this.state.user_phone,
      user_password: this.state.user_password,
    };
    console.log(1)
    axios
      .post(
        'https://esraatarek.000webhostapp.com/Services/Login.php',
        data_to_sent,
      )
      .then(res => {
        if (res.status == 200) {
          console.log(res.data);
          if (res.data * 0 == 0) {
            this.setState({ id: res.data });
            this.setState({ back_done: true });
            console.log(res.data);
          }
          if (res.data == 'user not found') {
            console.log(1)
            this.setState({ back_done: false, message_back: 'قم بإنشاء حساب .' });
          }
        }
      });
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
        <StatusBar
          barStyle="light-content"
          backgroundColor={Constants.statusBar.backgroundColor}
        />

        <View style={styles.container}>
          <View
            style={{
              height: '40%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/Image/l.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              <View style={{ flex: 1, alignItems: 'center', paddingBottom: 20 }}>
                <View
                  style={{
                    width: '100%',
                    height: 100,
                    padding: 10,
                    justifyContent: 'center',
                  }}>
                  <View>
                    <Text
                      style={[
                        Constants.fonts,
                        {
                          color: Constants.fonts.mainColor,
                          fontSize: Constants.fonts.mainFontSize,
                          marginLeft: 20,
                        },
                      ]}>
                      مرحبا بعودتك
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '95%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '85%',
                      height: 40,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
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
                      onChangeText={phone => {
                        this.setState({ user_phone: phone, isFocused: true });
                        setTimeout(() => {
                          if (this.state.user_phone == '') {
                            this.setState({ checkphone: 0 });
                          } else {
                            this.setState({ checkphone: 1 });
                          }
                        }, 100);
                        if (this.validatePhoneNumber(this.state.user_phone) && this.state.user_phone.length == 10) {
                          this.setState({ error_phone: ' ' });
                        } else if (this.state.user_phone.length<10){
                          this.setState({ error_phone: 'رقم الهاتف غير صحيح !' });
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
                  <View
                    style={{
                      width: '85%',
                      height: 40,
                      flexDirection: 'row',
                      marginTop: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: 1.5,
                      borderBottomColor:
                        this.state.isFocused2 && this.state.user_password !== ''
                          ? color
                          : '#eee',
                    }}>
                    <View
                      style={{
                        width: '15%',
                        height: 40,
                        // backgroundColor:"#f00",
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon3 name="locked" size={20} color={color} />
                    </View>

                    <TextInput
                      placeholder="كلمه المرور"
                      secureTextEntry={this.state.secure}
                      keyboardType="name-phone-pad"
                      placeholderTextColor="#756e6e"
                      value={this.state.user_password}
                      onChangeText={value => {
                        this.setState({ user_password: value });
                        setTimeout(() => {
                          if (value == '') {
                            this.setState({ checkPass: 0 });
                          } else if (value.length >= 6) {
                            this.setState({ checkPass: 1 });
                          }
                        }, 100);
                        if (value.length >= 6) {
                          this.setState({ error_password: ' ' });
                        } else {
                          this.setState({
                            error_password: 'كلمه المرور غير صحيحة !',
                          });
                        }
                      }}
                      //new
                      onFocus={this.handleFocus2}
                      onBlur={this.handleBlur2}
                      style={{
                        width: '70%',
                        height: 40,
                        color: fonts.mainColor,
                        fontFamily: this.state.user_password ? Constants.fonts.fontFamily : Constants.fonts.fontFamily3,
                        textAlign: 'right',
                      }}
                    />

                    <TouchableOpacity
                      onPress={() => {
                        this.change_secure();
                      }}
                      style={{
                        width: '15%',
                        height: 40,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name={this.state.secure ? 'eye-slash' : 'eye'}
                        size={20}
                        color={this.state.secure ? '#888' : color}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      fontSize: fonts.fontSize_14,
                      color: '#f00',
                      fontFamily: fonts.fontFamily3,
                      marginTop: 4,
                      textAlign: 'center',
                    }}>
                    {this.state.error_password}
                  </Text>

                  <TouchableOpacity
                    disabled={
                      this.state.checkphone == 1 && this.state.checkPass == 1 && this.state.CheckBox == true
                        ? false
                        : true
                    }
                    onPress={() => {
                      this.login();
                    }}
                    style={{
                      width: touchableOpacityStyle.width,
                      height: 40,
                      backgroundColor:
                        this.state.checkPass == 0 || this.state.checkphone == 0 || this.state.CheckBox == false
                          ? '#888'
                          : color,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 14,
                    }}>
                    <Text
                      style={{
                        fontSize: Constants.fonts.fontSize_20,
                        fontFamily: Constants.fonts.fontFamily,
                        color: Constants.fonts.secondaryColor,
                      }}>
                      تسجيل الدخول
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '85%',
                      justifyContent: 'space-between',
                      padding: 2,
                      marginTop: 10,
                      paddingRight: 6,
                    }}>
                    <View
                      style={{
                        width: '45%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.change_checkbox();
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}>
                        <Icon2
                          name={
                            this.state.CheckBox
                              ? 'checkbox-marked'
                              : 'checkbox-blank-outline'
                          }
                          size={20}
                          color={color}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontFamily: Constants.fonts.fontFamily3,
                          alignSelf: 'center',
                          color: 'gray',
                        }}>
                        تذكرنى
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: '40%',
                        alignItems: 'flex-end',
                      }}
                      onPress={() => {
                        this.props.navigation.navigate('Forget');
                      }}>
                      <Text
                        style={{
                          fontFamily: Constants.fonts.fontFamily2,
                          color: color,
                          textDecorationLine: 'underline',
                        }}>
                        نسيت كلمة المرور؟
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      width: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View />
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('SignUp');
                      }}
                      style={{
                        width: touchableOpacityStyle.width,
                        height: 40,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: color,
                        borderWidth: 2,
                      }}>
                      <Text
                        style={{
                          fontSize: Constants.fonts.fontSize_20,
                          fontFamily: Constants.fonts.fontFamily,
                          color: color,
                        }}>
                        انشاء حساب
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          {/* </View> */}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
});
