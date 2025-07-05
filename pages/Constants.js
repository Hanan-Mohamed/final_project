import { Dimensions } from "react-native"
const { width, height } = Dimensions.get('screen')
export const container = {
    height: height,
    width: width,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
}
export const statusBar = {
    backgroundColor: "#7eab9b"
}
export const header = {
    headerStyle: {
        height: height * 0.14,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },

}
export const fonts = {
    mainFontSize: 22,
    mainColor: '#040e46',
    // 
    fontFamily: 'Tajawal-ExtraBold',
    fontFamily2:'Tajawal-Bold',
    fontFamily3:'Tajawal-Medium',
    secondaryColor: '#fff',
    fontSize_16:16,
    fontSize_18:18,
    fontSize_20:20,
    fontSize_30:30,
    fontSize_14:14,
    fontSize_12:12,
    
}

export const search = {
    searchViewStyle: {
        flexDirection: "row",
        alignItems: "center",
        height: height * 0.048,
        width: width * 0.84,
        borderRadius: 12,
        backgroundColor: "#E9EFF3",
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    textInputStyle: {
        width: "90%",
        height: height * 0.05,
        fontSize: 16,
        fontFamily: 'Tajawal-Bold',
        color: '#040e46'
    },
    searchIconStyle: {
        size: 18,
        color: 'gray'
    }
}
export const touchableOpacityStyle = {
    width: width * .6,
    height: 40,
    borderRadius: width * .3,
    fontSize: 22
}
export const icons = {
    size: 18,
    color: '#3c8dc4'
}

export const font_16={
    fontFamily: 'Tajawal-Bold',
    fontSize:16
}
