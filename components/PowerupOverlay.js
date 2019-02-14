
import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Font } from 'expo';
import CONSTANTS from '../Constants.js';

export default class PowerupOverlay extends React.Component {
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
          <ImageBackground style={styles.content} source={require('../assets/pauseoverlay/BackgroundBrown.png')} resizeMode={'stretch'}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage} resizeMode="stretch" />
            </TouchableOpacity>
            <View style={styles.buttonView}>
              <ImageBackground style={styles.brownButton} source={require('../assets/snakemine/title.png')} resizeMode={'stretch'} >
                <Text style={[styles.buttonText, styles.titleText]}>
                  POWERUPS
                </Text>
              </ImageBackground>
            </View>
            <View style={styles.temporaryText}>
              <Text style={[styles.buttonText, styles.titleText]}>
                COMING SOON
              </Text>
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
    backgroundColor:  'rgba(0,0,0,0.6)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: screenWidth*4/5,
    height: screenHeight*4/5,
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
    width: screenWidth/2,
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    color: "#fab523",
    fontSize: 16
  },
});
