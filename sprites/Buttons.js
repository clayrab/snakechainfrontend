import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class Buttons extends Sprite {
  constructor(props) {
    super(props);
  }
  // https://facebook.github.io/react-native/docs/gesture-responder-system
  onStartShouldSetResponder = function(e) {
    return true;
  };
  onMoveShouldSetResponder = function(e) {
    return true;
  };
  onStartShouldSetResponderCapture =  function(e) {
    return true;
  };
  onMoveShouldSetResponderCapture =  function(e) {
    return true;
  };
  onResponderMove(event) {
    var evt = event.nativeEvent;
  };
  onResponderRelease(event) {
    this.props.onDpadChange(CONSTANTS.DPADSTATES.NONE);
  };
  render() {
    if (this.props.isPower) {
      return (
        <View style={{alignContent: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            color={"#fff"}
            style={styles.power}
            onPress={() => this.props.pause()}>
            <Image source={require('../assets/gameplay/EnergyButton.png')} style={styles.buttonImage} resizeMode="stretch" />
          </TouchableOpacity>
        </View>
      );
    }
    else {
      if (this.props.running) {
        return (
          <View>
            <TouchableOpacity
              color={"#fff"}
              style={styles.back}
              onPress={() => this.props.pause()}>
              <Image source={require('../assets/gameplay/PauseButton.png')} style={styles.buttonImage} resizeMode="stretch" />
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View>
            <TouchableOpacity
              color={"#fff"}
              style={styles.back}
              onPress={() => this.props.start()}>
              <Image source={require('../assets/gameplay/PauseButton.png')} style={styles.buttonImage} resizeMode="stretch" />
            </TouchableOpacity>
          </View>
        );
      }
    }
  }
}

let styles = StyleSheet.create({
  back: {
    position: 'absolute',
    top: CONSTANTS.GAMEHEIGHT * 9 / 8,
    left: CONSTANTS.DEVICEWIDTH / 6 - 25,
  },
  content: {
    color: "#fff",
    fontSize: 14
  },
  buttonImage: {
    width: 50,
    height: 50
  },
  power: {
    position: 'absolute',
    top: CONSTANTS.GAMEHEIGHT * 9 / 8 ,
    right: CONSTANTS.DEVICEWIDTH / 6 - 25,
  }
});
