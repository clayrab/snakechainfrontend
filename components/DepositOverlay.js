import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Font } from 'expo';

export default class Wallet extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount(){
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    styles.buttonText = {
      fontFamily: 'riffic-free-bold',

    }
  }
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <ImageBackground source={require('../assets/wallet/background.png')} style={styles.backgroundImage} resizeMode="cover">

          <View style={styles.etherBGView}>
            <ImageBackground source={require('../assets/wallet/selectEtherBG.png')} style={styles.selectEtherImage} resizeMode="contain">
              <Text style={[styles.buttonText, styles.selectAmountText]}>
                You have selected Ether to send
              </Text>
              <View style={styles.amountTextView}>
                <Text style={[styles.buttonText, styles.amountText]}>
                  Amount
                </Text>
                <ImageBackground source={require('../assets/wallet/textInputBG.png')} style={styles.amountInput} resizeMode="contain">
                  <TextInput style={styles.textInput} underlineColorAndroid="transparent">

                  </TextInput>
                  <Image source={require('../assets/wallet/pencil.png')} style={styles.pencilImage}/>
                </ImageBackground>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.sendButtonView}>
            <TouchableOpacity>
              <ImageBackground source={require('../assets/wallet/sendButtonBG.png')} style={styles.sendButtonImage} resizeMode="contain">
                <Text style={[styles.buttonText, styles.depositText]}>SEND</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/wallet/checked.png')} style={styles.checkedImage} resizeMode="contain" />
            </TouchableOpacity>
            <Text style={[styles.buttonText, styles.depositText]}>
              I agree to <Text style={[styles.buttonText, styles.withdrawText]}>terms</Text>
            </Text>
          </View>
          <View style={styles.etherBGView}>
            <ImageBackground source={require('../assets/wallet/noticeBG.png')} style={styles.selectEtherImage} resizeMode="contain">
              <Text style={[styles.buttonText, styles.addNotesText, {marginLeft: 5}]}>
                Notice: Lorem Ipsum is simply dummy text of the printing and typesetting industry.type and scrambled it to make a type specimen book.</Text>
            </ImageBackground>
        </View>
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
  backgroundImage: {
   width: screenWidth,
   height: screenHeight,
  },
  topButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  withdrawIcons: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  withdrawButton: {
    alignItems: 'center'
  },
  depositButton: {
    alignItems: 'center',
    marginLeft: 20
  },
  withButtonImage: {
    width: 110,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  closeButtonImage: {
    width: 40,
    height: 40,
  },
  etherBGImage: {
    width: screenWidth - 100,
    height: 60,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  etherBGView:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  diamondImage: {
    width: 50,
    height: 30,
    resizeMode: 'contain'
  },
  selectEtherImage: {
    width: screenWidth - 100,
    height: 120,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  amountTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  amountInput: {
    backgroundColor: 'transparent',
    width: screenWidth / 3,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    flexDirection: 'row'
  },
  pencilImage: {
    width: 15,
    height: 15
  },
  textInput: {
    width: screenWidth / 3 - 20,
  },
  addressInput: {
    backgroundColor: 'transparent',
    width: screenWidth / 2,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    flexDirection: 'row',
    marginTop: 5
  },
  sendButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkedImage: {
    width: 30,
    height: 30
  },
  sendButtonImage: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold'
  },
  withdrawText: {
    color: "#fab523",
    fontSize: 16,
  },
  depositText: {
    color: "#000",
    fontSize: 16
  },
  blackEtherText: {
    color: "#000",
    fontSize: 20
  },
  yellowSnakeText: {
    color: "#fab523",
    fontSize: 20
  },
  selectAmountText: {
    color: "#fab523",
    fontSize: 14
  },
  amountText: {
    color: "#fab523",
    fontSize: 16,
    opacity: 0.5
  },
  addNotesText: {
    color: "#fab523",
    fontSize: 10,
    opacity: 0.5,
    marginTop: 5
  }
});
