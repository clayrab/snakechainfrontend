import React from 'react';
import { Text, StyleSheet, View, ImageBackground } from 'react-native';
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
      <ImageBackground source={require('../assets/homepage/titleback.png')} style={styles.titleBar}>
        <ImageBackground source={require('../assets/gameplay/scoreBackground.png')} style={styles.coinBox} resizeMode={'stretch'}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.scoreText}>
            Score&nbsp;&nbsp;
            <Text style={[styles.scoreText,{color: '#fff'}]}>{this.props.score}</Text>
          </Text>
        </ImageBackground>
        <ImageBackground source={require('../assets/homepage/coinbox.png')} style={styles.coinBox} resizeMode={'stretch'}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.scoreText}>
            {this.props.score}
          </Text>
        </ImageBackground>
        <ImageBackground source={require('../assets/homepage/ethbox.png')} style={styles.coinBox} resizeMode={'stretch'}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.scoreText}>
            {this.props.baseScore} x {this.props.multiplier}
          </Text>
        </ImageBackground>
      </ImageBackground>
      // <View style={this.styles.back}>
      //   <Text style={this.styles.baseScore}>{this.props.baseScore} x {this.props.multiplier}</Text>
      //   <Text style={this.styles.score}>{this.props.score}</Text>
      // </View>
    );
  }
}
let screenWidth = require('Dimensions').get('window').width;
    let titleBarHeight = screenWidth*.757/3.6;
    let styles = StyleSheet.create({
      // back: {
      //   position: "absolute",
      //   top: 0,
      //   left: 0,
      //   height: CONSTANTS.SCOREBOARDHEIGHT,
      //   width: CONSTANTS.DEVICEWIDTH,
      //   flexDirection: 'row',
      // },
      // baseScore: {
      //   color: "#000",
      //   fontSize: 25,
      //   width: CONSTANTS.DEVICEWIDTH/2,
      //   textAlign: "left",
      //   marginTop: 12,
      //   paddingLeft: (CONSTANTS.DEVICEWIDTH - CONSTANTS.BOARDWIDTH * CONSTANTS.SNEKSIZE)/2
      // },
      // score: {
      //   color: "#000",
      //   fontSize: 25,
      //   width: CONSTANTS.DEVICEWIDTH/2,
      //   textAlign: "right",
      //   marginTop: 12,
      //   paddingRight: (CONSTANTS.DEVICEWIDTH - CONSTANTS.BOARDWIDTH * CONSTANTS.SNEKSIZE)/2
      // },
      titleBar: {
        flex: 0,
        width: screenWidth,
        height: titleBarHeight,
        flexDirection: "row",
      },
      coinBox: {
        flex: 0,
        width: screenWidth*1.273/4.6,
        height: titleBarHeight*.323/.757,
        marginTop: titleBarHeight*.170/.757,
        marginLeft: screenWidth*.123/4.6,
        alignItems: 'center',
        justifyContent: 'center'
      },
      titleBarSnekTextHolder: {
        width: screenWidth*.833/4.6,
        height: titleBarHeight*.175/.757,
        marginTop: titleBarHeight*.075/.757,
        marginLeft: screenWidth*.360/4.6,
        justifyContent: 'center',
      },
      titleBarEthTextHolder: {
        width: screenWidth*.727/3.6,
        height: titleBarHeight*.175/.757,
        marginTop: titleBarHeight*.075/.757,
        marginLeft: screenWidth*.250/3.6,
        justifyContent: 'center',
      },
      scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FAB523'
      }
    });
