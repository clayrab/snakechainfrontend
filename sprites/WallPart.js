import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Sprite} from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class WallPart extends Sprite {
  static contextTypes = {
    loop: PropTypes.object,
    posX: PropTypes.number,
    posY: PropTypes.number,
  };

  constructor(props) {
    super(props);
    // this.state = {
    // };
  }

  boardXtoPosX(boardX) {
    return CONSTANTS.BOARDCENTERX + (CONSTANTS.SNEKSIZE * (boardX - CONSTANTS.BOARDSIZEX - 0.5));
  }

  boardYtoPosY(boardY) {
    return CONSTANTS.BOARDCENTERY + (CONSTANTS.SNEKSIZE * (boardY - CONSTANTS.BOARDSIZEY - 0.5));
  }

  render() {
    if(CONSTANTS.LOGRENDERMETHODS) {
      var now = Date.now();
      console.log("WallPart render " + now)
    }
    return (<View style={[styles.snekPart, {left: this.props.posX, top: this.props.posY,}]}></View>);
  }
}
let styles = StyleSheet.create({
  snekPart: {
    position: "absolute",
    width: CONSTANTS.SNEKSIZE,
    height: CONSTANTS.SNEKSIZE,
    backgroundColor: "#423434",
    zIndex: 3,
  },
});
