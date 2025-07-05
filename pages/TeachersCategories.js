import React from "react"
import { Text, View, ScrollView, Image,BackHandler, TouchableOpacity, Dimensions, UIManager, LayoutAnimation, StatusBar } from 'react-native'
import { scale, verticalScale, moderateScale } from "react-native-size-matters-ch";
import Lottie from 'lottie-react-native';
import _Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable'
const { width, height } = Dimensions.get('window');
import * as Constants from '../constants/Constants'
export default class Teachers_categories extends React.Component {
    componentDidMount() {
        Dimensions.addEventListener('change', ({ window }) => {
            const new_width = window.width
            const new_height = window.height

            UIManager.setLayoutAnimationEnabledExperimental &&
                UIManager.setLayoutAnimationEnabledExperimental(true)

            this.setState({
                Width: new_width,
                Height: new_height,

            });
        });
    }


    constructor(props) {
        super(props)
        {
            this.state = {
                Width: width,
                Height: height,
                teacherCategorie: [
                    {
                        title: 'لغة عربية',
                        img: ''
                    },
                    {
                        title: 'لغة انجليزية',
                        img: ''
                    },
                    {
                        title: 'لغة فرنسية',
                        img: ''
                    },
                    {
                        title: 'لغة المانية',
                        img: ''
                    },
                    {
                        title: 'لغة اطالية',
                        img: ''
                    },
                    {
                        title: 'رياضيات',
                        img: ''
                    },
                    {
                        title: 'دراسات',
                        img: ''
                    },
                    {
                        title: 'جعرافيا',
                        img: ''
                    },
                    {
                        title: 'تاريخ',
                        img: ''
                    },
                    {
                        title: 'فيزياء',
                        img: ''
                    },
                    {
                        title: 'فلسفة و علم النفس',
                        img: ''
                    },
                    {
                        title: 'كيمياء',
                        img: ''
                    },
                    {
                        title: 'احياء',
                        img: ''
                    },
                    {
                        title: 'جيلوجيا',
                        img: ''
                    },
                ],
                left_w: width * 0.2,
                height_b: height * .12,
            }
        }
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
            <View style={{ flex: 1, backgroundColor: '#dfeeec', }}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor='#7eab9b'
                />
                <View style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    height: 115,
                }}>
                    <View
                        style={[
                            Constants.header.headerStyle,
                            {
                                width: '100%',
                                height: '100%',
                                borderBottomLeftRadius: 35,
                                backgroundColor: '#7eab9b',
                            },
                        ]}>
                        <View style={{
                            width: width * .1,
                        }}></View>
                        <View style={{ width: width * .7, alignItems: 'center' }}>
                            <Animatable.Text animation={'zoomIn'}
                             delay={100 * 5}
                                style={{
                                    fontSize: Constants.fonts.mainFontSize,
                                    fontFamily: Constants.fonts.fontFamily,
                                    color: Constants.fonts.secondaryColor,
                                }}>المدرسين</Animatable.Text>
                        </View>
                        <View style={{ width: width * .1, alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.goBack();
                                }}>
                                <Ionicons
                                    name="arrow-undo"
                                    color={'#fff'}
                                    size={24}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>                       
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    width: '100%',
                    backgroundColor: '#7eab9b',
                }}>
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            borderTopRightRadius: 35,
                            backgroundColor: '#fff',
                        }}>

                        <ScrollView style={{ flex: 1, marginBottom: 70 }}>

                            <View style={{ height: 200, width: '90%', marginTop: 20, alignSelf: 'center' }}>
                                <Lottie source={require('../assets/Image/129150-winged-teacher.json')} autoPlay loop />
                            </View>

                            <View style={{
                                width: '100%',
                                height: '40%',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-around',
                                marginTop: 5,
                                paddingHorizontal: 10
                            }}>
                                {
                                    this.state.teacherCategorie.map((category, index) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate('Search', { person: category,icon:'book' })
                                            }}
                                            style={{
                                                width: width * 0.25,
                                                height: scale(90),
                                                marginTop: scale(20),
                                                backgroundColor: '#7eab9b',
                                                borderRadius: 20,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: index == this.state.teacherCategorie.length - 1 ? 100 : 0
                                            }}>

                                            <Image
                                                source={require('../assets/Image/teach.png')}
                                                style={{
                                                    height: '74%',
                                                    width: width * 0.5,
                                                    resizeMode: 'contain'
                                                }} />
                                            <Text style={{
                                                fontSize: Constants.fonts.fontSize_14,
                                                fontFamily:Constants.fonts.fontFamily,
                                                color:Constants.fonts.secondaryColor,
                                            }}
                                                numberOfLines={1}
                                            >{category.title}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}