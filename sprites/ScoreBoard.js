import React from 'react';
import { Text, StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
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

  }

  render() {
    return (
      <ImageBackground source={require('../assets/homepage/titleback.png')} style={styles.scoreBoard}>
        <ImageBackground source={require('../assets/gameplay/scoreBackground.png')} style={styles.coinBox} resizeMode={'stretch'}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.scoreText}>
            Score&nbsp;&nbsp;
            <Text style={[styles.scoreText,{color: '#fff'}]}>{this.props.score}</Text>
          </Text>
        </ImageBackground>
        <TouchableOpacity onPress={this.props.easterEgg}>
          <ImageBackground source={require('../assets/homepage/coinbox.png')} style={styles.coinBox} resizeMode={'stretch'}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.scoreText}>
              {this.props.score}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
        <ImageBackground source={require('../assets/homepage/ethbox.png')} style={styles.coinBox} resizeMode={'stretch'}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.scoreText}>
            {this.props.baseScore} x {this.props.multiplier}
          </Text>
        </ImageBackground>
      </ImageBackground>
    );
  }
}
let screenWidth = require('Dimensions').get('window').width;
let scoreBoardHeight = CONSTANTS.SCOREBOARDHEIGHT;
let styles = StyleSheet.create({
  scoreBoard: {
    flex: 0,
    width: screenWidth,
    height: scoreBoardHeight,
    flexDirection: "row",
  },
  coinBox: {
    flex: 0,
    width: screenWidth*1.273/4.6,
    height: scoreBoardHeight*.323/.757,
    marginTop: scoreBoardHeight*.170/.757,
    marginLeft: screenWidth*.123/4.6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreBoardSnekTextHolder: {
    width: screenWidth*.833/4.6,
    height: scoreBoardHeight*.175/.757,
    marginTop: scoreBoardHeight*.075/.757,
    marginLeft: screenWidth*.360/4.6,
    justifyContent: 'center',
  },
  scoreBoardEthTextHolder: {
    width: screenWidth*.727/3.6,
    height: scoreBoardHeight*.175/.757,
    marginTop: scoreBoardHeight*.075/.757,
    marginLeft: screenWidth*.250/3.6,
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FAB523'
  }
});
