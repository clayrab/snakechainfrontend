import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Sprite} from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class Buttons extends Sprite {
  constructor(props) {
    super(props);
  }

  // https://facebook.github.io/react-native/docs/gesture-responder-system
  onStartShouldSetResponder = function (e) {
    return true;
  };
  onMoveShouldSetResponder = function (e) {
    return true;
  };
  onStartShouldSetResponderCapture = function (e) {
    return true;
  };
  onMoveShouldSetResponderCapture = function (e) {
    return true;
  };

  onResponderMove(event) {
    var evt = event.nativeEvent;
  };

  onResponderRelease(event) {
    this.props.onDpadChange(CONSTANTS.DPADSTATES.NONE);
  };

  render() {
    if(CONSTANTS.LOGRENDERMETHODS) {
      var now = Date.now();
      console.log("Buttons render " + now)
    }
    return (
      <View style={styles.buttonsBackground}>
        <View style={styles.buttonsHolder}>

          <TouchableOpacity
            color={"#fff"}
            style={styles.pause}
            onPress={() => this.props.pause()}>
            <Image source={require('../assets/gameplay/PauseButton.png')} style={styles.buttonImage}
                   resizeMode="stretch"/>
          </TouchableOpacity>

          {/*
            <View style={styles.buttonsSpacer2}/>
            <TouchableOpacity
            color={"#fff"}
            style={styles.power}
            onPress={() => this.props.powerUps()}>
            <Image source={require('../assets/gameplay/EnergyButton.png')} style={styles.buttonImage}
                   resizeMode="stretch"/>
          </TouchableOpacity>
          \*/}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  buttonsBackground: {
    width: CONSTANTS.DEVICEWIDTH,
  },
  buttonsHolder: {
    flexDirection: "row",
    flex: 0,
  },
  buttonImage: {
    marginTop: CONSTANTS.DEVICEWIDTH * 156 / 1080,
    width: CONSTANTS.DEVICEWIDTH * 156 / 1080,
    height: CONSTANTS.DEVICEWIDTH * 156 / 1080,
  },
  pause: {
    marginBottom: CONSTANTS.DEVICEWIDTH * 115 / 1080,
    marginLeft: CONSTANTS.DEVICEWIDTH * 45 / 1080,
  },
  power: {
    marginBottom: CONSTANTS.DEVICEWIDTH * 115 / 1080,
    marginRight: CONSTANTS.DEVICEWIDTH * 45 / 1080,
  }
});
