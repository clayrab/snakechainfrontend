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

export default class AccountHistory extends React.Component {
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
        <ImageBackground source={require('../assets/accounthistory/BG.png')} style={styles.backgroundImage} resizeMode="cover">
          <View style={styles.profileView}>
            <View style={styles.profilePicView}>
              <ImageBackground source={require('../assets/accounthistory/medalBG.png')} style={styles.medalImage} resizeMode="contain">
                <Image source={require('../assets/accounthistory/profilepic.png')} style={styles.profileImage} resizeMode="contain"/>
              </ImageBackground>
            </View>
            <View style={styles.profileDetailView}>
              <Text style={[styles.buttonText, styles.buttonColorText]}>
                BOBBER SON14
              </Text>
              <Text style={[styles.buttonText, styles.publicAddText]}>
                PUBLIC ADDRESS: 0x123124
              </Text>
              <Text style={[styles.buttonText, styles.profileInfoText]}>
                MORE PROFILE INFO
              </Text>
            </View>
          </View>
          <View style={styles.contentView}>
            <ImageBackground source={require('../assets/accounthistory/sendreceiveBG.png')} style={styles.contentImageBG} resizeMode="contain">
              <View style={styles.topContentView}>
                <View style={[styles.innerContentView, styles.topInnerView]}>
                  <Text style={[styles.buttonText, styles.snakeText]}>
                    SNAKE
                  </Text>
                  <Text style={[styles.buttonText, styles.numberText]}>
                    3.150
                  </Text>
                </View>
                <View style={[styles.innerContentView, styles.bottomInnerView]}>
                  <TouchableOpacity>
                    <ImageBackground source={require('../assets/accounthistory/greenbtn.png')} style={styles.buttonImage} resizeMode="contain">
                      <Image source={require('../assets/accounthistory/receiveblack.png')} style={styles.buttonIconImage} />
                      <Text style={[styles.buttonText, styles.buttonColorText]}>RECEIVE</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.topContentView}>
                <View style={[styles.innerContentView, styles.topInnerView]}>
                  <Image source={require('../assets/wallet/diamond.png')} style={styles.diamondImage} />
                  <Text style={[styles.buttonText, styles.numberText]}>
                    0.0150
                  </Text>
                </View>
                <View style={[styles.innerContentView, styles.bottomInnerView]}>
                  <TouchableOpacity>
                    <ImageBackground source={require('../assets/accounthistory/yellowbtn.png')} style={styles.buttonImage} resizeMode="contain">
                      <Image source={require('../assets/accounthistory/sendblack.png')} style={styles.buttonIconImage} />
                      <Text style={[styles.buttonText, styles.buttonColorText]}>SEND</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.contentView}>
            <ImageBackground source={require('../assets/accounthistory/accounthistoryBG.png')} style={[styles.contentImageBG, {flexDirection: 'column'}]} resizeMode="contain">
              <ImageBackground source={require('../assets/accounthistory/historyBG.png')} style={[styles.historyBG, styles.topHistoryView]} resizeMode="contain">
                <View style={styles.historyLeftView}>
                  <Image source={require('../assets/accounthistory/sendicon.png')} style={styles.buttonIconImage} />
                  <Text style={[styles.buttonText, styles.historyLabelText]}>SEND</Text>
                  <Text style={[styles.buttonText, styles.dateText]}>15/10/2018</Text>
                </View>
                <Image source={require('../assets/accounthistory/historyseprate.png')} style={styles.historySepImage} resizeMode="contain"/>
                <View style={styles.historyRightView}>
                  <View style={styles.topRightHistoryView}>
                    <Text style={[styles.buttonText, styles.headerText]}>
                      0.0150
                    </Text>
                    <Image source={require('../assets/wallet/diamond.png')} style={styles.diamondImage} />
                    <Text style={[styles.buttonText, styles.headerText]}>
                      SENT
                    </Text>
                  </View>
                  <View style={styles.topRightHistoryView}>
                    <Text style={[styles.buttonText, styles.historyLabelText]}>
                      to stansmith@gmail.com
                    </Text>
                  </View>
                </View>
              </ImageBackground>

              <ImageBackground source={require('../assets/accounthistory/historyBG.png')} style={styles.historyBG} resizeMode="contain">
                <View style={styles.historyLeftView}>
                  <Image source={require('../assets/accounthistory/receiveicon.png')} style={styles.buttonIconImage} />
                  <Text style={[styles.buttonText, styles.historyReceiveText]}>RECEIVE</Text>
                  <Text style={[styles.buttonText, styles.dateText]}>15/10/2018</Text>
                </View>
                <Image source={require('../assets/accounthistory/historyseprate.png')} style={styles.historySepImage} resizeMode="contain"/>
                <View style={styles.historyRightView}>
                  <View style={styles.topRightHistoryView}>
                    <Text style={[styles.buttonText, styles.headerText]}>
                      0.0150
                    </Text>
                    <Image source={require('../assets/wallet/diamond.png')} style={styles.diamondImage} />
                    <Text style={[styles.buttonText, styles.headerText]}>
                      SENT
                    </Text>
                  </View>
                  <View style={styles.topRightHistoryView}>
                    <Text style={[styles.buttonText, styles.historyLabelText]}>
                      to stansmith@gmail.com
                    </Text>
                  </View>
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
    flexDirection: 'column'
   },
   profileView: {
     height: screenHeight / 10,
     flexDirection: 'row'
   },
   profilePicView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
   },
   profileDetailView: {
    flex: 7,
    marginTop: 10
   },
   contentView: {
    height: screenHeight * 0.45,
    marginLeft: 10,
    marginRight: 10
   },
   contentImageBG: {
    backgroundColor: 'transparent',
    width: screenWidth - 20,
    height: screenHeight * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
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
    flexDirection: 'row'
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
    height: 100,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  topHistoryView: {
    marginTop: 10
  },
  historySepImage: {
    width: 5,
    height: 70,
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
  }
});