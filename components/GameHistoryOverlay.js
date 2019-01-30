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
export default class GameHistoryOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      textStyle: { display: "none",},
      games: [],
    }
  }

  static getDerivedStateFromProps(props, state) {
    //let ethBal = (props.user.eth/CONSTANTS.WEIPERETH).toPrecision(4);
    if(props.user.name != "") {
      return {
        loading: false,
      };
    }
  }
  async componentDidMount(){
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    //setstate below will cause this to be applied. No need to make it a member of this.state.
    styles.buttonText = {
      fontFamily: 'riffic-free-bold'
    };
    let prom = async() => {
      return await new Promise((resolve, reject) => {
        getFromAsyncStore("jwt").then((jwt) =>{
          fetch(`${context.host}:${context.port}/getGames`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                //"Content-Type": "application/json; charset=utf-8",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "JWT " + jwt,
            },
          }).then(async(response) => {
            var resp = await response.json();
            if(resp.error){
              alert(resp.error);
              resolve({loading: false});
            }else if(resp) {
              resolve({games: resp.games});
            }
          }).catch(
            err => {
              throw err
            });
        }).catch(err => {throw err});
      }).catch(err => {throw err});
    }
    let state = await makeRetry()(1500, prom);
    this.setState(state);
  }
  render() {
    if (!this.props.show) {
      return null;
    } else {
      let mineGraphicIndex = Math.floor(10*this.props.user.haul/this.props.user.mineMax);
      let mineTextColorStyle = {};
      if(mineGraphicIndex > 6){
        mineTextColorStyle = { color: "#6A534F", }
      }
      let mineImg = mineImages[mineGraphicIndex];
      let minePercent = (100*this.props.user.haul/this.props.user.mineMax).toPrecision(2);
      if(this.props.user.haul == this.props.user.mineMax){
          minePercent = 100;
      }
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
            <Image style={styles.closeButtonImage} source={require('../assets/closebutton_bad.png')}/>
          </TouchableOpacity>
          <ImageBackground style={styles.backgroundImage} resizeMode="cover">
            <View style={styles.topView}>
              <View style={styles.topHalfView}>
                <Text style={[styles.buttonText, styles.historyLabelText, {marginTop: 10, fontSize: 18, marginBottom: 10}]}>
                  YOUR SNAKE MINE
                </Text>
                <ImageBackground source={require('../assets/gamehistory/numberBG.png')} style={styles.numberBGImage} resizeMode="contain">
                  <Text style={[styles.buttonText, styles.headerLabelText, styles.opacityFont]}>
                    EXTRA UNMINTED GOLD
                  </Text>
                  <Text style={[styles.buttonText, styles.headerText]}>
                    {this.props.user.unredeemed - this.props.user.haul}
                  </Text>
                </ImageBackground>
                <ImageBackground source={require('../assets/gamehistory/numberBG.png')} style={styles.numberBGImage} resizeMode="contain">
                  <Text style={[styles.buttonText, styles.headerLabelText, styles.opacityFont]}>
                    REMAINING MINE POTENTIAL
                  </Text>
                  <Text style={[styles.buttonText, styles.headerText]}>
                    {this.props.user.gamecount}
                  </Text>
                </ImageBackground>
                <ImageBackground source={require('../assets/gamehistory/numberBG.png')} style={styles.numberBGImage} resizeMode="contain">
                  <Text style={[styles.buttonText, styles.headerLabelText, styles.opacityFont]}>
                    GAMES PLAYED
                  </Text>
                  <Text style={[styles.buttonText, styles.headerText]}>
                    ????
                  </Text>
                </ImageBackground>
              </View>
              <View style={styles.topHalfView}>
                <ImageBackground source={mineImg} style={styles.liquidImage} resizeMode="contain" >
                  <Text style={[styles.buttonText, styles.historyLabelText, styles.liquidText, mineTextColorStyle]}>
                    {minePercent}%
                  </Text>
                </ImageBackground>
              </View>
            </View>
             <ImageBackground source={require('../assets/gamehistory/trackBG.png')} style={styles.trackBGImage} resizeMode="contain">
              <View style={styles.leftTrackNo}>
                <Text style={[styles.buttonText, styles.snakeNoText]}>100</Text>
              </View>
              <TouchableOpacity style={styles.rightTrackContent}>
                <ImageBackground source={require('../assets/gamehistory/mintbutton.png')} style={styles.buttonImage} resizeMode="contain">
                  <Text style={[styles.buttonText, styles.historyLabelText]}>MINT UNREFINED</Text>
                  <Text style={[styles.buttonText, styles.historyLabelText]}>SNAKECHAIN</Text>
                </ImageBackground>
              </TouchableOpacity>
            </ImageBackground>
            <ScrollView style={styles.contentView}>
              <ImageBackground source={require('../assets/gamehistory/GHBG.png')} style={[styles.contentImageBG, {flexDirection: 'column'}]} resizeMode="contain">
                {
                  this.state.games.map(function(game, idx){
                    return (
                      <ImageBackground source={require('../assets/gamehistory/ghButtonBG.png')} style={[styles.historyBG]} resizeMode="contain">
                        <View style={styles.historyLeftView}>
                          <Text style={[styles.buttonText, styles.historyLabelText]}>{game.level}</Text>
                        </View>
                        <Image source={require('../assets/gamehistory/Line.png')} style={styles.historySepImage} resizeMode="contain"/>
                        <View style={styles.historyLeftView}>
                          <Text style={[styles.buttonText, styles.historyLabelText]}>0</Text>
                          <Text style={[styles.buttonText, styles.historyLabelText, styles.opacityFont]}>POWER UPS</Text>
                        </View>
                        <View style={styles.historyLeftView}>
                          <Text style={[styles.buttonText, styles.historyLabelText]}>{game.score}</Text>
                          <Text style={[styles.buttonText, styles.historyLabelText, styles.opacityFont]}>GOLD</Text>
                        </View>
                      </ImageBackground>
                    )
                  })
                }
              </ImageBackground>
            </ScrollView>
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
  // content: {
  //   backgroundColor:  'rgba(0,0,0,1.0)',
  //   width: screenWidth*4/5,
  //   height: screenHeight*4/5,
  //   position: 'relative',
  // },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  closeButtonImage : {
    width: screenWidth*5/100,
    height: screenHeight*5/100,
  },
  screen: {
    marginTop: 20
  },
  backgroundImage: {
    position: 'relative',
    width: screenWidth*95/100,
    height: screenHeight*95/100,
    backgroundColor:  'rgba(0,0,0,1.0)',
    flexDirection: 'column',
    alignItems: 'center'
   },
   topHalfView: {
     alignItems: 'center',
     marginLeft: screenWidth * 0.05
   },
   topView: {
     flexDirection: 'row'
   },
    numberBGImage: {
      width: screenWidth / 2 - 40,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center'
   },
   liquidImage: {
     height: screenHeight * 0.40,
     width: screenWidth * 0.45,
     justifyContent: 'flex-start',
     alignItems: 'center'
   },
   trackBGImage: {
    width: screenWidth,
    height: 100,
    marginTop: -100,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
   },
   contentView: {
    height: screenHeight * 0.45,
    marginLeft: 10,
    marginRight: 10,
   },
   contentImageBG: {
    backgroundColor: 'transparent',
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
  buttonText: {
    fontWeight: 'bold'
  },
  buttonColorText: {
    color: "#000",
    fontSize: 16
  },
  buttonImage: {
    width: screenWidth * 0.4,
    height: screenHeight * 0.20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: 20
  },
  rightTrackContent: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 30
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
  liquidText: {
    marginTop: screenHeight * 0.10,
    fontSize: 24,
    marginRight: screenWidth * 0.09
  }
});
