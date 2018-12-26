import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
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
    let screenWidth = require('Dimensions').get('window').width;
    var boardWidth = CONSTANTS.BOARDWIDTH * CONSTANTS.SNEKSIZE + 2 * borderWidth + 2;
    var boardHeight = CONSTANTS.BOARDHEIGHT * CONSTANTS.SNEKSIZE + 2 * borderWidth + 2;
    this.shouldUpdate = true;
    this.styles = StyleSheet.create({
      field: {
        width: screenWidth,
        backgroundColor: 'transparent',
        height: boardHeight,
        position: "absolute",
        top: CONSTANTS.BOARDCENTERY - (0.5 * boardHeight),
        left: 0,
        borderWidth: borderWidth,
        borderColor: CONSTANTS.BOARDCOLOR,
      },
      tile: {
        position: 'absolute',
        width: CONSTANTS.SNEKSIZE,
        height: CONSTANTS.SNEKSIZE,
        backgroundColor: "#fff",
      },
      gameBack: {
        position: 'absolute',
        width: CONSTANTS.DEVICEWIDTH,
        height: CONSTANTS.GAMEHEIGHT + CONSTANTS.DPADAREAHEIGHT,
        backgroundColor: "#FAB523",
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
      <View style={this.styles.gameBack}>
        <ImageBackground source={require('../assets/gameplay/Background.png')} style={this.styles.field} resizeMode="stretch">
        </ImageBackground>
      </View>
    );
  }
}
