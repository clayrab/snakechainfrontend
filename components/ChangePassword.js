import React from 'react';
import {
    StyleSheet,
    Text, ScrollView,
    TextInput, Image,
    View, ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { Font } from 'expo';

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonDynamicStyle: {}
        };
    }
    async componentDidMount() {
        await Font.loadAsync({
            'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
        });
        this.setState({
            buttonDynamicStyle: {
                fontFamily: 'riffic-free-bold',
            }
        });
    }
    render() {
        return (
            <ImageBackground source={require("../assets/changePassword/background.png")} resizeMode={"stretch"} style={styles.screen}>
                <View style={styles.titleView}>
                    <Text style={[styles.titleText, this.state.buttonDynamicStyle]}> CHANGE PASSWORD </Text>
                </View>
                <View style={styles.inputView}>
                    <ImageBackground source={require("../assets/edit/input.png")} resizeMode={"stretch"} style={styles.textBoxImage}>
                        <View style={styles.lockImageView}>
                            <Image source={require("../assets/changePassword/lock.png")} style={styles.lockImage} />
                        </View>
                        <View style={styles.inputTextView}>
                            <TextInput placeholder={'Old Password'} placeholderTextColor={'#EEB71A'}
                                style={[styles.textBox, this.state.buttonDynamicStyle]} underlineColorAndroid={'transparent'} />
                        </View>
                    </ImageBackground>
                    <ImageBackground source={require("../assets/edit/input.png")} resizeMode={"stretch"} style={styles.textBoxImage}>
                        <View style={styles.lockImageView}>
                            <Image source={require("../assets/changePassword/lock.png")} style={styles.lockImage} />
                        </View>
                        <View style={styles.inputTextView}>
                            <TextInput placeholder={'New Password'} placeholderTextColor={'#EEB71A'}
                                style={[styles.textBox, this.state.buttonDynamicStyle]} underlineColorAndroid={'transparent'} />
                        </View>
                    </ImageBackground>
                    <ImageBackground source={require("../assets/edit/input.png")} resizeMode={"stretch"} style={styles.textBoxImage}>
                        <View style={styles.lockImageView}>
                            <Image source={require("../assets/changePassword/lock.png")} style={styles.lockImage} />
                        </View>
                        <View style={styles.inputTextView}>
                            <TextInput placeholder={'Re Enter New Password'} placeholderTextColor={'#EEB71A'}
                                style={[styles.textBox, this.state.buttonDynamicStyle]} underlineColorAndroid={'transparent'} />
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.confirmButtonView}>
                    <ImageBackground source={require("../assets/changePassword/confirmButton.png")} resizeMode={"stretch"} style={styles.confirmButtonImage}>
                    <Text style = {[styles.confirmText , this.state.buttonDynamicStyle]}> CONFIRM </Text>
                    </ImageBackground>
                </View>
            </ImageBackground>
        );
    }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    titleText: { fontSize: screenHeight / 25, color: '#FDB623' },
    titleView: { flex: 1, justifyContent: 'center', alignItems: 'center', },
    inputView: { flex: 2, justifyContent: "center", alignItems: 'center' },
    inputTextView: { flex: 3.4 },
    textBoxView: { marginTop: "2%" },
    textBoxImage: {
        height: screenHeight / 11,
        marginVertical: '3%',
        marginHorizontal: '7%',
        flexDirection: "row",
        alignItems: "center"
    },
    textBox: {
        fontSize: screenHeight / 34,
        paddingLeft: '1%',
        width: "90%",
        color: "#EEB71A",
        height: "100%"
    },
    confirmText : {color : '#372A25' , fontSize : screenHeight / 30},
    confirmButtonImage : {height :screenHeight / 9 , width : '70%' , justifyContent : 'center' , alignItems : 'center' },
    confirmButtonView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    lockImageView: { flex: 1, justifyContent: "center", alignItems: 'center', },
    lockImage: { height: "40%", width: '22%', resizeMode: 'stretch' }
});
