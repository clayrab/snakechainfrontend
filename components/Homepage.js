import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import MineOverlay from './MineOverlay.js';
import { Font } from 'expo';

var overlays = { "MINE": 0 };
export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: -1,
    };
  }
  async componentDidMount(){
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    styles.titleBarText = {
      color: "#fab523",
      fontSize: 18,
      fontFamily: 'riffic-free-bold',
    }
    this.setState({overlay: -1}); // a little "hack" to cause render() to fire
  }
  onMinePress = () => {
    this.setState({overlay: overlays.MINE});
  }
  closeOverlay() {
    this.setState({overlay: -1});
  }
  render() {
    console.log("render");

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
                  15000
                </Text>
              </View>
            </ImageBackground>
            <ImageBackground source={require('../assets/homepage/ethbox.png')} style={styles.coinBox}>
              <View style={styles.titleBarEthTextHolder}>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={styles.titleBarText}>
                  50000000000
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
                <ImageBackground source={require('../assets/homepage/profile.png')} style={styles.profile}></ImageBackground>
                <ImageBackground source={require('../assets/homepage/powerups.png')} style={styles.powerups}></ImageBackground>
              </View>
            </View>
            <View style={styles.contentBottom}>
              <TouchableOpacity style={styles.mine} onPress={this.onMinePress}>
                <Image style={styles.mineImage} source={require('../assets/homepage/mine/mine80.png')}/>
              </TouchableOpacity>
              <View style={styles.bottomIconsHolder}>
                <TouchableOpacity style={styles.playnow} onPress={this.props.onPlayPress}>
                  <Image style={styles.playnowImage} source={require('../assets/homepage/playnow.png')}/>
                </TouchableOpacity>
                <ImageBackground source={require('../assets/homepage/gototown.png')} style={styles.gototown}></ImageBackground>
              </View>
            </View>
          </View>
          <MineOverlay show={this.state.overlay == overlays.MINE} closeOverlay={this.closeOverlay.bind(this)}/>
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
    resizeMode: "contain",
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
