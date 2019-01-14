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

import CONSTANTS from '../Constants.js';
import {context} from "../utils/Context.js";
import {asyncStore, getFromAsyncStore, removeItemValue} from "../utils/AsyncStore.js";
import GameHistoryOverlay from './GameHistoryOverlay.js';
import SelectLevelOverlay from '../components/SelectLevelOverlay.js';

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
var overlays = { "MINE": 0, "SELECTLEVEL": 1 };
export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: -1,
      loading: true,
      mineTextStyle: { display: "none",},
      titleBarTextStyle: { display: "none",},
    };
    this.closeOverlay = this.closeOverlay.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    //let ethBal = (props.user.eth/CONSTANTS.WEIPERETH).toPrecision(4);
    if(props.user.name != "") {
      console.log("user loaded")
      return {
        loading: false,
      };
    }
  }
  async componentDidMount(){
    try{
      await Font.loadAsync({
        'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
      });
      this.setState({
        mineTextStyle: {
          color: "#fab523",
          fontFamily: 'riffic-free-bold',
        },
        titleBarTextStyle: {
          fontFamily: 'riffic-free-bold',
        },
      });
      //await this.setState({loading: true});
    } catch(error){
      alert(error);
      //this.setState({loading: false});
    }
    //this.setState({overlay: -1}); // a little "hack" to cause render() to fire
  }
  onMinePress = () => {
    this.setState({overlay: overlays.MINE });
  }
  onMineHaul = () => {
    this.setState({overlay: overlays.MINE });
  }
  onPlayPress = () => {
    this.setState({overlay: overlays.SELECTLEVEL });
  }
  closeOverlay() {
    this.setState({overlay: -1});
  }
  render() {

    console.log("homeagpe render")
    console.lo
    let mineGraphicIndex = Math.floor(10*this.props.user.haul/this.props.user.mineMax);
    let mineTextColorStyle = {};
    if(mineGraphicIndex > 6){
      mineTextColorStyle = { color: "#333333", }
      //  this.setState({})
      // TODO change color of text
    }
    let mineImg = mineImages[mineGraphicIndex];
    let minePercent = (100*this.props.user.haul/this.props.user.mineMax).toPrecision(2);
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
                {this.state.loading ? null :
                  <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.titleBarText, this.state.titleBarTextStyle]}>
                    {this.props.user.snek}
                  </Text>
                }
              </View>
            </ImageBackground>
            <ImageBackground source={require('../assets/homepage/ethbox.png')} style={styles.coinBox}>
              <View style={styles.titleBarEthTextHolder}>
                {this.state.loading ? null :
                  <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.titleBarText, this.state.titleBarTextStyle]}>
                    {(this.props.user.eth/CONSTANTS.WEIPERETH).toPrecision(4)}
                  </Text>
                }
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
              <TouchableOpacity style={styles.mine}
                onPress={this.onMinePress}>
                {this.state.loading ? null :
                  <ImageBackground style={styles.mineImage} source={mineImg}>
                    <Text style={[styles.mineText, this.state.mineTextStyle, mineTextColorStyle]}>
                      {minePercent}%
                    </Text>
                  </ImageBackground>
                }
              </TouchableOpacity>
              <View style={styles.bottomIconsHolder}>
                <TouchableOpacity style={styles.playnow}
                  onPress={this.onPlayPress}>
                  <Image style={styles.playnowImage} source={require('../assets/homepage/playnow.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.onMineHaul}>
                  <ImageBackground source={require('../assets/homepage/gototown.png')} style={styles.gototown}></ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <GameHistoryOverlay show={this.state.overlay == overlays.MINE} user={this.props.user} closeOverlay={this.closeOverlay}/>
          <SelectLevelOverlay show={this.state.overlay == overlays.SELECTLEVEL} onSelectLevel={this.props.onSelectLevel}/>
        </ImageBackground>
      </SafeAreaView>
    );
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
    color: "#fab523",
    fontSize: 18,
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
    fontSize: 18,
    paddingBottom: 90,
    paddingLeft: 20,
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
