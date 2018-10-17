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
  };
  constructor(props) {
    super(props);
    this.state = {
      direction: CONSTANTS.DPADSTATES.UP,
    };
    this.styles = StyleSheet.create({
      snek: {
        position: "absolute",
        width: CONSTANTS.SNEKSIZE,
        height: CONSTANTS.SNEKSIZE,
        backgroundColor: CONSTANTS.SNEKCOLOR,
      },
    });
  }

  // componentDidMount() {
  //   this.context.loop.subscribe(this.update.bind(this));
  // }
  //
  // componentWillUnmount() {
  //   this.context.loop.unsubscribe(this.update.bind(this));
  // }
  // update(){
  //   // console.log("update");
  //   // console.log(this.props.running);
  //   if (this.props.running || true) {
  //     if (this.state.direction == CONSTANTS.DPADSTATES.UP) {
  //       this.posY = this.state.posY- this.props.snekSpeed;
  //     } else if (this.state.direction == CONSTANTS.DPADSTATES.DOWN) {
  //       this.posY = this.state.posY + this.props.snekSpeed;
  //     } else if (this.state.direction == CONSTANTS.DPADSTATES.RIGHT) {
  //       this.posX = this.state.posX + this.props.snekSpeed;
  //     } else if (this.state.direction == CONSTANTS.DPADSTATES.LEFT) {
  //       this.posX = this.state.posX - this.props.snekSpeed;
  //     }
  //   }
  // }
  boardXtoPosX(boardX) {
    return CONSTANTS.BOARDCENTERX + (CONSTANTS.SNEKSIZE*(boardX - CONSTANTS.BOARDSIZEX - 0.5));
  }
  boardYtoPosY(boardY) {
    return CONSTANTS.BOARDCENTERY + (CONSTANTS.SNEKSIZE*(boardY - CONSTANTS.BOARDSIZEY - 0.5));
  }

  render() {
    return (<View style={[this.styles.snek, {left: this.props.posX, top: this.props.posY,}]}></View>);
    // return (
    //   <View style={{position: "absolute", top: 0, left: 0}}>
    //     <View style={[this.styles.snek, {left: this.state.posX, top: this.state.posY,}, deadStyle]}></View>
    //   </View>
    // );
  }

}
