import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Font } from 'expo';

export default class GameHistory extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount(){
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    styles.buttonText = {
      fontFamily: 'riffic-free-bold'
    }
  }
  render() {
    return (
      <SafeAreaView>
        <ImageBackground source={require('../assets/wallet/screenBG2.png')} style={styles.backgroundImage} resizeMode="cover">
          <View style={styles.topView}>
            <View style={styles.topHalfView}>
              <Text style={[styles.buttonText, styles.historyLabelText, {marginTop: 10, fontSize: 18, marginBottom: 10}]}>
                YOUR SNAKE MINE
              </Text>
              <ImageBackground source={require('../assets/gamehistory/numberBG.png')} style={styles.numberBGImage} resizeMode="contain">
                <Text style={[styles.buttonText, styles.headerLabelText, styles.opacityFont]}>
                  REMAINING MINE POTENTIAL
                </Text>
                <Text style={[styles.buttonText, styles.headerText]}>
                  300
                </Text>
              </ImageBackground>
              <ImageBackground source={require('../assets/gamehistory/numberBG.png')} style={styles.numberBGImage} resizeMode="contain">
                <Text style={[styles.buttonText, styles.headerLabelText, styles.opacityFont]}>
                  GAME PLAYED
                </Text>
                <Text style={[styles.buttonText, styles.headerText]}>
                  23
                </Text>
              </ImageBackground>
              <ImageBackground source={require('../assets/gamehistory/numberBG.png')} style={styles.numberBGImage} resizeMode="contain">
                <Text style={[styles.buttonText, styles.headerLabelText, styles.opacityFont]}>
                  AVERAGE POOR GAME
                </Text>
                <Text style={[styles.buttonText, styles.headerText]}>
                  101
                </Text>
              </ImageBackground>
            </View>
            <View style={styles.topHalfView}>
              <ImageBackground source={require('../assets/gamehistory/liquid.png')} style={styles.liquidImage} resizeMode="contain" >
                <Text style={[styles.buttonText, styles.historyLabelText, styles.liquidText]}>
                  30%
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
          <View style={styles.contentView}>
            <ImageBackground source={require('../assets/gamehistory/GHBG.png')} style={[styles.contentImageBG, {flexDirection: 'column'}]} resizeMode="contain">
              <ImageBackground source={require('../assets/gamehistory/ghButtonBG.png')} style={[styles.historyBG]} resizeMode="contain">
                <View style={styles.historyLeftView}>
                  <Text style={[styles.buttonText, styles.historyLabelText]}>SIMPLE</Text>
                  <Text style={[styles.buttonText, styles.historyLabelText]}>SNAKE</Text>
                </View>
                <Image source={require('../assets/gamehistory/Line.png')} style={styles.historySepImage} resizeMode="contain"/>
                <View style={styles.historyLeftView}>
                  <Text style={[styles.buttonText, styles.historyLabelText]}>3</Text>
                  <Text style={[styles.buttonText, styles.historyLabelText, styles.opacityFont]}>POWER UPS</Text>
                </View>
                <View style={styles.historyLeftView}>
                  <Text style={[styles.buttonText, styles.historyLabelText]}>50</Text>
                  <Text style={[styles.buttonText, styles.historyLabelText, styles.opacityFont]}>SNAKE</Text>
                </View>
              </ImageBackground>
              <ImageBackground source={require('../assets/gamehistory/ghButtonBG.png')} style={[styles.historyBG]} resizeMode="contain">
                <View style={styles.historyLeftView}>
                  <Text style={[styles.buttonText, styles.historyLabelText]}>SIMPLE</Text>
                  <Text style={[styles.buttonText, styles.historyLabelText]}>SNAKE</Text>
                </View>
                <Image source={require('../assets/gamehistory/Line.png')} style={styles.historySepImage} resizeMode="contain"/>
                <View style={styles.historyLeftView}>
                  <Text style={[styles.buttonText, styles.historyLabelText]}>3</Text>
                  <Text style={[styles.buttonText, styles.historyLabelText, styles.opacityFont]}>POWER UPS</Text>
                </View>
                <View style={styles.historyLeftView}>
                  <Text style={[styles.buttonText, styles.historyLabelText]}>50</Text>
                  <Text style={[styles.buttonText, styles.historyLabelText, styles.opacityFont]}>SNAKE</Text>
                </View>
              </ImageBackground>
              <ImageBackground source={require('../assets/gamehistory/ghButtonBG.png')} style={[styles.historyBG]} resizeMode="contain">
                <View style={styles.historyLeftView}>
                  <Text style={[styles.buttonText, styles.historyLabelText]}>SIMPLE</Text>
                  <Text style={[styles.buttonText, styles.historyLabelText]}>SNAKE</Text>
                </View>
                <Image source={require('../assets/gamehistory/Line.png')} style={styles.historySepImage} resizeMode="contain"/>
                <View style={styles.historyLeftView}>
                  <Text style={[styles.buttonText, styles.historyLabelText]}>3</Text>
                  <Text style={[styles.buttonText, styles.historyLabelText, styles.opacityFont]}>POWER UPS</Text>
                </View>
                <View style={styles.historyLeftView}>
                  <Text style={[styles.buttonText, styles.historyLabelText]}>50</Text>
                  <Text style={[styles.buttonText, styles.historyLabelText, styles.opacityFont]}>SNAKE</Text>
                </View>
              </ImageBackground>
            </ImageBackground>
          </View>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  screen: {
    marginTop: 20
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
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
     height: screenHeight * 0.50,
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
