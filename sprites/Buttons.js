import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class Buttons extends Sprite {
  // https://facebook.github.io/react-native/docs/gesture-responder-system
  constructor(props) {
    super(props);
    this.buttonSize = 60;
    this.styles = StyleSheet.create({
      back: {
        backgroundColor:'#999',
        borderWidth: 2,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width: this.buttonSize,
        height: this.buttonSize/2,
        borderRadius: this.buttonSize,
        position: 'absolute',
        top: CONSTANTS.GAMEHEIGHT + (CONSTANTS.DPADAREAHEIGHT/2) - (this.buttonSize/2 + 10),
        left: 20,
      },
      content: {
        color: "#fff",
        fontSize: 14
      },
      goPos: {
        top: CONSTANTS.GAMEHEIGHT + (CONSTANTS.DPADAREAHEIGHT/2) + 10,
      }
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

  render() {
    if (!this.props.running) {
      return (
        <View>
          <TouchableOpacity
            color={"#fff"}
            style={this.styles.back}
            onPress={() => this.props.restart()}>
            <Text style={this.styles.content}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            color={"#fff"}
            style={[this.styles.back, this.styles.goPos,]}
            onPress={() => this.props.start()}>
            <Text style={this.styles.content}>Go</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }
}
