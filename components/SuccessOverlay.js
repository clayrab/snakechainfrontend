import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native';
import {normalize} from "../utils/FontNormalizer";

export default class SuccessOverlay extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground source={require("../assets/ticket/background.png")} resizeMode={"stretch"}
                           style={styles.mainView}>
            <Text style={styles.titleText}>Successfully Registered</Text>
            <Text style={styles.normalText}>Go back to login</Text>
            <View style={styles.backButton}>
              <TouchableOpacity onPress={this.props.onNext}>
                <ImageBackground source={require('../assets/login/button.png')}
                                 style={[styles.loginButton, styles.passwordInput]} resizeMode="stretch">
                  <Text style={[styles.confirmText]}>GO BACK</Text>
                </ImageBackground>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: screenWidth * 638 / 726,
    aspectRatio: 960 / 983,
    alignItems: 'center',
    paddingBottom: 50
  },
  titleText: {
    color: "#fab523",
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },
  passwordInput: {
    marginTop: 20
  },
  loginButton: {
    width: screenWidth / 1.5,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    fontSize: normalize(18),
    color: '#352927'
  },
  normalText: {
    color: "#fab523",
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    padding: 10,
  },
  backButton: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});
