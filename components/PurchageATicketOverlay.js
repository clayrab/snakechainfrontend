
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
import CONSTANTS from '../Constants.js';

export default class PurchageATicketOverlay extends React.Component {
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
    this.purchaseWithETH = this.purchaseWithETH.bind(this);
    this.purchaseWithSNK = this.purchaseWithSNK.bind(this);
  }
  purchaseWithETH() {
    this.props.onSelectTicket("ETH");
  }
  purchaseWithSNK() {
    this.props.onSelectTicket("SNK");
  }
  render() {
    if (!this.props.show) {
      return null;
    } else {
      let ethPrice = (this.props.prices.mineGamePrice/CONSTANTS.WEIPERETH).toPrecision(4);
      let secondClassButton = (
        <TouchableOpacity style={{backgroundColor: "#333", margin: 10, padding: 10}} onPress={this.purchaseWithSNK}>
          <Text style={{color: "#aaa"}}>2nd Class: Full Yield</Text>
          <Text style={{color: "#aaa"}}>Unavailable</Text>
        </TouchableOpacity>
      );
      if(this.props.user.haul >= this.props.user.mineMax) {
        secondClassButton = (
          <TouchableOpacity style={{backgroundColor: "#333", margin: 10, padding: 10}} onPress={this.purchaseWithSNK}>
            <Text style={{color: "#aaa"}}>2nd Class: Full Yield</Text>
            <Text style={{color: "#aaa"}}>{this.props.prices.mineHaulPrice}</Text>
          </TouchableOpacity>
        );
      }
      return (
        <View style={styles.container}>
          <ImageBackground style={styles.content} source={require('../assets/pauseoverlay/BackgroundBrown.png')} resizeMode={'stretch'}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage} resizeMode="stretch" />
            </TouchableOpacity>
            <Text>Purchase a Train Ticket</Text>
            <TouchableOpacity style={{backgroundColor: "#333", margin: 10, padding: 10}} onPress={this.purchaseWithETH}>
              <Text style={{color: "#aaa"}}>1st Class: Any Yield</Text>
              <Text style={{color: "#aaa"}}>{ethPrice} ETH</Text>
            </TouchableOpacity>
            {secondClassButton}
          </ImageBackground>
        </View>
      );
      // <TouchableOpacity style={{backgroundColor: "#333", margin: 10, padding: 10}} onPress={this.purchaseWithSNK}>
      //   <Text style={{color: "#aaa"}}>2nd Class: Full Yield</Text>
      //   <Text style={{color: "#aaa"}}>Unavailable</Text>
      // </TouchableOpacity>
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
    alignItems: 'center',
    paddingTop: 50,
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
    // leftBG.png = 650 × 865
    width: 160 * 650/865,
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
