import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Font } from 'expo';
import CONSTANTS from '../Constants.js';
import {normalize} from '../utils/FontNormalizer.js';

export default class AreYouSureOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      riffic: {},
    }
  }
  async componentDidMount(){
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({riffic: {
      fontFamily: 'riffic-free-bold',
    }});
  }
  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/areyousure/background.png')} style={styles.backgroundImage} resizeMode="stretch">
            <Text style={[this.state.riffic, styles.text]}>{ this.props.text }</Text>
            <View style={styles.buttonsHolder}>
              <TouchableOpacity style={styles.touchableButton} onPress={this.props.onYes}>
                <ImageBackground source={require('../assets/areyousure/yesButton.png')} style={[styles.largeButton, styles.yesButton]} resizeMode="stretch"/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchableButton} onPress={this.props.onNo}>
                <ImageBackground source={require('../assets/areyousure/noButton.png')} style={[styles.largeButton, styles.noButton]} resizeMode="stretch"/>
              </TouchableOpacity>
            </View>
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
   width: screenWidth*633/724,
   height: screenWidth*(748/960)*633/724,
   flexDirection: 'column',
   alignItems: 'center',
  },
  text: {
    padding: screenWidth*80/724,
    paddingBottom: screenWidth*40/724,
    color: "#fab523",
    fontSize: normalize(16),
  },
  buttonsHolder:{
    flexDirection: "row",
  },
  touchableButton: {
    alignItems: 'center',
  },
  largeButton: {
    width: screenWidth * 340/1086,
    height: screenWidth * 122/1086,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {},
  noButton: {
    marginLeft: screenWidth * 44/1086,
  },
});
