import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Font } from 'expo';
import WalletOverlay from '../components/WalletOverlay.js';

var overlays = {"WALLETOVERLAY": 0, };
export default class AccountHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: -1,
      riffic: {},
      isSend: false,
    };
  }
  async componentDidMount(){
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({riffic: {
      fontFamily: 'riffic-free-bold',
    }});
  }
  closeOverlay = () => {
    this.setState({overlay: -1});
  }
  onSend = async(amount, pubkey, type) => {
    await this.setState({overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    let data = {
      amount: amount,
      type: type,
    };
    fetch(`${context.host}:${context.port}/createTransaction`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "JWT " + jwt,
      },
    }).then(async(response) => {
      var resp = await response.json();
      if(!resp.error){
        if(resp) {
          if(resp.transactionKey) {
            this.setState({
              overlay: overlays.CONFIRMSEND,
              confirmAmount: amount,
              confirmTokenType: type,
              confirmPubkey: pubkey,
              txKey: resp.transactionKey,
            });
          } else {
            alert("There was an error, malformed response.");
            this.setState({overlay: -1});
          }
        } else{
          alert("There was an error, no response.");
          this.setState({overlay: -1});
        }
      } else {
        alert(resp.error);
        this.setState({overlay: -1});
      }
    }).catch(err => {throw err});
  }
  onConfirmSend = async() => {
    await this.setState({overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    let amount = this.state.confirmAmount;
    let url = "/sendEth";
    let type = "ETH";
    if(this.state.confirmTokenType == "SNK") {
      url = "/sendSnek";
      type = "SNK";
    }
    var data = {
      txkey: this.state.txKey,
      type: type,
      amount: this.state.confirmAmount,
      to: this.state.confirmPubkey,
    };
    var response = await fetch(`${context.host}:${context.port}${url}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "JWT " + jwt,
      },
    });
    var resp = await response.json();
    if(resp.error){
      alert(resp.error);
      await this.setState({overlay: -1});
    }else if(resp.txhash) {
      await this.setState({overlay: overlays.CONFIRMTX, lastTxHash: resp.txhash});
    } else {
      alert("Error sending transaction");
      await this.setState({overlay: -1});
    }
  }
  onCancelConfirmSend = () => {
    this.setState({overlay: overlays.WALLETOVERLAY });
  }

  onDoReceive = () => {
    this.setState({overlay: overlays.WALLETOVERLAY, isSend: false, });
  }
  onDoSend = () => {
    this.setState({overlay: overlays.WALLETOVERLAY, isSend: true, });
  }
  // withdraw = () => {
  //   console.log("withdraw")
  //   this.setState({overlay: overlays.WITHDRAW });
  // }
  // deposit = () => {
  //   console.log("deposit")
  //   this.setState({overlay: overlays.DEPOSIT });
  // }

  render() {
    return (
      <SafeAreaView>
        <ImageBackground source={require('../assets/accounthistory/BG.png')} style={styles.backgroundImage} resizeMode="stretch">
          <View style={styles.headerHolder}>
            <TouchableOpacity onPress={this.props.exit} style={styles.backButtonTouchable}>
              <ImageBackground source={require('../assets/backbutton.png')} style={styles.backButtonIcon}/>
            </TouchableOpacity>
            <View style={styles.profilePicView}>
              <ImageBackground source={require('../assets/accounthistory/medalBG.png')} style={styles.medalImage} resizeMode="stretch">
                <Image source={require('../assets/accounthistory/profilepic.png')} style={styles.profileImage} resizeMode="stretch"/>
              </ImageBackground>
            </View>
            <View style={styles.profileDetailView}>
              <Text style={[this.state.riffic, styles.buttonColorText]}>
                BOBBER SON14
              </Text>
              <Text style={[this.state.riffic, styles.publicAddText]}>
                PUBLIC ADDRESS: 0x123124
              </Text>
              <Text style={[this.state.riffic, styles.profileInfoText]}>
                MORE PROFILE INFO
              </Text>
            </View>
          </View>
          <ImageBackground style={styles.balancesHolder} source={require('../assets/accounthistory/sendreceiveBG.png')} resizeMode="stretch">
            <View style={styles.balancesView}>
              <View style={[styles.balancesNumbersView]}>
                <Image source={require('../assets/wallet/coin.png')} style={styles.diamondImage} />
                <Text style={[this.state.riffic, styles.numberText]}>
                  3.150
                </Text>
              </View>
              <View style={[styles.balancesNumbersView]}>
                <Image source={require('../assets/wallet/diamond.png')} style={styles.diamondImage} />
                <Text style={[this.state.riffic, styles.numberText]}>
                  0.0150
                </Text>
              </View>
            </View>
            <View style={styles.sendRecvView}>
              <View style={styles.sendRecvButtonHolder}>
                <TouchableOpacity onPress={this.onDoReceive}>
                  <ImageBackground source={require('../assets/accounthistory/greenbtn.png')} style={styles.sendRecvButton} resizeMode="stretch">
                    <Image source={require('../assets/accounthistory/receiveblack.png')} style={styles.buttonIconImage} />
                    <Text style={[this.state.riffic, styles.buttonColorText]}>RECEIVE</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View style={styles.sendRecvButtonHolder}>
                <TouchableOpacity onPress={this.onDoSend}>
                  <ImageBackground source={require('../assets/accounthistory/yellowbtn.png')} style={styles.sendRecvButton} resizeMode="stretch">
                    <Image source={require('../assets/accounthistory/sendblack.png')} style={styles.buttonIconImage} />
                    <Text style={[this.state.riffic, styles.buttonColorText]}>SEND</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          <ImageBackground source={require('../assets/accounthistory/accounthistoryBG.png')} style={styles.txHistory} resizeMode="contain">
            <ScrollView>
              {[0,1,3].map((object, i) => {
                return (
                  <ImageBackground key={i} source={require('../assets/accounthistory/historyBG.png')} style={[styles.historyBG, styles.topHistoryView]} resizeMode="contain">
                    <View style={styles.historyLeftView}>
                      <Image source={require('../assets/accounthistory/sendicon.png')} style={styles.buttonIconImage} />
                      <Text style={[this.state.riffic, styles.historyLabelText]}>SEND</Text>
                      <Text style={[this.state.riffic, styles.dateText]}>15/10/2018</Text>
                    </View>
                    <Image source={require('../assets/accounthistory/historyseprate.png')} style={styles.historySepImage} resizeMode="contain"/>
                    <View style={styles.historyRightView}>
                      <View style={styles.topRightHistoryView}>
                        <Text style={[this.state.riffic, styles.headerText]}>
                          0.0150
                        </Text>
                        <Image source={require('../assets/wallet/diamond.png')} style={styles.diamondImage} />
                        <Text style={[this.state.riffic, styles.headerText]}>
                          SENT
                        </Text>
                      </View>
                      <View style={styles.topRightHistoryView}>
                        <Text style={[this.state.riffic, styles.historyLabelText]}>
                          to stansmith@gmail.com
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                );
              })}
            </ScrollView>
          </ImageBackground>
          <WalletOverlay
            show={this.state.overlay == overlays.WALLETOVERLAY}
            onSend={this.onSend}
            isSend={this.state.isSend}
            user={this.props.user}
            closeOverlay={this.closeOverlay} />
        </ImageBackground>
      </SafeAreaView>
    )
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let titleBarHeight = CONSTANTS.SCOREBOARDHEIGHT;
let styles = StyleSheet.create({
  screen: {
    marginTop: 20
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
    flexDirection: 'column',
    alignItems: 'center',
  },
  backButtonTouchable: {
    flex: 1.76,
    marginTop: titleBarHeight*.06/.757,
    marginLeft: screenWidth*.157/3.6,
    aspectRatio: 512/392,
  },
  backButtonIcon: {
    aspectRatio: 512/392,
    width: "100%",
  },
  headerHolder: {
    marginTop: titleBarHeight*.12/.757,
    marginBottom: titleBarHeight*.18/.757,
    flexDirection: 'row',
  },
  medalImage: {
    width: screenWidth*199/1080,
    height: (344/393)*screenWidth*199/1080,
  },
  profileImage: {
    width: screenWidth*134/1080,
    height: (272/272)*screenWidth*134/1080,
    marginLeft: screenWidth*25/1080,
    marginTop: screenWidth*20/1080,
  },
  profilePicView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileDetailView: {
    flex: 7,
    marginTop: 10
  },
  balancesHolder: {
    width: screenWidth*1005/1080,
    height: screenHeight * 0.45,
    flexDirection: 'column',
  },
  balancesView: {
    paddingTop: screenWidth*175/1080,
    paddingBottom: screenWidth*175/1080,
    flexDirection: 'row',
    width: "100%",
  },
  balancesNumbersView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendRecvView: {
    flexDirection: 'row',
  },
  sendRecvButtonHolder: {
    paddingTop: screenWidth*60/1080,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  sendRecvButton: {
    width: screenWidth*451/1080,
    height: (376/904)*screenWidth*451/1080,

    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonColorText: {
    color: "#000",
    fontSize: 16
  },
  buttonIconImage: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  diamondImage: {
    width: 20,
    height: 30,
    resizeMode: 'contain'
  },
  txHistory: {
    width: screenWidth*1005/1080,
    height: (1626/2022)*screenWidth*1005/1080,
    paddingTop: 50,
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  historyBG: {
    width: screenWidth * 0.8,
    height: 100,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  topHistoryView: {
    marginTop: 10
  },
  historySepImage: {
    width: 5,
    height: 70,
  },
  historyLeftView: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center'
  },
  historyRightView: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center'
  },
  topRightHistoryView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  publicAddText: {
    color: "#000",
    fontSize: 14
  },
  profileInfoText: {
    color: "red",
    fontSize: 10,
    opacity: 0.5
  },
  snakeText: {
    color: "#fab523",
    fontSize: 14
  },
  numberText: {
    color: "#fab523",
    fontSize: 24
  },
  historyLabelText: {
    color: "#fab523",
    fontSize: 14
  },
  dateText: {
    color: "#fab523",
    fontSize: 10,
    opacity: 0.5
  },
  historyReceiveText: {
    color: '#10BB1A',
    fontSize: 14
  },
  headerText: {
    color: "#fab523",
    fontSize: 20
  },
  buttonText: {
  },
});
