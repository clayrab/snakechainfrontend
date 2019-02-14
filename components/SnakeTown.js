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
import SnakeBankOverlay from '../components/SnakeBankOverlay.js';

var overlays = { "BANK": 0, };
export default class SnakeTown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlay: -1,
      riffic: {},
    }
  }
  async componentDidMount(){
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({riffic: {
      fontFamily: 'riffic-free-bold',
    }});
  }
  closeOverlay = () => {
    this.setState({overlay: -1});
  }
  onBank = () => {
    this.setState({overlay: overlays.BANK});
  }
  render() {
    return (
      <SafeAreaView>
        <ImageBackground source={require('../assets/snaketown/snaketown.png')} style={styles.homeTownImage} resizeMode="stretch">

        </ImageBackground>
        <ImageBackground source={require('../assets/snaketown/textBoxBG.png')} style={styles.bottomImageBG} resizeMode="stretch">
          <TouchableOpacity onPress={this.onBank}>
            <ImageBackground source={require('../assets/snaketown/textBox.png')} style={styles.bottomTextBoxBG} resizeMode="stretch">
              <Image source={require('../assets/snaketown/saloonIcon.png')} style={styles.buttonsIcon}/>
              <Text style={[this.state.riffic, styles.buttonsText]}>Snake Bank</Text>
            </ImageBackground>
          </TouchableOpacity>
          <ImageBackground source={require('../assets/snaketown/textBox.png')} style={styles.bottomTextBoxBG} resizeMode="stretch">
            <Image source={require('../assets/snaketown/forumIcon.png')} style={[styles.comingSoon, styles.buttonsIcon]}/>
            <Text style={[styles.comingSoon, this.state.riffic, styles.buttonsText]}>Coming Soon</Text>
          </ImageBackground>
          <ImageBackground source={require('../assets/snaketown/textBox.png')} style={styles.bottomTextBoxBG} resizeMode="stretch">
            <Image source={require('../assets/snaketown/shopIcon.png')} style={[styles.comingSoon, styles.buttonsIcon]}/>
            <Text style={[styles.comingSoon, this.state.riffic, styles.buttonsText]}>Coming Soon</Text>
          </ImageBackground>
          <TouchableOpacity style={styles.bottomTextBoxBG} onPress={this.props.exit}>
            <ImageBackground source={require('../assets/snaketown/button.png')} style={styles.buttonBG} resizeMode="stretch">
              <Text style={[this.state.riffic, styles.gotoText]}>
                BACK TO MINE CAMP
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
        <SnakeBankOverlay
          show={this.state.overlay == overlays.BANK}
          closeOverlay={this.closeOverlay}/>
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
  headerImage: {
    width: screenWidth,
    height: screenHeight / 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  homeTownImage: {
    width: screenWidth,
    height: screenHeight / 2.5,
  },
  bottomImageBG: {
    width: screenWidth + 3,
    height: screenHeight / 1.5 + 20,
    marginTop: -20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  bottomTextBoxBG: {
    width: screenWidth*895/1080,
    height: screenWidth*(446/1784)*895/1080,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
  buttonsIcon: {
    width: screenWidth*120/1080,
    height: screenWidth*120/1080,
    marginLeft: screenWidth*100/1080,
    marginRight: screenWidth*100/1080,
  },
  buttonsText: {
    flex: 1,
    color: "#fab523",
    fontSize: 28,
  },
  comingSoon: {
    opacity: 0.5,
  },
  buttonBG: {
    width: screenWidth / 1.5,
    height: screenHeight / 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gotoText: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
