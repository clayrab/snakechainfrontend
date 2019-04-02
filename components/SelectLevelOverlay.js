import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground
} from 'react-native';
import {Font} from 'expo';
import CONSTANTS from '../Constants.js';
import {normalize} from '../utils/FontNormalizer.js';

export default class SelectLevelOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      riffic: {},
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({
      riffic: {
        fontFamily: 'riffic-free-bold',
      }
    });
  }

  makeFnOnSelectLevel = (level) => {
    let onSelectLevel = () => {
      this.props.onSelectLevel(level);
    }
    return onSelectLevel;
  }

  render() {
    if (!this.props.show || !this.props.user) {
      return null;
    } else {
      let dynamiteStyle1 = {opacity: 0.4,};
      let dynamiteStyle2 = {opacity: 0.4,};
      if (this.props.user.mineUpgrades & 1) {
        dynamiteStyle1 = {display: "none", };
      }
      if (this.props.user.mineUpgrades & 2) {
        dynamiteStyle2 = {};
      }
      return (
        <View style={styles.container}>
          <ImageBackground style={styles.content} source={require('../assets/pauseoverlay/BackgroundBrown.png')}
                           resizeMode={'stretch'}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage}
                     resizeMode="stretch"/>
            </TouchableOpacity>
            <View style={styles.buttonView}>
              <ImageBackground style={styles.brownButton} source={require('../assets/snakemine/title.png')}
                               resizeMode={'stretch'}>
                <Text style={[this.state.riffic, styles.titleText]}>
                  SELECT SNAKE MINE
                </Text>
              </ImageBackground>
            </View>
            <ScrollView style={[{zIndex: 1}, styles.contentView]/*zindex for dynamite overlay*/}>
              <View style={styles.childContentView}>
                <Text>Snake Rush</Text>
              </View>
              <View style={styles.childContentView}>
                <View style={styles.childRowContent}>
                  <TouchableOpacity onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.FREE)}>
                    <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                                     style={styles.snakeChainBG} resizeMode={'stretch'}>
                      <Text style={[this.state.riffic, styles.headerSC]}>
                        Original
                      </Text>
                      <Image source={require('../assets/snakemine/sc1.png')} style={styles.scImage}
                             resizeMode={'stretch'}/>
                      <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG}
                                       resizeMode={'stretch'}>
                        <Text style={[this.state.riffic, styles.freeText]}>
                          FREE
                        </Text>
                      </ImageBackground>
                    </ImageBackground>
                  </TouchableOpacity>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                                   style={styles.scTitleBG} resizeMode={'stretch'}>
                    <Text style={[this.state.riffic, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
                {/*<View style={styles.childRowContent}>
                  <TouchableOpacity onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.WILD)}>
                    <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                      style={styles.snakeChainBG} resizeMode={'stretch'}>
                      <Text style={[this.state.riffic, styles.headerSC]}>
                        Random
                      </Text>
                      <Image source={require('../assets/snakemine/sc2.png')} style={styles.scImage} resizeMode={'stretch'}/>
                      <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG} resizeMode={'stretch'}>
                        <Text style={[this.state.riffic, styles.snakeText]}>
                          TBD
                        </Text>
                      </ImageBackground>
                    </ImageBackground>
                  </TouchableOpacity>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                    style={styles.scTitleBG} resizeMode={'stretch'}>
                    <Text style={[this.state.riffic, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>*/}
              </View>

              <View style={[{zIndex: 100}, styles.childContentView]}>
                <View style={styles.dynamiteOverlay, dynamiteStyle1}>
                  <TouchableOpacity onPress={this.props.buySnkDynamite}>
                    <ImageBackground source={require('../assets/snakemine/textPart.png')}
                                     style={styles.dynamiteTextBG} resizeMode={'stretch'}>
                      <Text style={[this.state.riffic, styles.dynamiteText]}>
                        USE <Text style={[this.state.riffic, styles.dynamiteText2]}>TNT</Text> TO UNLOCK
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
                <View style={styles.childRowContent}>
                  <TouchableOpacity onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.SCATTER1)}>
                    <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                                     style={[styles.snakeChainBG]} resizeMode={'stretch'}>
                      <Text style={[this.state.riffic, styles.headerSC]}>
                        NO MULTIPLAYER
                      </Text>
                      <Image source={require('../assets/snakemine/sc3.png')} style={styles.scImage}
                             resizeMode={'stretch'}/>
                      <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG}
                                       resizeMode={'stretch'}>
                        <Text style={[this.state.riffic, styles.ethText]}>
                          0.01 ETH
                        </Text>
                      </ImageBackground>
                    </ImageBackground>
                  </TouchableOpacity>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                                   style={[styles.scTitleBG]} resizeMode={'stretch'}>
                    <Text style={[this.state.riffic, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
                <View style={styles.childRowContent}>
                  <TouchableOpacity onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.BLOCK1)}>
                    <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                                     style={[styles.snakeChainBG]} resizeMode={'stretch'}>
                      <Text style={[this.state.riffic, styles.headerSC]}>
                        NO MULTIPLAYER
                      </Text>
                      <Image source={require('../assets/snakemine/sc4.png')} style={styles.scImage}
                             resizeMode={'stretch'}/>
                      <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG}
                                       resizeMode={'stretch'}>
                        <Text style={[this.state.riffic, styles.snakeText]}>
                          100 SNAKE
                        </Text>
                      </ImageBackground>
                    </ImageBackground>
                  </TouchableOpacity>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                                   style={[styles.scTitleBG]} resizeMode={'stretch'}>
                    <Text style={[this.state.riffic, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
              </View>

              <View style={[{zIndex: 2}, styles.childContentView]}>
                <View style={styles.childRowContent}>
                  <TouchableOpacity onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.SCATTER2)}>
                    <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                                     style={[styles.snakeChainBG]} resizeMode={'stretch'}>
                      <Text style={[this.state.riffic, styles.headerSC]}>
                        NO MULTIPLAYER
                      </Text>
                      <Image source={require('../assets/snakemine/sc5.png')} style={styles.scImage}
                             resizeMode={'stretch'}/>
                      <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG}
                                       resizeMode={'stretch'}>
                        <Text style={[this.state.riffic, styles.ethText]}>
                          0.1 ETH
                        </Text>
                      </ImageBackground>
                    </ImageBackground>
                  </TouchableOpacity>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                                   style={[styles.scTitleBG]} resizeMode={'stretch'}>
                    <Text style={[this.state.riffic, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
                <View style={styles.childRowContent}>
                  <TouchableOpacity onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.BLOCK2)}>
                    <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                                     style={[styles.snakeChainBG]} resizeMode={'stretch'}>
                      <Text style={[this.state.riffic, styles.headerSC]}>
                        NO MULTIPLAYER
                      </Text>
                      <Image source={require('../assets/snakemine/sc6.png')} style={styles.scImage}
                             resizeMode={'stretch'}/>
                      <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG}
                                       resizeMode={'stretch'}>
                        <Text style={[this.state.riffic, styles.snakeText]}>
                          100 SNAKE
                        </Text>
                      </ImageBackground>
                    </ImageBackground>
                  </TouchableOpacity>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                                   style={[styles.scTitleBG]} resizeMode={'stretch'}>
                    <Text style={[this.state.riffic, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
              </View>

              <View style={styles.childContentView}>
                {/*}<View style={[styles.dynamiteOverlay, {height: "100%"}, dynamiteStyle2]}>
                  <TouchableOpacity onPress={this.props.buyEthDynamite}>
                    <ImageBackground source={require('../assets/snakemine/textPart.png')}
                      style={styles.dynamiteTextBG} resizeMode={'stretch'}>
                      <Text style={[this.state.riffic, styles.dynamiteText]}>
                        USE TNT TO UNLOCK
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>*/}
                {/*<View style={styles.childRowContent}>
                  <TouchableOpacity onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.SCATTER3)}>
                    <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                      style={styles.snakeChainBG} resizeMode={'stretch'}>
                      <Text style={[this.state.riffic, styles.headerSC]}>
                        NO MULTIPLAYER
                      </Text>
                      <Image source={require('../assets/snakemine/sc7.png')} style={styles.scImage} resizeMode={'stretch'}/>
                      <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG} resizeMode={'stretch'}>
                        <Text style={[this.state.riffic, styles.ethText]}>
                          0.001 ETH
                        </Text>
                      </ImageBackground>
                    </ImageBackground>
                  </TouchableOpacity>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                    style={styles.scTitleBG} resizeMode={'stretch'}>
                    <Text style={[this.state.riffic, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
                <View style={styles.childRowContent}>
                  <TouchableOpacity onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.BLOCK3)}>
                    <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                      style={styles.snakeChainBG} resizeMode={'stretch'}>
                      <Text style={[this.state.riffic, styles.headerSC]}>
                        NO MULTIPLAYER
                      </Text>
                      <Image source={require('../assets/snakemine/sc8.png')} style={styles.scImage} resizeMode={'stretch'}/>
                      <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG} resizeMode={'stretch'}>
                        <Text style={[this.state.riffic, styles.snakeText]}>
                          100 SNAKE
                        </Text>
                      </ImageBackground>
                    </ImageBackground>
                  </TouchableOpacity>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                    style={styles.scTitleBG} resizeMode={'stretch'}>
                    <Text style={[this.state.riffic, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>*/}
              </View>
            </ScrollView>
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
  content: {
    width: screenWidth * 4 / 5,
    height: screenHeight * 4 / 5,
    position: 'relative',
    flexDirection: 'column',
  },
  closeButton: {
    position: 'absolute',
    top: -20,
    right: -15,
    zIndex: 100,
  },
  closeButtonImage: {
    height: 50,
    width: 35
  },
  buttonView: {
    alignItems: 'center',
    marginTop: -15
  },
  brownButton: {
    width: screenWidth / 2,
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentView: {
    flexDirection: 'column',
    marginBottom: 12
  },
  childContentView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  childRowContent: {
    flex: 1,
    alignItems: 'center'
  },
  snakeChainBG: {
    // leftBG.png = 650 × 865
    width: 160 * 650 / 865,
    height: 160,
    alignItems: 'center',
    marginTop: 5
  },
  scImage: {
    width: '80%',
    height: 100,
    marginTop: 5
  },
  scNameBG: {
    //backgroundColor: "#f00",
    width: '80%',
    height: 20,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scTitleBG: {
    width: '90%',
    height: 30,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: "#fab523",
    fontSize: normalize(14),
  },
  avgTitleText: {
    color: "#fab523",
    fontSize: normalize(8),
    fontWeight: 'bold'
  },
  headerSC: {
    color: '#261D1C',
    fontSize: normalize(12),
    fontWeight: 'bold',
    marginTop: 5
  },
  freeText: {
    color: '#51B545',
    fontSize: normalize(12),
    fontWeight: 'bold'
  },
  ethText: {
    color: '#FFF646',
    fontSize: normalize(12),
    fontWeight: 'bold'
  },
  snakeText: {
    color: '#fab523',
    fontSize: normalize(12),
    fontWeight: 'bold'
  },
  dynamiteOverlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    //backgroundColor:  'rgba(0.0,0,0,0.6)',
    width: "100%",
    height: "200%",
    // borderRadius:10,
    // borderWidth: 5,
    // borderColor: '#392014',
    //borderColor: '#000000',

    //57 32 20
    //0x392014
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  dynamiteTextBG: {
    //width: "80%",
    //aspectRatio: 590/164,

    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dynamiteText: {
    color: "#fab523",
    fontSize: normalize(14),
    fontWeight: 'bold'
  },
  dynamiteText2: {
    color: "#C22126",
    fontSize: normalize(14),
    fontWeight: 'bold'
  }
});
