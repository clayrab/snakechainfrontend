import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Font } from 'expo';
import SafeAreaView from 'react-native-safe-area-view';
import CONSTANTS from '../Constants.js';
import {context} from "../utils/Context.js";
import {asyncStore, getFromAsyncStore, removeItemValue} from "../utils/AsyncStore.js";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleBarTextStyle: { display: "none",},
    };
  }
  async componentDidMount(){
    try{
      await Font.loadAsync({
        'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
      });
      this.setState({
        mineTextStyle: {
          color: "#fab523",
          fontFamily: 'riffic-free-bold',
        },
        titleBarTextStyle: {
          fontFamily: 'riffic-free-bold',
        },
      });
      //await this.setState({loading: true});
    } catch(error){
      alert(error);
      //this.setState({loading: false});
    }
    //this.setState({overlay: -1}); // a little "hack" to cause render() to fire
  }

  render() {
    return (
      <ImageBackground source={require('../assets/homepage/titleback.png')} style={styles.titleBar}>
        {this.props.hasBackButton?
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
            <View style={styles.titleBarSnekTextHolder}>
              <View style={styles.top}></View>
              {this.props.loading? null :
                <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.titleBarText, this.state.titleBarTextStyle]}>
                  {this.props.user.snek}
                </Text>
              }
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onWallet}>
          <ImageBackground source={require('../assets/homepage/ethbox.png')} style={styles.ethBox}>
            <View style={styles.titleBarEthTextHolder}>
              {this.props.loading? null :
                <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.titleBarText, this.state.titleBarTextStyle]}>
                  {(this.props.user.eth/CONSTANTS.WEIPERETH).toPrecision(4)}
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
let titleBarHeight = screenWidth*.757/3.6;

let styles = StyleSheet.create({
  titleBar: {
    flex: 0,
    width: screenWidth,
    height: titleBarHeight,
    flexDirection: "row",
  },
  backButtonTouchable: {
    flex: 0,
    width: "15.55555555%",
    marginTop: titleBarHeight*.12/.757,
    marginLeft: screenWidth*.157/3.6,
    aspectRatio: 512/392,
  },
  backButtonIcon: {
    aspectRatio: 512/392,
    width: "100%",
  },
  optionsTouchable: {
    flex: 0,
    width: "15.55555555%",
    marginTop: titleBarHeight*.06/.757,
    marginLeft: screenWidth*.157/3.6,
    aspectRatio: 1,
  },
  optionsIcon: {
    aspectRatio: 1,
    width: "100%",
  },
  coinBox: {
    flex: 0,
    width: screenWidth*1.273/3.6,
    height: titleBarHeight*.323/.757,
    marginTop: titleBarHeight*.170/.757,
    marginLeft: screenWidth*.123/3.6,
  },
  ethBox: {
    flex: 0,
    width: screenWidth*1.273/3.6,
    height: titleBarHeight*.363/.757,
    marginTop: titleBarHeight*.170/.757,
    marginLeft: screenWidth*.123/3.6,
  },
  titleBarSnekTextHolder: {
    width: screenWidth*.833/3.6,
    height: titleBarHeight*.175/.757,
    marginTop: titleBarHeight*.075/.757,
    marginLeft: screenWidth*.360/3.6,
    justifyContent: 'center',
  },
  titleBarEthTextHolder: {
    width: screenWidth*.727/3.6,
    height: titleBarHeight*.175/.757,
    marginTop: titleBarHeight*.075/.757,
    marginLeft: screenWidth*.250/3.6,
    justifyContent: 'center',
  },
  titleBarText: {
    color: "#fab523",
    fontSize: 18,
  },
});
