import React from 'react';
import {View, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {Sprite} from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';
export default class Board extends Sprite {

  static contextTypes = {
    loop: PropTypes.object,
  };

  constructor(props) {
    super(props);
    var borderWidth = 5;
    var boardWidth = CONSTANTS.BOARDWIDTH;
    var boardHeight = CONSTANTS.BOARDHEIGHT;

    this.styles = StyleSheet.create({
      field: {
        width: boardWidth,
        backgroundColor: 'transparent',
        height: boardHeight,
        position: "absolute",
        top: CONSTANTS.BOARDCENTERY - (0.5 * boardHeight),
        left: (CONSTANTS.DEVICEWIDTH / 2) - (0.5 * boardWidth),
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
        height: CONSTANTS.GAMEHEIGHT + dpadAreaHeight,
        backgroundColor: "#FAB523",
      },
    });
  }

  render() {
    if(CONSTANTS.LOGRENDERMETHODS) {
      var now = Date.now();
      console.log("Board render " + now)
    }
    return (
      <View style={this.styles.gameBack}>
        <ImageBackground source={require('../assets/gameplay/Background.png')} style={this.styles.field}
                         resizeMode="stretch">
        </ImageBackground>
      </View>
    );
  }
}
