import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Font} from 'expo';
import CONSTANTS from '../Constants.js';
import {normalize} from "../utils/FontNormalizer";

const CircleComp = (props) => (
  <View style={styles.circleView}>
    <Text style={[styles.circleText, props.buttonStyle]}>{props.value}</Text>
  </View>
);

const Box = ((props) =>
    <View style={styles.boxContainer}>
      <ImageBackground source={require('../assets/Paused/partionBackground.png')} resizeMode={"stretch"}
                       style={[styles.boxView, props.customBoxStyle !== undefined ? props.customBoxStyle : null]}>
        <Text style={[styles.boxText, props.buttonStyle]}>{props.heading}</Text>
        <Image source={props.boxImage}
               style={[styles.boxImageView, props.customImage !== undefined ? props.customImage : null]}/>
        <CircleComp value={props.circleText}/>
      </ImageBackground>
      <ImageBackground source={require("../assets/Paused/inputBackground.png")} resizeMode={"stretch"}
                       style={styles.numberInput}>
        <Image source={require("../assets/Paused/coinIcon.png")} style={[styles.coinStyle, props.imageStyle]}/>
        <Text style={[styles.coinText, props.buttonStyle]}>{props.inputNumber}</Text>
      </ImageBackground>
    </View>
)

export default class PowerupOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDyanmicStyle: {}
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    styles.buttonText = {
      fontFamily: 'riffic-free-bold'
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground style={styles.content} source={require('../assets/pauseoverlay/BackgroundBrown.png')}
                           resizeMode={'stretch'}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage}
                     resizeMode="stretch"/>
            </TouchableOpacity>
            <View style={styles.buttonView}>
              <ImageBackground style={styles.brownButton} source={require('../assets/snakemine/title.png')}
                               resizeMode={'stretch'}>
                <Text style={[styles.buttonText, styles.titleText]}>
                  POWERUPS
                </Text>
              </ImageBackground>
            </View>
            <ScrollView>
              <View style={{flexDirection: 'row', justifyContent: "center"}}>
                <Box buttonStyle={this.state.buttonDynamicStyle}
                     boxImage={require('../assets/powerupsoverlay/mushroom_yellow.png')}
                     inputNumber={"300"} circleText={'5'} heading={'Multiplayer (10x)'}/>
                <View style={styles.boxContainer}>
                  <ImageBackground source={require('../assets/Paused/partionBackground.png')} resizeMode={"stretch"}
                                   style={styles.boxView}>
                    <Text style={[styles.boxText, this.state.buttonDynamicStyle]}>Ghost Tail</Text>
                    <Image source={require('../assets/Paused/ghost.png')} style={styles.boxImageView}/>
                    <CircleComp value={0}/>
                  </ImageBackground>
                  <ImageBackground source={require("../assets/Paused/inputBackground.png")} resizeMode={"stretch"}
                                   style={[styles.numberInput, styles.ghostTail]}>
                    <Image source={require("../assets/Paused/minus.png")} style={[styles.plusMinusImage]}/>
                    <Text style={[styles.coinText, this.state.buttonDynamicStyle]}>2</Text>
                    <Image source={require("../assets/Paused/plus.png")} style={[styles.plusMinusImage]}/>
                  </ImageBackground>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      );
    }
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
const circleSize = screenWidth * 0.06;
var styles = StyleSheet.create({
  temporaryText: {
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: screenWidth * 4 / 5,
    height: screenHeight * 4 / 5,
    position: 'relative',
    flexDirection: 'column',
  },
  closeButton: {
    position: 'absolute',
    top: -20,
    right: -15,
    zIndex: 100,
  },
  closeButtonImage: {
    height: 50,
    width: 35
  },
  buttonView: {
    alignItems: 'center',
    marginTop: -15
  },
  brownButton: {
    width: screenWidth / 2,
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    color: "#fab523",
    fontSize: 16
  },
  screen: {flex: 1,},
  coinText: {color: "#FDB525", marginHorizontal: "7%", fontSize: normalize(13)},
  ghostTail: {justifyContent: "space-around"},
  plusMinusImage: {height: "45%", width: "15%", resizeMode: "stretch", marginHorizontal: "2%"},
  coinStyle: {height: "42%", width: "17%", resizeMode: "stretch"},
  numberInput: {width: "90%", flexDirection: "row", justifyContent: "center", alignItems: "center"},
  boxContainer: {height: screenHeight / 3, width: '45%', justifyContent: "space-around", padding: "5%"},
  backgroundImage: {flex: 1, marginTop: '2%', marginLeft: '2%', marginRight: '2%',},
  circleText: {color: "#271E11", fontSize: normalize(15)},
  circleView: {
    position: "absolute",
    top: -10,
    borderRadius: (circleSize) / 2,
    height: circleSize,
    width: circleSize,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAB523"
  },
  boxText: {
    color: "#FBBD3E",
    marginTop: '10%',
    textAlign: "center",
    paddingLeft: '4%',
    fontSize: normalize(10),
    marginBottom: "5%"
  },
  boxImageView: {resizeMode: "contain", height: "40%", width: "40%"},
  customImage: {resizeMode: "stretch", height: "33%", width: "70%", marginRight: "12%"},
  custom5Image: {resizeMode: "stretch", height: "30%", width: "40%"},
  customBoxStyle: {alignItems: 'flex-end'},
  customTailImage: {resizeMode: "stretch", height: "42%", width: "50%",},
  boxView: {height: '70%', width: '92%', justifyContent: "center", alignItems: "center"},
  powerUpsView: {height: screenHeight / 7, justifyContent: 'center', alignItems: 'center', flexDirection: 'row',},
  lightningImage: {height: '85%', width: '10%', resizeMode: 'stretch', marginHorizontal: "2%",},
  title: {color: '#FCB623', fontSize: screenHeight / 21, textAlign: "center", marginTop: '1.2%', marginBottom: "3%"},
  powerText: {color: '#FDCF00', fontSize: screenHeight / 26,}
});
