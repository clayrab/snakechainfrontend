import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {Font} from 'expo';
import {normalize} from '../utils/FontNormalizer.js';

export default class ReceiptOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDynamicStyle: {}
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({
      buttonDynamicStyle: {
        fontFamily: 'riffic-free-bold',
      }
    },);
  }

  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.screen}>
          <ImageBackground source={require("../assets/BG.png")} style={styles.content} resizeMode={'stretch'}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image source={require('../assets/snakebank/closeBG.png')} style={styles.closeButtonImage}
                     resizeMode="stretch"/>
            </TouchableOpacity>
            <Text style={[styles.headingStyle, this.state.buttonDynamicStyle]}>
              Mining Camp
            </Text>
            <Text style={[styles.heading2Style, this.state.buttonDynamicStyle]}>
              New Mine Discovered!
            </Text>
            <Text style={[styles.textStyle, this.state.buttonDynamicStyle]}>
              You have found a new mine <Text style={styles.goldenTextStyle}>1,200 Snakechain Potential</Text>!! You are
              not able to begin a new mining
              expedition
            </Text>
            <Text style={[styles.textStyle, styles.mb10, this.state.buttonDynamicStyle]}>
              When you broke ground on your new mine, you discovered a treasure trove of:
            </Text>
            <View style={{flex: 1}}>
              <ImageBackground source={require("../assets/snakebank/textbox.png")} style={styles.txBox}>
                <View style={styles.tableHolder}>
                  <View style={{flex: 2, flexDirection: "row",}}>
                    <View style={styles.tableViewBottom}>
                    </View>
                    <View style={styles.tableViewBottom}>
                    </View>
                    <View style={{flex: 1, borderTopColor: "#EBAC26", borderTopWidth: 1}}>
                      <Text style={[{color: "#EBAC26", textAlign: 'center'}, this.state.buttonDynamicStyle]}>105</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <TouchableOpacity onPress={this.props.closeOverlay}>
              <ImageBackground source={require("../assets/snakebank/button.png")} style={styles.backToCampButton}>
                <Text style={[styles.backToCampButtonText, this.state.buttonDynamicStyle]}>START MINING</Text>
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
let styles = StyleSheet.create({
  screen: {
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
  content: {
    width: screenWidth * 685 / 724,
    height: screenHeight * 1180 / 1287,
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 25
  },
  headingStyle: {
    color: "#EBAC26",
    fontSize: normalize(34),
    textAlign: "center",
  },
  heading2Style: {
    color: "#EBAC26",
    fontSize: normalize(22),
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20
  },
  textStyle: {
    textAlign: 'center',
    color: "#896A66",
    fontSize: normalize(14),
    paddingHorizontal: 15
  },
  mb10: {
    marginBottom: 10
  },
  goldenTextStyle: {
    color: "#EBAC26",
    fontSize: normalize(14)
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: -10,
    zIndex: 100,
  },
  closeButtonImage: {
    height: 50,
    width: 35
  },
  txBox: {
    marginTop: 10,
    width: screenWidth * 872 / 1080,
    height: (299 / 818) * screenWidth * 872 / 1080,
    justifyContent: "center",
    alignItems: 'center'
  },
  tableHolder: {
    width: screenWidth * 773 / 1080,
    height: "80%",
  },
  tableViewBottom: {
    flex: 1,
    borderRightColor: "#EBAC26",
    borderRightWidth: 1,
    borderTopColor: "#EBAC26",
    borderTopWidth: 1
  },
  backToCampButton: {
    marginTop: 20,
    width: screenWidth * 709 / 1080,
    height: (182 / 671) * screenWidth * 709 / 1080,
    justifyContent: "center",
    alignItems: 'center'
  },
  backToCampButtonText: {
    color: "#EBAC26",
    fontSize: normalize(16)
  },
});