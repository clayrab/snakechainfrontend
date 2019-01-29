import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  View,
  Text,
  ScrollView,
  Modal,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Font } from 'expo';
export default class SelectLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicStyle: {},
      modalVisible: true
    };
  }
  async componentDidMount(){
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({dynamicStyle: {
      fontFamily: 'riffic-free-bold',
    }});
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          transparent={true}
        >
        <View style={styles.modalChildView}>
          <ImageBackground style={styles.modalImageBG} source={require('../assets/selectlevel/pop-up.png')} resizeMode={'stretch'}>
            <Text style={[styles.dynamicStyle, styles.popupHeaderText]}>Hire A Sherpa</Text>
            <Text style={[styles.dynamicStyle, styles.popupDecText]}>(0.02ETH)</Text>
          </ImageBackground>
        </View>
        </Modal>
        <ImageBackground style={styles.headerContent} source={require('../assets/selectlevel/Background.png')} resizeMode={'stretch'}>
          <Image style={styles.menuContent} source={require('../assets/selectlevel/Menu.png')} resizeMode={'stretch'} />
          <View style={styles.headerTextView}>
            <Text style={[styles.dynamicStyle, styles.titleHeaderText]}>
              Header Text
            </Text>
            <Text style={[styles.dynamicStyle, styles.secondHeaderText]}>
              Public Address : 01x............
            </Text>
            <Text style={[styles.dynamicStyle, styles.decHeaderText]}>
              Small text
            </Text>
          </View>
          <Image style={styles.settingContent} source={require('../assets/selectlevel/Setting.png')} resizeMode={'stretch'} />
        </ImageBackground>
        <ScrollView style={styles.contentView}>
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
            </View>
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
            </View>
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
            </View>
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
            </View>
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
            </View>
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
            </View>
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
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let titleBarHeight = screenWidth*.757/3.6;
let styles = StyleSheet.create({
  screen: {
  },
  headerContent: {
    width: screenWidth,
    height: screenHeight / 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#51403D'
  },
  menuContent: {
    width: 50,
    height: screenHeight / 10 - 4
  },
  settingContent: {
    width: 40,
    height: 40
  },
  headerTextView: {
    flexDirection: 'column',
    width: screenWidth - 110,
    marginLeft: 10
  },
  titleHeaderText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  decHeaderText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'red'
  },
  contentView: {
    flexDirection: 'column',
    backgroundColor: '#51403D'
  },
  childContentView: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5
  },
  childRowContent: {
    flexDirection: 'column',
    width: screenWidth / 2,
    alignItems: 'center'
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
  snakeChainBG: {
    width: '80%',
    height: 160,
    alignItems: 'center',
    marginTop: 5
  },
  ethText: {
    color: '#FFF646'
  },
  modalChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    height: screenHeight / 4
  },
  modalImageBG: {
    height: screenHeight / 6,
    width: screenWidth - 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  popupHeaderText: {
    color: '#C6891E',
    fontSize: 28,
    fontWeight: 'bold'
  },
  popupDecText: {
    color: '#FAB523',
    fontSize: 16
  },
  headerSC: {
    fontWeight: 'bold'
  }

});
