import * as React from "react"
import { Text, View, Dimensions, TouchableOpacity, StatusBar, Image, BackHandler } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get("screen")
import * as Constants from '../constants/Constants'
export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Image: [
                {
                    img: require('../assets/Image/i1.png'),
                    txt: "مرحبا..."
                },
                {
                    img:require('../assets/Image/i8.png'),
                    txt: "سهولة الوصول لاي خدمه..."
                },
                {
                    img:require('../assets/Image/i4.png'),
                    txt: "سهولة الوصول لاي مكان..."
                }, 
                {
                    img:require('../assets/Image/i7.png'),
                    txt: "التواصل بسرعه وبكل سهوله..."
                },
            ],
            index: 0,
            modeButton: false
        }
    }

    componentDidMount(){
        let index=this.state.index
        const interval = setInterval(() => {
            if (index == 3) {
            this.setState({ modeButton: true })
                clearInterval(interval)
            }
            this.setState({index:index++})
        }, 2500)
        setTimeout(() => {
            if (this.state.modeButton==true){
                this.onDone()
            }
        }, 13000)
    }
    onDone = async () => {
        await AsyncStorage.setItem('Switch', 'Auth');
        this.props.navigation.navigate('Auth');
      };
      disableBackButton = () => {
        BackHandler.exitApp()
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

                <View style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                    paddingVertical: 15,
                    backgroundColor: '#dfeeec',
                }}>
                    <StatusBar backgroundColor='#dfeeec' />
                    <View>
                        <View style={{
                            height: 40,
                            width: width * .88,
                            flexDirection: 'row-reverse',
                            alignSelf: 'center'
                        }}>
                            <TouchableOpacity style={{
                                borderRadius: Constants.touchableOpacityStyle.borderRadius,
                                flexDirection: 'row',
                            }}
                                onPress={() => {
                                    this.onDone()
                                }}
                            >
                                <Icon name="times" color={'#7eab9b'} size={26}></Icon>

                            </TouchableOpacity>
                        </View>
                        <Image style={{
                            height: height * .6,
                            width: width*.8,
                            resizeMode: "contain",
                            alignSelf: "center"
                        }}
                            source={this.state.Image[this.state.index].img} />
                    </View>
                    <Text style={{
                        fontSize:Constants.fonts.fontSize_20,
                        fontFamily:Constants.fonts.fontFamily,
                        color: Constants.fonts.mainColor,
                        alignSelf: "center",
                        textAlign: 'center',
                        marginTop: -20
                    }}>{this.state.Image[this.state.index].txt}</Text>
                    <View style={{
                        width: width,
                        height: height * .1,
                        flexDirection: 'row',
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        {this.state.Image.map((img, index) => (
                            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: index==this.state.index? '#fff' : 'gray',margin:4 }}>
                            </View>
                        ))}
                    </View>
                </View>
            </>
        )

    }
}
