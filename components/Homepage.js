import React from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import { isAuthenticated } from "../Auth";
//import { SecureScreen } from './SecureScreen';

export default class Homepage extends React.Component {
//export class Homepage extends React.Component {
  constructor() {
    super();
  }
  componentDidMount(){

  }
  render() {
    console.log("Homepage render");
    var screenWidth = require('Dimensions').get('window').width;
    var titleBarHeight = screenWidth*.757/3.6;
    const styles = StyleSheet.create({
      screen: {
        width: "100%",
        height: "100%",
        //borderWidth: 20,
      },
      backgroundImage: {
        width: "100%",
        height: "100%",
        flex: 0,
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
        //height: titleBarHeight*.323/.757,
        marginTop: titleBarHeight*.170/.757,
        marginLeft: screenWidth*.103/3.6,
      },
      titleBarSnekTextHolder: {
        width: screenWidth*.833/3.6,
        height: titleBarHeight*.175/.757,
        marginTop: titleBarHeight*.075/.757,
        marginLeft: screenWidth*.360/3.6,
        justifyContent: 'center',
        //backgroundColor: "#F0F",
        // TODO fix bottom alignment when content is very large number e.g. "150000000000000000"
      },
      titleBarEthTextHolder: {
        width: screenWidth*.727/3.6,
        height: titleBarHeight*.175/.757,
        marginTop: titleBarHeight*.075/.757,
        marginLeft: screenWidth*.250/3.6,
        justifyContent: 'center',
        //backgroundColor: "#F0F",
      },
      titleBarText: {
        color: "#fab523",
        fontSize: 25,
      },
      titleBarTextDark :{

      },
      contentHolder: {
        flex: 1,
        //height: "80%",
        width: "100%",
        alignItems: "flex-start",
      },
      /// 0.263 - 1.610 - 3.783
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
        marginLeft: screenWidth*.150/3.6,
        aspectRatio: 1.317/3.047,
        //marginTop: screenWidth*.117/3.6,
      },
      bottomIconsHolder: {
        //marginLeft: screenWidth*.577/3.6,
        flexDirection: "column",
      },
      playnow: {
        width: screenWidth * 1.787/3.6,
        aspectRatio: 1.787/.612,
        marginLeft: screenWidth*.140/3.6,
        marginTop: screenWidth*.257/3.6,
        //resizeMode: "contain",
      },
      gototown: {
        width: screenWidth*1.950/3.6,
        //2.547
        aspectRatio: 1.950/2.547,
        marginTop: screenWidth*.220/3.6,
        ///resizeMode: "contain",
      },
    });
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
                  // allowFontScaling
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
                  // allowFontScaling
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
              <ImageBackground source={require('../assets/homepage/mine/mine80.png')} style={styles.mine}>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  // allowFontScaling
                  style={styles.titleBarTextDark}>

                </Text>
              </ImageBackground>
              <View style={styles.bottomIconsHolder}>
                <ImageBackground source={require('../assets/homepage/playnow.png')} style={styles.playnow}></ImageBackground>
                <ImageBackground source={require('../assets/homepage/gototown.png')} style={styles.gototown}></ImageBackground>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}
