import * as React from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');
import * as Constants from '../constants/Constants'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable'
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const size = 24
const color = '#7eab9b';
export default class Myaccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: [
        {
          text: 'الملف الشخصي',
          icon: "user-circle-o"

        },
        {
          text: 'تغيير كلمة المرور',
          icon: 'lock-reset',
        },
        {
          text: 'المساعدة و التعليمات',
          icon: "support-agent",
        },
        {
          text: 'الإقتراحات',
          icon: 'lightbulb-on',
        },
        {
          text: 'الإضافه كمقدم خدمه',
          icon: 'md-person-add-sharp',
        },
      ],
    };
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
        {/* <ScrollView> */}
        <View style={styles.top}>
          <View
            style={{
              width: '100%',
              height: '100%',
              borderBottomLeftRadius: 35,
              backgroundColor: color,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Animatable.Text animation={'zoomIn'}
             delay={100 * 5}
              style={[Constants.fonts,
              {
                color: Constants.fonts.secondaryColor,
                fontSize: Constants.fonts.mainFontSize,
              }]}>حسابي</Animatable.Text>
          </View>
        </View>
        <View style={styles.container}>
          <View
            style={{
              width: '100%',
              height: '100%',
              borderTopRightRadius: 35,
              backgroundColor: 'white',
              paddingTop: 25,
            }}>
            {this.state.item.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  index == 0 ?
                    this.props.navigation.navigate('Profile') :
                    index == 1 ? this.props.navigation.navigate('NewPassword') :
                      index == 2 ? this.props.navigation.navigate('Help') :
                        index == 3 ? this.props.navigation.navigate('Opinion') :
                          index == 4 ? this.props.navigation.navigate('AddUser') :
                            null
                }}>
                <View style={styles.view_item}>
                  <View style={styles.View_text_icon}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {index == 1 || index == 3 ?
                        <MaterialCommunityIcons
                          name={item.icon}
                          size={size}
                          color={color} /> :
                        index == 2 ?
                          <MaterialIcons
                            name={item.icon}
                            size={size}
                            color={color} /> :
                          index == 4 ?
                            <Ionicons
                              name={item.icon}
                              size={size}
                              color={color} /> :
                            <Icon
                              name={item.icon}
                              size={size}
                              color={color} />
                      }
                    </View>
                    <Text style={{
                      marginLeft: 20,
                      fontSize: Constants.fonts.fontSize_18,
                      fontFamily: Constants.fonts.fontFamily3,
                      color: Constants.fonts.mainColor
                    }}>
                      {item.text}
                    </Text>
                  </View>
                  {/* <TouchableOpacity
                    onPress={() => {
                      index == 0 ?
                        this.props.navigation.navigate('Profile') :
                        index == 1 ? this.props.navigation.navigate('NewPassword') :
                          index == 2 ? this.props.navigation.navigate('Help') :
                            index == 3 ? this.props.navigation.navigate('Opinion') :
                              null
                    }}> */}
                    <Icon1 name="chevron-left" color={'#7eab9b'} size={size} />
                  {/* </TouchableOpacity> */}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: '100%',
    backgroundColor: color,
  },
  top: {
    width: '100%',
    height: 115,
    backgroundColor: 'white',
  },
  text_myaccount_style: {
    fontSize: Constants.fonts.mainFontSize,
    fontFamily: Constants.fonts.fontFamily,
    Color: Constants.fonts.mainColor,
  },
  view_item: {
    height: height * 0.09,
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 7,
  },
  icon_: { height: '42%', width: '42%' },
  TouchableOpacity_arrow: {
    width: width * 0.13,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  View_text_icon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: width * 0.7,
    height: 45,
    alignItems: 'center',
  },
});
