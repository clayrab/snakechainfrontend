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
      fontFamily: 'riffic-free-bold'
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <ImageBackground source={require('../assets/wallet/screenBG2.png')} style={styles.backgroundImage} resizeMode="cover">
          <View style={styles.topButtonView}>
            <TouchableOpacity style={styles.depositButton}>
              <ImageBackground source={require('../assets/withdraw/WalletButton.png')} style={styles.withButtonImage} resizeMode="stretch">
                <Image source={require('../assets/withdraw/WalletIcon.png')} style={styles.withdrawIcons} />
                <Text style={[styles.buttonText, styles.depositText]}>
                  DEPOSIT
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.withdrawButton}>
              <ImageBackground source={require('../assets/withdraw/WithdrowButton.png')} style={styles.withButtonImage} resizeMode="stretch">
                <Image source={require('../assets/withdraw/WithdrowIcon.png')} style={styles.withdrawIcons} />
                <Text style={[styles.buttonText, styles.withdrawText]}>
                  WITHDROW
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton}>
              <ImageBackground source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage} resizeMode="stretch">
              </ImageBackground>
            </TouchableOpacity>
          </View>
            
          <View style={styles.etherBGView}>
            <ImageBackground source={require('../assets/withdraw/Ethereum.png')} style={styles.etherBGImage} resizeMode="contain">
              <Image source={require('../assets/wallet/diamond.png')} style={styles.diamondImage} />
              <Text style={[styles.buttonText, styles.yellowSnakeText]}>
                Ethereum
              </Text>
              <Text style={[styles.buttonText, styles.yellowSnakeText]}>
                0.010
              </Text>
            </ImageBackground>
          </View>

          <View style={styles.etherBGView}>
            <ImageBackground source={require('../assets/withdraw/Ethereum.png')} style={styles.etherBGImage} resizeMode="contain">
              <Image source={require('../assets/wallet/coin.png')} style={styles.diamondImage} />
              <Text style={[styles.buttonText, styles.yellowSnakeText]}>Snakechain</Text>
              <Text style={[styles.buttonText, styles.yellowSnakeText]}>305</Text>
            </ImageBackground>
          </View>

          <View style={styles.etherBGView}>
            <ImageBackground source={require('../assets/wallet/selectEtherBG.png')} style={styles.selectEtherImage} resizeMode="stretch">
              <Text style={[styles.buttonText, styles.selectAmountText]}>
                YOUR DEPOSIT ADDRESS
              </Text>
              <ImageBackground source={require('../assets/withdraw/textInputBG.png')} style={styles.addressInput} resizeMode="stretch">
                <Image source={require('../assets/wallet/pencil.png')} style={styles.pencilImage}/>
                <TextInput style={styles.textInput} underlineColorAndroid="transparent" />
              </ImageBackground>
              <View style={styles.noteView}>
                <ImageBackground source={require('../assets/withdraw/Note.png')} style={styles.noteInput} resizeMode="stretch">
                  <Text style={[styles.buttonText, styles.copyText]}>Note:</Text>
                  <TextInput style={styles.textInput} underlineColorAndroid="transparent" />
                </ImageBackground>
                <TouchableOpacity style={styles.depositButton}>
                  <ImageBackground source={require('../assets/withdraw/CopyButton.png')} style={styles.copyButtonImage} resizeMode="stretch">
                    <Text style={[styles.buttonText, styles.copyText]}>Copy</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.qrView}>
            <ImageBackground source={require('../assets/withdraw/QRCodeBackground.png')} style={styles.qrBG} resizeMode="stretch">
              <Image source={require('../assets/withdraw/qrImage.png')} resizeMode="stretch" style={styles.qrCode}/>
            </ImageBackground>
          </View>

          <View style={styles.etherBGView}>
            <ImageBackground source={require('../assets/wallet/noticeBG.png')} style={styles.selectEtherImage} resizeMode="contain">
              <Text style={[styles.buttonText, styles.addNotesText, {marginLeft: 5}]}>
                Please send .......... to the above address to add to WDT your amount will be added ...................
              </Text>
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
    height: 100,
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
    height: 15,
    marginLeft: 5
  },
  textInput: {
    width: screenWidth * 2 / 3 - 30,
    marginLeft: 5
  },
  addressInput: {
    backgroundColor: 'transparent',
    width: screenWidth * 2 / 3,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5
  },
  noteInput: {
    backgroundColor: 'transparent',
    width: screenWidth * 0.4,
    height: 20,
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 5,
  },
  buttonText: {
    fontWeight: 'bold'
  },
  withdrawText: {
    color: "#000",
    fontSize: 16,
  },
  depositText: {
    color: "#fab523",
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
  },
  copyButtonImage: {
    height: 25,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  noteView: {
    flexDirection: 'row'
  },
  copyText: {
    color: "#fab523",
    fontSize: 14
  },
  qrBG: {
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  qrView: {
    alignItems: 'center',
    marginTop: 10
  },
  qrCode: {
    width: 100,
    height: 100
  }
});
