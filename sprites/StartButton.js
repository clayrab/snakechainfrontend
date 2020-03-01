import React from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import {Sprite} from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class ResetButton extends Sprite {
  // https://facebook.github.io/react-native/docs/gesture-responder-system
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      buttonHolder: {
        position: "absolute",
        top: CONSTANTS.GAMEHEIGHT + 65,
        left: 20,
        backgroundColor: "#0ff",
      },
    });
  }

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
      console.log("ResetButton render " + now)
    }
    return (
      <View style={this.styles.buttonHolder}>
        <Button
          title="asdf"
          onPress={() => this.props.start()}
        />
      </View>
    );
  }
}
