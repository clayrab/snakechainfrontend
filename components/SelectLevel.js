import React from "react";
import {ImageBackground, StyleSheet, Image, TouchableOpacity, View, Text, ScrollView} from 'react-native';
import {Font} from "expo";
import ScreenView from "./ScreenView";
import Header from "./Header";
import CONSTANTS from "../Constants";
import {normalize} from "../utils/FontNormalizer";

let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;

const GameTypeItem = props => (
  <TouchableOpacity style={styles.gameTypeItem}>
    <ImageBackground source={require('../assets/selectlevel/gameTypeItemBackground.png')}
                     style={styles.gameTypeImage} resizeMode={'contain'}>

      <Text style={[styles.gameTypeTitle, props.fontStyle]}>{props.title}</Text>

      <Image source={props.preview}
             style={styles.gameTypePreview}
             resizeMode={'contain'}/>

      <ImageBackground source={require("../assets/selectlevel/gameTypeValue.png")}
                       style={styles.gameTypeValueContainer} resizeMode={'contain'}>
        <Text style={[styles.gameTypeValueText, props.fontStyle, props.valueStyle]}>{props.value}</Text>
      </ImageBackground>

    </ImageBackground>

    <ImageBackground source={require('../assets/snakemine/textPart.png')}
                     style={[styles.scTitleBG]} resizeMode={'stretch'}>
      <Text style={[props.fontStyle, styles.avgTitleText]}>
        AVG. 22 SNAKECHAIN
      </Text>
    </ImageBackground>
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

const LevelNavigator = props => (
  <ImageBackground source={require('../assets/selectlevel/transparent_bg.png')}
                   style={styles.transparentImage}>

    <TouchableOpacity onPress={props.onPrevious} disabled={!props.hasPrevious}>
      <Image source={require('../assets/selectlevel/left.png')} style={styles.sliderHandler}/>
    </TouchableOpacity>

    <ImageBackground source={require("../assets/selectlevel/name_holder.png")} style={styles.nameHolder}>
      <Text style={[styles.levelName, props.fontStyle]}>{props.level.name}</Text>
    </ImageBackground>

    <TouchableOpacity onPress={props.onNext} disabled={!props.hasNext}>
      <Image source={require('../assets/selectlevel/right.png')} style={styles.sliderHandler}/>
    </TouchableOpacity>

  </ImageBackground>
);

const levels = ["TRADITIONAL", "SUPER_SNAKE", "SNAKE_RUSH"];
const levelsData = {
  "TRADITIONAL": {
    name: "TRADITIONAL",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod",
    background: {
      top: require("../assets/selectlevel/levels/traditional/background_top.png"),
      bottom: require("../assets/selectlevel/levels/traditional/bottom.png"),
    },
    snake: require('../assets/selectlevel/levels/traditional/snake.png'),
    style: {
      snakeImageView: {
        left: screenWidth * 0.07,
        bottom: screenWidth * 0.32
      },
      snakeImage: {
        width: screenWidth * 0.52,
        height: screenWidth * 0.36,
      }
    },
    weapon: require('../assets/selectlevel/levels/traditional/weapon.png'),
  },
  "SUPER_SNAKE": {
    name: "SUPER SNAKE",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod",
    background: {
      top: require("../assets/selectlevel/levels/super_snake/background_top.png"),
      bottom: require("../assets/selectlevel/levels/super_snake/bottom.png"),
    },
    style: {
      snakeImageView: {
        left: screenWidth * 0.2,
        bottom: screenWidth * 0.27
      },
      snakeImage: {
        width: screenWidth * 0.38,
        height: screenWidth * 0.5
      }
    },
    snake: require('../assets/selectlevel/levels/super_snake/snake.png'),
    weapon: require('../assets/selectlevel/levels/super_snake/weapon.png'),
  },
  "SNAKE_RUSH": {
    name: "SNAKE RUSH",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod",
    background: {
      top: require("../assets/selectlevel/levels/snake_rush/background_top.png"),
      bottom: require("../assets/selectlevel/levels/snake_rush/bottom.png"),
    },
    style: {
      snakeImageView: {
        left: screenWidth * 0.1,
        bottom: screenWidth * 0.36
      },
      snakeImage: {
        width: screenWidth * 0.4,
        height: screenWidth * 0.45
      }
    },
    snake: require('../assets/selectlevel/levels/snake_rush/snake.png'),
    weapon: require('../assets/selectlevel/levels/snake_rush/weapon.png'),
  },
};

export default class SelectLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      riffic: {},
      levelIndex: 0,
      level: levelsData[levels[0]]
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

  previousLevel = () => {
    let {levelIndex} = this.state;
    levelIndex--;
    this.setState({
      levelIndex,
      level: levelsData[levels[levelIndex]]
    })
  };

  nextLevel = () => {
    let {levelIndex} = this.state;
    levelIndex++;
    this.setState({
      levelIndex,
      level: levelsData[levels[levelIndex]]
    })
  };

  render() {
    const {levelIndex, level} = this.state;
    return (
      <ScreenView style={styles.container}>

        <Header loading={this.props.loading}
                hasBackButton={true}
                exit={this.props.exit}
                user={this.props.user}
                style={styles.header}
                onWallet={this.props.onWallet}/>

        <LevelNavigator
          fontStyle={this.state.riffic}
          level={level}
          onPrevious={this.previousLevel}
          onNext={this.nextLevel}
          hasNext={levelIndex !== levels.length - 1}
          hasPrevious={levelIndex !== 0}
        />

        <ScrollView style={styles.scrollView}>

          <ImageBackground source={level.background.top}
                           resizeMode={'cover'}
                           style={styles.backgroundImage}>

            <View style={[styles.snakeImageView, level.style.snakeImageView]}>
              <Image source={level.snake}
                     style={[styles.snakeImage, level.style.snakeImage]}/>
            </View>

            <Description fontStyle={this.state.riffic}
                         text={level.description}/>

            <Weapon fontStyle={this.state.riffic} weapon={level.weapon}/>

          </ImageBackground>

          <View style={styles.gameTypes}>

            <ImageBackground source={level.background.bottom}
                             resizeMode={'cover'}
                             style={styles.gameTypesBackground}>

              <ScrollView style={{flex: 1}}>

                <View style={styles.gameTypeRow}>
                  <GameTypeItem
                    preview={require('../assets/snakemine/sc1.png')}
                    fontStyle={this.state.riffic}
                    title={"NO MULTIPLAYER"}
                    value={"FREE"}
                    valueStyle={{color: "#51B545"}}
                  />
                </View>
                <View style={{position: 'relative'}}>
                  <View style={styles.tntToUnlockContainer}>
                    <TouchableOpacity onPress={() => null}>
                      <ImageBackground source={require('../assets/snakemine/textPart.png')}
                                       style={styles.dynamiteTextBG} resizeMode={'stretch'}>
                        <Text style={[this.state.riffic, styles.dynamiteText]}>
                          USE <Text style={[this.state.riffic, styles.dynamiteText2]}>TNT</Text> TO UNLOCK
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.gameTypeRow}>
                    <GameTypeItem
                      preview={require('../assets/snakemine/sc2.png')}
                      fontStyle={this.state.riffic}
                      title={"NO MULTIPLAYER"}
                      value={"0.01 ETH"}/>
                    <GameTypeItem
                      preview={require('../assets/snakemine/sc3.png')}
                      fontStyle={this.state.riffic}
                      title={"NO MULTIPLAYER"}
                      value={"100 SNAKE"}/>
                  </View>
                  <View style={styles.gameTypeRow}>
                    <GameTypeItem
                      preview={require('../assets/snakemine/sc4.png')}
                      fontStyle={this.state.riffic}
                      title={"NO MULTIPLAYER"}
                      value={"0.1 ETH"}/>
                    <GameTypeItem
                      preview={require('../assets/snakemine/sc5.png')}
                      fontStyle={this.state.riffic}
                      title={"NO MULTIPLAYER"}
                      value={"100 SNAKE"}/>
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
    height: screenWidth * 0.48,
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 5
  },
  gameTypePreview: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    resizeMode: 'contain',
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