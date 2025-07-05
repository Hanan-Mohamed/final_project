import React from 'react';
import {
    NativeModules,
    Text,
    TouchableOpacity,
    Image,
    View,
    Dimensions,
    TextInput,
    FlatList,
    BackHandler
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters-ch';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Constants from '../constants/Constants'
import * as Animatable from 'react-native-animatable'
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
const { width, height } = Dimensions.get('window');
export default class Search_page extends React.Component {
    getData() {
        const { person } = this.props.route.params;



        if (person.title == "معمارى") {
            axios.get('https://esraatarek.000webhostapp.com/Services/architecture_engineer.php').then(
                res => {
                    if (res.status == 200) {
                        console.log(res.data);
                        if (res.data != "no data") {
                            this.setState({ persons: res.data })
                        }
                    }
                }
            )
        }
        else if (person.title == "زراعة") {
            axios.get('https://esraatarek.000webhostapp.com/Services/argiculture_engineer.php').then(
                res => {
                    if (res.status == 200) {
                        console.log(res.data);
                        if (res.data != "no data") {
                            this.setState({ persons: res.data })
                        }
                    }
                }
            )
        }
        else if (person.title == "ديكور") {
            axios.get('https://esraatarek.000webhostapp.com/Services/decor_engineer.php').then(
                res => {
                    if (res.status == 200) {
                        console.log(res.data);
                        if (res.data != "no data") {
                            this.setState({ persons: res.data })
                        }



                    }
                }
            )
        }
        else if (person.title == "مدنى") {
            axios.get('https://esraatarek.000webhostapp.com/Services/civil_engineer.php').then(
                res => {
                    if (res.status == 200) {
                        console.log(res.data);
                        if (res.data != "no data") {
                            this.setState({ persons: res.data })
                        }
                    }
                }
            )
        }
        else if (person.title == "باور") {
            axios.get('https://esraatarek.000webhostapp.com/Services/bower_engineer.php').then(
                res => {
                    if (res.status == 200) {
                        console.log(res.data);
                        if (res.data != "no data") {
                            this.setState({ persons: res.data })
                        }
                    }
                }
            )
        }
        else if (person.title == "حاسبات") {
            axios.get('https://esraatarek.000webhostapp.com/Services/computer_engineer.php').then(
                res => {
                    if (res.status == 200) {
                        console.log(res.data);
                        if (res.data != "no data") {
                            this.setState({ persons: res.data })
                        }
                    }
                }
            )
        }
        else if (person.title == "كهرباء") {
            axios.get('https://esraatarek.000webhostapp.com/Services/lectric_engineer.php').then(
                res => {
                    if (res.status == 200) {
                        console.log(res.data);
                        if (res.data != "no data") {
                            this.setState({ persons: res.data })
                        }
                    }
                }
            )
        }
        else if (person.title == "ميكاترونيكس") {
            axios.get('https://esraatarek.000webhostapp.com/Services/mechatronics_engineer.php').then(
                res => {
                    if (res.status == 200) {
                        console.log(res.data);
                        if (res.data != "no data") {
                            this.setState({ persons: res.data })
                        }
                    }
                }
            )
        }
        else if (person.title == "ميكاترونيكس") {
            axios.get('https://esraatarek.000webhostapp.com/Services/mechatronics_engineer.php').then(
                res => {
                    if (res.status == 200) {
                        console.log(res.data);
                        if (res.data != "no data") {
                            this.setState({ persons: res.data })
                        }
                    }
                }
            )
        }
        else if (person.title == "اتصالات") {
            axios.get('https://esraatarek.000webhostapp.com/Services/telecom_engineer.php').then(
                res => {
                    if (res.status == 200) {
                        console.log(res.data);
                        if (res.data != "no data") {
                            this.setState({ persons: res.data })
                        }
                    }
                }
            )
        }


    }

    UNSAFE_componentWillMount() {
        this.focusListener = this.props.navigation.addListener(
            'focus',
            () =>
                this.getData()


        );

        Dimensions.addEventListener('change', ({ window }) => {
            const new_width = window.width
            const new_height = window.height
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
                left_w: 60,
                height_b: 60,
                persons: [
                ]
                ,
                Fav_persons: [],

                Tap1: [
                    {
                        titlt: 'الكل',
                        value: true
                    },
                    {
                        titlt: 'المفضلين',
                        value: false
                    },
                ],
                TopTab_press: 0,
                search_val: '',
                categori: '',
                x: 1,
                index: ''
            }
        }
    }

    Add_to_fav(index) {
        let arr = this.state.persons
        let fav_arr = this.state.Fav_persons
        let obj = {
            id: arr[index].engineer_id,
            name: arr[index].engineer_name,
            img: arr[index].engineer_image,
            location: arr[index].engineer_address,
            about: arr[index].engineer_information,
            fav: arr[index].fav,
            phone:arr[index].engineer_phone,
            rate: arr[index].engineer_rate,
            show: true
        }
        // for (let i=0;i<arr.length;i++){
        //     if (arr[i].fav==1){
        //         fav_arr.push(arr[i])
        //     }
        // }
        if (arr[index].fav==1) {
            fav_arr.push(obj)
            console.log(fav_arr)
        }
        else {
            for (let i = 0; i < fav_arr.length; i++) {
                if (arr[i].fav == obj.fav)
                    fav_arr.splice(i, 1)
            }
        }
    }

    componentDidMount() {
        this.common()
    }

    common() {
        let arr = this.state.persons
        let old_arr = []
        let common_arr = []
        let fav = [1]

        for (let i = 0; i < arr.length; i++) {
            let x = arr[i]
            old_arr.splice(i, 0, x)
        }

        for (let i = 0; i < arr.length; i++) {
            let x = arr[i]
            let temp
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j].rate >= x.rate) {
                    temp = x
                    x = arr[j]
                    arr[j] = temp

                }
            }
            common_arr.push(x)
        }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].fav == 1) {
                console.log(fav)
                fav.push(arr[i])
            }
        }
        // console.log(fav)
        this.setState({ persons: common_arr, })

    }


    Search(value) {
        let arr = this.state.persons
        let found = false
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].engineer_name.includes(value)) {
                arr[i].show = true
                found = true
            }
            else {
                arr[i].show = false
            }
        }
        this.setState({ persons: arr })

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
        const { person } = this.props.route.params;
        const { icon } = this.props.route.params;

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <View
                    style={[Constants.header.headerStyle, { justifyContent: 'space-between', height: height * .14 }]}>
                    <View style={{ width: width * .1, alignItems: 'center' }}>
                        {icon == 'engineering' ?
                            <Icon3 name={icon} size={30} color='#7eab9b' /> :
                            <Icon name={icon} size={30} color='#7eab9b' />
                        }
                    </View>
                    <Animatable.View
                        animation={'zoomIn'}
                        style={{
                            width: width * .7,
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            fontSize: 24,
                            fontFamily: Constants.fonts.fontFamily,
                            color: Constants.fonts.mainColor,
                        }}>
                            {person.title}
                        </Text>
                    </Animatable.View>
                    <View style={{ width: width * .1, alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                            <Ionicons name="arrow-undo" color={'#7eab9b'} size={24} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[Constants.search.searchViewStyle, { alignSelf: 'center', backgroundColor: "#E9EFF3", }]}>
                    <Icon name="search" color={'gray'} size={18}
                        style={{
                            marginRight: 5
                        }} />
                    <TextInput
                        style={[Constants.search.textInputStyle, { backgroundColor: "#E9EFF3", }]}
                        placeholderTextColor={"gray"}
                        placeholder="بحث"
                        value={this.state.search_key}
                        onChangeText={value => {
                            this.setState({ search_val: value })
                            this.Search(value)
                        }} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '80%',
                    justifyContent: 'space-around',
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    marginRight: 10

                }}>
                    {
                        this.state.Tap1.map((tab, index) => (
                            <TouchableOpacity style={{
                                width: verticalScale(100),
                                height: scale(45),
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                                onPress={() => {
                                    let arr = this.state.Tap1
                                    for (let i = 0; i < arr.length; i++) {
                                        if (i != index)
                                            arr[i].value = false
                                    }
                                    arr[index].value = true
                                    this.setState({ TopTab_press: index, Tap1: arr, common: true })
                                    if (index == 0) {
                                        this.common()
                                    }
                                }}
                            >
                                <Text style={{
                                    color: Constants.fonts.mainColor,
                                    fontSize: Constants.fonts.fontSize_18,

                                    fontFamily: tab.value ? Constants.fonts.fontFamily2 : Constants.fonts.fontFamily3
                                }}>
                                    {tab.titlt}</Text>
                                {
                                    tab.value ?
                                        <View style={{
                                            width: tab.titlt.length > 5 ? '100%' : '70%',
                                            height: 1,
                                            backgroundColor: '#040e46',
                                            marginTop: 2
                                        }}>



                                        </View>
                                        :
                                        null
                                }
                            </TouchableOpacity>
                        )
                        )
                    }


                </View>
                <View style={{ width: '100%', height: '80%', }}>

                    {

                        this.state.TopTab_press == 0 ?
                            <FlatList
                                data={this.state.persons}
                                style={{ marginBottom: 120, marginTop: 5 }}
                                renderItem={({ item, index }) => {
                                    return (
                                        item.show ?
                                            <Animatable.View
                                                // delay={10 * (index + 1)}
                                                animation={'flipInX'}
                                                easing={'ease-in-cubic'}
                                                style={{
                                                    width: '90%',
                                                    height: scale(95),
                                                    marginBottom: 15,
                                                    alignSelf: 'center',
                                                    flexDirection: 'row',
                                                    borderRadius: 20
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
                                                                    categori: person.title
                                                                })
                                                        }}
                                                        style={{
                                                            width: '85%',
                                                            height: '100%',
                                                            flexDirection: 'row'
                                                        }}>

                                                        <Image
                                                            source={
                                                                { uri: item.engineer_image }}
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
                                                        <TouchableOpacity style={{ width: 50, height: 50, alignItems: 'flex-start' }}
                                                            disabled={item.fav == 1 ? true : false}
                                                            onPress={() => {
                                                                let x = this.state.x
                                                                x++
                                                                this.setState({ x: x })
                                                                let arr = this.state.persons
                                                                let obj = {
                                                                    engineer_address: item.engineer_address,
                                                                    engineer_id: item.engineer_id,
                                                                    engineer_image: item.engineer_image,
                                                                    engineer_name: item.engineer_name,
                                                                    engineer_rate: item.engineer_rate,
                                                                    engineer_type: item.engineer_type,
                                                                    engineer_user_id: item.engineer_user_id,
                                                                    engineer_information: item.engineer_information,
                                                                    show: item.show,
                                                                    fav: !item.fav
                                                                }
                                                                for (let i = 0; i < arr.length; i++) {
                                                                    if (i == index) {
                                                                        arr.splice(i, 1, obj)
                                                                    }
                                                                }
                                                                this.setState({ persons: arr })
                                                                this.Add_to_fav(index)

                                                            }}

                                                        >

                                                            <Icon2 name={item.fav == 1 ? 'heart' : 'hearto'} color={item.fav == 1 ? 'red' : 'gray'}
                                                                size={24} style={{ margin: 10 }} />
                                                        </TouchableOpacity>
                                                    }
                                                </View>
                                            </Animatable.View>
                                            :
                                            <View
                                                style={{
                                                    height: height * 0.5,
                                                    width: width,
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

                                    )
                                }}

                            /> :
                            this.state.TopTab_press == 1 && this.state.x >= 1 ?
                                <FlatList
                                    data={this.state.persons}
                                    style={{ marginBottom: 120, marginTop: 5 }}
                                    renderItem={({ item, index }) => {
                                        return (
                                            item.fav == 1 ?
                                                (
                                                    <View
                                                        // delay={100 * (index + 1)}
                                                        animation={'flipInX'}
                                                        easing={'ease-in-cubic'} style={{
                                                            width: '90%',
                                                            height: scale(95),
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
                                                                            categori: person.title
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


                                                                <View style={{width:120}}>

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
                                                                            item.rate < 1 ?
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
                                                                <TouchableOpacity style={{ width: 50, height: 50, }}
                                                                    onPress={() => {
                                                                        let x = this.state.x
                                                                        x--
                                                                        this.setState({ x: x })
                                                                        let arr = this.state.persons
                                                                        let obj = {
                                                                            engineer_address: item.engineer_address,
                                                                            engineer_id: item.engineer_id,
                                                                            engineer_image: item.engineer_image,
                                                                            engineer_name: item.engineer_name,
                                                                            engineer_rate: item.engineer_rate,
                                                                            engineer_type: item.engineer_type,
                                                                            engineer_user_id: item.engineer_user_id,
                                                                            engineer_information: item.engineer_information,
                                                                            show: item.show,
                                                                            fav: !item.fav
                                                                        }
                                                                        for (let i = 0; i < arr.length; i++) {
                                                                            if (i == index) {
                                                                                arr.splice(i, 1, obj)
                                                                            }
                                                                        }
                                                                        this.setState({ persons: arr })
                                                                        this.Add_to_fav(index)
                                                                    }}
                                                                >
                                                                    <Icon1 name='times' color='gray'
                                                                        size={20} style={{ margin: 10 }} />
                                                                </TouchableOpacity>
                                                            }
                                                        </View>
                                                    </View>
                                                )
                                                : null
                                        )
                                    }} /> :
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
                </View >

            </View >

        )
    }
}





