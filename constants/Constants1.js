import { Dimensions } from "react-native"
const { width, height } = Dimensions.get('screen')
export const container = {
    height: height,
    width: width,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
}
export const header = {
    headerStyle: {
        height: height * 0.12,
        width: width,
        alignItems: 'center',
        flexDirection: 'row',
        padding: width*.05,
        justifyContent:'space-between'
    },
    headerTextStyle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#040e46',
        textAlign:'center'
    },

}
export const fonts = {
  
    itemFontSize: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    detailsFontSize: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
    }
}
export const images = {
    itemImage: {
        width: width * 0.2,
        height: height * 0.1,
        resizeMode: 'cover'
    },
    itemIcon: {
        width: width * 0.102,
        height: height * 0.102,
        resizeMode: 'contain'
    }
}
export const COLORS = {
    color1: '#00bcd450',
    color2: '#FFCEFF',
    color3: '#ff98006b',
    color4: '#ffe0b2',
    color5: '#ffeb3b6b',
    color6: '#8bc34a6b',
    color7: '#f4433640',
    color8: '#F8EBFF',
    color9: '#95E9ED',
    color10: '#E3F0F9',
    backgroundColors: '#fff'
}

export const item = {
    itemHeight: height * 0.14,
    itemWidth: width * 0.86,
}
export const search = {
    searchViewStyle: {
        flexDirection: "row",
        alignItems: "center",
        height: height * 0.05,
        width: width * 0.84,
        borderRadius: 12,
        backgroundColor: "#DDDDDD",
        paddingHorizontal: 10,
        marginBottom: 10,
        // borderColor:'#040e46',
        // borderWidth:2
    },
    textInputStyle: {
        width: "90%",
        height: height * 0.05,
        fontSize: 16,
        fontWeight: "bold",
        color:'#040e46'

    },
    searchIconStyle: {
        height: 30,
        width: 30
    }
}