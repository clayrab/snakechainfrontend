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
const GameTypeItem = props => (
  <TouchableOpacity style={[styles.gameTypeItem, ]} onPress={props.onPress}>
    <ImageBackground source={require('../assets/selectlevel/gameTypeItemBackground.png')}
                     style={styles.gameTypeImage} resizeMode={'stretch'}>
      {/*<Text style={[styles.gameTypeTitle, props.fontStyle]}>{props.title}</Text>*/}
      <Image source={props.preview}
             style={[styles.gameTypePreview, {}]}
             resizeMode='contain'/>
      <ImageBackground source={require("../assets/selectlevel/gameTypeValue.png")}
                       style={styles.gameTypeValueContainer} resizeMode={'contain'}>
        <Text style={[styles.gameTypeValueText, props.fontStyle, props.valueStyle]}>{props.value}</Text>
      </ImageBackground>
    </ImageBackground>
    {/*<ImageBackground source={require('../assets/snakemine/textPart.png')}
                     style={[styles.scTitleBG]} resizeMode={'stretch'}>
      <Text style={[props.fontStyle, styles.avgTitleText]}>
        AVG. 22 SNAKECHAIN
      </Text>
    </ImageBackground>*/}
  </TouchableOpacity>
);

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
      let lockedStyle1 = {opacity: 0.4,};
      let tntButtonStyle1 = {};
      if (this.props.user.mineUpgrades & 1 || true) {
        lockedStyle1 = {};
        tntButtonStyle1 = {display: "none", };
      }
      // if (this.props.user.mineUpgrades & 2) {
      //   tntButtonStyle1 = {};
      // }
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
            <ScrollView style={{flex: 1}}>
              <View style={styles.gameTypeRow}>
                <GameTypeItem
                  preview={require('../assets/snakemine/sc1.png')}
                  fontStyle={this.state.riffic}
                  value={"Basic"}
                  onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.BASIC)}
                />
                <GameTypeItem
                  preview={require('../assets/snakemine/sc2.png')}
                  fontStyle={this.state.riffic}
                  value={"Random"}
                  onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.WILD)}
                />
              </View>
              <View style={styles.gameTypeRow}>
                <GameTypeItem
                  preview={require('../assets/snakemine/sc3.png')}
                  fontStyle={this.state.riffic}
                  title={"NO MULTIPLAYER"}
                  onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.SCATTER1)}
                  value={"Scatter 1"}/>
                <GameTypeItem
                  preview={require('../assets/snakemine/sc4.png')}
                  fontStyle={this.state.riffic}
                  onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.BLOCK1)}
                  value={"Blocks 1"}/>
              </View>
              <View style={styles.gameTypeRow}>
                <GameTypeItem
                  preview={require('../assets/snakemine/sc5.png')}
                  fontStyle={this.state.riffic}
                  onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.SCATTER2)}
                  value={"Scatter 2"}/>
                <GameTypeItem
                  preview={require('../assets/snakemine/sc6.png')}
                  fontStyle={this.state.riffic}
                  onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.BLOCK2)}
                  value={"Blocks 2"}/>
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
  },

  gameTypeRow: {
    paddingHorizontal: screenWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  gameTypeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  gameTypeImage: {
    width: screenWidth * 0.35,
    //height: screenWidth * 0.40,
    alignItems: 'center',
  },
  gameTypePreview: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    margin: 5,
  },
  gameTypeTitle: {
    marginBottom: 2,
    fontSize: normalize(12),
    color: "#261D1C"
  },
  gameTypeValueContainer: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
});
