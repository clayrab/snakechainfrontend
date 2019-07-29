import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native';

export default class MineEmptyOverlay extends React.Component {

  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground source={require("../assets/ticket/background.png")} resizeMode={"stretch"}
                           style={styles.mainView}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage}
                     resizeMode="stretch"/>
            </TouchableOpacity>
            <Text style={styles.titleText}>Your mine is Empty</Text>
            <Text style={styles.normalText}>Take your gold to town.</Text>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: screenWidth * 638 / 726,
    aspectRatio: 960 / 983,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: -20,
    right: -15,
    zIndex: 100,
  },
  closeButtonImage: {
    height: 50,
    width: 35,
  },
  titleText: {
    color: "#fab523",
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },
  normalText: {
    color: "#fab523",
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    padding: 10,
  },
});
