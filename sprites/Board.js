import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class Board extends Sprite {

  static contextTypes = {
    loop: PropTypes.object,
  };

  constructor(props) {
    super(props);
    var borderWidth = 5;
    var width = CONSTANTS.BOARDWIDTH * CONSTANTS.SNEKSIZE + 2 * borderWidth + 2;
    var height = CONSTANTS.BOARDHEIGHT * CONSTANTS.SNEKSIZE + 2 * borderWidth + 2;
    this.shouldUpdate = true;
    this.styles = StyleSheet.create({
      field: {
        width: width,
        backgroundColor: '#2c1',
        height: height,
        position: "absolute",
        top: (CONSTANTS.GAMEHEIGHT/2) - (0.5 * height),
        left: (CONSTANTS.DEVICEWIDTH/2) - (0.5 * width),
        borderWidth: borderWidth,
        // backgroundColor: '#BBBBBB',
        borderColor: CONSTANTS.BOARDCOLOR,
      },
      tile: {
        position: 'absolute',
        width: CONSTANTS.SNEKSIZE,
        height: CONSTANTS.SNEKSIZE,
        backgroundColor: "#fff",
      },
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.shouldUpdate) {
      this.shouldUpdate = false;
      return true;
    }
    return false;
  }
  render() {
    return (
      <View style={this.styles.field}>
      </View>
    );
  }
}
