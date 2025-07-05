import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  BackHandler
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  fonts,
  images,
  touchableOpacityStyle,
  Colors,
  item,
  icons,
} from './Constants';
import {Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
const {width, height} = Dimensions.get('screen');
import * as Constants from '../constants/Constants';
const color = '#7eab9b';
export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '555555',
      OldPassword: '',
      UpdatePassword: '',
      ConfirmPassword: '',
      pass_old_error: '',
      pass_UPdate_error: '',
      pass_confirm_error: '',
      hide_oldPassword: true,
      hide_updatePassword: true,
      hide_confirmPassword: true,
      error_count: 0,
      id: 20,
      back_done: true,
    };
  }

  post_data() {
    let data_to_sent = {
      user_oldpass: this.state.OldPassword,
      user_pass: this.state.ConfirmPassword,
      user_id: this.state.id,
    };
    axios
      .post(
        'https://esraatarek.000webhostapp.com/Services/UpdateUser_pass.php',
        data_to_sent,
      )
      .then(res => {
        if (res.status == 200) {
          console.log(res.data);

          if (res.data == 'not updated' || res.data == 'user not found') {
            this.setState({back_done: false});
          }
        }
      });
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
  save() {
    let u_password = this.state.UpdatePassword;
    let c_password = this.state.ConfirmPassword;
    let o_password = this.state.OldPassword;
    var error_count = this.state.error_count;

    if (o_password.length == 0) {
      error_count++;
      this.setState({pass_old_error: 'لا يجب ان تكون كلمة المرور فارغه !'});
    } else if (o_password != this.state.oldPassword) {
      error_count++;
      this.setState({pass_old_error: 'كلمة المرور القديمه غير صحيحه !'});
    } else {
      this.setState({pass_old_error: '', OldPassword: o_password});
    }
    if (u_password.length == 0) {
      error_count++;
      this.setState({pass_UPdate_error: 'لا يجب ان تكون كلمة المرور فارغه !'});
    } else if (u_password.length < 6) {
      error_count++;
      this.setState({
        pass_UPdate_error: 'يجب أن تكون كلمة المرور أكبر من أو تساوي 6 أحرف !',
      });
    } else {
      this.setState({pass_UPdate_error: '', UpdatePassword: u_password});
    }
    if (c_password.length == 0) {
      error_count++;
      this.setState({pass_confirm_error: 'لا يجب ان تكون كلمة المرور فارغه !'});
    } else if (c_password.length < 6) {
      error_count++;
      this.setState({
        pass_confirm_error: 'يجب أن تكون كلمة المرور أكبر من أو تساوى 6 أحرف !',
      });
    } else {
      this.setState({pass_confirm_error: '', ConfirmPassword: c_password});
    }
    if (c_password != u_password) {
      error_count++;
    }
    if (error_count == 0) {
      this.notifyMessage('تم تغير كلمة المرور بنجاح !');
    } else {
      this.setState({error_count: error_count});
      this.notifyMessage('لم يتم تغيير كلمة المرور حدث خطأ ما !');
    }
  }
  setOld_PasswordVisibility() {
    this.setState({hide_oldPassword: !this.state.hide_oldPassword});
  }
  setUpdate_PasswordVisibility() {
    this.setState({hide_updatePassword: !this.state.hide_updatePassword});
  }
  setConfirm_PasswordVisibility() {
    this.setState({hide_confirmPassword: !this.state.hide_confirmPassword});
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
          backgroundColor={Constants.statusBar.backgroundColor}
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
          <View style={{width: width * 0.73}} />
          <View style={{width: width * 0.1, alignItems: 'center'}}>
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
            height: height * 0.31,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -width * 0.1,
          }}>
          <Image
            source={require('../assets/Image/r.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            <Text
              style={[
                Constants.fonts,
                {
                  color: Constants.fonts.mainColor,
                  fontSize: Constants.fonts.mainFontSize,
                  textAlign: 'center',
                },
              ]}>
              تغيير كلمة المرور
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: height * 0.32,
              }}>
              <View style={styles.textinputBox}>
                <TextInput
                  style={styles.textinput}
                  label={'كلمة المرور القديمه'}
                  maxLength={15}
                  underlineColor="#040e46"
                  activeUnderlineColor={color}
                  keyboardType="default"
                  secureTextEntry={this.state.hide_oldPassword}
                  value={this.state.OldPassword}
                  onChangeText={value => {
                    this.setState({OldPassword: value});
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.setOld_PasswordVisibility();
                  }}
                  style={{
                    width: '10%',
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <FontAwesome5
                    name={this.state.hide_oldPassword ? 'eye-slash' : 'eye'}
                    size={18}
                    color={this.state.hide_oldPassword ? '#888' : color}
                  />
                </TouchableOpacity>
              </View>
              {this.state.OldPassword.length == 0 ? (
                <Text
                  style={{
                    fontSize: Constants.fonts.fontSize_12,
                    fontFamily: Constants.fonts.fontFamily3,
                    color: this.state.OldPassword.length < 6 ? 'red' : 'green',
                    alignSelf: 'flex-start',
                    marginLeft: 20,
                  }}>
                  {this.state.pass_old_error}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: Constants.fonts.fontSize_12,
                    fontFamily: Constants.fonts.fontFamily3,
                    color: this.state.OldPassword.length < 6 ? 'red' : 'green',
                    alignSelf: 'flex-start',
                    marginLeft: 20,
                  }}>
                  {this.state.OldPassword != this.state.oldPassword ? (
                    <Text>كلمة المرور القديمه غير صحيحه !</Text>
                  ) : (
                    <Text>كلمة المرور القديمه صحيحه !</Text>
                  )}
                </Text>
              )}
              <View style={styles.textinputBox}>
                <TextInput
                  style={styles.textinput}
                  label={'كلمة المرور الجديده'}
                  maxLength={15}
                  underlineColor="#040e46"
                  activeUnderlineColor={color}
                  keyboardType="default"
                  secureTextEntry={this.state.hide_updatePassword}
                  value={this.state.UpdatePassword}
                  onChangeText={value => {
                    this.setState({UpdatePassword: value});
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.setUpdate_PasswordVisibility();
                  }}
                  style={{
                    width: '10%',
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <FontAwesome5
                    name={this.state.hide_updatePassword ? 'eye-slash' : 'eye'}
                    size={18}
                    color={this.state.hide_updatePassword ? '#888' : color}
                  />
                </TouchableOpacity>
              </View>
              {this.state.UpdatePassword.length == 0 ? (
                <Text
                  style={{
                    fontSize: Constants.fonts.fontSize_12,
                    fontFamily: Constants.fonts.fontFamily3,
                    color:
                      this.state.UpdatePassword.length < 6 ? 'red' : 'green',
                    alignSelf: 'flex-start',
                    marginLeft: 20,
                  }}>
                  {this.state.pass_UPdate_error}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: Constants.fonts.fontSize_12,
                    fontFamily: Constants.fonts.fontFamily3,
                    color:
                      this.state.UpdatePassword.length < 6 ? 'red' : 'green',
                    alignSelf: 'flex-start',
                    marginLeft: 20,
                  }}>
                  {this.state.UpdatePassword.length < 6 ? (
                    <Text>لابد ان تحتوي كلمة المرور على الاقل 6 حروف </Text>
                  ) : (
                    <Text>كلمة المرور تطابق الشروط !</Text>
                  )}
                </Text>
              )}

              <View style={styles.textinputBox}>
                <TextInput
                  style={styles.textinput}
                  label={'تأكيد كلمة المرور'}
                  maxLength={15}
                  underlineColor="#040e46"
                  activeUnderlineColor={color}
                  keyboardType="default"
                  secureTextEntry={this.state.hide_confirmPassword}
                  value={this.state.ConfirmPassword}
                  onChangeText={value => {
                    this.setState({ConfirmPassword: value});
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.setConfirm_PasswordVisibility();
                  }}
                  style={{
                    width: '10%',
                    height: 50,
                    marginRight: -10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <FontAwesome5
                    name={this.state.hide_confirmPassword ? 'eye-slash' : 'eye'}
                    size={18}
                    color={this.state.hide_confirmPassword ? '#888' : color}
                  />
                </TouchableOpacity>
              </View>

              {this.state.ConfirmPassword.length == 0 ? (
                <Text
                  style={{
                    fontSize: Constants.fonts.fontSize_12,
                    fontFamily: Constants.fonts.fontFamily3,
                    color:
                      this.state.UpdatePassword.length < 6 ? 'red' : 'green',
                    alignSelf: 'flex-start',
                    marginLeft: 20,
                  }}>
                  {this.state.pass_confirm_error}
                </Text>
              ) : this.state.ConfirmPassword != this.state.UpdatePassword ? (
                <Text
                  style={{
                    fontSize: Constants.fonts.fontSize_12,
                    fontFamily: Constants.fonts.fontFamily3,
                    color: 'red',
                    alignSelf: 'flex-start',
                    marginLeft: 20,
                  }}>
                  كلمة المرور غير متطابقه!
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: Constants.fonts.fontSize_12,
                    fontFamily: Constants.fonts.fontFamily3,
                    color: 'green',
                    alignSelf: 'flex-start',
                    marginLeft: 20,
                  }}>
                  كلمة المرور متطابقه!
                </Text>
              )}
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                disabled={
                  this.state.ConfirmPassword == ''
                    ? true
                    : false || this.state.UpdatePassword == ''
                    ? true
                    : false
                }
                onPress={() => {
                  this.save();
                  this.post_data();
                }}
                style={[styles.touchableopicty2]}>
                <Text
                  style={[
                    styles.text1,
                    {fontFamily: Constants.fonts.fontFamily3},
                  ]}>
                  حفظ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableopicty2}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Text
                  style={[
                    styles.text1,
                    {fontFamily: Constants.fonts.fontFamily3},
                  ]}>
                  إلغاء
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view_continer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 14,
  },
  view1: {
    width: width,
    alignSelf: 'center',
    marginTop: -20,
    borderRadius: 20,
    padding: 14,
  },
  textinput: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    color: fonts.mainColor,
    fontSize: 16,
    fontFamily: Constants.fonts.fontFamily,
    alignSelf: 'center',
  },
  touchableopicty2: {
    width: 120,
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: touchableOpacityStyle.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color,
  },
  text1: {
    fontSize: fonts.mainFontSize,
    fontFamily: 'Tajawal',
    color: '#fff',
    textAlign: 'center',
  },
  text_error: {
    fontSize: Constants.fonts.fontSize_12,
    fontFamily: Constants.fonts.fontFamily3,
    alignSelf: 'flex-start',
    marginLeft: 10,
    color: '#f00',
  },
  textinputBox: {
    width: '95%',
    height: 50,
    borderRadius: 5,
    marginVertical: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: 320,
  },
});
