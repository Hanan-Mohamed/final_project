import * as React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
  BackHandler
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Constants from '../constants/Constants';
const { width, height } = Dimensions.get('screen');
const color = '#7eab9b';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      images: [
        require('../assets/Image/doctor.png'),
        require('../assets/Image/eng.png'),
        require('../assets/Image/hos.png'),
      ],
      most: [
      ],
      categories: [
      ],
      persons: [
      ],
      enter: 0,
      edit: false,
      louding_1: true,
      louding_2: true,
      s:''
    };
  }


  search(value) {
    let list = this.state.persons;
    for (let i = 0; i < list.length; i++) {
      if (
        list[i].employee_name
          .toLowerCase()
          .includes(value.toLowerCase())
      ) {
        list[i].show = true;
      } else {
        list[i].show = false;
      }
    }
    this.setState({ persons: list });
  }
  show() {
    let list = this.state.persons;
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
        'https://esraatarek.000webhostapp.com/Services/select3categories.php',
      )
      .then(res => {
        if (res.status == 200) {
          // console.log(res.data);
          this.setState({ categories: res.data });
          this.setState({ louding_1: false });
        }
      });
  }
  get_data_recomended_people() {
    axios
      .get(
        'https://esraatarek.000webhostapp.com/Services/People_recommented.php',
      )
      .then(res => {
        if (res.status == 200) {
          // console.log(res.data);
          let arr = res.data;
          for (let i = 0; i < arr.length; i++) {
            arr[i].show = true;
            // console.log(res.data);
          }
          console.log(arr);
          this.setState({ persons: res.data });
          this.setState({ louding_2: false });
        } else {
          console.log('error');
        }
      })
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      () =>
        // console.log('sohila'),
        // alert(
          // this.getData(),
        this.get_data(),
      this.get_data_recomended_people(),
      // )
    );
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
        <ScrollView style={{ flex: 1 }}>
          <View style={Constants.container}>
            <View style={Constants.header.headerStyle}>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {this.state.image == '' ? (
                  <Icon1 name={'user-circle-o'} size={50} color={color} />
                ) : (
                  <Image
                    source={this.state.image}
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                      resizeMode: 'contain',
                    }}
                  />
                )}
              </View>
              <TouchableOpacity disabled={false} onPress={() => {
                this.props.navigation.navigate('Account');
              }}>
                <Entypo name="list" size={28} color="#7eab9b" />
              </TouchableOpacity>
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

            {this.state.louding_1 ? (
              <View
                style={{
                  width: width * 0.9,
                  height: height * 0.22,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size={35} color="gray" />
              </View>
            ) : (

              <View
                style={{
                  width: '100%',
                  marginTop: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 50,
                }}>
                {this.state.categories.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      index == 0
                        ? this.props.navigation.navigate('Medical')
                        : index == 1
                          ? this.props.navigation.navigate('Engineers')
                          : index == 3
                            ? this.props.navigation.navigate('Categories')
                            : null;
                    }}>
                    <View
                      style={{
                        backgroundColor: '#7eab9b',
                        height: 65,
                        width: width * 0.18,
                        borderRadius: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 10,
                      }}>
                      {index != 3 ? (
                        <Image
                          source={this.state.images[index]}
                          style={{
                            height: '85%',
                            width: width * 0.5,
                            resizeMode: 'contain',
                          }}
                        />
                      ) : (
                        <Entypo
                          name="dots-three-horizontal"
                          size={28}
                          color="#fff"
                        />
                      )}
                    </View>
                    <Text
                      style={{
                        fontSize: Constants.fonts.fontSize_16,
                        fontFamily: Constants.fonts.fontFamily2,
                        marginTop: 5,
                        color: Constants.fonts.mainColor,
                        textAlign: 'center',
                      }}>
                      {index != 3 ? item.Categorie_name : 'المزيد'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={{ width: width }}>
              <Text
                style={{
                  marginLeft: 20,
                  marginTop: -10,
                  fontSize: Constants.fonts.fontSize_20,
                  fontFamily: Constants.fonts.fontFamily,
                  textAlign: 'left',
                  color: Constants.fonts.mainColor,
                }}>
                الأكثر شيوعاً...{' '}
              </Text>
            </View>
            <ScrollView horizontal={true}>
              {this.state.louding_2 ? (
                <View
                  style={{
                    width: width * 0.9,
                    height: height * 0.23,
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
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginTop: 10,
                    marginBottom: 120,
                    padding: 8,
                  }}>
                  {this.show() ? (
                    this.state.persons.map((item, index) =>
                      item.show ? (
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('About', {
                              name: item.employee_name,
                              number: item.employee_phone,
                              img: item.employee_image,
                              rate: item.employee_rate,
                              specialty: item.emplyee_specialty,
                              inform: item.employee_informations,
                              categori: item.emplyee_specialty
                            });
                          }}>
                          <View
                            style={{
                              backgroundColor: '#7eab9b',
                              height: 240,
                              width: width * 0.48,
                              borderRadius: 18,
                              alignItems: 'center',
                              justifyContent: 'space-around',
                              marginBottom: 10,
                              margin: 8,
                            }}>
                            <Image
                              source={{ uri: item.employee_image }}
                              // source={item.img}
                              style={{
                                height: '65%',
                                width: width * 0.4,
                                borderRadius: width * 0.04,
                                resizeMode: 'contain',
                              }}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                              <Text
                                style={{
                                  fontSize: Constants.fonts.fontSize_18,
                                  fontFamily: Constants.fonts.fontFamily2,
                                  color: '#fff',
                                }}>
                                {item.employee_name}
                                {/* {item.name} */}
                              </Text>
                              <Text
                                style={{
                                  fontSize: Constants.fonts.fontSize_18,
                                  fontFamily: Constants.fonts.fontFamily2,
                                  color: '#fff',
                                }}>
                                {item.employee_category_name}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ) : null,
                    )
                  ) : (
                    <View
                      style={{
                        height: height * 0.3,
                        justifyContent: 'center',
                        padding: 20,
                      }}>
                      <Text
                        style={[
                          Constants.fonts,
                          {
                            color: Constants.fonts.mainColor,
                            fontSize: Constants.fonts.fontSize_16,
                            textAlign: 'center'
                          },
                        ]}>
                        لا يوجد عناصر مشابهه :(
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </>
    );
  }
}
