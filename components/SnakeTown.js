import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,
  Image
} from 'react-native';
import {normalize} from '../utils/FontNormalizer.js';

import ScreenView from '../components/ScreenView.js';
import SnakeBankOverlay from '../components/SnakeBankOverlay.js';

var overlays = {"BANK": 0, };
export default class SnakeTown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: -1,
    }
  }

  closeOverlay = () => {
    this.setState({overlay: -1});
  };

  onBank = () => {
    this.setState({overlay: overlays.BANK});
  };

  render() {
    return (
      <ScreenView>
        <ImageBackground source={require('../assets/snaketown/snaketown.png')} style={styles.homeTownImage}
                         resizeMode="stretch">

        </ImageBackground>
        <ImageBackground source={require('../assets/snaketown/textBoxBG.png')} style={styles.bottomImageBG}
                         resizeMode="stretch">

           <TouchableOpacity onPress={this.props.onGoToSnakeStore}>
             <ImageBackground source={require('../assets/snaketown/textBox.png')} style={styles.bottomTextBoxBG}
                              resizeMode="stretch">
               <Image source={require('../assets/snaketown/forumIcon.png')}
                      style={[styles.buttonsIcon]}/>
               <Text style={[styles.buttonsText]}>Snake Store</Text>
             </ImageBackground>
           </TouchableOpacity>
          <TouchableOpacity onPress={this.onBank}>
            <ImageBackground source={require('../assets/snaketown/textBox.png')} style={styles.bottomTextBoxBG}
                             resizeMode="stretch">
              <Image source={require('../assets/snaketown/saloonIcon.png')} style={styles.buttonsIcon}/>
              <Text style={[styles.comingSoon, styles.buttonsText]}>Coming Soon</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={null}>
            <ImageBackground source={require('../assets/snaketown/textBox.png')} style={styles.bottomTextBoxBG}
                             resizeMode="stretch">
              <Image source={require('../assets/snaketown/shopIcon.png')}
                     style={[styles.comingSoon, styles.buttonsIcon]}/>
              <Text style={[styles.comingSoon, styles.buttonsText]}>Coming Soon</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTextBoxBG} onPress={this.props.exit}>
            <ImageBackground source={require('../assets/snaketown/button.png')} style={styles.buttonBG}
                             resizeMode="stretch">
              <Text style={[styles.gotoText]}>
                BACK TO MINE
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
        <SnakeBankOverlay
          show={this.state.overlay == overlays.BANK}
          closeOverlay={this.closeOverlay}/>
      </ScreenView>
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
    fontSize: normalize(22),
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
    width: screenWidth * 895 / 1080,
    height: screenWidth * (446 / 1784) * 895 / 1080,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
  buttonsIcon: {
    flex: 0.2,
    width: screenWidth * 120 / 1080,
    height: screenWidth * 120 / 1080,
    marginLeft: screenWidth * 100 / 1080,
    marginRight: screenWidth * 100 / 1080,
  },
  buttonsText: {
    flex: 1,
    color: "#fab523",
    fontSize: normalize(24),
    fontFamily: 'riffic-free-bold'
  },
  comingSoon: {
    opacity: 0.5,
    fontFamily: 'riffic-free-bold'
  },
  buttonBG: {
    width: screenWidth / 1.5,
    height: screenHeight / 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gotoText: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    fontFamily: 'riffic-free-bold'
  }
});
