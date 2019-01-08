
import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Font } from 'expo';

export default class SnakeMine extends React.Component {
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
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground style={styles.content} source={require('../assets/pauseoverlay/BackgroundBrown.png')} resizeMode={'stretch'}>
            <TouchableOpacity style={styles.closeButton}>
              <Image source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage} resizeMode="stretch" />
            </TouchableOpacity>
            <View style={styles.buttonView}>
              <ImageBackground style={styles.brownButton} source={require('../assets/snakemine/title.png')} resizeMode={'stretch'} >
                <Text style={[styles.buttonText, styles.titleText]}>
                  SELECT SNAKE MINE
                </Text>
              </ImageBackground>
            </View>
            <ScrollView style={styles.contentView}>
              <View style={styles.childContentView}>
                <View style={styles.childRowContent}>
                  <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                    style={styles.snakeChainBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.headerSC]}>
                      Original
                    </Text>
                    <Image source={require('../assets/snakemine/sc1.png')} style={styles.scImage} resizeMode={'stretch'}/>
                    <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG} resizeMode={'stretch'}>
                      <Text style={[styles.buttonText, styles.freeText]}>
                        FREE
                      </Text>
                    </ImageBackground>
                  </ImageBackground>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                    style={styles.scTitleBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
                <View style={styles.childRowContent}>
                  <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                    style={styles.snakeChainBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.headerSC]}>
                      Random
                    </Text>
                    <Image source={require('../assets/snakemine/sc2.png')} style={styles.scImage} resizeMode={'stretch'}/>
                    <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG} resizeMode={'stretch'}>
                      <Text style={[styles.buttonText, styles.snakeText]}>
                        TBD
                      </Text>
                    </ImageBackground>
                  </ImageBackground>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                    style={styles.scTitleBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
              </View>

              <View style={styles.childContentView}>
                <View style={styles.childRowContent}>
                  <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                    style={styles.snakeChainBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.headerSC]}>
                      NO MULTIPLAYER
                    </Text>
                    <Image source={require('../assets/snakemine/sc3.png')} style={styles.scImage} resizeMode={'stretch'}/>
                    <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG} resizeMode={'stretch'}>
                      <Text style={[styles.buttonText, styles.ethText]}>
                        0.01 ETH
                      </Text>
                    </ImageBackground>
                  </ImageBackground>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                    style={styles.scTitleBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
                <View style={styles.childRowContent}>
                  <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                    style={styles.snakeChainBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.headerSC]}>
                      NO MULTIPLAYER
                    </Text>
                    <Image source={require('../assets/snakemine/sc4.png')} style={styles.scImage} resizeMode={'stretch'}/>
                    <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG} resizeMode={'stretch'}>
                      <Text style={[styles.buttonText, styles.snakeText]}>
                        100 SNAKE
                      </Text>
                    </ImageBackground>
                  </ImageBackground>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                    style={styles.scTitleBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
              </View>

              <View style={styles.childContentView}>
                <View style={styles.childRowContent}>
                  <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                    style={styles.snakeChainBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.headerSC]}>
                      NO MULTIPLAYER
                    </Text>
                    <Image source={require('../assets/snakemine/sc5.png')} style={styles.scImage} resizeMode={'stretch'}/>
                    <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG} resizeMode={'stretch'}>
                      <Text style={[styles.buttonText, styles.ethText]}>
                        0.1 ETH
                      </Text>
                    </ImageBackground>
                  </ImageBackground>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                    style={styles.scTitleBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
                <View style={styles.childRowContent}>
                  <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                    style={styles.snakeChainBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.headerSC]}>
                      NO MULTIPLAYER
                    </Text>
                    <Image source={require('../assets/snakemine/sc6.png')} style={styles.scImage} resizeMode={'stretch'}/>
                    <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG} resizeMode={'stretch'}>
                      <Text style={[styles.buttonText, styles.snakeText]}>
                        100 SNAKE
                      </Text>
                    </ImageBackground>
                  </ImageBackground>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                    style={styles.scTitleBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
              </View>

              <View style={styles.childContentView}>
                <View style={styles.childRowContent}>
                  <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                    style={styles.snakeChainBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.headerSC]}>
                      NO MULTIPLAYER
                    </Text>
                    <Image source={require('../assets/snakemine/sc7.png')} style={styles.scImage} resizeMode={'stretch'}/>
                    <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG} resizeMode={'stretch'}>
                      <Text style={[styles.buttonText, styles.ethText]}>
                        0.001 ETH
                      </Text>
                    </ImageBackground>
                  </ImageBackground>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                    style={styles.scTitleBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
                <View style={styles.childRowContent}>
                  <ImageBackground source={require('../assets/snakemine/leftBG.png')}
                    style={styles.snakeChainBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.headerSC]}>
                      NO MULTIPLAYER
                    </Text>
                    <Image source={require('../assets/snakemine/sc8.png')} style={styles.scImage} resizeMode={'stretch'}/>
                    <ImageBackground source={require('../assets/snakemine/leftDetails.png')} style={styles.scNameBG} resizeMode={'stretch'}>
                      <Text style={[styles.buttonText, styles.snakeText]}>
                        100 SNAKE
                      </Text>
                    </ImageBackground>
                  </ImageBackground>
                  <ImageBackground source={require('../assets/snakemine/textPart.png')}
                    style={styles.scTitleBG} resizeMode={'stretch'}>
                    <Text style={[styles.buttonText, styles.avgTitleText]}>
                      AVG. 22 SNAKECHAIN
                    </Text>
                  </ImageBackground>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      );
    }
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
var styles = StyleSheet.create({
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
  content: {
    width: screenWidth*4/5,
    height: screenHeight*4/5,
    position: 'relative',
    flexDirection: 'column',
  },
  closeButton: {
    position: 'absolute',
    top: -20,
    right: -15,
  },
  closeButtonImage: {
    height: 50,
    width: 35
  },
  buttonView: {
    alignItems: 'center',
    marginTop: -15
  },
  brownButton: {
    width: screenWidth/2,
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentView: {
    flexDirection: 'column',
    marginBottom: 12
  },
  childContentView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  childRowContent: {
    flex: 1,
    alignItems: 'center'
  },
  snakeChainBG: {
    width: '80%',
    height: 160,
    alignItems: 'center',
    marginTop: 5
  },
  scImage: {
    width: '80%',
    height: 100,
    marginTop: 5
  },
  scNameBG: {
    width: '80%',
    height: 20,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scTitleBG:{
    width: '80%',
    height: 30,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: "#fab523",
    fontSize: 16
  },
  avgTitleText: {
    color: "#fab523",
    fontSize: 10,
    fontWeight: 'bold'
  },
  headerSC: {
    color: '#261D1C',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5
  },
  freeText: {
    color: '#51B545',
    fontSize: 14,
    fontWeight: 'bold'
  },
  ethText: {
    color: '#FFF646',
    fontSize: 14,
    fontWeight: 'bold'
  },
  snakeText: {
    color: '#fab523',
    fontSize: 14,
    fontWeight: 'bold'
  }
});