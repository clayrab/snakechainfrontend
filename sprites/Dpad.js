import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';

export default class Dpad extends Sprite {
  // https://facebook.github.io/react-native/docs/gesture-responder-system
  // If the view is responding, the following handlers can be called:
  //
  // View.props.onResponderMove: (evt) => {} - The user is moving their finger
  // View.props.onResponderRelease: (evt) => {} - Fired at the end of the touch, ie "touchUp"
  // View.props.onResponderTerminationRequest: (evt) => true - Something else
  //   wants to become responder. Should this view release the responder?
  //   Returning true allows release
  // View.props.onResponderTerminate: (evt) => {} - The responder has been taken
  //   from the View. Might be taken by other views after a call to
  //   onResponderTerminationRequest, or might be taken by the OS without asking
  //   (happens with control center/ notification center on iOS)
  //
  // evt is a synthetic touch event with the following form:
  //
  // nativeEvent
  // changedTouches - Array of all touch events that have changed since the last event
  // identifier - The ID of the touch
  // locationX - The X position of the touch, relative to the element
  // locationY - The Y position of the touch, relative to the element
  // pageX - The X position of the touch, relative to the root element
  // pageY - The Y position of the touch, relative to the root element
  // target - The node id of the element receiving the touch event
  // timestamp - A time identifier for the touch, useful for velocity calculation
  // touches - Array of all current touches on the screen
  _that;
  constructor(props) {
    super(props);
    _that = this;
    console.log(props);
    console.log(this.props);
    this.states = { "NONE": 0, "UP": 1, "DOWN": 2, "LEFT": 3, "RIGHT": 4 };
    this.state = { pressedButton: this.states.NONE }
    this.buttonSize = 60;
    this.buttonSizeHalf = this.buttonSize/2;
    this.touchableSize = this.buttonSize * 2.414;
    this.touchableSizeHalf = this.buttonSize * 1.207;
    this.padding = 0;
    this.dpadPosition = 210 - this.touchableSizeHalf;
    this.styles = StyleSheet.create({
      dpad: {
        position: 'absolute',
        width: this.touchableSize,
        height: this.touchableSize,
        borderRadius: this.touchableSize,
        borderWidth: 2,
        backgroundColor: '#BBBBBB',
        borderColor:'rgba(0,0,0,0.2)',
        top: 700,
        left: this.dpadPosition,
      },
      inputCapture: {
        opacity: 0.5,
        position: 'absolute',
        width: this.touchableSize,
        height: this.touchableSize,
        borderRadius: this.touchableSize,
        backgroundColor: '#BB0000',
        borderColor:'rgba(0,0,0,0.2)',
      },
      roundButton: {
        backgroundColor:'#DDDDDD',
        borderWidth: 6,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width: this.buttonSize,
        height: this.buttonSize,
        borderRadius: this.buttonSize,
        position: 'absolute',
      },
      lbutton: {
        top: this.touchableSizeHalf - this.buttonSizeHalf,
        left: this.padding,
      },
      rbutton: {
        top: this.touchableSizeHalf - this.buttonSizeHalf,
        left: this.touchableSize - this.buttonSize - this.padding,
      },
      ubutton: {
        top: this.padding,
        left: this.touchableSizeHalf - this.buttonSizeHalf,
      },
      dbutton: {
        top: this.touchableSize - this.buttonSize - this.padding,
        left: this.touchableSizeHalf - this.buttonSizeHalf,
      }
    });
  }

  // onPress = () => {
  //   this.setState({
  //     keyup :
  //
  //   })
  // }

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
      var xDiff = evt.locationX - _that.touchableSizeHalf;
      var yDiff = evt.locationY - _that.touchableSizeHalf;
      var xDiffSquared = xDiff*xDiff;
      var xDiffSquared = yDiff*yDiff;
      // makes sure the input is within a circle of radius touchableSizeHalf
      if (xDiffSquared + xDiffSquared < _that.touchableSizeHalf * _that.touchableSizeHalf) {
        // console.log("onResponderMove " + xDiff + ", " + yDiff);
        // if magnitude(x) > magnitude(y)
        if (xDiff*xDiff > yDiff*yDiff) {
          if (xDiff < 0) {
            _that.setState({pressedButton: _that.states.LEFT});
            //_that.state.pressedButton = _that.states.LEFT;
          } else {
            _that.setState({pressedButton: _that.states.RIGHT});
          }
        } else {
          if (yDiff < 0) {
            _that.setState({pressedButton: _that.states.UP});
          } else {
            _that.setState({pressedButton: _that.states.DOWN});
          }
        }
      } else {
        _that.setState({pressedButton: _that.states.NONE});
      }
    }
  };
  onResponderRelease(event) {
    var evt = event.nativeEvent;
    _that.setState({pressedButton: _that.states.NONE});
    if (evt.locationX != undefined) {
    //  console.log("onResponderRelease" + evt.locationX + ", " + evt.locationY + ", " + evt.identifier);
    }
  };
  onResponderTerminate = function(event) {
    var evt = event.nativeEvent;
    if (evt.locationX != undefined) {
    //  console.log("onResponderTerminate" + evt.locationX + ", " + evt.locationY + ", " + evt.identifier);
    }
  };

  render() {
    // These numbers found by imaging a circle around the 4 buttons and
    // calculating distance between midpoint of buttons with enclosing cirle.
    // Assume tangent(touching) edges,
    //         * *
    //      *   O   *
    //     *  O   O  *
    //      *   O   *
    //         * *
    // Assuming O height = 1 => Large circle height = 1+0.5^0.5 ~= 2.414
    //console.log(this.state.pressedButton)

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
          onResponderMove={this.onResponderMove}
          onResponderRelease={this.onResponderRelease}
          onResponderTerminate={this.onResponderTerminate}></View>
      </View>
   );
  }
}
