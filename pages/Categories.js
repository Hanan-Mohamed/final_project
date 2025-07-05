import * as React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions,
  TextInput,
  BackHandler
} from 'react-native';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Constants from './Constants';
import { ActivityIndicator } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');
export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [

      ],
      images: [
        require('../assets/Image/doctor.png'),
        require('../assets/Image/eng.png'),
        require('../assets/Image/hos.png'), 
        require('../assets/Image/plum.png'),
        require('../assets/Image/teach.png'),
        require('../assets/Image/res.png'),

      ],
      enter: 0,
      edit: false,
      louding: true,
    };
  }
  search(value) {
    let list = this.state.items;
    for (let i = 0; i < list.length; i++) {
      if (list[i].Categorie_name.toLowerCase().includes(value.toLowerCase())) {
        list[i].show = true;
      } else {
        list[i].show = false;
      }
    }
    this.setState({ items: list });
  }
  show() {
    let list = this.state.items;
    for (let i = 0; i < list.length; i++) {
      if (list[i].show) {
        return true;
      }
    }
    return false;
  }
  get_data() {
    axios
      .get(
        'https://esraatarek.000webhostapp.com/Services/selectALL_Categories.php',
      )
      .then(res => {
        if (res.status == 200) {
          console.log(res.data);
          if (Array.isArray(res.data)) {
            let arr = res.data;
            for (let i = 0; i < arr.length; i++) {
              arr[i].show = true;
            }
            console.log(arr);
            this.setState({ items: arr });
            this.setState({ louding: false });
          } else {
            console.log('error');
          }
        }
      });
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      () => this.get_data(),
      // alert('jjjjj'),
    );
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
        <View style={Constants.container}>
          <View style={[Constants.header.headerStyle]}>
            <View
              style={{
                width: width * 0.1,
              }}
            />
            <View style={{ width: width * 0.7, alignItems: 'center' }}>
              <Animatable.Text
                animation={'zoomIn'}
                delay={100 * 5}
                style={{
                  fontSize: Constants.fonts.mainFontSize,
                  color: Constants.fonts.mainColor,
                  fontFamily: Constants.fonts.fontFamily,
                }}>
                الخدمات
              </Animatable.Text>
            </View>
            <View style={{ width: width * 0.1, alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                  // this.get_data();
                }}>
                <Ionicons name="arrow-undo" color={'#7eab9b'} size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={Constants.search.searchViewStyle}>
            <Icon
              name="search"
              color={'gray'}
              size={18}
              style={{
                marginRight: 5,
              }}
            />
            <TextInput
              style={Constants.search.textInputStyle}
              placeholderTextColor={'gray'}
              placeholder="بحث"
              onChangeText={value => {
                this.search(value);
              }}
            />
          </View>
          <ScrollView>
            {this.state.louding ? (
              <View
                style={{
                  width: width * 0.9,
                  height: height * 0.5,
                  // backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size={35} color="gray" />
              </View>
            ) : (
              <View
                style={{
                  width: '100%',
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  marginBottom: 120,
                  padding: 8,
                }}>
                {this.show() ? (
                  this.state.items.map((items, index) =>
                    items.show ? (
                      <TouchableOpacity
                        onPress={() => {
                          index == 0
                            ? this.props.navigation.navigate('Medical')
                            : index == 1
                              ? this.props.navigation.navigate('Engineers')
                              : index == 4
                                ? this.props.navigation.navigate('Teachers')
                                : null;
                        }}>
                        <View
                          style={{
                            backgroundColor: '#7eab9b',
                            height: 90,
                            width: width * 0.25,
                            borderRadius: 14,
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 10,
                          }}>
                          <Image
                            source={this.state.images[index]}
                            style={{
                              height: '74%',
                              width: width * 0.5,
                              resizeMode: 'contain',
                            }}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: Constants.fonts.fontSize_16,
                              fontFamily: Constants.fonts.fontFamily,
                              color: '#fff',
                            }}>
                            {items.Categorie_name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : null,
                  )
                ) : (
                  <View
                    style={{
                      height: height * 0.6,
                      justifyContent: 'center',
                      padding: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: Constants.fonts.fontSize_16,
                        color: Constants.fonts.mainColor,
                        fontFamily: Constants.fonts.fontFamily,
                      }}>
                      لا يوجد عناصر مشابهه !
                    </Text>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </>
    );
  }
}
