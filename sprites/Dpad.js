import React from 'react';
import {View, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {Sprite} from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class Dpad extends Sprite {
  // https://facebook.github.io/react-native/docs/gesture-responder-system
  constructor(props) {
    super(props);
    this.state.direction = CONSTANTS.DPADSTATES.NONE;
    this.dpadButtonSizeHalf = dpadButtonSize / 2;
    this.dpadSizeHalf = dpadButtonSize * 1.207 * 1.5;
  }

  checkDpad = function (event) {
    //console.log("checkDpad")
    var evt = event.nativeEvent;
    if (evt.locationX != undefined) {
      var xDiff = evt.locationX - this.dpadSizeHalf;
      var yDiff = evt.locationY - this.dpadSizeHalf;
      var xDiffSquared = xDiff * xDiff;
      var xDiffSquared = yDiff * yDiff;
      // makes sure the input is within a circle of radius dpadSizeHalf
      //if (xDiffSquared + xDiffSquared < this.dpadSizeHalf * this.dpadSizeHalf) {
        if (xDiff * xDiff > yDiff * yDiff) {
          if (xDiff < 0) {
            this.props.onDpadChange(CONSTANTS.DPADSTATES.LEFT);
            this.setState({direction: CONSTANTS.DPADSTATES.LEFT});
          } else {
            this.props.onDpadChange(CONSTANTS.DPADSTATES.RIGHT);
            this.setState({direction: CONSTANTS.DPADSTATES.RIGHT});
          }
        } else {
          if (yDiff < 0) {
            this.props.onDpadChange(CONSTANTS.DPADSTATES.UP);
            this.setState({direction: CONSTANTS.DPADSTATES.UP});
          } else {
            this.props.onDpadChange(CONSTANTS.DPADSTATES.DOWN);
            this.setState({direction: CONSTANTS.DPADSTATES.DOWN});
          }
        }
      // } else {
      //   this.props.onDpadChange(CONSTANTS.DPADSTATES.NONE);
      //   this.setState({direction: CONSTANTS.DPADSTATES.NONE});
      // }
    }
  }
  onStartShouldSetResponder = function (e) {
    return true;
  };
  onMoveShouldSetResponder = function (e) {
    return true;
  };
  onStartShouldSetResponderCapture = function (e) {
    return true;
  };
  onMoveShouldSetResponderCapture = function (e) {
    return true;
  };
  onResponderMove = (event) => {
    //console.log("onResponderMove")
    this.checkDpad(event);
  };
  onResponderRelease = (event) => {
    //console.log("onResponderRelease")
    this.checkDpad(event);
  };
  onResponderGrant = (event) => {
    //console.log("onResponderGrant")
  };
  // The View is now responding for touch events. This is the time to highlight and show the user what is happening.
  onResponderReject = (event) => {
    //console.log("onResponderReject")
  };
  // View.props.onResponderReject: (event) => {}
  onLeft = () => {
    //this.props.onDpadChange(CONSTANTS.DPADSTATES.LEFT);
  }
  onRight = () => {
    //this.props.onDpadChange(CONSTANTS.DPADSTATES.RIGHT);
  }
  onUp = () => {
    //this.props.onDpadChange(CONSTANTS.DPADSTATES.UP);
  }
  onDown = () => {
    //this.props.onDpadChange(CONSTANTS.DPADSTATES.DOWN);
  }

  render() {
    let uButton = (<TouchableOpacity style={[styles.roundButton, styles.ubutton]} onPress={this.onUp}>
      <Image source={require('../assets/gameplay/up.png')} style={styles.arrowImage} resizeMode="stretch"/>
    </TouchableOpacity>);
    let dButton = (<TouchableOpacity style={[styles.roundButton, styles.dbutton]} onPress={this.onDown}>
      <Image source={require('../assets/gameplay/down.png')} style={styles.arrowImage} resizeMode="stretch"/>
    </TouchableOpacity>);
    let rButton = (<TouchableOpacity style={[styles.roundButton, styles.rbutton]} onPress={this.onRight}>
      <Image source={require('../assets/gameplay/right.png')} style={styles.arrowImage} resizeMode="stretch"/>
    </TouchableOpacity>);
    let lButton = (<TouchableOpacity style={[styles.roundButton, styles.lbutton]} onPress={this.onLeft}>
      <Image source={require('../assets/gameplay/left.png')} style={styles.arrowImage} resizeMode="stretch"/>
    </TouchableOpacity>);
    if (this.props.pressedButton == CONSTANTS.DPADSTATES.UP) {
      uButton = (<View style={[styles.roundButton, styles.ubutton, {opacity: 0.3,}]}>
        <Image source={require('../assets/gameplay/up.png')} style={styles.arrowImage} resizeMode="stretch"/>
      </View>);
    } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.DOWN) {
      dButton = (<View style={[styles.roundButton, styles.dbutton, {opacity: 0.3,}]}>
        <Image source={require('../assets/gameplay/down.png')} style={styles.arrowImage} resizeMode="stretch"/>
      </View>);
    } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.RIGHT) {
      rButton = (<View style={[styles.roundButton, styles.rbutton, {opacity: 0.3,}]}>
        <Image source={require('../assets/gameplay/right.png')} style={styles.arrowImage} resizeMode="stretch"/>
      </View>);
    } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.LEFT) {
      lButton = (<View style={[styles.roundButton, styles.lbutton, {opacity: 0.3,}]}>
        <Image source={require('../assets/gameplay/left.png')} style={styles.arrowImage} resizeMode="stretch"/>
      </View>);
    }
    return (
      <ImageBackground source={require('../assets/gameplay/ButtonBackground.png')} resizeMode={'cover'}
                       style={styles.dpad}>
        <View style={styles.buttonSpacer}/>
        <View style={styles.buttonsHolder}>
          {lButton}
          {rButton}
          {uButton}
          {dButton}
          <View style={styles.inputCapture}
                onStartShouldSetResponder={this.onStartShouldSetResponder}
                onMoveShouldSetResponder={this.onMoveShouldSetResponder}
                onStartShouldSetResponderCapture={this.onStartShouldSetResponderCapture}
                onMoveShouldSetResponderCapture={this.onMoveShouldSetResponderCapture}
                onResponderMove={this.onResponderMove}
                onResponderRelease={this.onResponderRelease}
                onResponderGrant={this.onResponderGrant}
                onResponderReject={this.onResponderReject}
              ></View>
        </View>
      </ImageBackground>
    );
  }
}

// Numbers below found by imaging a circle around the 4 buttons and
// calculating distance between midpoint of buttons with enclosing cirle.
// Assume tangent(touching) edges,
//        *
//     *  O  *
//    *  O O  *
//     *  O  *
//        *
// Assuming O height = 1 implies large circle height = 1+0.5^0.5 ~= 2.414
let dpadButtonSize = CONSTANTS.DPADBUTTONSIZE;
let dpadButtonSizeHalf = CONSTANTS.DPADBUTTONSIZE / 2;
let dpadSize = CONSTANTS.DPADBUTTONSIZE * CONSTANTS.DPADMULT;

let dpadSizeHalf = CONSTANTS.DPADBUTTONSIZE * 1.207;
let padding = 0;
let backgroundWidth = CONSTANTS.DEVICEWIDTH * 424 / 724;
let shouldUpdate = true;
//let screenWidth = CONSTANTS.DEVICEWIDTH;
let styles = StyleSheet.create({
  dpad: {
    position: 'absolute',
    width: backgroundWidth,
    //height: backgroundWidth*1162/1274,
    height: dpadSize * 1.5, //make it plenty big so graphics tuck under gameplay
    bottom: -2,
    left: (CONSTANTS.DEVICEWIDTH - backgroundWidth) / 2,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSpacer: {
    flex: 1
  },
  buttonsHolder: {
    width: dpadSize,
    height: dpadSize,
    // paddingLeft: "#00f",
    // paddingRight: "#00f",
    marginBottom: 6,
  },
  inputCapture: {
    position: "relative",
    top: -dpadSize / 4,
    left: -dpadSize / 4,
    width: dpadSize * 1.5,
    height: dpadSize * 1.5,
    borderRadius: dpadSize * 1.5,
    opacity: 0.01, //needed for android.
    backgroundColor: "#000",
  },
  roundButton: {
    backgroundColor: '#FAB523',
    borderWidth: 6,
    borderColor: '#FAB523',
    alignItems: 'center',
    justifyContent: 'center',
    width: dpadButtonSize,
    height: dpadButtonSize,
    borderRadius: dpadButtonSize,
    position: 'absolute',
    //opacity: 0.0,
  },
  lbutton: {
    top: dpadSizeHalf - dpadButtonSizeHalf,
    left: padding,
  },
  rbutton: {
    top: dpadSizeHalf - dpadButtonSizeHalf,
    left: dpadSize - dpadButtonSize - padding,
  },
  ubutton: {
    top: padding,
    left: dpadSizeHalf - dpadButtonSizeHalf,
  },
  dbutton: {
    top: dpadSize - dpadButtonSize - padding,
    left: dpadSizeHalf - dpadButtonSizeHalf,
  },
  arrowImage: {
    width: dpadButtonSize,
    height: dpadButtonSize,
  }
});
