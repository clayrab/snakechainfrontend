import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class SnekPart extends Sprite {

  static contextTypes = {
    loop: PropTypes.object,
    pressedButton: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.defaultState = {
      posX: this.props.posX,
      posY: this.props.posY,
      boardX: this.props.boardX,
      boardY: this.props.boardY,
      direction: CONSTANTS.DPADSTATES.UP,
    };
    this.state = this.defaultState;
    this.styles = StyleSheet.create({
      snek: {
        position: "absolute",
        width: CONSTANTS.SNEKSIZE,
        height: CONSTANTS.SNEKSIZE,
        backgroundColor: CONSTANTS.SNEKCOLOR,
      },
    });
  }

  componentDidMount() {
    this.context.loop.subscribe(this.update.bind(this));
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update.bind(this));
  }

  boardXtoPosX(boardX) {
    return CONSTANTS.BOARDCENTERX + (CONSTANTS.SNEKSIZE*(boardX - CONSTANTS.BOARDSIZEX - 0.5));
  }
  boardYtoPosY(boardY) {
    return CONSTANTS.BOARDCENTERY + (CONSTANTS.SNEKSIZE*(boardY - CONSTANTS.BOARDSIZEY - 0.5));
  }

  render() {
    let deadStyle = {};
    if (!this.state.alive) {
      deadStyle.backgroundColor = "#000";
    }
    var snekParts = [
      (<View key={-1} style={[this.styles.snek, {left: this.state.posX, top: this.state.posY,}, deadStyle]}></View>)
    ];
    for (var index = 0; index < this.state.tail.length; index++) {
      var part = (<View key={index} style={[this.styles.snek, {left: this.state.tail[index].posX, top: this.state.tail[index].posY,}, deadStyle]}></View>)
      snekParts.push(part);
    }
    var rootView = React.createElement(
      View,
      {style: {position: "absolute", top: 0, left: 0}},
      snekParts
    );
    //   width: CONSTANTS.DEVICEWIDTH,
    //   backgroundColor: '#0f0',
    //   height: CONSTANTS.GAMEHEIGHT,
    //   position: "absolute",
    // }}, this.tileRows);
    return rootView;
    // return (
    //   <View style={{position: "absolute", top: 0, left: 0}}>
    //     <View style={[this.styles.snek, {left: this.state.posX, top: this.state.posY,}, deadStyle]}></View>
    //   </View>
    // );
  }

}
