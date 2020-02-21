import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {normalize} from '../utils/FontNormalizer.js';

export default class ReceiptOverlay extends React.Component {
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
            <Text style={[styles.heading2Style]}>
              Shipment Sent!
            </Text>
            <Text style={[styles.goldenTextStyle, {paddingLeft: 40, paddingRight: 40, }]}>
              Your ore is being refined into SnakeCoins and will be available in your wallet soon!
            </Text>
            {/*<Text style={[styles.textStyle, styles.mb10, {paddingLeft: 40, paddingRight: 40, }]}>
              When you broke ground on your new mine, you discovered a treasure trove of:
            </Text>*/}
            <View style={{flex: 1}}>
              <ImageBackground source={require("../assets/snakebank/textbox.png")} style={styles.txBox}>
                <View style={styles.tableHolder}>
                  {/*<View style={{flex: 2, flexDirection: "row",}}>
                    <View style={styles.tableViewBottom}>
                    </View>
                    <View style={styles.tableViewBottom}>
                    </View>
                    <View style={{flex: 1, borderTopColor: "#EBAC26", borderTopWidth: 1}}>
                      <Text style={[{color: "#EBAC26", textAlign: 'center', fontFamily: 'riffic-free-bold',}]}>105</Text>
                    </View>
                  </View>*/}
                  <Text style={[styles.textStyle]}>Your courier from the old haul is on the way.</Text>
                  <Text style={[styles.textStyle, {paddingTop: 15, }]}>Transaction ID: {this.props.transactionId}</Text>
                </View>
              </ImageBackground>
            </View>
            <TouchableOpacity onPress={this.props.closeOverlay}>
              <ImageBackground source={require("../assets/snakebank/button.png")} style={styles.backToCampButton}>
                <Text style={[styles.backToCampButtonText]}>START MINING</Text>
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
  heading2Style: {
    color: "#EBAC26",
    fontSize: normalize(22),
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'riffic-free-bold',
  },
  textStyle: {
    textAlign: 'center',
    color: "#896A66",
    fontSize: normalize(14),
    paddingHorizontal: 15,
    fontFamily: 'riffic-free-bold',
  },
  mb10: {
    marginBottom: 10
  },
  goldenTextStyle: {
    color: "#EBAC26",
    fontSize: normalize(14),
    fontFamily: 'riffic-free-bold',
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
    height: (500 / 818) * screenWidth * 872 / 1080, //This is badly stretched. Needs design.
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
    fontSize: normalize(16),
    fontFamily: 'riffic-free-bold',
  },
});
