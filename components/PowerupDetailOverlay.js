import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Font} from 'expo';
import {normalize} from "../utils/FontNormalizer";

export default class PowerupOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDyanmicStyle: {}
    }
  }

  async componentDidMount() {
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
        <View style={[styles.container, this.props.style]}>
          <ImageBackground style={styles.content} source={require('../assets/powerupsoverlay/detailBG.png')}
                           resizeMode={'stretch'}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage}
                     resizeMode="stretch"/>
            </TouchableOpacity>
            <Text style={[styles.buttonText, styles.titleText]}>
              {this.props.powerup.name}
            </Text>
            <Image source={this.props.powerup.image} style={styles.image}/>
            <ImageBackground source={require("../assets/powerupsoverlay/textBG.png")}
                             resizeMode={"contain"}
                             style={styles.descriptionContainer}>
              <Text style={[styles.descriptionText, styles.buttonText]}>{this.props.powerup.description}</Text>
            </ImageBackground>
            <TouchableOpacity onPress={this.props.closeOverlay}>
              <ImageBackground source={require("../assets/powerupsoverlay/redBG.png")}
                               resizeMode={"contain"}
                               style={styles.goBackBtn}>
                <Text style={[styles.goBackText, styles.buttonText]}>Go Back</Text>
              </ImageBackground>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    }
  }
}

let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
const circleSize = screenWidth * 0.06;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.9,
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 25
  },
  closeButton: {
    position: 'absolute',
    top: -20,
    right: -15,
    zIndex: 100,
  },
  closeButtonImage: {
    height: 50,
    width: 35
  },
  image: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    resizeMode: 'contain'
  },
  titleText: {
    color: "#fab523",
    fontSize: 16
  },
  screen: {flex: 1,},
  backgroundImage: {flex: 1, marginTop: '2%', marginLeft: '2%', marginRight: '2%',},
  descriptionContainer: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.3,
    paddingHorizontal: screenWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: normalize(15),
    color: "#d0cfa9"
  },
  totalText: {
    color: "#896a66",
    fontSize: normalize(16)
  },
  goBackBtn: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.11,
    resizeMode: 'contain',
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: 'center',
  },
  goBackText: {
    color: "#FFFFFF",
    fontSize: normalize(15)
  },
});
