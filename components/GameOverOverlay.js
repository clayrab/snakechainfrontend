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
  render() {
    if (!this.props.show) {
      return null;
    } else {
      // Level and Time
      {/*<ImageBackground source={require('../assets/gameover/darkLevelBG.png')} style={styles.darkLevelBG} resizeMode="contain">*/ }
      {/*  <Text style={[styles.buttonText, styles.levelText]}>Level: 13</Text>*/ }
      {/*  <Text style={[styles.buttonText, styles.levelText]}>Time: 5:00</Text>*/ }
      {/*</ImageBackground>*/ }
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/gameover/gameoveroverlayback.png')} style={styles.backgroundImage} resizeMode="stretch">

            <ImageBackground source={require('../assets/gameover/topgameover.png')} style={styles.topgameover}
              resizeMode="stretch">
              <Text style={[styles.buttonText, styles.gameOverText]}>
                GAME OVER
            </Text>
            </ImageBackground>
            {this.props.offerContract &&
              <View style={{ alignItems: "center" }}>

                <View style={styles.contractView}>
                  <Image source={require('../assets/gameover/gameoversnake.png')} style={styles.GameoverSnakeImage}
                    resizeMode="contain" />
                  <View >
                    <ImageBackground source={require('../assets/gameover/collectgoldback.png')} style={styles.collectGoldImg}
                      resizeMode="contain">
                      <Text style={[styles.buttonText, styles.scoreText]}>
                        1,205
                    </Text>
                    </ImageBackground>
                    <ImageBackground source={require('../assets/gameover/scoreboard.png')} style={styles.ScoreboardImg}
                      resizeMode="contain">
                      <View style={styles.scoreboardView}>
                        <View style={styles.dataView}>
                          <Text style={[styles.buttonText, styles.scoreText1]}>
                            Time:
                        </Text>
                          <Text style={[styles.buttonText, styles.scoreText2]}>
                            35:00
                        </Text>
                        </View>
                        <View style={styles.dataView}>
                          <Text style={[styles.buttonText, styles.scoreText1]}>
                            Level:
                        </Text>
                          <Text style={[styles.buttonText, styles.scoreText2]}>
                            105
                        </Text>
                        </View>
                        <View style={styles.dataView}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../assets/gameover/mashrom.png')} style={styles.mashroomImage}
                              resizeMode="contain" />
                            <Text style={[styles.buttonText, styles.scoreText1]}>
                              Collected:
                        </Text>
                          </View>
                          <Text style={[styles.buttonText, styles.scoreText2]}>
                            92
                        </Text>

                        </View>
                      </View>
                    </ImageBackground>
                  </View>

                </View>

                {/*<View style={styles.scrollView}>
                  <ImageBackground source={require('../assets/gameover/scrollback.png')}
                    style={styles.ScrollBackground} resizeMode="contain">
                    <View style={styles.bonusView}>
                      <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={2}>
                        <View style={styles.scrollitemtop}>
                          <ImageBackground source={require('../assets/gameover/scrollitem.png')} style={styles.scrollitem}
                            resizeMode="stretch">
                            <View style={styles.scrollitemtxt}>
                              <Text style={[styles.buttonText, styles.scoreText6]}>
                                Level 35 Bonus:
                        </Text>
                              <View style={styles.scrollmash}>
                                <Text style={[styles.buttonText, styles.scoreText3]}>
                                  3
                        </Text>
                                <Image source={require('../assets/gameover/mashrom.png')} style={styles.mashroomImage1}
                                  resizeMode="contain" />
                              </View>
                            </View>
                          </ImageBackground>
                        </View>
                        <View style={styles.scrollitems}>
                          <ImageBackground source={require('../assets/gameover/scrollitem.png')} style={styles.scrollitem1}
                            resizeMode="stretch">
                            <View style={styles.scrollitemtxt}>
                              <Text style={[styles.buttonText, styles.scoreText6]}>
                                Gold Mashroom:
                        </Text>
                              <View style={styles.scrollmash}>
                                <Text style={[styles.buttonText, styles.scoreText4]}>
                                  0.02
                          </Text>
                                <Image source={require('../assets/gameover/mashrom.png')} style={styles.mashroomImage1}
                                  resizeMode="contain" />
                              </View>
                            </View>
                          </ImageBackground>
                        </View>
                        <View style={styles.scrollitems}>
                          <ImageBackground source={require('../assets/gameover/scrollitem.png')} style={styles.scrollitem1}
                            resizeMode="stretch">
                            <View style={styles.scrollitemtxt}>
                              <Text style={[styles.buttonText, styles.scoreText6]}>
                                Level 30 Bonus:
                            </Text>
                              <View style={styles.scrollmash}>
                                <Text style={[styles.buttonText, styles.scoreText3]}>
                                  3
                              </Text>
                                <Image source={require('../assets/gameover/mashrom.png')} style={styles.mashroomImage1}
                                  resizeMode="contain" />
                              </View>
                            </View>

                          </ImageBackground>
                        </View>
                        <View style={styles.scrollitems}>
                          <ImageBackground source={require('../assets/gameover/scrollitem.png')} style={styles.scrollitem1}
                            resizeMode="stretch">
                            <View style={styles.scrollitemtxt}>
                              <Text style={[styles.buttonText, styles.scoreText6]}>
                                Level 30 Bonus:
                                    </Text>
                              <View style={styles.scrollmash}>
                                <Text style={[styles.buttonText, styles.scoreText3]}>
                                  3
                                </Text>
                                <Image source={require('../assets/gameover/mashrom.png')} style={styles.mashroomImage1}
                                  resizeMode="contain" />
                              </View>
                            </View>

                          </ImageBackground>
                        </View>
                      </ScrollView>
                    </View>
                  </ImageBackground>
                </View>*/}
              </View>
            }
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
  GameoverSnakeImage: {
    width: screenWidth * 507 / 1080,
    height: (1050 / 943) * screenWidth * 507 / 1080,
    marginRight: -screenWidth * 40 / 1080,
    marginLeft: -screenWidth * 30 / 1080,
    marginTop: (450 / 943) * screenWidth * 90 / 1080,
    zIndex: 100,
  },
  mashroomImage: {
    width: 15,
    height: 15,
    marginTop: 2
  },
  mashroomImage1: {
    width: 16,
    height: 16,
    marginTop: 4
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
