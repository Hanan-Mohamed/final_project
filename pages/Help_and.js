import * as React from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
  BackHandler
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
const { width, height } = Dimensions.get('screen');
import * as Animatable from 'react-native-animatable'
import * as Constants from '../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import * as Constant from '..constants/Constants';
export default class Help_and extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Image: [
        {
          img: require('../assets/Image/home.png'),
          txt: 'محتوي الصفحة الرئيسية ..',
        },
        {
          img: require('../assets/Image/searchhome.png'),
          txt: 'ابحث عن مقدم الخدمة ..',
        },
        {
          img: require('../assets/Image/morehome.png'),
          txt: 'اضغط هنا ..',
        },
        {
          img: require('../assets/Image/servicehome.png'),
          txt: 'الخدمات المتاحة ..',
        },

        {
          img: require('../assets/Image/category_sevice_home.png'),
          txt: 'الفئات المتاحة ..',
        },

        {
          img: require('../assets/Image/category_name.png'),
          txt: 'اختر مقدم الخدمة المناسب ..',
        },
        {
          img: require('../assets/Image/favorit.png'),
          txt: '  محتوي صفحة المفضلين  ..',
        },

        {
          img: require('../assets/Image/Myaccount.png'),
          txt: 'محتوي حسابك الشخصي ..',
        },

        {
          img: require('../assets/Image/editprofile.png'),
          txt: 'إمكانية التعديل علي بياناتك الشخصيه ..',
        },
        {
          img: require('../assets/Image/Recetpassword.png'),
          txt: 'إمكانية التعديل علي كلمة المرور ..',
        },
        {
          img: require('../assets/Image/opinion.png'),
          txt: 'تواصل معنا...بإضافة إقتراحك.',
        },
        {
          img: require('../assets/Image/add.png'),
          txt: 'إمكانية الإضافه كمقدم خدمه ..',
        },
      ],

      index: 0,
      modeButton: false,
    };
  }
  Button() {
    if (this.state.index == 12) {
      this.setState({ modeButton: true });
    }
  }
  componentDidMount() {
    let index = this.state.index;
    const interval = setInterval(() => {
      if (index == 11) {
        this.setState({ modeButton: true });
        clearInterval(interval);
      }
      this.setState({ index: index++ });
    }, 4000);
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
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            // paddingHorizontal: 5,
            // paddingVertical: 15,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Constants.statusBar.backgroundColor}
          />
          <View>
            <View
              style={[
                Constants.header.headerStyle,
                {
                  marginBottom: 40,
                },
              ]}>
              <View style={{
                width: width * .1,
              }}></View>
              <View style={{ width: width * .7, alignItems: 'center' }}>
                <Animatable.Text animation={'zoomIn'}
                 delay={100 * 5}
                  style={[Constants.fonts,
                  {
                    color: Constants.fonts.mainColor,
                    fontSize: Constants.fonts.mainFontSize,
                  }
                  ]}>
                  المساعدة و التعليمات
                </Animatable.Text>
              </View>
              <View style={{ width: width * .1, alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Ionicons
                    name="arrow-undo"
                    color={'#7eab9b'}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: height * 0.48,
              width: width
            }}>

              <Shadow style={{
                shadowOffset: { width: 50, height: 50 },
                shadowOpacity: 2,
                shadowColor: "#000",
                shadowRadius: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                height: height * 0.6,
                width: width * 0.64,
                alignSelf: 'center'
              }}>
                <Image
                  style={{
                    height: height * 0.54,
                    width: width * 0.8,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                  source={this.state.Image[this.state.index].img}
                />
              </Shadow>

            </View>
          </View>
          <Text
            style={{
              fontSize: Constants.fonts.fontSize_20,
              color: Constants.fonts.mainColor,
              fontFamily: Constants.fonts.fontFamily3,
              alignSelf: 'center',
              textAlign: 'center',
              marginTop: 20
            }}>
            {this.state.Image[this.state.index].txt}
          </Text>
          <View
            style={{
              width: width,
              height: height * 0.1,
            }}>
          </View>
        </View >
      </>
    );
  }
}
