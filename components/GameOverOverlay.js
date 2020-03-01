import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, ScrollView
} from 'react-native';
import { normalize } from '../utils/FontNormalizer.js';

export default class GameOverOverlay extends React.Component {
  msToTimeasdf(s) {
    //var ms = s % 1000;
    s = s / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    return hrs + ':' + mins + ':' + secs;
  }
  msToTime(s) {
      // Pad to 2 or 3 digits, default is 2
    // var pad = (n, z = 2) => ('00' + n).slice(-z);
    // return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0) + ':' + pad((s%6e4)/1000|0) + '.' + pad(s%1000, 3);
    function pad(n, z) {
      z = z || 2;
      return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
  }
  render() {
    if (!this.props.show) {
      return null;
    } else {
      console.log(this.props.gameOverInfo)
      // Level and Time
      {/*<ImageBackground source={require('../assets/gameover/darkLevelBG.png')} style={styles.darkLevelBG} resizeMode="contain">*/ }
      {/*  <Text style={[styles.buttonText, styles.levelText]}>Level: 13</Text>*/ }
      {/*  <Text style={[styles.buttonText, styles.levelText]}>Time: 5:00</Text>*/ }
      {/*</ImageBackground>*/ }
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/gameover/gameoveroverlayback.png')} style={styles.backgroundImage} resizeMode="stretch">
            <ImageBackground source={require('../assets/gameover/topgameover.png')} style={styles.topgameover} resizeMode="stretch">
              <Text style={[styles.buttonText, styles.gameOverText]}>GAME OVER</Text>
            </ImageBackground>
            <View style={{ alignItems: "center" }}>
              <View style={styles.contractView}>
                <View>
                  <ImageBackground source={require('../assets/gameover/collectgoldback.png')} style={styles.collectGoldImg} resizeMode="contain">
                    <Text style={[styles.buttonText, styles.scoreText]}>
                      {this.props.gameOverInfo.score}
                    </Text>
                  </ImageBackground>
                  {/*<ImageBackground source={require('../assets/gameover/scoreboard.png')} style={styles.ScoreboardImg}
                    resizeMode="contain">*/}
                  <View style={styles.scoreboardView}>
                    <View style={styles.dataView}>
                      <Text style={[styles.buttonText, styles.scoreText1]}>
                        Time:
                      </Text>
                      <Text style={[styles.buttonText, styles.scoreText2]}>
                        {this.msToTime(this.props.gameOverInfo.time)}
                      </Text>
                    </View>
                    <View style={styles.dataView}>
                      <Text style={[styles.buttonText, styles.scoreText1]}>
                        Pellets:
                      </Text>
                      <Text style={[styles.buttonText, styles.scoreText2]}>
                        {this.props.gameOverInfo.pelletCount}
                      </Text>
                    </View>
                    <View style={styles.dataView}>
                      <Text style={[styles.buttonText, styles.scoreText1]}>
                        Yellow Mushrooms:
                      </Text>
                      <Text style={[styles.buttonText, styles.scoreText2]}>
                        {this.props.gameOverInfo.yellowPowerupCount}
                      </Text>
                    </View>
                    <View style={styles.dataView}>
                      <Text style={[styles.buttonText, styles.scoreText1]}>
                        Orange Mushrooms:
                      </Text>
                      <Text style={[styles.buttonText, styles.scoreText2]}>
                        {this.props.gameOverInfo.orangePowerupCount}
                      </Text>
                    </View>
                    <View style={styles.dataView}>
                      <Text style={[styles.buttonText, styles.scoreText1]}>
                        Red Mushrooms:
                      </Text>
                      <Text style={[styles.buttonText, styles.scoreText2]}>
                        {this.props.gameOverInfo.redPowerupCount}
                      </Text>
                    </View>
                    <View style={styles.dataView}>
                      <Text style={[styles.buttonText, styles.scoreText1]}>
                        Blue Mushrooms:
                      </Text>
                      <Text style={[styles.buttonText, styles.scoreText2]}>
                        {this.props.gameOverInfo.bluePowerupCount}
                      </Text>
                    </View>
                    <View style={styles.dataView}>
                      <Text style={[styles.buttonText, styles.scoreText1]}>
                        Lightnings:
                      </Text>
                      <Text style={[styles.buttonText, styles.scoreText2]}>
                        {this.props.gameOverInfo.lightningPowerupCount}
                      </Text>
                    </View>
                    <View style={styles.dataView}>
                      <Text style={[styles.buttonText, styles.scoreText1]}>
                        Lightning Luck:
                      </Text>
                      <Text style={[styles.buttonText, styles.scoreText2]}>
                        { Math.floor(100*this.props.gameOverInfo.lightningFreeMushCount/this.props.gameOverInfo.lightningPowerupCount) }%
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.touchableButton} onPress={this.props.restart}>
              <ImageBackground source={require('../assets/gameover/greenButton.png')} style={styles.largeButton}
                resizeMode="stretch">
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.buttonText, styles.largeButtonBText]}>
                    PLAY AGAIN
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableButton} onPress={this.props.exit}>
              <ImageBackground source={require('../assets/gameover/darkButton.png')} style={styles.largeButton}
                resizeMode="stretch">
                <Text style={[styles.buttonText, styles.largeButtonText]}>
                  EXIT
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    }
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    // width: screenWidth * 685 / 724,
    // height: screenHeight * 1180 / 1287,
    width: screenWidth,
    height: screenHeight,
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 40,
  },
  topButtonView: {
    width: screenWidth,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 10
  },
  closeButtonImage: {
    width: 40,
    height: 40,
  },
  darkLevelBG: {
    width: screenWidth / 2,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20
  },
  contractView: {
    flexDirection: 'row'
  },
  scoreView: {
    flexDirection: 'column'
  },
  scoreboardView: {
    flexDirection: 'column',
    marginTop: 10,
  },
  dataView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5
  },
  collectGoldImg: {
    height: 508 / 862 * screenWidth * 479 / 1080,
    width: screenWidth * 549 / 1080,
    marginLeft: -screenWidth * 80 / 1080,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ScoreboardImg: {
    width: screenWidth * 550 / 1080,
    height: (994 / 1517) * screenWidth * 550 / 1080,
    marginLeft: -screenWidth * 80 / 1080,
    marginTop: -screenWidth * 40 / 1080,
  },
  topgameover: {
    width: screenWidth * 850 / 1080,
    //width: screenWidth * 0.75,
    //height: 60,
    height: (406 / 1625) * screenWidth * 850 / 1080,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -screenWidth * 50 / 1080,
  },
  touchableButton: {
    alignItems: 'center',
    marginTop: 5,
  },
  ScrollBackground: {
    marginTop: 10,
    width: screenWidth * 1080 / 1080,
    height: (694 / 1000) * screenWidth * 1080 / 1080,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signConractText: {
    color: "#000",
    fontSize: normalize(13),
  },
  largeButton: {
    width: screenWidth * 708 / 1080,
    //width: screenWidth * 0.75,
    //height: 60,
    height: (386 / 1425) * screenWidth * 708 / 1080,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollitem: {
    width: screenWidth * 780 / 1080,
    height: (350 / 1625) * screenWidth * 780 / 1080,
    marginRight: 40,
  },
  scrollitem1: {
    width: screenWidth * 780 / 1080,
    height: (350 / 1625) * screenWidth * 780 / 1080,
    marginRight: 40,
  },
  scrollView: {
    flexDirection: 'column',
  },
  bonusView: {
    height: 205,
    paddingTop: 20,
    marginTop: 10,
    width: 280
  },
  scrollitemtop: {
    marginBottom: 10,
    // marginVertical: 45,
    //   marginLeft:15
  },
  scrollitems: {
    marginBottom: 10,
    // marginLeft:15
  },
  scrollitemtxt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    marginRight: 5
  },
  buttonText: {
    fontWeight: 'bold',
    fontFamily: 'riffic-free-bold',
  },
  largeButtonText: {
    color: "#fab523",
    fontSize: normalize(18),
  },
  largeButtonBText: {
    color: "#000",
    fontSize: normalize(18),
  },
  gameOverText: {
    color: "#fab523",
    fontSize: normalize(32),
    marginBottom: 10
  },
  scoreText: {
    color: "#fab523",
    fontSize: normalize(30),
    marginBottom: 10,
    marginRight: 60
  },
  scoreText1: {
    color: "#fab523",
    fontSize: normalize(15),
  },
  scoreText2: {
    color: "white",
    fontSize: normalize(15),
  },
  scoreText3: {
    color: "#fab523",
    fontSize: normalize(18),
  },
  scoreText6: {
    color: "#fab523",
    fontSize: normalize(18),
    marginLeft: 10
  },
  scoreText4: {
    color: "#fab523",
    fontSize: normalize(18),
    marginLeft: 20
  },
  scoreText5: {
    color: "black",
    fontSize: normalize(18),
    marginLeft: 20
  },
  levelText: {
    color: "#fab523",
    fontSize: normalize(16),
  },
  selectionText: {
    color: "#fab523",
    fontSize: normalize(12),
    marginTop: 10,
    marginBottom: 10
  },
  numberText: {
    color: "#fab523",
    fontSize: normalize(20),
  },
  contractText: {
    color: '#000',
    fontSize: normalize(14),
    marginTop: 5,
  },
  contractDetails: {
    color: '#000',
    fontSize: normalize(10),
    marginLeft: 20,
    marginRight: 15,
    marginTop: 5
  },
  smallTouchableButton: {
    marginBottom: 50
  },
  btnagain: {
    flexDirection: 'row',
    marginLeft: 35
  },
  scrollmash: {
    flexDirection: 'row',
    marginRight: 7
  }
});
