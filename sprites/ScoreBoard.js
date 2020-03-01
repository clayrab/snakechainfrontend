import React from 'react';
import {Text, StyleSheet, View, ImageBackground, TouchableOpacity} from 'react-native';
import {Sprite} from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';
import {formatToken} from '../utils/uiHelperFunctions.js';

export default class ScoreBoard extends React.Component {
  // https://facebook.github.io/react-native/docs/gesture-responder-system
  // static contextTypes = {
  //   loop: PropTypes.object,
  //   baseScore: PropTypes.number,
  //   multiplier: PropTypes.number,
  //   score: PropTypes.number,
  // };

  constructor(props) {
    super(props);
  }

  render() {
    if(CONSTANTS.LOGRENDERMETHODS) {
      var now = Date.now();
      console.log("ScoreBoard render " + now)
    }
    return (
      <ImageBackground source={require('../assets/homepage/titleback.png')} style={styles.scoreBoard}>
        <ImageBackground source={require('../assets/gameplay/scoreBackground.png')} style={styles.scoreBox}
                         resizeMode={'stretch'}>
          <View style={styles.scoreBoardScoreTextHolder}>
            <Text numberOfLines={1} style={styles.scoreText}>
              <Text style={{color: '#fff'}}>{this.props.score}</Text>
            </Text>
          </View>
        </ImageBackground>
        {/*<TouchableOpacity onPress={this.props.easterEgg}>
          <ImageBackground source={require('../assets/homepage/coinbox.png')} style={styles.coinBox}
                           resizeMode={'stretch'}>
            <View style={styles.scoreBoardCoinTextHolder}>
              {this.props.loading ? null :
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.scoreText}>
                  {this.props.user.snek}
                </Text>
              }
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <ImageBackground source={require('../assets/homepage/ethbox.png')} style={styles.ethBox} resizeMode={'stretch'}>
          <View style={styles.scoreBoardEthTextHolder}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.scoreText]}>
              {this.props.loading ? null :
                <Text adjustsFontSizeToFit numberOfLines={1}
                      style={[styles.titleBarText]}>
                  {formatToken(this.props.user.eth, "ETH")}
                </Text>
              }
            </Text>
          </View>
        </ImageBackground>
        */}
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
  scoreBoardScoreTextHolder: {
    width: screenWidth * .833 / 4.6,
    height: scoreBoardHeight * .175 / .757,
    marginTop: scoreBoardHeight * .075 / .757,
    marginLeft: screenWidth * .15 / 4.6,
    justifyContent: 'flex-start',
  },
  scoreBox: {
    width: screenWidth * 1.273 / 4.6,
    height: scoreBoardHeight * .323 / .757,
    marginTop: scoreBoardHeight * .170 / .757,
    marginLeft: screenWidth * .123 / 4.6,
  },
  coinBox: {
    flex: 0,
    width: screenWidth * 1.273 / 4.6,
    height: scoreBoardHeight * .323 / .757,
    marginTop: scoreBoardHeight * .170 / .757,
    marginLeft: screenWidth * .123 / 4.6,
  },
  scoreBoardCoinTextHolder: {
    width: screenWidth * .833 / 4.6,
    height: scoreBoardHeight * .175 / .757,
    marginTop: scoreBoardHeight * .075 / .757,
    marginLeft: screenWidth * .360 / 4.6,
    justifyContent: 'center',
  },
  ethBox: {
    flex: 0,
    width: screenWidth * 1.273 / 3.6,
    height: scoreBoardHeight * .363 / .757,
    marginTop: scoreBoardHeight * .170 / .757,
    marginLeft: screenWidth * .123 / 3.6,
  },
  scoreBoardEthTextHolder: {
    width: screenWidth * .727 / 3.6,
    height: scoreBoardHeight * .175 / .757,
    marginTop: scoreBoardHeight * .075 / .757,
    marginLeft: screenWidth * .250 / 3.6,
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FAB523'
  }
});
