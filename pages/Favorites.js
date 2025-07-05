import React from 'react';
import {
    NativeModules,
    Text,
    TouchableOpacity,
    Image,
    View,
    Dimensions,
    FlatList,
    ToastAndroid,
    StatusBar,
    BackHandler
} from 'react-native';
import * as Constants from './Constants'
import { scale, verticalScale } from 'react-native-size-matters-ch';
import { ActivityIndicator } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import _Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import * as Animatable from 'react-native-animatable'
import Icon2 from 'react-native-vector-icons/AntDesign'

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
//import Images from '../Contants/Images'
const { width, height } = Dimensions.get('window');
const color = '#7eab9b';


export default class Favorites extends React.Component {


    // componentDidMount() {
    //     Dimensions.addEventListener('change', ({ window }) => {
    //         const new_width = window.width
    //         const new_height = window.height
    //         // const arr = this.state.persons.fill(1).map((_, index) => index + 1)
    //         this.setState({
    //             Width: new_width,
    //             Height: new_height,
    //             // persons: arr

    //         })

    //     });
    //     this.getData()


    // }


    constructor(props) {
        super(props)

        {
            this.state = {
                Width: width,
                Height: height,
                left_w: 60,
                height_b: 60,
                p1: [],
                p2: [],
                p3: [],
                p4: [],
                p5: [],
                items: []
            }
        }
    }
    componentDidMount() {
        this.getData1()
        this.getData2()
        this.getData3()
        this.getData4()

        setTimeout(() => {
            if (this, this.state.p4.length != 0) {
                this.get()
            }
        }, 1000);

    }
    get() {
        let x = []
        let arr1 = this.state.p1
        let arr2 = this.state.p2
        let arr3 = this.state.p3
        let arr4 = this.state.p4
        let arr5 = this.state.p5
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i].fav == 1) {
                x.push(arr1[i])
            }
        }
        for (let i = 0; i < arr2.length; i++) {
            if (arr2[i].fav == 1) {
                x.push(arr2[i])
            }
        }
        for (let i = 0; i < arr3.length; i++) {
            if (arr3[i].fav == 1) {
                x.push(arr3[i])
            }
        }
        for (let i = 0; i < arr4.length; i++) {
            if (arr4[i].fav == 1) {
                x.push(arr4[i])
            }
        }
        this.setState({ items: x })
        console.log(x)
    }
    getData1() {
        // let items = this.state.persons
        axios.get('https://esraatarek.000webhostapp.com/Services/architecture_engineer.php').then(
            res => {
                if (res.status == 200) {
                    if (res.data != "no data") {
                        console.log(res.data)
                        this.setState({ p1: res.data })
                    }
                }
            }
        )
    }
    getData2() {
        axios.get('https://esraatarek.000webhostapp.com/Services/civil_engineer.php').then(
            res => {
                if (res.status == 200) {
                    if (res.data != "no data") {
                        this.setState({ p2: res.data })
                        console.log(this.state.p2)
                    }
                }
            }
        )

    }
    getData3() {
        axios.get('https://esraatarek.000webhostapp.com/Services/computer_engineer.php').then(
            res => {
                if (res.status == 200) {
                    console.log(res.data);
                    if (res.data != "no data") {
                        this.setState({ p3: res.data })
                    }
                }
            }
        )
    }
    getData4() {
        axios.get('https://esraatarek.000webhostapp.com/Services/telecom_engineer.php').then(
            res => {
                if (res.status == 200) {
                    console.log(res.data);
                    if (res.data != "no data") {
                        this.setState({ p4: res.data })
                    }
                }
            }
        )
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
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={Constants.statusBar.backgroundColor} />
                <View style={{
                    width: '100%',
                    height: 115,
                    backgroundColor: 'white',
                }}>
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            borderBottomLeftRadius: 35,
                            backgroundColor: color,
                            padding: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                        <Animatable.Text animation={'zoomIn'}
                            delay={100 * 5}
                            style={{
                                color: '#fff',
                                fontSize: Constants.fonts.mainFontSize,
                                fontFamily: Constants.fonts.fontFamily,
                                marginRight: 5
                            }}>المفضلين</Animatable.Text>
                        <Icon2
                            name="heart"
                            size={24}
                            color={'red'} />
                    </View>
                </View>
                <View style={{
                    height: height,
                    width: '100%',
                    backgroundColor: color,
                }}>
                    <View style={{
                        width: '100%',
                        height: '100%',
                        borderTopRightRadius: 35,
                        backgroundColor: 'white',
                        paddingTop: 35,
                    }}>
                        {
                            this.state.items.length != 0 ?
                                this.state.p1 != [] ?
                                    (
                                        <FlatList
                                            data={this.state.items}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    item.fav == 1 ?
                                                        <Animatable.View
                                                            delay={100 * (index + 2)}
                                                            animation={'flipInX'}
                                                            easing={'ease-in-cubic'}
                                                            style={{
                                                                width: '90%',
                                                                height: scale(95),
                                                                //backgroundColor:'#dfeeec',
                                                                marginBottom: 15,
                                                                alignSelf: 'center',
                                                                flexDirection: 'row',
                                                                borderRadius: 10
                                                            }}>

                                                            <View style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                backgroundColor: '#a1bdb33d',
                                                                alignSelf: 'center',
                                                                borderRadius: 20,
                                                                flexDirection: 'row'
                                                            }}>

                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        this.props.navigation.navigate('About',
                                                                            {
                                                                                name: item.engineer_name,
                                                                                number: item.engineer_phone,
                                                                                img: item.engineer_image,
                                                                                rate: item.engineer_rate,
                                                                                specialty: item.engineer_type,
                                                                                inform: item.engineer_information,
                                                                                categori: item.engineer_type
                                                                            })
                                                                    }}
                                                                    style={{
                                                                        width: '85%',
                                                                        height: '100%',
                                                                        flexDirection: 'row'
                                                                    }}>

                                                                    <Image
                                                                        source={{ uri: item.engineer_image }}
                                                                        style={{
                                                                            width: '35%',
                                                                            height: '100%',
                                                                            borderTopLeftRadius: 30,
                                                                            alignItems: 'flex-start',
                                                                        }}
                                                                        resizeMode='stretch'
                                                                    />



                                                                    <View style={{ width: 120 }}>

                                                                        <Text
                                                                            numberOfLines={1}
                                                                            style={{
                                                                                fontSize: Constants.fonts.fontSize_18,
                                                                                marginLeft: 10,
                                                                                marginTop: 5,
                                                                                color: Constants.fonts.mainColor,
                                                                                fontFamily: Constants.fonts.fontFamily3,
                                                                                textAlign: 'center'

                                                                            }}>
                                                                            {item.engineer_name}
                                                                        </Text>


                                                                        <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center', alignSelf: 'center' }}>
                                                                            <Text style={{ marginRight: 3, color: '#040e46', }}>{item.engineer_rate}</Text>
                                                                            {
                                                                                item.engineer_rate < 1 ?
                                                                                    <Icon1 name='star-half-alt'
                                                                                        size={14} color='#f59b16ab' /> :
                                                                                    <Icon2 name={'star'}
                                                                                        size={16} color='#f59b16ab' />}

                                                                            <Icon2 name={item.engineer_rate >= 1 ? 'star' : 'staro'}
                                                                                size={16} color={item.engineer_rate > 1 ? '#f59b16ab' : 'gray'} />


                                                                            <Icon2 name={item.engineer_rate > 2 ? 'star' : 'staro'}
                                                                                size={16} color={item.engineer_rate > 2 ? '#f59b16ab' : 'gray'} />


                                                                            <Icon2 name={item.engineer_rate > 3 ? 'star' : 'staro'}
                                                                                size={16} color={item.engineer_rate > 3 ? '#f59b16ab' : 'gray'} />


                                                                        </View>

                                                                    </View>


                                                                </TouchableOpacity>
                                                                {
                                                                    <TouchableOpacity style={{ width: 40, height: 40, }}
                                                                        onPress={() => {
                                                                            this.get()
                                                                            let arr = this.state.items
                                                                            arr.splice(index, 1)
                                                                            this.setState({ items: arr })
                                                                            console.log(this.state.items.length)
                                                                            this.notifyMessage('تم الحذف من المفضله.')
                                                                        }}

                                                                    >

                                                                        <Icon1 name='times' color='gray'
                                                                            size={20} style={{ margin: 5 }} />
                                                                    </TouchableOpacity>

                                                                }

                                                            </View>



                                                        </Animatable.View>
                                                        : null
                                                )
                                            }}
                                        />
                                    )
                                    :
                                    <View
                                        style={{
                                            width: width * 0.9,
                                            height: height * 0.8,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <ActivityIndicator size={35} color="gray" />
                                    </View>
                                :
                                <>
                                    <Image
                                        style={{ width: 240, height: 240, marginTop: scale(80), alignSelf: 'center' }}
                                        source={require('../assets/Image/f.png')}
                                        resizeMode='stretch'
                                    />

                                    <Text style={{
                                        alignSelf: 'center',
                                        fontSize: Constants.fonts.fontSize_20,
                                        color: Constants.fonts.mainColor,
                                        fontFamily: Constants.fonts.fontFamily,
                                        marginTop: 20
                                    }}
                                    >لا يوجد محتوى  :(</Text>
                                </>
                        }

                    </View>
                </View>
            </View>

        )
    }

}

