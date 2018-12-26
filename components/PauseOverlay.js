import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Font } from 'expo';

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
        <Text style={[styles.buttonText, styles.titleText]}>PAUSED</Text>
          <ImageBackground style={styles.content} source={require('../assets/pauseoverlay/BackgroundBrown.png')} resizeMode={'stretch'}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image style={styles.closeButtonImage} source={require('../assets/closebutton_bad.png')} resizeMode={'contain'}/>
            </TouchableOpacity>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this.props.closeOverlay}>
                <ImageBackground style={styles.brownButton} source={require('../assets/pauseoverlay/BrownButton.png')} resizeMode={'stretch'} >
                  <Text style={[styles.buttonText, styles.brownButtonText]}>
                    POWER UP INVENTORY
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.props.closeOverlay}>
                <ImageBackground style={styles.brownButton} source={require('../assets/pauseoverlay/BrownButton.png')} resizeMode={'stretch'} >
                  <Text style={[styles.buttonText, styles.brownButtonText]}>
                    OPTIONS
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.props.closeOverlay}>
                <ImageBackground style={styles.brownButton} source={require('../assets/pauseoverlay/BrownButton.png')} resizeMode={'stretch'} >
                  <Text style={[styles.buttonText, styles.brownButtonText]}>
                    RESTART GAME
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.props.closeOverlay}>
                <ImageBackground style={styles.brownButton} source={require('../assets/pauseoverlay/BrownButton.png')} resizeMode={'stretch'} >
                  <Text style={[styles.buttonText, styles.brownButtonText]}>
                    RETURN FROM GAME
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.props.closeOverlay}>
                <ImageBackground style={styles.brownButton} source={require('../assets/pauseoverlay/BrownButton.png')} resizeMode={'stretch'}>
                  <Text style={[styles.buttonText, styles.brownButtonText]}>
                    RETURN TO WALLET
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
  },
  closeButtonImage: {
    height: 50,
    width: 35
  },
  brownButton: {
    width: screenWidth*4/6,
    height: 60,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonView: {
    alignItems: 'center',
    marginTop: 40,
  },
  yellowButton: {
    position: 'absolute',
    left: ((screenWidth*4/5) - (screenWidth*4/6))/2,
    bottom: -30
  },
  yellowButtonText: {
    fontSize: 24,
    color: '#352927',
    fontWeight: 'bold'
  },
  brownButtonText: {
    fontSize: 18,
    color: '#FAB523',
    fontWeight: 'bold'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FAB523'
  }
});
