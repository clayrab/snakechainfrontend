import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {normalize} from '../utils/FontNormalizer.js';

export default class ConfirmTxOverlay extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/areyousure/background.png')} style={styles.backgroundImage}
                           resizeMode="stretch">
            <Text style={[styles.text, styles.line1]}>
              Your transaction has been sent and will be confirmed shortly
            </Text>
            <Text style={[styles.text, styles.line2]}>
              Transaction ID: {this.props.transactionId}
            </Text>
            <TouchableOpacity style={styles.touchableButton} onPress={this.props.onOk}>
              <ImageBackground source={require('../assets/gameover/greenButton.png')} style={styles.largeButton}
                               resizeMode="stretch">
                <Text style={[styles.buttonText, styles.largeButtonText]}>
                  OK
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
    width: screenWidth * 633 / 724,
    height: screenWidth * (748 / 960) * 633 / 724,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 32,
  },
  text: {
    color: "#fab523",
    fontSize: normalize(12),
    fontFamily: 'riffic-free-bold',
  },
  line1: {},
  line2: {
    paddingTop: 16,
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
    color: "#000",
    fontSize: normalize(18),
  },
});
