import React from "react";
import {ImageBackground, StyleSheet, Image, TouchableOpacity, View, Text, ScrollView} from 'react-native';
import {Font} from "expo";
import ScreenView from "./ScreenView";
import Header from "./Header";
import CONSTANTS from "../Constants";
import {normalize} from "../utils/FontNormalizer";

let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
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
const GameTypeItem = props => (
  <TouchableOpacity style={[styles.gameTypeItem, ]} onPress={props.onPress}>
    <ImageBackground source={require('../assets/selectlevel/gameTypeItemBackground.png')}
                     style={styles.gameTypeImage} resizeMode={'stretch'}>
      {/*<Text style={[styles.gameTypeTitle, props.fontStyle]}>{props.title}</Text>*/}
      <Image source={props.preview}
             style={[styles.gameTypePreview, {}]}
             resizeMode='center'/>
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

const Weapon = props => (
  <TouchableOpacity style={styles.weaponItem}>
    <View style={styles.circleContainer}>
      <ImageBackground source={require("../assets/selectlevel/circle.png")}
                       style={styles.weaponCountCircle}>
        <Text style={[styles.weaponCount, props.fontStyle]}>5</Text>
      </ImageBackground>
    </View>
    <Image source={props.weapon} resizeMode={'contain'}
           style={styles.weaponHolder}/>
  </TouchableOpacity>
);

const Description = props => (
  <View style={styles.descriptionContainer}>
    <Text style={[styles.descriptionText, props.fontStyle]}>
      {props.text}
    </Text>
  </View>
);

const SnakeNavigator = props => {
  let prevButtonOpacity = props.hasPrevious ? 1.0 : 0.2;
  let nextButtonOpacity = props.hasNext ? 1.0 : 0.2;
  return (
    <ImageBackground source={require('../assets/selectlevel/transparent_bg.png')}
                     style={styles.transparentImage}>
      <TouchableOpacity onPress={props.onPrevious} disabled={!props.hasPrevious} style={{opacity: prevButtonOpacity}}>
        <Image source={require('../assets/selectlevel/left.png')} style={styles.sliderHandler}/>
      </TouchableOpacity>
      <ImageBackground source={require("../assets/selectlevel/name_holder.png")} style={styles.nameHolder}>
        <Text style={[styles.levelName, props.fontStyle]}>{props.level.name}</Text>
      </ImageBackground>
      <TouchableOpacity onPress={props.onNext} disabled={!props.hasNext} style={{opacity: nextButtonOpacity}}>
        <Image source={require('../assets/selectlevel/right.png')} style={styles.sliderHandler}/>
      </TouchableOpacity>
    </ImageBackground>
  );
}
export default class SelectLevel extends React.Component {
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
      this.props.onSelectLevel(level, this.props.currentMode.name);
    }
    return onSelectLevel;
  }

  render() {
    const {gameModes, snakeIndex, currentMode, onPreviousMode, onNextMode} = this.props;
    return (
      <ScreenView style={styles.container}>

        <Header loading={this.props.loading}
                hasBackButton={true}
                exit={this.props.exit}
                user={this.props.user}
                style={styles.header}
                onWallet={this.props.onWallet}/>

        <SnakeNavigator
          fontStyle={this.state.riffic}
          level={currentMode}
          onPrevious={onPreviousMode}
          onNext={onNextMode}
          hasNext={snakeIndex !== gameModes.length - 1}
          hasPrevious={snakeIndex !== 0}
        />
        <ScrollView style={styles.scrollView}>
          <ImageBackground source={currentMode.background.top}
                           resizeMode={'cover'}
                           style={styles.backgroundImage}>
            <View style={[styles.snakeImageView, currentMode.style.snakeImageView]}>
              <Image source={currentMode.snake}
                     style={[styles.snakeImage, currentMode.style.snakeImage]}/>
            </View>
            <Description fontStyle={this.state.riffic} text={currentMode.description}/>
            <Weapon fontStyle={this.state.riffic} weapon={currentMode.weapon}/>
          </ImageBackground>
          <View style={styles.gameTypes}>
            <ImageBackground source={currentMode.background.bottom}
                             resizeMode={'cover'}
                             style={styles.gameTypesBackground}>
              <ScrollView style={{flex: 1}}>
                <View style={styles.gameTypeRow}>
                  <GameTypeItem
                    preview={require('../assets/snakemine/sc1.png')}
                    fontStyle={this.state.riffic}
                    title={"NO MULTIPLAYER"}
                    value={"FREE"}
                    onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.FREE)}
                  />
                  <GameTypeItem
                    preview={require('../assets/snakemine/sc2.png')}
                    fontStyle={this.state.riffic}
                    value={"Random"}
                    onPress={this.makeFnOnSelectLevel(CONSTANTS.LEVELS.WILD)}
                  />
                </View>
                <View style={{position: 'relative'}}>
                  {/*<View style={styles.tntToUnlockContainer}>*/}
                    {/*<TouchableOpacity onPress={() => null}>*/}
                      {/*<ImageBackground source={require('../assets/snakemine/textPart.png')}*/}
                                       {/*style={styles.dynamiteTextBG} resizeMode={'stretch'}>*/}
                        {/*<Text style={[this.state.riffic, styles.dynamiteText]}>*/}
                          {/*USE <Text style={[this.state.riffic, styles.dynamiteText2]}>TNT</Text> TO UNLOCK*/}
                        {/*</Text>*/}
                      {/*</ImageBackground>*/}
                    {/*</TouchableOpacity>*/}
                  {/*</View>*/}
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
                </View>
              </ScrollView>
            </ImageBackground>

          </View>

        </ScrollView>

      </ScreenView>
    );
  }
}

let styles = StyleSheet.create({
  container: {},
  header: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  backgroundImage: {
    position: 'relative',
    width: screenWidth,
    height: screenWidth * 1.14,
    marginTop: CONSTANTS.SCOREBOARDHEIGHT * .85,
  },
  snakeImageView: {
    position: 'absolute',
  },
  snakeImage: {
    resizeMode: 'contain',
  },
  transparentImage: {
    position: 'absolute',
    zIndex: 99,
    top: CONSTANTS.SCOREBOARDHEIGHT * .75,
    width: '100%',
    paddingTop: 30,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderHandler: {
    width: 50,
    height: 50,
    marginHorizontal: screenWidth * 0.05
  },
  nameHolder: {
    width: screenWidth * 0.5,
    resizeMode: 'contain',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  levelName: {
    color: "#E2C86B",
    fontSize: normalize(16),
    textShadowColor: 'rgba(0, 0, 0, 1.00)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 1,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(53, 41, 39, 0.9)',
    borderWidth: 1,
    borderColor: "yellow",
    borderRadius: 15,
    width: screenWidth * 0.9,
    alignSelf: 'center',
    position: 'absolute',
    bottom: screenWidth * 0.07,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    position: 'relative'
  },
  descriptionText: {
    width: screenWidth * 0.8,
    color: '#FAB523',
  },
  gameTypes: {
    marginTop: -15,
    width: screenWidth,
  },
  gameTypesBackground: {
    minHeight: screenWidth * 1,
    width: screenWidth,
    paddingTop: 10,
    paddingBottom: 20
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
    height: screenWidth * 0.40,
    alignItems: 'center',
  },
  gameTypePreview: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    //resizeMode: 'stretch',
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
  },
  gameTypeValueText: {
    color: "#FFF646",
    fontSize: normalize(16)
  },
  weaponItem: {
    position: 'absolute',
    right: screenWidth * 0.08,
    top: screenWidth * 0.4,
  },
  weaponHolder: {
    width: screenWidth * 0.27,
    height: screenWidth * 0.32,
    alignItems: 'center'
  },
  weaponImage: {
    width: screenWidth * 0.16,
    height: screenWidth * 0.16,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 26
  },
  circleContainer: {
    position: 'absolute',
    top: -5,
    zIndex: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  weaponCountCircle: {
    width: screenWidth * 0.09,
    height: screenWidth * 0.09,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weaponCount: {
    fontSize: normalize(18)
  },
  scTitleBG: {
    width: '100%',
    height: 30,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avgTitleText: {
    color: "#FAB523",
    fontSize: normalize(10),
    fontWeight: 'bold'
  },

  tntToUnlockContainer: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
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
