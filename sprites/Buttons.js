import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
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
    if (this.props.running) {
      return (
        <View>
          <TouchableOpacity
            color={"#fff"}
            style={styles.back}
            onPress={() => this.props.pause()}>
            <Text style={styles.content}>Pause</Text>
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
            <Text style={styles.content}>Go</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
let buttonSize = 60;
let styles = StyleSheet.create({
  back: {
    backgroundColor:'#999',
    borderWidth: 2,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width: buttonSize,
    height: buttonSize/2,
    borderRadius: buttonSize,
    position: 'absolute',
    top: CONSTANTS.GAMEHEIGHT + 2,
    left: 20,
  },
  content: {
    color: "#fff",
    fontSize: 14
  },
});
