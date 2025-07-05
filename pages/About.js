import *as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Linking,
    BackHandler
} from "react-native"
import Icon2 from 'react-native-vector-icons/Fontisto'
import { ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import call from 'react-native-phone-call'
import Geolocation from '@react-native-community/geolocation';
navigator.geolocation = require('@react-native-community/geolocation');
import * as Constants from '../constants/Constants'
const { width, height } = Dimensions.get('screen')
const size = 24
const color = '#7eab9b';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {
            },
            enter: 0,
            edit: false,
            message: '',
            position: {
                latitude: 10,
                longitude: 10,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            },
            louding: false,
            id: 1
        }
    }

    componentDidMount() {
        Geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            let position = {
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,
            }
            this.setState({ position: position });
        })
    }
    call(number) {
        const args = {
            number: number,
            prompt: true,
            skipCanOpen: true
        }
        call(args).catch(console.error)
    }

    openWhatsApp(mobile) {
        let msg = this.state.message;
        if (mobile.length != 11) {
            alert('Please insert correct WhatsApp number');
            return;
        }
        let url =
            'whatsapp://send?text=' +
            this.state.message +
            '&phone=20' + mobile;
        Linking.openURL(url)
            .then((data) => {
                console.log('WhatsApp Opened successfully');
            })
            .catch(() => {
                alert('Make sure Whatsapp installed on your device');
            });
    };
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
        const { name,number,img,rate,specialty,inform,categori } = this.props.route.params;

        return (
            <>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={Constants.statusBar.backgroundColor}
                />
                <View style={styles.top}>
                    <View style={[
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
                        </View>
                        <View style={{ width: width * .1, alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.goBack()
                                }}>
                                <Ionicons name="arrow-undo" color={'white'} size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >

                <View style={styles.container}>
                    <View
                        style={{
                            width: width,
                            height: height,
                            borderTopRightRadius: 35,
                            backgroundColor: 'white',
                            paddingTop: 25,
                            alignItems: 'center',
                        }}>
                        <View style={{
                            height: 140,
                            width: 140,
                            backgroundColor: 'lightgray',
                            borderRadius: 70,
                            marginTop: -90,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {this.state.louding ?
                                <ActivityIndicator size={30} color="gray" /> :
                                this.state.item.employee_image == '' ?
                                    <Icon3 name={'user-circle-o'} size={110} color={color} />
                                    :
                                    <Image
                                        // source={require('../assets/Image/download.jpg')}
                                        source={{uri:img}}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 70,
                                            resizeMode: 'contain'
                                        }} />
                            }
                        </View>
                        {this.state.louding ?
                            <View style={{ height: height * .6, alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size={35} color="gray" style={{ alignSelf: 'center', }} />
                            </View> :
                            <ScrollView style={{
                                height: height,
                                width: width,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <View style={{ width: '62%' }}>
                                        <Text
                                            numberOfLines={1}
                                            style={[Constants.fonts,
                                            {
                                                color: Constants.fonts.mainColor,
                                                fontSize: Constants.fonts.mainFontSize,
                                                marginTop: 20,
                                                alignSelf: 'flex-start'
                                            }
                                            ]}>
                                            {name}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 18,
                                                color: 'gray',
                                                fontFamily: Constants.fonts.fontFamily2,
                                                alignSelf: 'flex-start'
                                            }}>
                                            {categori}
                                        </Text>
                                        <View style={{ flexDirection: 'row', marginTop: 20, }}>
                                            {rate <= 1 ?
                                                <Icon name='star-half-alt'
                                                    size={20} color='#f59b16ab' style={{ margin: 1 }} /> :
                                                <Icon1 name={'star'}
                                                    size={22} color='#f59b16ab' style={{ margin: 1 }} />}

                                            <Icon1 name={rate >= 2 ? 'star' : 'staro'}
                                                size={22} color={rate ? '#f59b16ab' : 'gray'} style={{ margin: 1 }} />


                                            <Icon1 name={rate >= 3 ? 'star' : 'staro'}
                                                size={22} color={rate ? '#f59b16ab' : 'gray'} style={{ margin: 1 }} />


                                            <Icon1 name={rate >= 4 ? 'star' : 'staro'}
                                                size={22} color={rate ? '#f59b16ab' : 'gray'} style={{ margin: 1 }} />

                                        </View>

                                    </View>
                                    <View style={{ width: '30%', height: 40, flexDirection: 'row', justifyContent: 'flex-end', }}>


                                        <TouchableOpacity
                                            style={{
                                                width: 45,
                                                height: 40,
                                                borderRadius: 10,
                                                backgroundColor: '#0cd414',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onPress={() => {
                                                this.openWhatsApp(number)
                                            }}>
                                            <Icon2
                                                name={'whatsapp'}
                                                size={26}
                                                color={'#fff'}
                                                style={styles.icon_text_input}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                width: 45,
                                                height: 40,
                                                borderRadius: 10,
                                                backgroundColor: color,
                                                marginLeft: 10,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onPress={() => {
                                                this.call(number)
                                            }}>
                                            <Icon
                                                name={'phone-alt'}
                                                size={22}
                                                color={'#fff'}
                                                style={styles.icon_text_input}
                                            />
                                        </TouchableOpacity>

                                    </View>

                                </View>
                                <View style={{ width: width * .9, height: .8, backgroundColor: '#f0eaea', marginTop: 20, alignSelf: 'center' }}></View>
                                {/* <ScrollView style={{ height: height*2 }}> */}

                                <View style={{
                                    width: Constants.search.textInputStyle.width,
                                    borderRadius: 15,
                                    alignSelf: 'center',
                                    marginTop: 20,
                                    height: height * 0.22,
                                }}>
                                    <Text
                                        style={[Constants.fonts,
                                        {
                                            fontFamily: Constants.fonts.fontFamily2,
                                            color: Constants.fonts.mainColor,
                                            fontSize: Constants.fonts.fontSize_20,
                                            marginBottom: 5
                                        }
                                        ]}
                                    >بعض المعلومات :</Text>

                                    <Text numberOfLines={4}

                                        style={[,
                                        {
                                            color: 'gray',
                                            fontFamily:Constants.fonts.fontFamily3,
                                            fontSize: 18,
                                            marginBottom: 5
                                        }
                                        ]}>
                                        {inform}
                                    </Text>
                                </View>
                                <View style={{ width: width * .9, height: .8, backgroundColor: '#f0eaea', alignSelf: 'center' }}></View>
                                <View style={{
                                    width: Constants.search.textInputStyle.width,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    justifyContent: 'space-between',
                                    height: height * 0.12,
                                    marginTop: 20
                                }}>
                                    <Text style={[Constants.fonts,
                                    {
                                        color: Constants.fonts.mainColor,
                                        fontSize: Constants.fonts.fontSize_20,
                                    }
                                    ]}>الموقع : </Text>
                                    <TouchableOpacity
                                        style={{
                                            width: '40%',
                                            height: '50%',
                                            borderRadius: 10,
                                            backgroundColor: '#289b2c',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onPress={() => {
                                            this.props.navigation.navigate('Map', { img: img })
                                        }}>
                                        <Entypo
                                            name={'location'}
                                            size={30}
                                            color={'#fff'}
                                            style={styles.icon_text_input}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        }
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
    map: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});
