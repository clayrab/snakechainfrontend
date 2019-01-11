import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Font } from 'expo';
import CONSTANTS from '../Constants.js';

export default class GameOverOverlay extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount(){
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

      //CLOSE BUTTON
      // <View style={styles.topButtonView}>
      //   <TouchableOpacity style={styles.closeButton}>
      //     <ImageBackground source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage} resizeMode="stretch" />
      //   </TouchableOpacity>
      // </View>
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/gameover/BG.png')} style={styles.backgroundImage} resizeMode="cover">
            <Text style={[styles.buttonText, styles.gameOverText]}>
              GAME OVER
            </Text>
            <Text style={[styles.buttonText, styles.selectionText]}>
              You got <Text style={[styles.buttonText, styles.numberText]}>{this.props.gameOverInfo.score}</Text> more mined gold!
            </Text>
            <View style={styles.contractView}>
              <Image source={require('../assets/gameover/yellowsnake.png')} style={styles.leftSnakeImage} resizeMode="contain"/>
              <ImageBackground source={require('../assets/gameover/contract.png')} style={styles.contactImage} resizeMode="contain">
                <Text style={[styles.buttonText, styles.contractText]}>
                  CONTRACT
                </Text>
                <Text style={[styles.buttonText, styles.contractDetails]}>
                  Exchange gold for minted snek coin now.{"\n"}{"\n"}
                  {(this.props.miningPrice/CONSTANTS.WEIPERETH).toPrecision(4)} ETH.
                </Text>
              </ImageBackground>
              <Image source={require('../assets/gameover/greensnake.png')} style={styles.rightSnakeImage}  resizeMode="contain"/>
            </View>
            <TouchableOpacity style={[styles.touchableButton, styles.smallTouchableButton]} onPress={this.props.onDoContract}>
              <ImageBackground source={require('../assets/gameover/yellowButton.png')} style={styles.yellowButton} resizeMode="stretch">
                <Text style={[styles.buttonText, styles.smallButtonBText]}>
                  SIGN CONTRACT
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchableButton} onPress={this.props.restart}>
              <ImageBackground source={require('../assets/gameover/greenButton.png')} style={styles.largeButton} resizeMode="stretch">
                <Text style={[styles.buttonText, styles.largeButtonBText]}>
                  PLAY AGAIN
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchableButton} onPress={this.props.exit}>
              <ImageBackground source={require('../assets/gameover/darkButton.png')} style={styles.largeButton} resizeMode="stretch">
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
    backgroundColor:  'rgba(0,0,0,0.6)',
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
    width: 150*943/950,
    marginRight: 0,
  },
  rightSnakeImage: {
    height: 150,
    width: 150*717/994,
    marginLeft: 0
  },
  contactImage: {
    height: 150,
    width: 150*707/992,
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
    fontWeight: 'bold'
  },
  largeButtonText: {
    color: "#fab523",
    fontSize: 20,
  },
  largeButtonBText: {
    color: "#000",
    fontSize: 20,
  },
  smallButtonBText: {
    color: "#000",
    fontSize: 18,
  },
  gameOverText: {
    color: "#fab523",
    fontSize: 32,
    marginTop: -20
  },
  levelText: {
    color: "#fab523",
    fontSize: 18,
  },
  selectionText: {
    color: "#fab523",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10
  },
  numberText: {
    color: "#fab523",
    fontSize: 22,
  },
  contractText: {
    color: '#000',
    fontSize: 16,
    marginTop: 5,
  },
  contractDetails: {
    color: '#000',
    fontSize: 12,
    marginLeft: 20,
    marginRight: 15,
    marginTop: 5
  },
  smallTouchableButton: {
    marginBottom: 50
  }
});
