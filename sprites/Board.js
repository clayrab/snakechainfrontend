import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class Board extends Sprite {

  static contextTypes = {
    loop: PropTypes.object,
  };

  constructor(props) {
    super(props);
//     React.createElement(
//   type,
//   [props],
//   [...children]
// )
    var borderWidth = 5;
    var width = CONSTANTS.BOARDWIDTH * CONSTANTS.SNEKSIZE + 2 * borderWidth + 2;
    var height = CONSTANTS.BOARDHEIGHT * CONSTANTS.SNEKSIZE + 2 * borderWidth + 2;
    this.styles = StyleSheet.create({
      field: {
        width: width,
        backgroundColor: '#2c1',
        height: height,
        position: "absolute",
        top: (CONSTANTS.GAMEHEIGHT/2) - (0.5 * height),
        left: (CONSTANTS.DEVICEWIDTH/2) - (0.5 * width),
        borderWidth: borderWidth,
        // backgroundColor: '#BBBBBB',
        borderColor: CONSTANTS.BOARDCOLOR,
      },
      tile: {
        position: 'absolute',
        width: CONSTANTS.SNEKSIZE,
        height: CONSTANTS.SNEKSIZE,
        backgroundColor: "#fff",
      },
    });
    // this.tileRows = [];
    // for (var rowIndex = 0; rowIndex < this.props.boardState.length; rowIndex ++) {
    //   var row = [];
    //    for (var rowIndex = 0; rowIndex < this.props.boardState.length; rowIndex ++) {
    //      row.push(React.createElement(View, {style: tileStyles.tile}));
    //    }
    //    this.tileRows.push(React.createElement(View, {style: tileStyles.tile}, row));
    // }
    //
  }

  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }
  update() {

  };
  // DEVICEWIDTH
  // GAMEHEIGHT
  // SNEKSIZE
  render() {

    // var rootElem = React.createElement("View", {style: {
    //   width: CONSTANTS.DEVICEWIDTH,
    //   backgroundColor: '#0f0',
    //   height: CONSTANTS.GAMEHEIGHT,
    //   position: "absolute",
    // }}, this.tileRows);
    //console.log(this.tileRows)

    // return React.createElement(View, {style: {
    //   width: CONSTANTS.DEVICEWIDTH,
    //   backgroundColor: '#0f0',
    //   height: CONSTANTS.GAMEHEIGHT,
    //   position: "absolute",
    // }}, this.tileRows);
    return (
      <View style={this.styles.field}>
      </View>
    );
  }

  update() {

  };
}
