import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class Dpad extends Sprite {
  // https://facebook.github.io/react-native/docs/gesture-responder-system
  constructor(props) {
    super(props);
    // These numbers found by imaging a circle around the 4 buttons and
    // calculating distance between midpoint of buttons with enclosing cirle.
    // Assume tangent(touching) edges,
    //         * *
    //      *   O   *
    //     *  O   O  *
    //      *   O   *
    //         * *
    // Assuming O height = 1 => Large circle height = 1+0.5^0.5 ~= 2.414

    this.dpadButtonSize = 60;
    this.dpadButtonSizeHalf = this.dpadButtonSize/2;
    this.dpadSize = this.dpadButtonSize * 2.414;
    this.dpadSizeHalf = this.dpadButtonSize * 1.207;
    this.padding = 0;
    this.dpadPosition = CONSTANTS.DEVICEWIDTH/2 - this.dpadSizeHalf;
    this.shouldUpdate = true;
    this.styles = StyleSheet.create({
      dpad: {
        position: 'absolute',
        width: this.dpadSize,
        height: this.dpadSize,
        // borderRadius: this.dpadSize,
        // borderWidth: 2,
        // backgroundColor: '#BBBBBB',
        // borderColor:'rgba(0,0,0,0.2)',
        //top: CONSTANTS.GAMEHEIGHT + 20 + CONSTANTS.STATUSBARHEIGHT,
        top: CONSTANTS.DEVICEHEIGHT - CONSTANTS.DPADSIZE - CONSTANTS.STATUSBARHEIGHT - 10,
        left: this.dpadPosition,
      },
      inputCapture: {
        opacity: 0.5,
        position: 'absolute',
        width: this.dpadSize,
        height: this.dpadSize,
        borderRadius: this.dpadSize,
        // backgroundColor: '#BB0000',
        // borderColor:'rgba(0,0,0,0.2)',
      },
      roundButton: {
        backgroundColor:'#999',
        borderWidth: 6,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width: this.dpadButtonSize,
        height: this.dpadButtonSize,
        borderRadius: this.dpadButtonSize,
        position: 'absolute',
      },
      lbutton: {
        top: this.dpadSizeHalf - this.dpadButtonSizeHalf,
        left: this.padding,
      },
      rbutton: {
        top: this.dpadSizeHalf - this.dpadButtonSizeHalf,
        left: this.dpadSize - this.dpadButtonSize - this.padding,
      },
      ubutton: {
        top: this.padding,
        left: this.dpadSizeHalf - this.dpadButtonSizeHalf,
      },
      dbutton: {
        top: this.dpadSize - this.dpadButtonSize - this.padding,
        left: this.dpadSizeHalf - this.dpadButtonSizeHalf,
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
    if (evt.locationX != undefined) {
      var xDiff = evt.locationX - this.dpadSizeHalf;
      var yDiff = evt.locationY - this.dpadSizeHalf;
      var xDiffSquared = xDiff*xDiff;
      var xDiffSquared = yDiff*yDiff;
      // makes sure the input is within a circle of radius dpadSizeHalf
      if (xDiffSquared + xDiffSquared < this.dpadSizeHalf * this.dpadSizeHalf) {
        // console.log("onResponderMove " + xDiff + ", " + yDiff);
        // if magnitude(x) > magnitude(y)
        if (xDiff*xDiff > yDiff*yDiff) {
          if (xDiff < 0) {
            this.props.onDpadChange(CONSTANTS.DPADSTATES.LEFT);
          } else {
            this.props.onDpadChange(CONSTANTS.DPADSTATES.RIGHT);
          }
        } else {
          if (yDiff < 0) {
            this.props.onDpadChange(CONSTANTS.DPADSTATES.UP);
          } else {
            this.props.onDpadChange(CONSTANTS.DPADSTATES.DOWN);
          }
        }
      } else {
        this.props.onDpadChange(CONSTANTS.DPADSTATES.NONE);
      }
    }
  };
  onResponderRelease(event) {
    this.props.onDpadChange(CONSTANTS.DPADSTATES.NONE);
  };
  // onResponderTerminate = function(event) {
  //
  // };
  shouldComponentUpdate(nextProps, nextState) {
    if (this.shouldUpdate) {
      this.shouldUpdate = false;
      return true;
    }
    return false;
  }
  render() {
    return (
      <View
        style={this.styles.dpad}>
        <View style={[this.styles.roundButton, this.styles.lbutton]}></View>
        <View style={[this.styles.roundButton, this.styles.rbutton]}></View>
        <View style={[this.styles.roundButton, this.styles.ubutton]}></View>
        <View style={[this.styles.roundButton, this.styles.dbutton]}></View>
        <View style={this.styles.inputCapture}
          onStartShouldSetResponder={this.onStartShouldSetResponder}
          onMoveShouldSetResponder={this.onMoveShouldSetResponder}
          onStartShouldSetResponder={this.onStartShouldSetResponderCapture}
          onMoveShouldSetResponder={this.onMoveShouldSetResponderCapture}
          onResponderMove={this.onResponderMove.bind(this)}
          onResponderRelease={this.onResponderRelease.bind(this)}></View>
      </View>
   );
  }
}
