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
import { Keccak } from 'sha3';
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
let checkboxChecked = require('../assets/wallet/checkboxChecked.png');
let checkboxEmpty = require('../assets/wallet/checkboxEmpty.png');

let modes = { DEPOSIT: 0, WITHDRAW: 1, };
let coins = { ETHEREUM: 0, SNAKE: 1, };
export default class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: modes.DEPOSIT,
      coin: -1,
      termsAgreed: false,
      amountText: "",
      address: "",
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
    this.setState({mode: modes.WITHDRAW});
  }
  onDepositMode = () => {
    this.setState({mode: modes.DEPOSIT});
  }
  onEthereumCoin = () => {
    this.setState({coin: coins.ETHEREUM});
  }
  onSnakeCoin = () => {
    this.setState({coin: coins.SNAKE});
  }
  onAmountChanged = (amountText) => {
    this.setState({amountText: amountText});
  }
  onAddressChanged = (address) => {
    this.setState({address: address});
  }
  onTermsAgreed = () => {
    this.setState({termsAgreed: !this.state.termsAgreed});
  }
  isChecksumAddress = (address) => {
    address = address.replace('0x','');
    let hasher = new Keccak(256);
    hasher.update(address.toLowerCase());
    let addressHash = hasher.digest('hex');
    for (var i = 0; i < 40; i++ ) {
      if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
        return false;
      }
    }
    return true;
  }
  isAddress = (address) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
      return true;
    } else {
      return this.isChecksumAddress(address);
    }
  }
  onSend = () => {
    if(!this.state.termsAgreed){
      alert("You must agree to the terms and conditions")
    } else if (isNaN(this.state.amountText.replace(".",""))){
      alert("Amount must be a number");
    } else if (!this.isAddress(this.state.address)){
      alert("To address is not a valid address");
    } else {
      let type = this.state.coin == coins.ETHEREUM?"ETH":"SNK";
      let amt = Number(this.state.amountText);
      if(type == "ETH") {
        amt = amt * 1000000000000000000;
      }
      this.props.onSend(amt, this.state.address, type)
    }
  }
  render() {
    if (!this.props.show) {
      return null;
    } else {
      let checkboxImg = checkboxEmpty;
      if(this.state.termsAgreed){
        checkboxImg = checkboxChecked;
      }
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
              <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
                <ImageBackground source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage} resizeMode="stretch"/>
              </TouchableOpacity>
            </View>
            <View style={styles.contentHolder}>
              { this.state.mode == modes.WITHDRAW
                ?
                  <View>
                    <TouchableOpacity onPress={this.onEthereumCoin}>
                      <ImageBackground source={ethereumBackground} style={styles.etherBGImage} resizeMode="stretch">
                        <View style={styles.coinIconHolder}>
                          <Image source={require('../assets/wallet/diamond.png')} style={styles.diamondImage} />
                        </View>
                        <View style={styles.coinTextHolder}>
                          <Text style={[styles.buttonText, ethereumStyle]}>Ethereum</Text>
                        </View>
                        <Text adjustsFontSizeToFit numberOfLines={1}
                          style={[styles.buttonText, ethereumStyle]}>
                          {(this.props.user.eth/CONSTANTS.WEIPERETH).toPrecision(4)}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onSnakeCoin}>
                      <ImageBackground source={snakeBackground} style={styles.etherBGImage} resizeMode="stretch">
                        <View style={styles.coinIconHolder}>
                          <Image source={require('../assets/wallet/coin.png')} style={styles.diamondImage} />
                        </View>
                        <View style={styles.coinTextHolder}>
                          <Text style={[styles.buttonText, snakeStyle]}>Snakechain</Text>
                        </View>
                        <Text style={[styles.buttonText, snakeStyle]}>
                          {this.props.user.snek}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                    {this.state.coin == -1 ?
                      <View style={styles.etherBGView}>
                        <ImageBackground source={require('../assets/wallet/selectEtherBG.png')} style={styles.selectEtherImage} resizeMode="stretch">
                          <Text style={[styles.buttonText, styles.selectAmountText]}>
                            Select a coin to send
                          </Text>
                        </ImageBackground>
                      </View>
                      :
                    <View>

                      <View style={styles.etherBGView}>
                        <ImageBackground source={require('../assets/wallet/selectEtherBG.png')} style={styles.selectEtherImage} resizeMode="stretch">
                          <Text style={[styles.buttonText, styles.selectAmountText]}>
                            YOU ARE SENDING {this.state.coin == coins.ETHEREUM?"ETHER":"SNAKE"}
                          </Text>
                          <View style={styles.amountTextView}>
                            <Text style={[styles.buttonText, styles.amountText]}>
                              Amount
                            </Text>
                            <ImageBackground source={require('../assets/wallet/textInputBG.png')} style={styles.amountInput} resizeMode="contain">
                              <TextInput style={styles.textInput} underlineColorAndroid="transparent"
                                keyboardType = 'numeric'
                                onChangeText = {(text) => this.onAmountChanged(text)}/>
                              <Image source={require('../assets/wallet/pencil.png')} style={styles.pencilImage}/>
                            </ImageBackground>
                          </View>
                        </ImageBackground>
                      </View>
                      <View style={styles.etherBGView}>
                        <ImageBackground source={require('../assets/wallet/selectEtherBG.png')} style={styles.selectEtherImage} resizeMode="stretch">
                          <View style={styles.sendingTextHolder}>
                            <Text style={[styles.buttonText, styles.selectAmountText]}>
                              SEND TO PUBLIC ADDRESS
                            </Text>
                          </View>
                          <ImageBackground source={require('../assets/wallet/textInputBG.png')} style={styles.addressInput} resizeMode="stretch">
                            <Image source={require('../assets/wallet/pencil.png')} style={styles.pencilImage}/>
                            <TextInput style={styles.addressTextInput} underlineColorAndroid="transparent"
                              keyboardType = 'numeric'
                              onChangeText = {(text) => this.onAddressChanged(text)}/>
                          </ImageBackground>
                          <Text style={[styles.buttonText, styles.addNotesText]}>
                            Enter the receiver's public address
                          </Text>
                        </ImageBackground>
                      </View>
                      <Text style={[styles.buttonText, styles.comingSoonText]}>
                        QR Scanning Coming Soon!
                      </Text>
                      <View style={styles.sendButtonView}>
                        <TouchableOpacity onPress={this.onSend}>
                          <ImageBackground source={require('../assets/wallet/sendButtonBG.png')} style={styles.sendButtonImage} resizeMode="contain">
                            <Text style={[styles.buttonText, styles.depositText]}>SEND</Text>
                          </ImageBackground>
                        </TouchableOpacity>
                        <View style={styles.termsHolder}>
                          <TouchableOpacity onPress={this.onTermsAgreed}>
                            <Image source={checkboxImg} style={styles.checkedImage} resizeMode="contain" />
                          </TouchableOpacity>
                          <Text style={[styles.buttonText, styles.depositText]}>
                            I agree to <Text style={[styles.buttonText, styles.termsText]}>terms</Text>
                          </Text>
                        </View>
                      </View>
                      <View style={styles.etherBGView}>
                        <ImageBackground source={require('../assets/wallet/noticeBG.png')} style={styles.selectEtherImage} resizeMode="stretch">
                          <Text style={[styles.buttonText, styles.addNotesText, {marginLeft: 5}]}>
                            Notice: Lorem Ipsum is simply dummy text of the printing and typesetting industry.type and scrambled it to make a type specimen book.
                          </Text>
                        </ImageBackground>
                      </View>
                    </View>
                    }
                  </View>
                :
                <View>
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
              }
            </View>
          </ImageBackground>
        </View>
      )
    }
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
    width: screenWidth*685/724,
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
    width: screenWidth*263/724,
    height: screenWidth*102/724,
    marginLeft: screenWidth*55/724,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  withButtonImage: {
    width: screenWidth*263/724,
    height: screenWidth*102/724,
    marginLeft: screenWidth*29/724,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  closeButton: {
    position: 'absolute',
    top: -screenWidth*9/724,
    right: -screenWidth*9/724,
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
    width: screenWidth*623/724,
    height: screenWidth*104/724,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  coinIconHolder: {
    width: screenWidth*130/724,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diamondImage: {
    width: 50,
    height: 30,
    resizeMode: 'contain'
  },
  coinTextHolder: {
    width: screenWidth*290/724,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectEtherImage: {
    width: screenWidth*623/724,
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
    width: screenWidth * 317/724,
    height: screenWidth * 73/724,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  pencilImage: {
    position: 'absolute',
    right: 10,
    top: screenWidth * 20/724,
    width: 15,
    height: 15,
  },
  textInput: {
    width: screenWidth * 317/724,
    height: screenWidth * 73/724,
    color: "#fab523",
    paddingLeft: 10,
    paddingRight: 25,
  },
  sendingTextHolder: {
    marginTop: 2,
    marginBottom: 5,
  },
  addressInput: {
    width: screenWidth * 515/724,
    height: screenWidth * 73/724,
    //backgroundColor: 'transparent',
    // width: screenWidth * 2 / 3,
    // height: 30,
    alignItems: 'center',
    flexDirection: 'row',

  },
  addressTextInput: {
    width: screenWidth * 515/724,
    height: screenWidth * 73/724,
    color: "#fab523",
    paddingLeft: 10,
    paddingRight: 25,
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
    fontSize: 14,
  },
  comingSoonText: {
    color: "#fab523",
    fontSize: 14,
    marginTop: 2,
    marginBottom: 12,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  sendButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendButtonImage: {
    width: screenWidth * 229/724,
    height: screenWidth * 95/724,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsHolder: {
    position: "absolute",
    right: 0,
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  checkedImage: {
    marginLeft: screenWidth * 63/724,
    marginRight: screenWidth * 10/724,
    width: 30,
    height: 30
  },
  termsText: {
    color: "#fab523",
    fontSize: 16,
  }
});
