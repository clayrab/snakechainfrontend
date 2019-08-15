import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CONSTANTS from '../Constants.js';
import {normalize} from '../utils/FontNormalizer.js';
import {formatToken} from '../utils/uiHelperFunctions.js';

export default class Header extends React.Component {

  render() {
    let pending = false;
    if (this.props.transactions) {
      for (let tx of this.props.transactions) {
        if (tx.pending) {
          pending = true;
          //break;
        }
      }
    }
    return (
      <ImageBackground source={require('../assets/homepage/titleback.png')}
                       style={[styles.titleBar, this.props.style]}>
        {this.props.hasBackButton ?
          <TouchableOpacity onPress={this.props.exit} style={styles.backButtonTouchable}>
            <ImageBackground source={require('../assets/backbutton.png')} style={styles.backButtonIcon}/>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.optionsTouchable} onPress={this.props.onProfile}>
            <ImageBackground source={require('../assets/homepage/options.png')} style={styles.optionsIcon}/>
          </TouchableOpacity>
        }
        <TouchableOpacity onPress={this.props.onWallet}>
          <ImageBackground source={require('../assets/homepage/coinbox.png')} style={styles.coinBox}>
            {!pending ? null :
              <View style={styles.pendingIcon}/>
            }
            <View style={styles.titleBarSnekTextHolder}>
              <View style={styles.top}></View>
              {this.props.loading ? null :
                <Text adjustsFontSizeToFit numberOfLines={1}
                      style={[styles.titleBarText]}>
                  {this.props.user.snek}
                </Text>
              }
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onWallet}>
          <ImageBackground source={require('../assets/homepage/ethbox.png')} style={styles.ethBox}>
            <View style={styles.titleBarEthTextHolder}>
              {this.props.loading ? null :
                <Text adjustsFontSizeToFit numberOfLines={1}
                      style={[styles.titleBarText]}>
                  {formatToken(this.props.user.eth, "ETH")}
                </Text>
              }
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
let screenWidth = require('Dimensions').get('window').width;
let titleBarHeight = CONSTANTS.SCOREBOARDHEIGHT;
let styles = StyleSheet.create({
  titleBar: {
    flex: 0,
    width: screenWidth,
    height: titleBarHeight + 35,
    flexDirection: "row",
    marginTop: -titleBarHeight * .32,
    paddingTop: titleBarHeight * .40,
  },
  backButtonTouchable: {
    flex: 0,
    width: "15.55555555%",
    marginTop: titleBarHeight * .12 / .757,
    marginLeft: screenWidth * .157 / 3.6,
    aspectRatio: 512 / 392,
  },
  backButtonIcon: {
    aspectRatio: 512 / 392,
    width: "100%",
  },
  optionsTouchable: {
    flex: 0,
    width: "15.55555555%",
    marginTop: titleBarHeight * .06 / .757,
    marginLeft: screenWidth * .157 / 3.6,
    aspectRatio: 1,
  },
  optionsIcon: {
    aspectRatio: 1,
    width: "100%",
  },
  coinBox: {
    flex: 0,
    width: screenWidth * 1.273 / 3.6,
    height: titleBarHeight * .323 / .757,
    marginTop: titleBarHeight * .170 / .757,
    marginLeft: screenWidth * .123 / 3.6,
    position: "relative",
  },
  ethBox: {
    flex: 0,
    width: screenWidth * 1.273 / 3.6,
    height: titleBarHeight * .363 / .757,
    marginTop: titleBarHeight * .170 / .757,
    marginLeft: screenWidth * .123 / 3.6,
  },
  titleBarSnekTextHolder: {
    width: screenWidth * .833 / 3.6,
    height: titleBarHeight * .175 / .757,
    marginTop: titleBarHeight * .075 / .757,
    marginLeft: screenWidth * .360 / 3.6,
    justifyContent: 'center',
  },
  titleBarEthTextHolder: {
    width: screenWidth * .727 / 3.6,
    height: titleBarHeight * .175 / .757,
    marginTop: titleBarHeight * .075 / .757,
    marginLeft: screenWidth * .250 / 3.6,
    justifyContent: 'center',
  },
  pendingIcon: {
    position: "absolute",
    top: -2,
    right: -2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    backgroundColor: '#f00',
    borderRadius: 6,
  },
  titleBarText: {
    color: "#fab523",
    fontSize: normalize(16),
    fontFamily: 'riffic-free-bold',
  },
});
