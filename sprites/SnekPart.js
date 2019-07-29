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
    //godMode: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      direction: CONSTANTS.DPADSTATES.UP,
    };
    this.toggleUpdateInternal = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.toggleUpdate == this.toggleUpdateInternal) {
      this.toggleUpdateInternal = !this.toggleUpdateInternal;
      return true;
    }
    return false;
  }

  boardXtoPosX(boardX) {
    return CONSTANTS.BOARDCENTERX + (CONSTANTS.SNEKSIZE * (boardX - CONSTANTS.BOARDSIZEX - 0.5));
  }

  boardYtoPosY(boardY) {
    return CONSTANTS.BOARDCENTERY + (CONSTANTS.SNEKSIZE * (boardY - CONSTANTS.BOARDSIZEY - 0.5));
  }

  render() {
    //let opacity = this.props.godMode ? 0.4 : 1.0;
    let opacity = 1.0;
    return (<View style={[styles.snekPart, {left: this.props.posX, top: this.props.posY,}, opacity: opacity]}></View>);
  }
}
let styles = StyleSheet.create({
  snekPart: {
    position: "absolute",
    width: CONSTANTS.SNEKSIZE,
    height: CONSTANTS.SNEKSIZE,
    backgroundColor: CONSTANTS.SNEKPARTCOLOR,
    zIndex: 3,
  },
});
