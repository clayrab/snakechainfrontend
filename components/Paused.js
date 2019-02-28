import React from 'react';
import {
    StyleSheet,
    Text, ScrollView,
    TextInput, Image,
    View, ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { Font } from 'expo';
import SafeAreaView from 'react-native-safe-area-view';

const Box = ((props) =>
    <View style={styles.boxContainer}>
        <ImageBackground source={require('../assets/Paused/partionBackground.png')} resizeMode={"stretch"} style={[styles.boxView , props.customBoxStyle !== undefined ? props.customBoxStyle : null]}>
            <Text style={[styles.boxText, props.buttonStyle]}>{props.heading}</Text>
            <Image source={props.boxImage} style={[styles.boxImageView ,  props.customImage !== undefined ? props.customImage : null ]} />
            <ImageBackground source={require("../assets/Paused/circle.png")} resizeMode={"stretch"} style={styles.circleView} >
                <Text style={[styles.circleText, props.buttonStyle]}>{props.circleText}</Text>
            </ImageBackground>
        </ImageBackground>
        <ImageBackground source={require("../assets/Paused/inputBackground.png")} resizeMode={"stretch"} style={styles.numberInput}>
            <Image source={require("../assets/Paused/coinIcon.png")} style={[styles.coinStyle, props.imageStyle]} />
            <Text style={[styles.coinText, props.buttonStyle]}>{props.inputNumber}</Text>
        </ImageBackground>
    </View>
)

export default class Paused extends React.Component {
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
            <ImageBackground source={require("../assets/Paused/background.png")} resizeMode={"stretch"} style={styles.backgroundImage}>
                <Image source={require("../assets/Paused/close.png")} style={styles.closeButton} resizeMode={"stretch"} />
                <Text style={[styles.title, this.state.buttonDynamicStyle]}>PAUSED</Text>
                <ScrollView>
                  <View style={styles.powerUpsView}>
                      <Image source={require("../assets/Paused/lightning.png")} style={styles.lightningImage} />
                      <Text style={[styles.powerText, this.state.buttonDynamicStyle]}>POWER-UPS</Text>
                  </View>
                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                        <Box buttonStyle={this.state.buttonDynamicStyle} boxImage={require('../assets/Paused/timeslowdown.png')} inputNumber={"300"}   circleText={'5'} heading={'Time Slowdown'} />
                        <View style={styles.boxContainer}>
                            <ImageBackground source={require('../assets/Paused/partionBackground.png')} resizeMode={"stretch"} style={styles.boxView}>
                                <Text style={[styles.boxText, this.state.buttonDynamicStyle]}>Ghost Tail</Text>
                                <Image source={require('../assets/Paused/ghost.png')} style={styles.boxImageView} />
                                <ImageBackground source={require("../assets/Paused/circle.png")} resizeMode={"stretch"} style={styles.circleView} >
                                    <Text style={[styles.circleText]}>5</Text>
                                </ImageBackground>
                            </ImageBackground>
                            <ImageBackground source={require("../assets/Paused/inputBackground.png")} resizeMode={"stretch"} style={[styles.numberInput, styles.ghostTail]}>
                                <Image source={require("../assets/Paused/minus.png")} style={[styles.plusMinusImage]} />
                                <Text style={[styles.coinText , this.state.buttonDynamicStyle]}>2</Text>
                                <Image source={require("../assets/Paused/plus.png")} style={[styles.plusMinusImage]} />
                            </ImageBackground>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                        <Box buttonStyle={this.state.buttonDynamicStyle} boxImage={require('../assets/Paused/sizer.png')} customImage = {styles.customImage} inputNumber={"1000"}  circleText={'5'} heading={'Drop 5c Tail'} />
                        <Box buttonStyle={this.state.buttonDynamicStyle} boxImage={require('../assets/Paused/fulltail.png')} inputNumber={"1000"} customImage = {styles.customTailImage}    circleText={'5'} heading={'Shed Full Tail'} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                        <Box buttonStyle={this.state.buttonDynamicStyle}  boxImage={require('../assets/Paused/5X.png')} customImage = {styles.custom5Image}   inputNumber={"1000"}  circleText={'5'} heading={'SX Pallets'} />
                        <Box buttonStyle={this.state.buttonDynamicStyle} boxImage={require('../assets/Paused/questionMark.png')} inputNumber={"1000"}  circleText={'5'} heading={'Random'} />
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
    screen: { flex: 1, },
    closeButton: { position: "absolute", top: -6, right: -4, height: screenHeight / 12, width: screenWidth / 10 },
    coinText: { color: "#FDB525", marginHorizontal: "7%", fontSize: 15 },
    ghostTail: { justifyContent: "space-around" },
    plusMinusImage: { height: "45%", width: "15%", resizeMode: "stretch", marginHorizontal: "2%" },
    coinStyle: { height: "42%", width: "17%", resizeMode: "stretch" },
    numberInput: { height: "20%", width: "90%", flexDirection: "row", justifyContent: "center", alignItems: "center" },
    boxContainer: { height: screenHeight / 3, width: '45%', justifyContent: "space-around", padding: "5%" },
    backgroundImage: { flex: 1, marginTop: '2%', marginLeft: '2%', marginRight: '2%', },
    circleText: { color: "#271E11", fontSize: 18 },
    circleView: { position: "absolute", top: -10, height: "22%", width: "25%", justifyContent: "center", alignItems: "center" },
    boxText: { color: "#FBBD3E", marginTop: '10%', textAlign: "center", paddingLeft: '4%', fontSize: 12, marginBottom: "5%" },
    boxImageView: { resizeMode: "stretch", height: "40%", width: "40%" },
    customImage : {resizeMode: "stretch", height: "33%", width: "70%", marginRight:  "12%"},
    custom5Image : {resizeMode: "stretch", height: "30%", width: "40%" },
    customBoxStyle : {alignItems : 'flex-end'},
    customTailImage : {resizeMode: "stretch", height: "42%", width: "50%", },
    boxView: { height: '70%', width: '92%', justifyContent: "center", alignItems: "center" },
    powerUpsView: { height: screenHeight / 7, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', },
    lightningImage: { height: '85%', width: '10%', resizeMode: 'stretch', marginHorizontal: "2%", },
    title: { color: '#FCB623', fontSize: screenHeight / 21, textAlign: "center", marginTop: '1.2%', marginBottom: "3%" },
    powerText: { color: '#FDCF00', fontSize: screenHeight / 26, }
});
