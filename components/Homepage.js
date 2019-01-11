import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Font } from 'expo';
import SafeAreaView from 'react-native-safe-area-view';
import GameHistory from './GameHistory.js';
import {context} from "../utils/Context.js";
import {asyncStore, getFromAsyncStore, removeItemValue} from "../utils/AsyncStore.js";
import CONSTANTS from '../Constants.js';

mineImages = [
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
var overlays = { "MINE": 0 };
export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: -1,
      loading: false,
      ethBal: -1,
      snekBal: -1,
      haul: -1,
      mineImg: mineImages[0],
      minePercent: 0,
    };
    this.closeOverlay = this.closeOverlay.bind(this);
  }
  async componentDidMount(){
    try{
      await Font.loadAsync({
        'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
      });
      styles.titleBarText = {
        color: "#fab523",
        fontSize: 18,
        fontFamily: 'riffic-free-bold',
      }
      styles.mineText = {
        color: "#fab523",
        fontSize: 18,
        fontFamily: 'riffic-free-bold',
      }
      this.setState({loading: true});
      let jwt = await getFromAsyncStore("jwt");
      fetch(`${context.host}:${context.port}/getUser`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            //"Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "JWT " + jwt,
        },
      }).then(async(response) => {
        var resp = await response.json();
        if(resp.error){
          alert(resp.error);
          this.setState({loading: false});
        }else if(resp) {
          let minePercent = (resp.haul/resp.mineMax).toPrecision(2);
          let mineGraphicIndex = (resp.haul/resp.mineMax).toPrecision(1);
          let ethBal = (resp.eth/CONSTANTS.WEIPERETH).toPrecision(4);
          this.setState({
            loading: false,
            ethBal: ethBal,
            snekBal: resp.snek,
            haul: resp.unredeemed,
            mineImg: mineImages[mineGraphicIndex],
            minePercent: minePercent,
          })
        }
      });
    } catch(error){
      alert(error);
      this.setState({loading: false});
    }
    //this.setState({overlay: -1}); // a little "hack" to cause render() to fire
  }
  onMinePress = () => {
    this.setState({overlay: overlays.MINE});
  }
  closeOverlay() {
    console.log("closeOverlay")
    this.setState({overlay: -1});
  }
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <ImageBackground source={require('../assets/homepage/back.png')} style={styles.backgroundImage}>
          /***** TITLE BAR START *****/
          <ImageBackground source={require('../assets/homepage/titleback.png')} style={styles.titleBar}>
            <Image source={require('../assets/homepage/options.png')}
              resizeMethod={"scale"}
              style={styles.optionsIcon}>
            </Image>
            <ImageBackground source={require('../assets/homepage/coinbox.png')} style={styles.coinBox}>
              <View style={styles.titleBarSnekTextHolder}>
                <View style={styles.top}></View>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={styles.titleBarText}>
                  {this.state.snekBal}
                </Text>
              </View>
            </ImageBackground>
            <ImageBackground source={require('../assets/homepage/ethbox.png')} style={styles.coinBox}>
              <View style={styles.titleBarEthTextHolder}>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={styles.titleBarText}>
                  {this.state.ethBal}
                </Text>
              </View>
            </ImageBackground>
          </ImageBackground>
          /***** TITLE BAR END *****/
          <View style={styles.contentHolder}>
            <View style={styles.contentTopMargin}></View>
            <View style={styles.contentTop}>
              <ImageBackground source={require('../assets/homepage/snakechain.png')} style={styles.snakechain}></ImageBackground>
              <View style={styles.iconsHolder}>
                <Text style={styles.profile}>Town</Text>
                <ImageBackground source={require('../assets/homepage/powerups.png')} style={styles.powerups}></ImageBackground>
              </View>
            </View>
            <View style={styles.contentBottom}>
              <TouchableOpacity style={styles.mine} onPress={this.onMinePress}>
                <ImageBackground style={styles.mineImage} source={this.state.mineImg}>
                  <Text style={styles.mineText}>{this.state.minePercent}%</Text>
                </ImageBackground>
              </TouchableOpacity>
              <View style={styles.bottomIconsHolder}>
                <TouchableOpacity style={styles.playnow} onPress={this.props.onPlayPress}>
                  <Image style={styles.playnowImage} source={require('../assets/homepage/playnow.png')}/>
                </TouchableOpacity>
                <ImageBackground source={require('../assets/homepage/gototown.png')} style={styles.gototown}></ImageBackground>
              </View>
            </View>
          </View>
          <GameHistory show={this.state.overlay == overlays.MINE} closeOverlay={this.closeOverlay}/>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}
let screenWidth = require('Dimensions').get('window').width;
let titleBarHeight = screenWidth*.757/3.6;
let styles = StyleSheet.create({
  screen: {
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  titleBar: {
    flex: 0,
    width: screenWidth,
    height: titleBarHeight,
    flexDirection: "row",
  },
  optionsIcon: {
    flex: 0,
    width: "15.55555555%",
    aspectRatio: 1,
    marginTop: titleBarHeight*.06/.757,
    marginLeft: screenWidth*.157/3.6,
    resizeMode: "contain",
  },
  coinBox: {
    flex: 0,
    width: screenWidth*1.273/3.6,
    height: titleBarHeight*.323/.757,
    marginTop: titleBarHeight*.170/.757,
    marginLeft: screenWidth*.123/3.6,
  },
  ethBox: {
    flex: 0,
    width: screenWidth*1.273/3.6,
    marginTop: titleBarHeight*.170/.757,
    marginLeft: screenWidth*.103/3.6,
  },
  titleBarSnekTextHolder: {
    width: screenWidth*.833/3.6,
    height: titleBarHeight*.175/.757,
    marginTop: titleBarHeight*.075/.757,
    marginLeft: screenWidth*.360/3.6,
    justifyContent: 'center',
  },
  titleBarEthTextHolder: {
    width: screenWidth*.727/3.6,
    height: titleBarHeight*.175/.757,
    marginTop: titleBarHeight*.075/.757,
    marginLeft: screenWidth*.250/3.6,
    justifyContent: 'center',
  },
  titleBarText: {
    display: "none", // need to load font first
  },
  contentHolder: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
  },
  contentTopMargin: {
    flex: 0.263,
  },
  contentTop: {
    flex: 1.610,
    flexDirection: "row",
    width: "100%",
  },
  contentBottom: {
    flex: 3.783,
    flexDirection: "row",
    width: "100%",
  },
  snakechain: {
    width: screenWidth*1.65/3.6,
    aspectRatio: 1.65/.917,
    marginLeft: screenWidth*.303/3.6,
  },
  iconsHolder: {
    marginLeft: screenWidth*.577/3.6,
    flexDirection: "column",
  },
  profile: {
    width: screenWidth*.860/3.6,
    aspectRatio: .860/.750,
  },
  powerups: {
    width: screenWidth*.767/3.6,
    aspectRatio: .767/.753,
    marginTop: screenWidth*.117/3.6,
  },
  mine: {
    width: screenWidth*1.317/3.6,
    aspectRatio: 1.317/3.047,
    marginLeft: screenWidth*.150/3.6,
  },
  mineImage: {
    flex: 1,
    width: screenWidth*1.317/3.6,
    aspectRatio: 1.317/3.047,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mineText: {
    display: "none",
  },
  bottomIconsHolder: {
    flexDirection: "column",
  },
  playnow: {
    width: screenWidth * 1.787/3.6,
    aspectRatio: 1.787/.612,
    marginLeft: screenWidth*.147/3.6,
    marginTop: screenWidth*.270/3.6,
  },
  playnowImage: {
    flex: 1,
    width: screenWidth * 1.787/3.6,
    aspectRatio: 1.787/.612,
    resizeMode: "contain",
  },
  gototown: {
    width: screenWidth*1.950/3.6,
    aspectRatio: 1.950/2.547,
    marginTop: screenWidth*.220/3.6,
  },
});
