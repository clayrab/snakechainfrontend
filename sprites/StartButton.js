import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class StartButton extends Sprite {
  // https://facebook.github.io/react-native/docs/gesture-responder-system
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      button: {
        position: "absolute",
        top: CONSTANTS.GAMEHEIGHT + 40,
        left: 20,
      },
    });
  }

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
  // onResponderTerminate = function(event) {
  //
  // };

  render() {
    return (
      <View style={this.styles.button}>
        <Button
          title="Go"
          onPress={() => this.props.start()}
        />
      </View>
   );
  }
}
