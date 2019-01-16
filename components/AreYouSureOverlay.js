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

export default class AreYouSureOverlay extends React.Component {
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
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/gameover/BG.png')} style={styles.backgroundImage} resizeMode="cover">
            <Text>{this.props.text}</Text>
            <TouchableOpacity style={styles.touchableButton} onPress={this.props.onYes}>
              <ImageBackground source={require('../assets/gameover/greenButton.png')} style={styles.largeButton} resizeMode="stretch">
                <Text style={[styles.buttonText, styles.largeButtonBText]}>
                  YES
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableButton} onPress={this.props.onNo}>
              <ImageBackground source={require('../assets/gameover/darkButton.png')} style={styles.largeButton} resizeMode="stretch">
                <Text style={[styles.buttonText, styles.largeButtonText]}>
                  CANCEL
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
   width: 0.88*screenWidth,
   height: 0.88*screenHeight,
   flexDirection: 'column',
   alignItems: 'center',
   padding: 20,
  },
  touchableButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  largeButton: {

    width: screenWidth * 0.75,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeButtonText: {
    color: "#fab523",
    fontSize: 20,
  },
});
