import {
    Text,
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    PermissionsAndroid,
    ToastAndroid,
    BackHandler
} from 'react-native';
const color = '#7eab9b';
import { Dimensions } from 'react-native';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
const { width, height } = Dimensions.get('screen');
import * as Constants from './Constants';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Entypo';
import React from 'react';
import validator from 'validator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Constant from './Constants';
import * as Animatable from 'react-native-animatable';
import SelectDropdown from 'react-native-select-dropdown';
import * as ImagePicker from 'react-native-image-picker';
export default class Edit_profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            x: false,
            photo_uri: '',
            photo_data: '',
            name: '',
            phone: '',
            about: '',
            jobs: ['طبيب', 'مهندس', 'مدرس'],
            jobDetails: [],
            engineers_Categorie: [
                'كهرباء',
                'اتصالات',
                'معمارى',
                'مدنى',
                'ميكاترونيكس',
                'باور ',
                'حاسبات',
                'ديكور',
                'زراعة',
            ],
            medicalCategorie: [
                'امراض القلب',
                'عيون',
                'عظام',
                'نساء وتوليد',
                'اطفال',
                'جلدية',
                'اسنان',
                'مخ واعصاب',
                'اورام',
            ],
            teacherCategorie: [
                'لغة عربية',
                'لغة انجليزية',
                'لغة فرنسية',
                'لغة المانية',
                'لغة اطالية',
                'رياضيات',
                'دراسات',
                'جعرافيا',
                'تاريخ',
                'فيزياء',
                'فلسفة و علم النفس',
                'كيمياء',
                'احياء',
                'جيلوجيا',
            ],
            location: false,
            error_count: 0,
            error_name: '',
            error_phone: '',
            select1: false,
            select2: false,
            e_select1: '',
            e_select2: '',
            id: 5,
            back_done: false,
            back_message: '',
            test: true,
        };
    }
    componentDidMount() {
        this.requestCameraPermission();
    }
    post_data() {
        let data_to_sent = {
            user_id: this.state.id,
            emplyee_name: this.state.name,
            emplyee_phone: this.state.phone,
            emplyee_job: this.state.select1,
            emplyee_specialty: this.state.select2,
            emplyee_address: 'ssssss',
            emplyee_informations: this.state.about,
            emplyee_image: this.state.photo_uri,
        };
        axios
            .post(
                'https://esraatarek.000webhostapp.com/Services/add_employee.php',
                data_to_sent,
            )
            .then(res => {
                if (res.status == 200) {
                    console.log(res.data);
                    if (res.data == 'inserted before' || res.data == 'not inserted  , not inserted2') {
                        this.setState({
                            back_done: false
                        });
                        //   // }
                        //   // else if (res.data == 'not inserted  , not inserted2') {
                        //   //     this.setState({ back_done: false, back_message: 'لم يتم الإضافه..حاول مره اخرى.' });
                    }
                }
            });
    }
    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            console.log('granted', granted);
            if (granted === 'granted') {
                console.log('You can use Geolocation');
                return true;
            } else {
                console.log('You cannot use Geolocation');
                return false;
            }
        } catch (err) {
            return false;
        }
    };
    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    getLocation = () => {
        const result = this.requestLocationPermission();
        result.then(res => {
            console.log('res is:', res);
            if (res) {
                Geolocation.getCurrentPosition(
                    position => {
                        console.log(position);
                        this.notifyMessage('تم تحديد الموقع بنجاح .');
                        this.setState({ Location: position,location:true });
                    },
                    error => {
                        console.log(error.code, error.message);
                        this.setState({ location: false });
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        });
        console.log(this.state.location);
    };

    selectFromGallery = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary({ options, includeBase64: true }, res => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                this.setState({
                    photo_data: res.assets[0],
                    photo_uri: res.assets[0].uri,
                });
            }
        });
    };

    launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, res => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                this.setState({
                    photo_data: res.assets[0],
                    photo_uri: res.assets[0].uri,
                });
            }
        });
    };
    notifyMessage(msg) {
        ToastAndroid.showWithGravityAndOffset(
            msg,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    }

    validatePhoneNumber = number => {
        const isValidPhoneNumber = validator.isMobilePhone(number);
        return isValidPhoneNumber;
    };

    save() {
        let name = this.state.name;
        let phone = this.state.phone;
        let name_error = '';
        let phone_error = '';
        var error_count = 0;

        if (name == '') {
            name_error = 'لا يجب أن يكون الاسم فارغ !';
            error_count++;
        } else if (name.trim().length < 3) {
            name_error = 'الاسم غير صحيح !';
            error_count++;
        } else {
            name_error = '';
        }

        if (phone == '') {
            phone_error = 'لا يجب أن يكون رقم الهاتف فارغ !';
            error_count++;
        } else if (!this.validatePhoneNumber(phone)) {
            console.log(this.validatePhoneNumber(phone));
            phone_error = 'رقم الهاتف غير صحيح !';
            error_count++;
        } else {
            phone_error = '';
        }
        if (this.state.select1 == false) {
            this.setState({ e_select1: ' يجب اختيار مهنه !' });
            error_count++;
        } else {
            this.setState({ e_select1: '' });
        }
        if (this.state.select2 == false) {
            this.setState({ e_select2: ' يجب اختيار تخصص !' });
            error_count++;
        } else {
            this.setState({ e_select2: '' });
        }
        if (error_count == 0 && this.state.back_done == true) {
            this.notifyMessage('تمت الإضافه بنجاح.');
            this.props.navigation.goBack();
        } else {
            if (error_count != 0) {
                this.setState({ error_count: error_count })
                this.notifyMessage("لم يتم الاضافه حدث خطأ ما !")
            }
            else if (this.state.back_done == false) {
                this.notifyMessage('هذه البيانات موجوده بالفعل..حاول مره اخرى.');
            }
        }
        this.setState({
            error_name: name_error,
            error_phone: phone_error,
            error_count:error_count
        });
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
                    backgroundColor={Constant.statusBar.backgroundColor}
                />
                <View style={[Constant.container]}>
                    <View
                        style={[
                            Constant.header.headerStyle,
                            { justifyContent: 'space-between' },
                        ]}>
                        <View style={{ width: width * 0.1, alignItems: 'center' }}>
                            <TouchableOpacity
                                // disabled={this.state.location}
                                onPress={() => {
                                    this.state.location == false ?
                                        this.notifyMessage("يجب تحديد الموقع حتى يتم الإضافه !")
                                        :
                                        this.save();
                                }}>
                                <Icon2 name="add-task" color={ '#7eab9b'} size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: width * 0.7, alignItems: 'center' }}>
                            <Animatable.Text
                                animation={'zoomIn'}
                                delay={100 * 5}
                                style={{
                                    color: Constants.fonts.mainColor,
                                    fontSize: Constants.fonts.mainFontSize,
                                    fontFamily: Constants.fonts.fontFamily,
                                }}>
                                مقدم خدمه
                            </Animatable.Text>
                        </View>
                        <View style={{ width: width * 0.1, alignItems: 'center' }}>
                            <TouchableOpacity
                                // disabled={this.state.test ? true : false}
                                onPress={() => {
                                    this.props.navigation.goBack();
                                }}>
                                <Ionicons name="arrow-undo" color={'#7eab9b'} size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1, marginBottom: this.state.about == '' ? 30 : 30 }}>
                        <View style={{ alignItems: 'center', height: height, width: '100%' }}>
                            <View style={styles.top_view_picture}>
                                {this.state.photo_uri == '' ? (
                                    <TouchableOpacity
                                        onPress={() => this.RBSheet.open()}
                                        style={styles.view_picture}>
                                        <Icon name={'user-circle-o'} size={150} color={color} />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={styles.view_picture}>
                                        <Image
                                            source={{ uri: this.state.photo_uri }}
                                            style={styles.image_style}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>

                            <TouchableOpacity
                                style={styles.view_plus}
                                onPress={() => {
                                    this.RBSheet.open();
                                }}>
                                <Icon
                                    name={'plus'}
                                    size={16}
                                    color={'white'}
                                    style={{ alignSelf: 'center' }}
                                />
                            </TouchableOpacity>
                            <RBSheet
                                ref={ref => {
                                    this.RBSheet = ref;
                                }}
                                height={140}
                                closeOnDragDown={true}
                                closeOnPressMask={true}
                                openDuration={200}
                                customStyles={{
                                    container: {
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderTopLeftRadius: 30,
                                        borderTopRightRadius: 30,
                                    },
                                    draggableIcon: {
                                        backgroundColor: Constants.fonts.mainColor,
                                        marginTop: -12,
                                    },
                                }}>
                                <View
                                    style={{
                                        width: width,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.selectFromGallery();
                                            this.RBSheet.close();
                                        }}>
                                        <Image
                                            source={require('../assets/Image/g.png')}
                                            style={{ height: 80, width: 80 }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.launchCamera();
                                            this.RBSheet.close();
                                        }}>
                                        <Image
                                            source={{
                                                uri: 'https://img.freepik.com/premium-vector/photo-presentation-photo-camera-playback-photo-slides-lens-isolated-vector-render-illustration_660702-131.jpg?w=740',
                                            }}
                                            style={{ height: 80, width: 80 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </RBSheet>
                            <View
                                style={{ alignItems: 'center', height: height, width: '100%' }}>
                                <View style={styles.view_text_input}>
                                    <Icon
                                        name={'user-circle-o'}
                                        size={22}
                                        color={color}
                                        style={styles.icon_text_input}
                                    />

                                    <TextInput
                                        placeholder="الإسم"
                                        color={Constants.fonts.mainColor}
                                        placeholderTextColor={'#756e6e'}
                                        value={this.state.name}
                                        onChangeText={value => {
                                            this.setState({ name: value.trim(), x: true });
                                        }}
                                        style={styles.text_input}
                                    />
                                </View>
                                {this.state.error_name == '' ? null : (
                                    <Text
                                        style={{
                                            fontSize: Constants.fonts.fontSize_14,
                                            color: '#f00',
                                            fontFamily: Constants.fonts.fontFamily3,
                                            alignSelf: 'flex-start',
                                            marginLeft: 20,
                                        }}>
                                        {this.state.error_name}
                                    </Text>
                                )}
                                <View style={styles.view_text_input}>
                                    <Icon1
                                        name={'phone-alt'}
                                        size={22}
                                        color={color}
                                        style={styles.icon_text_input}
                                    />
                                    <TextInput
                                        placeholder="الرقم "
                                        color={Constants.fonts.mainColor}
                                        placeholderTextColor={'#756e6e'}
                                        keyboardType="number-pad"
                                        value={this.state.phone}
                                        onChangeText={value => {
                                            this.setState({ phone: value.trim(), x: true });
                                        }}
                                        style={styles.text_input}
                                    />
                                </View>
                                {this.state.error_phone == '' ? null : (
                                    <Text
                                        style={{
                                            fontSize: Constants.fonts.fontSize_14,
                                            color: '#f00',
                                            fontFamily: Constants.fonts.fontFamily3,
                                            alignSelf: 'flex-start',
                                            marginLeft: 20,
                                        }}>
                                        {this.state.error_phone}
                                    </Text>
                                )}
                                <View style={styles.view_text_input}>
                                    <Icon2
                                        name={'work'}
                                        size={22}
                                        color={color}
                                        style={styles.icon_text_input}
                                    />

                                    <SelectDropdown
                                        data={this.state.jobs}
                                        onSelect={(selectedItem, index) => {
                                            index == 0 ? 
                                                this.setState({ jobDetails: this.state.medicalCategorie, select1: true})
                                                : index == 1 ? 
                                                    this.setState({ jobDetails: this.state.engineers_Categorie, select1: true})
                                                    : this.setState({ jobDetails: this.state.teacherCategorie, select1: true})
                                                }}
                                        defaultButtonText={'المهنه'}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem;}}
                                        rowTextForSelection={(item, index) => {
                                            return item;}}
                                        buttonStyle={styles.dropdown2BtnStyle}
                                        buttonTextStyle={styles.dropdown2BtnTxtStyle}
                                        renderDropdownIcon={isOpened => {
                                            return (
                                                <Icon
                                                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                                                    color={color}
                                                    size={18}
                                                />
                                            );}}
                                        dropdownIconPosition={'right'}
                                        dropdownStyle={styles.dropdown2DropdownStyle}
                                        rowStyle={styles.dropdown2RowStyle}
                                        rowTextStyle={styles.dropdown2RowTxtStyle}
                                    />
                                    
                                </View>
                                {this.state.e_select1 == '' ? null : (
                                    <Text
                                        style={{
                                            fontSize: Constants.fonts.fontSize_14,
                                            color: '#f00',
                                            fontFamily: Constants.fonts.fontFamily3,
                                            alignSelf: 'flex-start',
                                            marginLeft: 20,
                                        }}>
                                        {this.state.e_select1}
                                    </Text>
                                )}
                                <View style={styles.view_text_input}>
                                    <Icon2
                                        name={'details'}
                                        size={22}
                                        color={color}
                                        style={styles.icon_text_input}
                                    />
                                    <SelectDropdown
                                        data={this.state.jobDetails}
                                        disabled={!this.state.select1 ? true : false}
                                        onSelect={(selectedItem, index) => {
                                            this.setState({ select2: true });
                                            console.log(selectedItem, index);
                                        }}
                                        defaultButtonText={'التخصص'}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem;
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item;
                                        }}
                                        buttonStyle={styles.dropdown2BtnStyle}
                                        buttonTextStyle={styles.dropdown2BtnTxtStyle}
                                        renderDropdownIcon={isOpened => {
                                            return (
                                                <Icon
                                                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                                                    color={color}
                                                    size={18}
                                                />
                                            );
                                        }}
                                        dropdownIconPosition={'right'}
                                        dropdownStyle={styles.dropdown2DropdownStyle}
                                        rowStyle={styles.dropdown2RowStyle}
                                        rowTextStyle={styles.dropdown2RowTxtStyle}
                                    />
                                </View>
                                {this.state.e_select2 == '' ? null : (
                                    <Text
                                        style={{
                                            fontSize: Constants.fonts.fontSize_14,
                                            color: '#f00',
                                            fontFamily: Constants.fonts.fontFamily3,
                                            alignSelf: 'flex-start',
                                            marginLeft: 20,
                                        }}>
                                        {this.state.e_select2}
                                    </Text>
                                )}
                                <View style={styles.TextInput_style}>
                                    <Icon3
                                        name={'card-account-details'}
                                        size={22}
                                        color={color}
                                        style={[styles.icon_text_input]}
                                    />
                                    <TextInput
                                        multiline={true}
                                        placeholder="نبذه..."
                                        color={Constants.fonts.mainColor}
                                        placeholderTextColor={'#756e6e'}
                                        value={this.state.about}
                                        numberOfLines={5}
                                        onChangeText={value => {
                                            this.setState({ about: value });
                                        }}
                                        style={{
                                            marginLeft: 5,
                                            color: Constant.fonts.mainColor,
                                            fontWeight: 'bold',
                                            fontSize: 16,
                                            width: '86%',
                                            height: '100%',
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        height: height * 0.1,
                                        width: Constant.search.textInputStyle.width,
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                        flexDirection: 'row',
                                        marginTop: 20,
                                    }}>
                                    <Text
                                        style={[
                                            Constants.fonts,
                                            {
                                                color: Constants.fonts.mainColor,
                                                fontSize: Constants.fonts.mainFontSize,
                                            },
                                        ]}>
                                        الموقع :{' '}
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            width: '40%',
                                            height: '60%',
                                            borderRadius: 10,
                                            backgroundColor: '#289b2c',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => {
                                            this.getLocation();
                                            this.post_data();
                                        }}>
                                        <Icon4 name={'location'} size={28} color={'#fff'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={{ height: 70, width: width }}></View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    TextInput_style: {
        width: Constant.search.textInputStyle.width,
        borderWidth: 2,
        borderColor: '#7eab9b',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 15,
        borderRadius: 15,
        height: height * 0.1,
    },
    top_view_picture: {
        height: height * 0.24,
        width: width * 0.51,
        borderRadius: 93,
        borderWidth: 2,
        borderColor: '#7eab9b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    view_picture: {
        // backgroundColor: '#7eab9b',
        height: height * 0.21,
        width: width * 0.44,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image_style: {
        height: '100%',
        width: '100%',
        borderRadius: 95,
    },
    view_plus: {
        backgroundColor: '#7eab9b',
        marginTop: -42,
        marginLeft: 128,
        height: height * 0.05,
        width: width * 0.11,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 3,
    },
    view_text_input: {
        height: height * 0.065,
        width: Constant.search.textInputStyle.width,
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#7eab9b',
        marginBottom: 5,
        marginTop: 20,
        borderRadius: 15,
    },
    text_input: {
        width: '86%',
        marginRight: 20,
        marginLeft: 5,
        color: Constant.fonts.mainColor,
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: Constants.fonts.fontFamily,
    },
    icon_text_input: {
        height: height * 0.03,
        width: width * 0.08,
        marginLeft: 5,
    },
    dropdown2BtnStyle: {
        width: '88%',
        height: '100%',
        borderRadius: 15,
        backgroundColor: '#fff',
    },
    dropdown2BtnTxtStyle: {
        color: Constants.fonts.mainColor,
        textAlign: 'left',
        fontWeight: 'bold',
        fontFamily: Constants.fonts.fontFamily,
        marginLeft: -width * 0.001,
    },
    dropdown2DropdownStyle: {
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    dropdown2RowStyle: { backgroundColor: '#fff', padding: 5 },
    dropdown2RowTxtStyle: {
        color: Constants.fonts.mainColor,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: Constants.fonts.fontFamily,
    },
});
