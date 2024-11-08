import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Sprite} from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class SnekPart extends Sprite {
  static contextTypes = {
    loop: PropTypes.object,
    pressedButton: PropTypes.number,
    running: PropTypes.bool,
    posX: PropTypes.number,
    posY: PropTypes.number,
    boardX: PropTypes.number,
    boardY: PropTypes.number,
    toggleUpdate: PropTypes.bool,
    orangeMode: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      direction: CONSTANTS.DPADSTATES.UP,
    };
    this.toggleUpdateInternal = false;
  }

  boardXtoPosX(boardX) {
    return CONSTANTS.BOARDCENTERX + (CONSTANTS.SNEKSIZE * (boardX - CONSTANTS.BOARDSIZEX - 0.5));
  }

  boardYtoPosY(boardY) {
    return CONSTANTS.BOARDCENTERY + (CONSTANTS.SNEKSIZE * (boardY - CONSTANTS.BOARDSIZEY - 0.5));
  }
  updateOrangeMode(orangeMode) {
    console.log("updateOrangeMode: " + orangeMode)
  }
  render() {
    if(CONSTANTS.LOGRENDERMETHODS) {
      var now = Date.now();
      console.log("SnekPart render " + now)
    }
    let color = CONSTANTS.SNEKPARTCOLOR;
    if(this.props.orangeMode) {
      color = CONSTANTS.SNEKPARTCOLORORANGE;
    }
    //let color = this.props.orangeMode ? CONSTANTS.SNEKPARTCOLORORANGE : CONSTANTS.SNEKPARTCOLOR;
    return (<View style={[styles.snekPart, {left: this.props.posX, top: this.props.posY, backgroundColor: color, }]}></View>);
  }
}
let styles = StyleSheet.create({
  snekPart: {
    position: "absolute",
    width: CONSTANTS.SNEKSIZE,
    height: CONSTANTS.SNEKSIZE,
    //backgroundColor: CONSTANTS.SNEKPARTCOLOR,
    zIndex: 3,
  },
});
