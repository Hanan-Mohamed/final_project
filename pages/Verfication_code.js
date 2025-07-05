import * as React from "react"
import {
    Text,
    View,
    StyleSheet,
    ToastAndroid,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    StatusBar,
    Alert,
    BackHandler
} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts, touchableOpacityStyle, statusBar } from "../constants/Constants"
const color = '#7eab9b'
const { width, height } = Dimensions.get('screen')
export default class Verfication_code extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Verify_code1: '',
            Verify_code2: '',
            Verify_code3: '',
            Verify_code4: '',
            pressIn: true,
            code: '',
            allow: true,
            con: '',
        }
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.refs.Verify_code1ref.focus();
        }, 50);
        this.refs.Verify_code2ref.setNativeProps({
            editable: false,
        });
        this.refs.Verify_code3ref.setNativeProps({
            editable: false,
        });
        this.refs.Verify_code4ref.setNativeProps({
            editable: false,
        });
    };
 
    random_fun() {
        let code = this.state.code;
        for (let i = 0; i < 4; i++) {
            code += (Math.floor(Math.random() * 10));
        }
        this.setState({code:code})
        Alert.alert(
            'Verification Code.',
            '                                                                                              '+code,
            [
                   {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
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
    completetextinput() {
        let pin1 = this.state.Verify_code1;
        let pin2 = this.state.Verify_code2;
        let pin3 = this.state.Verify_code3;
        let pin4 = this.state.Verify_code4;
        let press = this.state.pressIn;
        if (
            pin1.length == 1 &&
            pin2.length == 1 &&
            pin3.length == 1 &&
            pin4.length == 1
        ) {
            press = false;
        } else {
            press = true;
        }
        this.setState({
            pressIn: press,
        });
    }

    code() {
        let pin1 = this.state.Verify_code1;
        let pin2 = this.state.Verify_code2;
        let pin3 = this.state.Verify_code3;
        let pin4 = this.state.Verify_code4;
        let code = this.state.code
        if (code == (pin1 + pin2 + pin3 + pin4)) {
            this.notifyMessage("تم التأكيد .")
            this.props.navigation.navigate('NewPassword');
            // this.setState({ allow: false })
        } else {
            this.setState({Verify_code1:'',Verify_code2:'',Verify_code3:'',Verify_code4:'',pressIn:true})
            this.notifyMessage("هناك خطأ في رمز التأكيد .")
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

            <View style={styles.view_continer}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={statusBar.backgroundColor}
                />
                <View style={{
                    height: height * 0.1,
                    width: width,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: width * .05,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{ width: width * .73 }}></View>
                    <View style={{ width: width * .1, alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                            <Ionicons name="arrow-undo" color={'#7eab9b'} size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: '40%', alignItems: 'center', justifyContent: 'center', marginTop: -30 }}>
                    <Image
                        source={require('../assets/Image/otp.png')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="contain"
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                    }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                        <Text
                            style={styles.text1}>
                            قم بتأكيد رقم الهاتف
                        </Text>
                        <Text
                            style={styles.text2}>
                            الرجاء إدخال الرمز المكون من 4 أرقام المرسل إلي رقم الهاتف
                        </Text>
                        <View style={styles.view4}>
                            <TextInput
                                maxLength={1}
                                ref={'Verify_code1ref'}
                                keyboardType="number-pad"
                                value={this.state.Verify_code1}
                                onChangeText={async value => {
                                    if (value.length == 1) {
                                        await this.setState({ Verify_code1: value[0] });
                                        this.refs.Verify_code2ref.setNativeProps({
                                            editable: true,
                                        });
                                        setTimeout(() => {
                                            this.refs.Verify_code2ref.focus();
                                        }, 0);
                                    } else if (value.length == 4) {
                                        this.refs.Verify_code2ref.setNativeProps({
                                            editable: true,
                                        });
                                        this.refs.Verify_code3ref.setNativeProps({
                                            editable: true,
                                        });
                                        this.refs.Verify_code4ref.setNativeProps({
                                            editable: true,
                                        });
                                        setTimeout(() => {
                                            this.refs.Verify_code4ref.focus();
                                        }, 0);
                                        await this.setState({
                                            Verify_code1: value[0],
                                            Verify_code2: value[1],
                                            Verify_code3: value[2],
                                            Verify_code4: value[3],
                                        });
                                    } else if (value.length == 0) {
                                        this.refs.Verify_code2ref.setNativeProps({
                                            editable: false,
                                        });
                                        await this.setState({ Verify_code1: '' });
                                    }
                                    this.completetextinput();
                                }}
                                style={styles.textinput}
                            />
                            <TextInput
                                style={styles.textinput}
                                maxLength={1}
                                ref={'Verify_code2ref'}
                                keyboardType="number-pad"
                                value={this.state.Verify_code2}
                                onChangeText={async value => {
                                    await this.setState({ Verify_code2: value });
                                    if (value != '') {
                                        this.refs.Verify_code3ref.setNativeProps({
                                            editable: true,
                                        });
                                        setTimeout(() => {
                                            this.refs.Verify_code3ref.focus();
                                        }, 0);
                                    } else {
                                        this.refs.Verify_code3ref.setNativeProps({
                                            editable: false,
                                        });
                                        this.refs.Verify_code1ref.focus();
                                    }
                                    this.completetextinput();
                                }}
                            />
                            <TextInput
                                maxLength={1}
                                ref={'Verify_code3ref'}
                                keyboardType="number-pad"
                                value={this.state.Verify_code3}
                                onChangeText={async value => {
                                    await this.setState({
                                        Verify_code3: value,
                                    });
                                    if (value != '') {
                                        this.refs.Verify_code4ref.setNativeProps({
                                            editable: true,
                                        });
                                        setTimeout(() => {
                                            this.refs.Verify_code4ref.focus();
                                        }, 0);
                                    } else {
                                        this.refs.Verify_code4ref.setNativeProps({
                                            editable: false,
                                        });
                                        this.refs.Verify_code2ref.focus();
                                    }
                                    this.completetextinput();
                                }}
                                style={styles.textinput}
                            />
                            <TextInput
                                maxLength={1}
                                ref={'Verify_code4ref'}
                                keyboardType="number-pad"
                                value={this.state.Verify_code4}
                                onChangeText={async value => {
                                    await this.setState({ Verify_code4: value });
                                    if (value.length == 0) {
                                        this.refs.Verify_code3ref.focus();
                                    }
                                    this.completetextinput();
                                }}
                                style={styles.textinput}
                            />
                        </View>
                        <View style={styles.view5}>
                            <Text style={styles.text2}>ألم تستلم الرمز؟</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.random_fun()
                                    this.notifyMessage("تم إعادة إرسال الرمز .")
                                }}>
                                <Text style={[styles.text2, { color: color, fontFamily: fonts.fontFamily2, textDecorationLine: 'underline', }]}> أعد إرسال الرمز</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                console.log(this.state.code)
                                this.code()
                            }}
                            disabled={this.state.pressIn ? true : false}

                            style={[styles.touchableopicty2, { backgroundColor: this.state.pressIn ? '#888' : color }]}>
                            <Text
                                style={[styles.text1, { color: "#fff", }]}
                            >تأكيد
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    view_continer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 14
    },
    text1: {
        fontSize: fonts.mainFontSize,
        fontFamily: fonts.fontFamily,
        color: fonts.mainColor,
        textAlign: 'center',
        marginBottom: 5,
    },
    text2: {
        fontSize: fonts.fontSize_18,
        fontFamily: fonts.fontFamily3,
        color: "gray",
        textAlign: 'center',
        marginBottom: 5,
    },
    view4: {
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        marginTop: 30
    },
    textinput: {
        width: 50,
        height: 50,
        backgroundColor: "#eee",
        borderRadius: 8,
        textAlign: 'center',
        color: fonts.mainColor,
        fontSize: 18,
        fontFamily: fonts.fontFamily,
    },
    touchableopicty2: {
        width: 160,
        height: 40,
        alignSelf: "center",
        marginTop: 20,
        marginBottom:10,
        borderRadius: touchableOpacityStyle.borderRadius,
        alignItems: "center",
        justifyContent: "center",
    },

    view5: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20
    },

})
