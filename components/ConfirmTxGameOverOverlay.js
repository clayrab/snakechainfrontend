import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {normalize} from '../utils/FontNormalizer.js';

export default class ConfirmTxGameOverOverlay extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    } else {

      return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/BG.png')} style={styles.backgroundImage} resizeMode="cover">
            <Text style={[styles.buttonText, styles.gameOverText]}>
              GAME OVER
            </Text>
            <Text style={[styles.buttonText, styles.selectionText]}>
              You will receive <Text
              style={[styles.buttonText, styles.numberText]}>{this.props.gameOverInfo.score}</Text> Snake Coin when the
              transaction is mined!
            </Text>
            <View style={styles.contractView}>
              <Image source={require('../assets/gameover/yellowsnake.png')} style={styles.leftSnakeImage}
                     resizeMode="contain"/>
              <Image source={require('../assets/gameover/greensnake.png')} style={styles.rightSnakeImage}
                     resizeMode="contain"/>
            </View>
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
    width: screenWidth,
    height: screenHeight,
    flexDirection: 'column',
    alignItems: 'center',
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
  leftSnakeImage: {
    height: 150,
    width: 150 * 943 / 950,
    marginRight: 0,
  },
  rightSnakeImage: {
    height: 150,
    width: 150 * 717 / 994,
    marginLeft: 0
  },
  contactImage: {
    height: 150,
    width: 150 * 707 / 992,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchableButton: {
    alignItems: 'center',
    marginTop: 5,
  },
  yellowButton: {
    width: screenWidth / 2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeButton: {
    width: screenWidth * 0.75,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontFamily: 'riffic-free-bold',
  },
  largeButtonText: {
    color: "#fab523",
    fontSize: normalize(18),
  },
  largeButtonBText: {
    color: "#000",
    fontSize: normalize(18),
  },
  smallButtonBText: {
    color: "#000",
    fontSize: normalize(16),
  },
  gameOverText: {
    color: "#fab523",
    fontSize: normalize(28),
    marginTop: -20
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
  },
});
