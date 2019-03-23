import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native';
import { Font } from 'expo';
import {normalize} from '../utils/FontNormalizer.js';
export default class PauseOverlay extends React.Component {
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
              <Image style={styles.closeButtonImage} source={require('../assets/closebutton_bad.png')} resizeMode={'contain'}/>
            </TouchableOpacity>
            <Text style={[styles.buttonText, styles.titleText]}>PAUSED</Text>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this.props.powerUps}>
                <ImageBackground style={styles.brownButton} source={require('../assets/pauseoverlay/BrownButton.png')} resizeMode={'stretch'} >
                  <Text style={[styles.buttonText, styles.brownButtonText]}>
                    POWER UP INVENTORY
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              {/*}<TouchableOpacity onPress={this.props.wallet}>
                <ImageBackground style={styles.brownButton} source={require('../assets/pauseoverlay/BrownButton.png')} resizeMode={'stretch'}>
                  <Text style={[styles.buttonText, styles.brownButtonText]}>
                    WALLET
                  </Text>
                </ImageBackground>
              </TouchableOpacity>*/}
              <TouchableOpacity onPress={this.props.quit}>
                <ImageBackground style={styles.brownButton} source={require('../assets/pauseoverlay/BrownButton.png')} resizeMode={'stretch'} >
                  <Text style={[styles.buttonText, styles.brownButtonText]}>
                    QUIT GAME
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.props.closeOverlay} style={styles.yellowButton}>
              <ImageBackground style={styles.brownButton} source={require('../assets/pauseoverlay/YellowButton.png')} resizeMode={'stretch'} >
                <Text style={[styles.buttonText, styles.yellowButtonText]}>
                  RESUME THE GAME
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
    backgroundColor:  'rgba(0,0,0,0.8)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 100,
    paddingTop: 10,
    width: screenWidth*932/1080,
    height: (2359/1872)*screenWidth*932/1080,
    position: 'relative',
    flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'center',

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
  titleText: {
    fontWeight: 'bold',
    fontSize: normalize(34),
    color: '#FAB523',
    position: "absolute",
    marginTop: -70,
  },
  brownButton: {
    width: screenWidth*746/1080,
    height: (330/1494)*screenWidth*746/1080,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonView: {
    alignItems: 'center',
    flex: 1,
  },
  yellowButton: {
    marginBottom: -30,
    // position: 'absolute',
    // left: ((screenWidth*4/5) - (screenWidth*4/6))/2,
    // bottom: -30
  },
  yellowButtonText: {
    fontSize: normalize(21),
    color: '#352927',
    fontWeight: 'bold'
  },
  brownButtonText: {
    fontSize: normalize(15),
    color: '#FAB523',
    fontWeight: 'bold'
  },
});
