import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Clipboard
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Font } from 'expo';

let yellowBackground = require('../assets/wallet/yellowBG.png');
let brownBackground = require('../assets/wallet/brownBG.png');
let selectedButton = require('../assets/wallet/selectedButton.png');
let unselectedButton = require('../assets/wallet/unselectedButton.png');
let walletIcon = require('../assets/wallet/walletIcon.png');
let walletIconYellow = require('../assets/wallet/walletIconYellow.png');
let withdrawIcon = require('../assets/wallet/withdrawIcon.png');
let withdrawIconYellow = require('../assets/wallet/withdrawIconYellow.png');

let modes = { DEPOSIT: 0, WITHDRAW: 1, };
let coins = { ETHEREUM: 0, SNAKE: 1, };
export default class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: modes.DEPOSIT,
      coin: -1,
    };
  }
  async componentDidMount(){
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    styles.buttonText = {
      fontFamily: 'riffic-free-bold'
    }
  }
  onCopyAddress = () => {
    Clipboard.setString(this.props.user.pubkey);
  }
  onWithdrawMode = () => {
    console.log("onwithdrawmode")
    this.setState({mode: modes.WITHDRAW});
  }
  onDepositMode = () => {
    console.log("onDepositMode")
    this.setState({mode: modes.DEPOSIT});
  }
  onEthereumCoin = () => {
    this.setState({coin: coins.ETHEREUM});
  }
  onSnakeCoin = () => {
    this.setState({coin: coins.SNAKE});
  }
  render() {
    let depositButton = selectedButton;
    let withdrawButton = unselectedButton;
    let depositStyle = styles.yellowText;
    let withdrawStyle = styles.blackText;
    let withdrawIconImg = withdrawIcon;
    let depositIconImg = walletIconYellow;

    if(this.state.mode == modes.WITHDRAW) {
      depositButton = unselectedButton;
      withdrawButton = selectedButton;
      depositStyle = styles.blackText;
      withdrawStyle = styles.yellowText;
      depositIconImg = walletIcon;
      withdrawIconImg = withdrawIconYellow;
    }

    let ethereumBackground = brownBackground;
    let snakeBackground = brownBackground;
    let ethereumStyle = styles.yellowSnakeText;
    let snakeStyle = styles.yellowSnakeText;
    if(this.state.coin == coins.ETHEREUM) {
      ethereumBackground = yellowBackground;
      ethereumStyle = styles.blackSnakeText;
    } else if(this.state.coin == coins.SNAKE) {
      snakeBackground = yellowBackground;
      snakeStyle = styles.blackSnakeText;
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/wallet/background.png')} style={styles.content} resizeMode="cover">
          <View style={styles.topButtonView}>
            <TouchableOpacity style={styles.depositButton} onPress={this.onDepositMode}>
              <ImageBackground source={depositButton} style={styles.depositButtonImage} resizeMode="stretch">
                <Image source={depositIconImg} style={styles.withdrawIcons} />
                <Text style={[styles.buttonText, depositStyle]}>
                  DEPOSIT
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.withdrawButton} onPress={this.onWithdrawMode}>
              <ImageBackground source={withdrawButton} style={styles.withButtonImage} resizeMode="stretch">
                <Image source={withdrawIconImg} style={styles.withdrawIcons} />
                <Text style={[styles.buttonText, withdrawStyle]}>
                  WITHDRAW
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.exit}>
              <ImageBackground source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage} resizeMode="stretch">
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.contentHolder}>
            <TouchableOpacity onPress={this.onEthereumCoin}>
              <ImageBackground source={ethereumBackground} style={styles.etherBGImage} resizeMode="stretch">
                <Image source={require('../assets/wallet/diamond.png')} style={styles.diamondImage} />
                <Text style={[styles.buttonText, ethereumStyle]}>
                  Ethereum
                </Text>
                <Text adjustsFontSizeToFit numberOfLines={1}
                  style={[styles.buttonText, ethereumStyle]}>
                  {(this.props.user.eth/CONSTANTS.WEIPERETH).toPrecision(4)}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onSnakeCoin}>
              <ImageBackground source={snakeBackground} style={styles.etherBGImage} resizeMode="stretch">
                <Image source={require('../assets/wallet/coin.png')} style={styles.diamondImage} />
                <Text style={[styles.buttonText, snakeStyle]}>
                  Snakechain
                </Text>
                <Text style={[styles.buttonText, snakeStyle]}>
                  {this.props.user.snek}
                </Text>
              </ImageBackground>
            </TouchableOpacity>




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

            <ImageBackground source={require('../assets/wallet/selectEtherBG.png')} style={styles.selectEtherImage} resizeMode="stretch">
              <Text style={[styles.buttonText, styles.addressText]}>
                YOUR DEPOSIT ADDRESS
              </Text>
              <Text style={[styles.buttonText, styles.addressPubkeyText]}>
                {this.props.user.pubkey}
              </Text>
              <View style={styles.noteView}>
                <TouchableOpacity style={styles.depositButton} onPress={this.onCopyAddress}>
                  <ImageBackground source={require('../assets/withdraw/CopyButton.png')} style={styles.copyButtonImage}>
                    <Text style={[styles.buttonText, styles.copyText]}>Copy</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </ImageBackground>

            <View style={styles.qrView}>
              <ImageBackground source={require('../assets/withdraw/QRCodeBackground.png')} style={styles.qrBG}>
                <Image source={{ uri:`http://chart.googleapis.com/chart?chs=300x300&cht=qr&chl={this.props.user.pubkey}&choe=UTF-8`}} resizeMode="stretch" style={styles.qrCode}/>
              </ImageBackground>
            </View>

            <ImageBackground source={require('../assets/wallet/noticeBG.png')} style={styles.selectEtherImage} resizeMode="stretch">
              <Text style={[styles.buttonText, styles.addNotesText, {marginLeft: 5}]}>
                Please send ethereum or snake to the above address
              </Text>
            </ImageBackground>

          </View>
        </ImageBackground>
      </View>
    )
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  // screen: {
  //   marginTop: 20
  // },
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
    width: screenWidth*685/723,
    height: screenHeight*1238/1287,
    position: 'relative',
    flexDirection: 'column',
  },
  topButtonView: {
    flexDirection: 'row',
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
  },
  depositButtonImage: {
    width: screenWidth*263/723,
    height: screenWidth*102/723,
    marginLeft: screenWidth*55/723,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  withButtonImage: {
    width: screenWidth*263/723,
    height: screenWidth*102/723,
    marginLeft: screenWidth*29/723,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  closeButton: {
    position: 'absolute',
    top: -screenWidth*9/723,
    right: -screenWidth*9/723,
  },
  closeButtonImage: {
    height: 50,
    width: 35,
  },
  contentHolder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  etherBGImage: {
    width: screenWidth*623/723,
    height: screenWidth*104/723,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  diamondImage: {
    width: 50,
    height: 30,
    resizeMode: 'contain'
  },
  selectEtherImage: {
    width: screenWidth*623/723,
    height: 100,
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
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
  blackText: {
    color: "#000",
    fontSize: 16,
  },
  yellowText: {
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
  blackSnakeText: {
    color: "#00001A",
    fontSize: 20
  },
  addressText: {
    color: "#fab523",
    fontSize: 14,
    marginBottom: 3,
  },
  addressPubkeyText: {
    color: "#fab523",
    fontSize: 12,
    marginBottom: 3,
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
  },

  selectAmountText: {
    color: "#fab523",
    fontSize: 14
  },
  selectEtherImage: {
    width: screenWidth - 100,
    height: 120,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  sendButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendButtonImage: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkedImage: {
    width: 30,
    height: 30
  },
});
