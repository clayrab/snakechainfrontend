import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class ScoreBoard extends Sprite {
  // https://facebook.github.io/react-native/docs/gesture-responder-system
  static contextTypes = {
    loop: PropTypes.object,
    baseScore: PropTypes.number,
    multiplier: PropTypes.number,
    score: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      back: {
        position: "absolute",
        top: 0,
        left: 0,
        height: CONSTANTS.SCOREBOARDHEIGHT,
        width: CONSTANTS.DEVICEWIDTH,
        flexDirection: 'row',
      },
      baseScore: {
        color: "#000",
        fontSize: 25,
        width: CONSTANTS.DEVICEWIDTH/2,
        textAlign: "left",
        marginTop: 12,
        paddingLeft: (CONSTANTS.DEVICEWIDTH - CONSTANTS.BOARDWIDTH * CONSTANTS.SNEKSIZE)/2
      },
      score: {
        color: "#000",
        fontSize: 25,
        width: CONSTANTS.DEVICEWIDTH/2,
        textAlign: "right",
        marginTop: 12,
        paddingRight: (CONSTANTS.DEVICEWIDTH - CONSTANTS.BOARDWIDTH * CONSTANTS.SNEKSIZE)/2
      },
    });
  }

  render() {
    return (
      <View style={this.styles.back}>
        <Text style={this.styles.baseScore}>{this.props.baseScore} x {this.props.multiplier}</Text>
        <Text style={this.styles.score}>{this.props.score}</Text>
      </View>
    );
  }
}
