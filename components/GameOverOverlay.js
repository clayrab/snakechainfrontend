import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Font} from 'expo';
import CONSTANTS from '../Constants.js';
import {normalize} from '../utils/FontNormalizer.js';

export default class GameOverOverlay extends React.Component {
  constructor(props) {
    super(props);
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
      // Level and Time
      // <ImageBackground source={require('../assets/gameover/darkLevelBG.png')} style={styles.darkLevelBG} resizeMode="contain">
      //   <Text style={[styles.buttonText, styles.levelText]}>Level: 13</Text>
      //   <Text style={[styles.buttonText, styles.levelText]}>Time: 5:00</Text>
      // </ImageBackground>
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/BG.png')} style={styles.backgroundImage} resizeMode="stretch">
            <Text style={[styles.buttonText, styles.gameOverText]}>
              GAME OVER
            </Text>
            {this.props.offerContract &&
            <View style={{alignItems: "center"}}>
              <Text style={[styles.buttonText, styles.selectionText]}>
                You mined <Text
                style={[styles.buttonText, styles.numberText]}>{this.props.gameOverInfo.score}</Text> gold!
              </Text>
              <View style={styles.contractView}>
                <Image source={require('../assets/gameover/yellowsnake.png')} style={styles.leftSnakeImage}
                       resizeMode="contain"/>
                <ImageBackground source={require('../assets/gameover/contractSigned.png')} style={styles.contractImage}
                                 resizeMode="contain">
                  <Text style={[styles.buttonText, styles.contractText]}>
                    CONTRACT
                  </Text>
                  <Text style={[styles.buttonText, styles.contractDetails]}>
                    Exchange for minted snek coin now.{"\n"}{"\n"}
                    <Text style={[styles.buttonText, styles.contractDetails, {fontSize: normalize(18),},]}>
                      {(this.props.miningPrice / CONSTANTS.WEIPERETH).toPrecision(4)} ETH.
                    </Text>
                  </Text>
                </ImageBackground>
                <Image source={require('../assets/gameover/greensnake.png')} style={styles.rightSnakeImage}
                       resizeMode="contain"/>
              </View>
              <TouchableOpacity style={[styles.touchableButton, styles.smallTouchableButton]}
                                onPress={this.props.onDoContract}>
                <ImageBackground source={require('../assets/gameover/yellowButton.png')}
                                 style={styles.signConractButton} resizeMode="stretch">
                  <Text style={[styles.buttonText, styles.signConractText]}>
                    SIGN CONTRACT
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            }
            <TouchableOpacity style={styles.touchableButton} onPress={this.props.restart}>
              <ImageBackground source={require('../assets/gameover/greenButton.png')} style={styles.largeButton}
                               resizeMode="stretch">
                <Text style={[styles.buttonText, styles.largeButtonBText]}>
                  PLAY AGAIN
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableButton} onPress={this.props.exit}>
              <ImageBackground source={require('../assets/gameover/darkButton.png')} style={styles.largeButton}
                               resizeMode="stretch">
                <Text style={[styles.buttonText, styles.largeButtonText]}>
                  GO TO MAIN MENU
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    }
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;

var styles = StyleSheet.create({
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
  backgroundImage: {
    width: screenWidth * 685 / 724,
    height: screenHeight * 1180 / 1287,
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 40,
  },
  topButtonView: {
    width: screenWidth,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 10
  },
  closeButtonImage: {
    width: 40,
    height: 40,
  },
  darkLevelBG: {
    width: screenWidth / 2,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20
  },
  contractView: {
    flexDirection: 'row'
  },

  contractImage: {
    height: 508 / 362 * screenWidth * 359 / 1080,
    width: screenWidth * 359 / 1080,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftSnakeImage: {
    width: screenWidth * 407 / 1080,
    height: (950 / 943) * screenWidth * 407 / 1080,
    marginRight: -screenWidth * 40 / 1080,
    marginLeft: -screenWidth * 100 / 1080,
    marginTop: (950 / 943) * screenWidth * 90 / 1080,
    zIndex: 100,
  },
  rightSnakeImage: {
    width: screenWidth * 294 / 1080,
    height: (994 / 717) * screenWidth * 294 / 1080,
    marginLeft: -screenWidth * 40 / 1080,
    marginTop: (950 / 943) * screenWidth * 90 / 1080,
  },
  touchableButton: {
    alignItems: 'center',
    marginTop: 5,
  },
  signConractButton: {
    marginTop: 10,
    width: screenWidth * 411 / 1080,
    height: (294 / 1000) * screenWidth * 411 / 1080,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signConractText: {
    color: "#000",
    fontSize: normalize(13),
  },
  largeButton: {
    width: screenWidth * 708 / 1080,
    //width: screenWidth * 0.75,
    //height: 60,
    height: (386 / 1425) * screenWidth * 708 / 1080,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold'
  },
  largeButtonText: {
    color: "#fab523",
    fontSize: normalize(18),
  },
  largeButtonBText: {
    color: "#000",
    fontSize: normalize(18),
  },
  gameOverText: {
    color: "#fab523",
    fontSize: normalize(29),
  },
  levelText: {
    color: "#fab523",
    fontSize: normalize(16),
  },
  selectionText: {
    color: "#fab523",
    fontSize: normalize(12),
    marginTop: 10,
    marginBottom: 10
  },
  numberText: {
    color: "#fab523",
    fontSize: normalize(20),
  },
  contractText: {
    color: '#000',
    fontSize: normalize(14),
    marginTop: 5,
  },
  contractDetails: {
    color: '#000',
    fontSize: normalize(10),
    marginLeft: 20,
    marginRight: 15,
    marginTop: 5
  },
  smallTouchableButton: {
    marginBottom: 50
  }
});
