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

export default class SnakeTown extends React.Component {
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
        <ImageBackground source={require('../assets/snaketown/snaketown.png')} style={styles.homeTownImage} resizeMode="stretch">
          
        </ImageBackground>
        <ImageBackground source={require('../assets/snaketown/textBoxBG.png')} style={styles.bottomImageBG} resizeMode="stretch">
          <ImageBackground source={require('../assets/snaketown/textBox.png')} style={styles.bottomTextBoxBG} resizeMode="stretch">
          
          </ImageBackground>
          <ImageBackground source={require('../assets/snaketown/textBox.png')} style={styles.bottomTextBoxBG} resizeMode="stretch">
          
          </ImageBackground>
          <ImageBackground source={require('../assets/snaketown/textBox.png')} style={styles.bottomTextBoxBG} resizeMode="stretch">
          
          </ImageBackground>
          <TouchableOpacity style={styles.bottomTextBoxBG}>
            <ImageBackground source={require('../assets/snaketown/button.png')} style={styles.buttonBG} resizeMode="stretch">
              <Text style={[styles.buttonText, styles.gotoText]}>
                GO TO MINE CAMP
              </Text>
            </ImageBackground>
          </TouchableOpacity>
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
    width: screenWidth - 20,
    height: screenHeight / 10,
    marginTop: 20,
    alignItems: 'center'
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