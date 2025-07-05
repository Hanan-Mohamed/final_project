import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image,
  BackHandler,
} from 'react-native';
import validator from 'validator';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import * as Constants from '../constants/Constants';

const color = '#7eab9b';
export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 11,
      secure: true,
      CheckBox: false,
      user_name: '',
      error_name: ' ',
      user_phone: '',
      error_phone: ' ',
      user_password: '',
      error_password: ' ',
      enterCode: false,
      formattedValue: '',
      phoneInput: null,
      back_done: false,

      //new
      isFocused: false,
      isFocused2: true,
      isFocused3: false,

      checkName: 0,
      checkphone: 0,
      checkPass: 0,
      message_back: '',
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

  async SIGN_UP() {
    let name = this.state.user_name.trim();
    let phone = this.state.user_phone;
    let Password = this.state.user_password;
    let name_error = '';
    let phone_error = '';
    let password_error = '';
    let numOfErrors = 0;

    if (name == '') {
      name_error = 'من فضلك ادخل الاسم !';
      numOfErrors++;
    } else if (name.trim().length < 3) {
      name_error = 'الاسم غير صحيح !';
      numOfErrors++;
    } else {
      name_error = ' ';
    }

    if (phone == '') {
      phone_error = 'من فضلك ادخل رقم الهاتف !';
      numOfErrors++;
    } else if (!this.validatePhoneNumber(phone) || phone.length < 10) {
      console.log(this.validatePhoneNumber(phone));
      phone_error = 'رقم الهاتف غير صحيح !';
      numOfErrors++;
    } else {
      phone_error = ' ';
    }

    if (Password == '') {
      password_error = 'من فضلك ادخل كلمه المرور !';
      numOfErrors++;
    } else if (Password.length < 6) {
      password_error = 'كلمة المرور غير صحيحه !';
      numOfErrors++;
    } else {
      password_error = ' ';
    }
    this.post_data();
    if (numOfErrors == 0 && this.state.back_done == true) {
      this.notifyMessage('تم إنشاء حساب بنجاح !');
      await AsyncStorage.setItem('Switch', 'Tabs');
      this.props.navigation.navigate('Tabs');
    } else {
      if (this.state.message_back == '') {
        this.notifyMessage('يوجد خطأ في الانترنت..حاول مره أخرى.');
      } else {
        console.log(this.state.message_back+1)
        this.notifyMessage('هذا الحساب موجود بالفعل..قم بتسجيل الدخول.');
      }
    }

    this.setState({
      error_name: name_error,
      error_phone: phone_error,
      error_password: password_error,
    });
  }

  change_secure() {
    let securety = this.state.secure;
    this.setState({secure: !securety});
  }

  change_checkbox() {
    let CheckBox = this.state.CheckBox;
    this.setState({CheckBox: !CheckBox});
  }

  // new
  handleFocus = () => this.setState({isFocused: true, isFocused2: false});

  handleBlur = () => this.setState({isFocused: false, isFocused2: false});

  handleFocus2 = () => this.setState({isFocused2: true});

  handleBlur2 = () => this.setState({isFocused2: false});

  handleFocus3 = () => this.setState({isFocused3: true, isFocused2: false});

  handleBlur3 = () => this.setState({isFocused3: false, isFocused2: false});

  post_data() {
    data_to_sent = {
      user_name: this.state.user_name,
      user_password: this.state.user_password,
      user_phone: this.state.user_phone,
    };

    axios
      .post(
        'https://esraatarek.000webhostapp.com/Services/Signup.php',
        data_to_sent,
      )
      .then(res => {
        if (res.status == 200) {
          console.log(res.data);
          if (res.data * 0 == 0) {
            this.setState({id: res.data});
            this.setState({back_done: true});
            console.log(res.data);
          }

          if (res.data == 'user inserted before') {
            this.setState({back_done: false, message_back: 'هذا الحساب موجود بالفعل..قم بتسجيل الدخول.'});
          }
        }
      });
  }

  FdisableBackButton = () => {
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
              backgroundColor: '#fff',
              height: '40%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/Image/l3.png')}
              style={{width: '100%', height: '110%'}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
              <View style={{flex: 1, alignItems: 'center', paddingBottom: 20}}>
                <View
                  style={{
                    width: '100%',
                    height: 100,
                    padding: 10,
                    justifyContent: 'center',
                    marginTop: -30,
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: Constants.fonts.fontSize_30,
                        fontFamily: Constants.fonts.fontFamily,
                        color: Constants.fonts.mainColor,
                        marginLeft: 25,
                        textAlign: 'left',
                      }}>
                      إنشاء حساب
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
                        this.state.isFocused && this.state.user_name !== ''
                          ? color
                          : '#eee',
                    }}>
                    <View
                      style={{
                        width: '15%',
                        height: 40,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon name="user-alt" size={20} color={color} />
                    </View>

                    <TextInput
                      placeholder="اسم المستخدم"
                      color={Constants.fonts.mainColor}
                      placeholderTextColor="#756e6e"
                      value={this.state.user_name}
                      onChangeText={value => {
                        this.setState({user_name: value});
                        setTimeout(() => {
                          if (value == '') {
                            this.setState({checkName: 0});
                          } else if (value.length >= 3) {
                            this.setState({checkName: 1});
                          }
                        }, 100);
                        if (value.length >= 3) {
                          this.setState({error_name: ' '});
                        } else {
                          this.setState({error_name: 'الاسم غير صحيح !'});
                        }
                      }}
                      // new
                      onFocus={this.handleFocus}
                      onBlur={this.handleBlur}
                      style={{
                        width: '85%',
                        height: 40,
                        color: Constants.fonts.mainColor,
                        fontFamily: this.state.user_name ? Constants.fonts.fontFamily: Constants.fonts.fontFamily3,
                      }}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: Constants.fonts.fontSize_14,
                      color: '#f00',
                      fontFamily: Constants.fonts.fontFamily3,
                      marginTop: 4,
                      textAlign: 'center',
                    }}>
                    {this.state.error_name}
                  </Text>

                  <View
                    style={{
                      width: '85%',
                      height: 40,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: 1.5,
                      borderBottomColor:
                        this.state.isFocused2 == true &&
                        this.state.user_phone != ''
                          ? color
                          : '#eee',
                    }}>
                    <PhoneInput
                      ref={this.state.phoneInput}
                      placeholder="Phone number"
                      defaultValue={this.state.user_phone}
                      defaultCode="EG"
                      onChangeText={phone => {
                        this.setState({user_phone: phone, isFocused: true});
                        setTimeout(() => {
                          if (this.state.user_phone == '') {
                            this.setState({checkphone: 0})
                          } else {
                            this.setState({checkphone: 1}) }
                        }, 100);
                        if (this.validatePhoneNumber(this.state.user_phone) && this.state.user_phone.length == 10) {
                          this.setState({error_phone: ' '})
                        }else if (this.state.user_phone.length<10){
                          this.setState({ error_phone: 'رقم الهاتف غير صحيح !' });
                        }}}
                      onChangeFormattedText={text => {
                        this.setState({formattedValue: text})}}
                      containerStyle={{width: '100%',height: 40,marginBottom: 2}}
                      codeTextStyle={{height: 20}}
                      flagButtonStyle={{width: 55}}
                      textInputStyle={{width: '100%',height: 40}}
                      withDarkTheme
                      withShadow
                      autoFocus
                      onFocus={this.handleFocus2}
                      onBlur={this.handleBlur2}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: Constants.fonts.fontSize_14,
                      color: '#f00',
                      fontFamily: Constants.fonts.fontFamily3,
                      marginTop: 4,
                      textAlign: 'center',
                    }}>
                    {this.state.error_phone}
                  </Text>

                  <View
                    style={{
                      width: '85%',
                      height: 40,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 3,
                      borderBottomWidth: 1.5,
                      borderBottomColor:
                        this.state.isFocused3 && this.state.user_password !== ''
                          ? color
                          : '#eee',
                    }}>
                    <View
                      style={{
                        width: '15%',
                        height: 40,
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
                        this.setState({user_password: value});
                        setTimeout(() => {
                          if (value == '') {
                            this.setState({checkPass: 0});
                          } else if (value.length >= 6) {
                            this.setState({checkPass: 1});
                          }
                        }, 100);
                        if (value.length >= 6) {
                          this.setState({error_password: ' '});
                        } else {
                          this.setState({
                            error_password: 'كلمه المرور غير صحيحة !',
                          });
                        }
                      }}
                      // new
                      onFocus={this.handleFocus3}
                      onBlur={this.handleBlur3}
                      style={{
                        width: '70%',
                        height: 40,
                        color: Constants.fonts.mainColor,
                        fontFamily:this.state.user_password? Constants.fonts.fontFamily: Constants.fonts.fontFamily3,
                        textAlign: 'right',
                        marginLeft: 0,
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
                        style={{marginLeft: 10}}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      fontSize: Constants.fonts.fontSize_14,
                      color: '#f00',
                      fontFamily: Constants.fonts.fontFamily3,
                      marginTop: 4,
                      textAlign: 'center',
                    }}>
                    {this.state.error_password}
                  </Text>

                  <TouchableOpacity
                    disabled={
                      this.state.checkName == 1 &&
                      this.state.checkphone == 1 &&
                      this.state.checkPass == 1 &&
                        this.state.CheckBox == true
                        ? false
                        : true
                    }
                    onPress={() => {
                      this.SIGN_UP();
                    }}
                    style={{
                      width: Constants.touchableOpacityStyle.width,
                      height: 40,
                      marginTop: 20,
                      backgroundColor:
                        this.state.checkName == 1 &&
                        this.state.checkphone == 1 &&
                        this.state.checkPass == 1  &&
                        this.state.CheckBox == true
                          ? color
                          : '#888',
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: Constants.fonts.fontSize_20,
                        fontFamily: Constants.fonts.fontFamily,
                        color: '#fff',
                      }}>
                      إنشاء حساب
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: '95%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '90%',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        width: '90%',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.change_checkbox();
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
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
                      <View style={{paddingVertical: 10}}>
                        <Text
                          style={{
                            fontFamily: Constants.fonts.fontFamily3,
                            color: '#bab8b8',
                          }}>
                          أوافق على جميع{' '}
                          <Text
                            style={{
                              fontFamily: Constants.fonts.fontFamily2,
                              color: color,
                            }}>
                            الشروط{' '}
                          </Text>
                          و{' '}
                          <Text
                            style={{
                              fontFamily: Constants.fonts.fontFamily2,
                              color: color,
                            }}>
                            الاحكام
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#bab8b8',
                        fontFamily: Constants.fonts.fontFamily3,
                      }}>
                      هل لديك حساب؟
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Login');
                      }}
                      style={{
                        width: Constants.touchableOpacityStyle.width,
                        height: 40,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                        marginTop: 10,
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
                        تسجيل الدخول{''}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  phoneInput: {
    borderWidth: 1,
    borderRadius: 25,
    width: 250,
    height: 50,
    padding: 5,
  },
  top: {
    width: '100%',
    backgroundColor: '#fff',
    height: 160,
  },
});
