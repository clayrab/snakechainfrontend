import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  View,
  ImageBackground,
  Image
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Font } from 'expo';
import {asyncStore, getFromAsyncStore, removeItemValue} from "../utils/AsyncStore.js";
import {makeRetry} from "../utils/Retry.js";
import {context} from "../utils/Context.js";

let mineImages = [
  require('../assets/homepage/mine/mine0.png'),
  require('../assets/homepage/mine/mine10.png'),
  require('../assets/homepage/mine/mine20.png'),
  require('../assets/homepage/mine/mine30.png'),
  require('../assets/homepage/mine/mine40.png'),
  require('../assets/homepage/mine/mine50.png'),
  require('../assets/homepage/mine/mine60.png'),
  require('../assets/homepage/mine/mine70.png'),
  require('../assets/homepage/mine/mine80.png'),
  require('../assets/homepage/mine/mine90.png'),
  require('../assets/homepage/mine/mine100.png'),
]
let levelNames = {1: "Simple Snake", }
export default class GameHistoryOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      textStyle: { display: "none",},
      games: [],
      riffic: {},
    }
  }

  static getDerivedStateFromProps(props, state) {
    //let ethBal = (props.user.eth/CONSTANTS.WEIPERETH).toPrecision(4);
    if(props.user.name != "") {
      return {
        loading: false,
      };
    }
    return null;
  }
  async componentDidMount(){
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({riffic: {
      fontFamily: 'riffic-free-bold',
    }});
    let prom = async() => {
      return await new Promise((resolve, reject) => {
        getFromAsyncStore("jwt").then((jwt) =>{
          fetch(`${context.host}:${context.port}/getGames`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "JWT " + jwt,
            },
          }).then(async(response) => {
            var resp = await response.json();
            if(resp.error){
              alert(resp.error);
              resolve({loading: false});
            }else if(resp) {
              resolve({games: resp.games.reverse()});
            }
          }).catch(
            err => {
              throw err
            });
        }).catch(err => {throw err});
      }).catch(err => {throw err});
    }
    //let state = await makeRetry()(1500, prom);
    let state = await prom();
    this.setState(state);
  }
  render() {
    if (!this.props.show) {
      return null;
    } else {
      let mineGraphicIndex = 10-Math.floor(10*this.props.user.haul/this.props.user.mineMax);
      let mineTextColorStyle = {};
      if(mineGraphicIndex > 6){
        //mineTextColorStyle = { color: "#6A534F", }
        mineTextColorStyle = { color: "#352927", }
      }
      let mineImg = mineImages[mineGraphicIndex];
      let minePercent = (100*this.props.user.haul/this.props.user.mineMax).toPrecision(2);
      if(this.props.user.haul == this.props.user.mineMax){
        minePercent = 0;
      }
      return (
        <View style={styles.container}>
          <ImageBackground style={styles.backgroundImage} source={require('../assets/wallet/background.png')} resizeMode="stretch">
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <ImageBackground source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage} resizeMode="stretch"/>
            </TouchableOpacity>
            <View style={styles.topView}>
              <View style={styles.topHalfView1}>
                <Text style={[this.state.riffic, styles.historyLabelText, ]}>
                  YOUR SNAKE MINE
                </Text>
                <ImageBackground source={require('../assets/gamehistory/numberBG.png')} style={styles.numberBGImage} resizeMode="stretch">
                  <Text style={[this.state.riffic, styles.headerLabelText, styles.opacityFont]}>
                    EXTRA UNMINTED GOLD
                  </Text>
                  <Text style={[this.state.riffic, styles.headerText]}>
                    {this.props.user.unredeemed - this.props.user.haul}
                  </Text>
                </ImageBackground>
                <ImageBackground source={require('../assets/gamehistory/numberBG.png')} style={styles.numberBGImage} resizeMode="stretch">
                  <Text style={[this.state.riffic, styles.headerLabelText, styles.opacityFont]}>
                    REMAINING GOLD
                  </Text>
                  <Text style={[this.state.riffic, styles.headerText]}>
                    {this.props.user.mineMax - this.props.user.haul}
                  </Text>
                </ImageBackground>
                <ImageBackground source={require('../assets/gamehistory/numberBG.png')} style={styles.numberBGImage} resizeMode="stretch">
                  <Text style={[this.state.riffic, styles.headerLabelText, styles.opacityFont]}>
                    GAMES PLAYED
                  </Text>
                  <Text style={[this.state.riffic, styles.headerText]}>
                    {this.props.user.gamecount}
                  </Text>
                </ImageBackground>
              </View>
              <View style={styles.mineView}>
                <ImageBackground source={mineImg} style={styles.mineImage} resizeMode="contain" >
                  <Text style={[this.state.riffic, styles.mineText, mineTextColorStyle]}>
                    {minePercent}%
                  </Text>
                </ImageBackground>
              </View>
            </View>
            <ImageBackground source={require('../assets/gamehistory/trackBG.png')} style={styles.trackBGImage} resizeMode="stretch">
              <View style={styles.leftTrackNo}>
                <Text style={[this.state.riffic, styles.snakeNoText]}>{this.props.user.haul}</Text>
              </View>
              <TouchableOpacity style={styles.rightTrackContent}>
                <ImageBackground source={require('../assets/gamehistory/mintbutton.png')} style={styles.buttonImage} resizeMode="stretch">
                  <Text style={[this.state.riffic, styles.historyLabelText]}>MINT UNREFINED</Text>
                  <Text style={[this.state.riffic, styles.historyLabelText]}>SNAKECHAIN</Text>
                </ImageBackground>
              </TouchableOpacity>
            </ImageBackground>
            <ImageBackground source={require('../assets/gamehistory/GHBG.png')} style={[styles.contentImageBG, {flexDirection: 'column'}]} resizeMode="stretch">
              <ScrollView style={styles.contentView}>
                {
                  this.state.games.map((game, idx) => {
                    return (
                      <ImageBackground key={idx} source={require('../assets/gamehistory/ghButtonBG.png')} style={[styles.historyBG]} resizeMode="contain">
                        <View style={styles.historyLeftView}>
                          <Text style={[this.state.riffic, styles.historyLabelText]}>{levelNames[game.level]}</Text>
                        </View>
                        <Image source={require('../assets/gamehistory/Line.png')} style={styles.historySepImage} resizeMode="contain"/>
                        <View style={styles.historyLeftView}>
                          <Text style={[this.state.riffic, styles.historyLabelText]}>0</Text>
                          <Text style={[this.state.riffic, styles.historyLabelText, styles.opacityFont]}>POWER UPS</Text>
                        </View>
                        <View style={styles.historyLeftView}>
                          <Text style={[this.state.riffic, styles.historyLabelText]}>{game.score}</Text>
                          <Text style={[this.state.riffic, styles.historyLabelText, styles.opacityFont]}>GOLD</Text>
                        </View>
                      </ImageBackground>
                    );
                  })
                }
              </ScrollView>
            </ImageBackground>
          </ImageBackground>
        </View>
      );
    }
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor:  'rgba(0,0,0,0.6)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: -screenWidth*9/724,
    right: -screenWidth*9/724,
    zIndex: 100,
  },
  closeButtonImage: {
    height: 50,
    width: 35,
  },
  screen: {
    marginTop: 20
  },
  backgroundImage: {
    width: screenWidth*685/724,
    height: screenHeight*1238/1287,
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
  },
  topView: {
    flexDirection: 'row',
    width: "100%",
    paddingTop: 20,
  },
  topHalfView1: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  mineView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberBGImage: {
    width: screenWidth*368/1080,
    height: (297/744)*screenWidth*368/1080,
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mineImage: {
    width: screenWidth*280/1080,
    height: (945/411)*screenWidth*280/1080,
    justifyContent: 'center',
    alignItems: 'center',
    //411 × 945
  },
  mineText: {
    fontSize: 16,
    paddingBottom: 45,
    paddingLeft: 10,
  },
  trackBGImage: {
    width: "100%",
    aspectRatio: 2058/658,
    marginTop: -55,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonImage: {
    paddingTop: 3,
    marginTop: 10,
    width: screenWidth*493/1080,
    aspectRatio: 976/369,
    //height: screenHeight * 0.20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  contentView: {
    height: screenHeight * 0.45,
    marginLeft: 10,
    marginRight: 10,
  },
  contentImageBG: {
    //backgroundColor: 'transparent',
    marginTop: 20,
    paddingTop: 55,
    paddingBottom: 8,
    width: screenWidth - 40,
    height: screenHeight * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  topContentView: {
    flex: 1,
    height: screenHeight * 0.32,
    flexDirection: 'column'
  },
  innerContentView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  topInnerView: {
    flex: 6,
  },
  bottomInnerView: {
    flex: 4
  },
  buttonColorText: {
    color: "#000",
    fontSize: 16
  },
  buttonIconImage: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  diamondImage: {
    width: 20,
    height: 30,
    resizeMode: 'contain'
  },
  medalImage: {
    width: 100,
    height: screenHeight / 10 - 10,
  },
  profileImage: {
    width: 80,
    height: screenHeight / 10 - 25,
    marginLeft: 5,
    marginTop: 5
  },
  historyBG: {
    width: screenWidth * 0.8,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  historySepImage: {
    width: 5,
    height: 40,
  },
  historyLeftView: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center'
  },
  historyRightView: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center'
  },
  topRightHistoryView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  publicAddText: {
    color: "#000",
    fontSize: 14
  },
  profileInfoText: {
    color: "red",
    fontSize: 10,
    opacity: 0.5
  },
  snakeText: {
    color: "#fab523",
    fontSize: 14
  },
  numberText: {
    color: "#fab523",
    fontSize: 24
  },
  historyLabelText: {
    color: "#fab523",
    fontSize: 14
  },
  dateText: {
    color: "#fab523",
    fontSize: 10,
    opacity: 0.5
  },
  historyReceiveText: {
    color: '#10BB1A',
    fontSize: 14
  },
  headerText: {
    color: "#fab523",
    fontSize: 20
  },
  leftTrackNo: {
    flex: 475,
    width: screenWidth*321/1080,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 20,
    //backgroundColor: "#f00",
  },
  rightTrackContent: {
    flex: 561,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    //backgroundColor: "#f0f",
  },
  opacityFont: {
    opacity: 0.5
  },
  snakeNoText: {
    color: "#fab523",
    fontSize: 24
  },
  headerText: {
    color: "#fab523",
    fontSize: 20
  },
  headerLabelText: {
    color: '#fab523',
    fontSize: 10
  },
  // liquidText: {
  //   marginTop: screenHeight * 0.10,
  //   fontSize: 24,
  //   marginRight: screenWidth * 0.09
  // }
});
