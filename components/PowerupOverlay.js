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
import {normalize} from "../utils/FontNormalizer";
import StartGameOverlay from "./StartGameOverlay";
import PowerupDetailOverlay from "./PowerupDetailOverlay";

const CircleComp = (props) => (
  <View style={styles.circleView}>
    <Text style={[styles.circleText, props.buttonStyle]}>{props.value}</Text>
  </View>
);

const Box = ((props) =>
    <View style={styles.boxContainer}>
      <TouchableOpacity onPress={() => props.onItemPress(props)} style={styles.boxViewContainer}>
        <ImageBackground source={require('../assets/Paused/partionBackground.png')} resizeMode={"stretch"}
                         style={[styles.boxView, props.customBoxStyle !== undefined ? props.customBoxStyle : null]}>
          <Text style={[styles.boxText, props.buttonStyle]}>{props.heading}</Text>
          <Image source={props.boxImage}
                 style={[styles.boxImageView, props.customImage !== undefined ? props.customImage : null]}/>
          <CircleComp value={props.circleText}/>
        </ImageBackground>
      </TouchableOpacity>
      {
        props.bought &&
        <ImageBackground source={require("../assets/Paused/inputBackground.png")} resizeMode={"stretch"}
                         style={[styles.numberInput, {justifyContent: 'space-between', paddingHorizontal: 20}]}>
          <TouchableOpacity onPress={() => props.onAddPress(props)}>
            <Image source={require("../assets/Paused/minus.png")} style={[styles.coinStyle, props.imageStyle]}/>
          </TouchableOpacity>
          <Text style={[styles.coinText, props.buttonStyle]}>{props.value}</Text>
          <TouchableOpacity onPress={() => props.onMinusPress(props)}>
            <Image source={require("../assets/Paused/plus.png")} style={[styles.coinStyle, props.imageStyle]}/>
          </TouchableOpacity>
        </ImageBackground>
        ||
        <TouchableOpacity onPress={() => props.onBuyPress(props)}>
          <ImageBackground source={require("../assets/Paused/inputBackground.png")} resizeMode={"stretch"}
                           style={styles.numberInput}>
            <Image source={require("../assets/Paused/coinIcon.png")} style={[styles.coinStyle, props.imageStyle]}/>
            <Text style={[styles.coinText, props.buttonStyle]}>{props.inputNumber.toFixed(3)}</Text>
          </ImageBackground>
        </TouchableOpacity>
      }
    </View>
);

export default class PowerupOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDyanmicStyle: {},
      selectedPowerup: {},
      detailVisible: false
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

  onItemBuyPress = props => {
    console.warn(props);
  }

  onItemPress = (props) => {
    this.setState({detailVisible: true, selectedPowerup: props});
  }

  onItemAddPress = (props) => {
    console.warn(props);
  }

  onItemMinusPress = (props) => {
    console.warn(props);
  }

  closeDetailOverlay = () => {
    this.setState({detailVisible: false, selectedPowerup: {}})
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

              <View style={{
                flexDirection: 'row',
                justifyContent: "space-around",
                flexWrap: 'wrap',
                paddingTop: 25,
                paddingBottom: 10,
                paddingHorizontal: 15
              }}>

                <Box buttonStyle={this.state.buttonDynamicStyle}
                     bought={false}
                     boxImage={require('../assets/powerupsoverlay/mushroom_yellow.png')}
                     inputNumber={3}
                     circleText={'5'}
                     heading={'Multiplayer (10x)'}
                     onBuyPress={this.onItemBuyPress}
                     onItemPress={this.onItemPress}
                />
                <Box buttonStyle={this.state.buttonDynamicStyle}
                     bought={true}
                     value={2}
                     boxImage={require('../assets/powerupsoverlay/mushroom_blue.png')}
                     circleText={'0'}
                     heading={'Shed Tail'}
                     onAddPress={this.onItemAddPress}
                     onMinusPress={this.onItemMinusPress}
                     onItemPress={this.onItemPress}
                />
                <Box buttonStyle={this.state.buttonDynamicStyle}
                     bought={false}
                     boxImage={require('../assets/powerupsoverlay/mushroom_voilet.png')}
                     inputNumber={5}
                     circleText={'5'}
                     heading={'Wildcard'}
                     onBuyPress={this.onItemBuyPress}
                     onItemPress={this.onItemPress}
                />
                <Box buttonStyle={this.state.buttonDynamicStyle}
                     bought={false}
                     boxImage={require('../assets/powerupsoverlay/mushroom_red.png')}
                     inputNumber={10}
                     circleText={'5'}
                     heading={'Nitro Tail'}
                     onBuyPress={this.onItemBuyPress}
                     onItemPress={this.onItemPress}
                />

              </View>

              <ImageBackground source={require("../assets/powerupsoverlay/brownBG.png")}
                               resizeMode={"contain"}
                               style={styles.bigValueHolder}>
                <Image source={require("../assets/powerupsoverlay/mushroom_blue.png")}
                       style={[styles.smallMushroom]}/>
                <Text style={styles.mushroomValue}>{"2.....6,000"}</Text>
              </ImageBackground>

              <ImageBackground source={require("../assets/powerupsoverlay/brownBG.png")}
                               resizeMode={"contain"}
                               style={styles.bigValueHolder}>
                <Text style={[styles.totalText]}>Total</Text>
                <Text style={[styles.totalText]}>{"6,000"}</Text>
              </ImageBackground>

              <TouchableOpacity style={styles.proceedToAcquireContainer}>
                <ImageBackground source={require("../assets/powerupsoverlay/yellowBG.png")}
                                 resizeMode={"contain"}
                                 style={styles.proceedToAcquireBtn}>
                  <Text style={[styles.proceedToAcquireText]}>Proceed to Acquire</Text>
                </ImageBackground>
              </TouchableOpacity>
            </ScrollView>

          </ImageBackground>
          <PowerupDetailOverlay
            style={{zIndex: 101}}
            closeOverlay={this.closeDetailOverlay}
            show={this.state.detailVisible}
            powerup={{
              name: "Multiplayer (10x)",
              image: require("../assets/powerupsoverlay/mushroom_yellow.png"),
              description: "This mushroom is the Aurea ovaUs. When eatea 30sec 10x pellet multiplayer"
            }}
          />
        </View>
      );
    }
  }
}

let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
const circleSize = screenWidth * 0.06;
const styles = StyleSheet.create({
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
  smallMushroom: {height: screenWidth * 0.06, width: screenWidth * 0.06, resizeMode: 'contain'},
  coinStyle: {height: screenWidth * 0.04, width: screenWidth * 0.04, resizeMode: "contain"},
  bigValueHolder: {
    marginBottom: 20,
    width: screenWidth * 0.7,
    height: screenWidth * 0.1,
    paddingHorizontal: screenWidth * 0.08,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  numberInput: {
    width: "100%",
    height: screenWidth * 0.09,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  boxContainer: {
    height: screenWidth * 0.4,
    width: screenWidth * 0.3,
    justifyContent: "center",
    marginBottom: 25
  },
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
  boxImageView: {
    resizeMode: "contain",
    height: "40%",
    width: "40%"
  },
  customImage: {resizeMode: "stretch", height: "33%", width: "70%", marginRight: "12%"},
  custom5Image: {resizeMode: "stretch", height: "30%", width: "40%"},
  customBoxStyle: {alignItems: 'flex-end'},
  customTailImage: {resizeMode: "stretch", height: "42%", width: "50%",},
  boxViewContainer: {
    height: "70%",
    width: '100%'
  },
  boxView: {height: '100%', width: '100%', justifyContent: "center", alignItems: "center"},
  powerUpsView: {height: screenHeight / 7, justifyContent: 'center', alignItems: 'center', flexDirection: 'row',},
  lightningImage: {height: '85%', width: '10%', resizeMode: 'stretch', marginHorizontal: "2%",},
  title: {color: '#FCB623', fontSize: screenHeight / 21, textAlign: "center", marginTop: '1.2%', marginBottom: "3%"},
  powerText: {color: '#FDCF00', fontSize: screenHeight / 26,},
  mushroomValue: {
    fontSize: normalize(16),
    color: "#fab649"
  },
  totalText: {
    color: "#896a66",
    fontSize: normalize(16)
  },
  proceedToAcquireContainer: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  proceedToAcquireBtn: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.13,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
  },
  proceedToAcquireText: {
    color: "#352826",
    fontSize: normalize(14)
  },
});
