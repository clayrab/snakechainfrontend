import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Sprite } from 'react-game-kit/native';
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
  };

  constructor(props) {
    super(props);
    this.state = {
      direction: CONSTANTS.DPADSTATES.UP,
    };
    this.toggleUpdateInternal = false;
    this.styles = StyleSheet.create({
      snek: {
        position: "absolute",
        width: CONSTANTS.SNEKSIZE,
        height: CONSTANTS.SNEKSIZE,
        backgroundColor: CONSTANTS.SNEKPARTCOLOR,
      },
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.toggleUpdate == this.toggleUpdateInternal) {
      this.toggleUpdateInternal = !this.toggleUpdateInternal;
      return true;
    }
    return false;
  }

  boardXtoPosX(boardX) {
    return CONSTANTS.BOARDCENTERX + (CONSTANTS.SNEKSIZE*(boardX - CONSTANTS.BOARDSIZEX - 0.5));
  }
  boardYtoPosY(boardY) {
    return CONSTANTS.BOARDCENTERY + (CONSTANTS.SNEKSIZE*(boardY - CONSTANTS.BOARDSIZEY - 0.5));
  }

  render() {
    return (<View style={[this.styles.snek, {left: this.props.posX, top: this.props.posY,}]}></View>);
  }
}
