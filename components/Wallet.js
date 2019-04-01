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
import ScreenView from '../components/ScreenView.js';
import {Font} from 'expo';
import {asyncStore, getFromAsyncStore, removeItemValue} from "../utils/AsyncStore.js";
import {context} from "../utils/Context.js";
import {normalize} from '../utils/FontNormalizer.js';

import WalletOverlay from '../components/WalletOverlay.js';
import ConfirmTxOverlay from '../components/ConfirmTxOverlay.js';
import AreYouSureOverlay from '../components/AreYouSureOverlay.js';
import LoadingOverlay from '../components/LoadingOverlay.js';

var overlays = {"WALLETOVERLAY": 0, LOADING: 1, "CONFIRMSEND": 2, CONFIRMTX: 3,};
let modes = {DEPOSIT: 0, WITHDRAW: 1,};
//let overlayModeOverrider = 0; //we force redraw of walletoverlay.js by incrementing this
export default class AccountHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: -1,
      riffic: {},
      overlayMode: null,
      loading: true,
      transactions: null,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({
      riffic: {
        fontFamily: 'riffic-free-bold',
      }
    });
    let prom = async () => {
      return await new Promise((resolve, reject) => {
        getFromAsyncStore("jwt").then((jwt) => {
          fetch(`${context.host}:${context.port}/getTransactions`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              //"Content-Type": "application/json; charset=utf-8",
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "JWT " + jwt,
            },
          }).then(async (response) => {
            var resp = await response.json();
            if (resp.error) {
              alert(resp.error);
              resolve({loading: false});
            } else if (resp) {
              resolve({loading: false, transactions: resp.transactions});
            }
          }).catch(
            err => {
              throw err
            });
        }).catch(err => {
          throw err
        });
      }).catch(err => {
        throw err
      });
    }
    //let state = await makeRetry()(1500, prom);
    let state = await prom();
    this.setState(state);

  }

  closeOverlay = () => {
    this.setState({overlay: -1});
  }
  onSend = async (amount, pubkey, type) => {
    await this.setState({overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    let data = {
      amount: amount,
      type: type,
      lastTxHash: "",
    };
    fetch(`${context.host}:${context.port}/createTransaction`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "JWT " + jwt,
      },
    }).then(async (response) => {
      var resp = await response.json();
      if (!resp.error) {
        if (resp) {
          if (resp.transactionKey) {
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
        } else {
          alert("There was an error, no response.");
          this.setState({overlay: -1});
        }
      } else {
        alert(resp.error);
        this.setState({overlay: -1});
      }
    }).catch(err => {
      throw err
    });
  }
  onConfirmSend = async () => {
    await this.setState({overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    let amount = this.state.confirmAmount;
    let url = "/sendEth";
    let type = "ETH";
    if (this.state.confirmTokenType == "SNK") {
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
    if (resp.error) {
      alert(resp.error);
      await this.setState({overlay: -1});
    } else if (resp.txhash) {
      await this.setState({overlay: overlays.CONFIRMTX, lastTxHash: resp.txhash});
    } else {
      alert("Error sending transaction");
      await this.setState({overlay: -1});
    }
  }
  onCancelConfirmSend = () => {
    this.setState({overlay: overlays.WALLETOVERLAY});
  }
  onDoReceive = () => {
    console.log("onDoReceive")
    this.setState({overlay: overlays.WALLETOVERLAY, overlayMode: modes.DEPOSIT,});
  }
  onDoSend = () => {
    console.log("onDoSend")
    this.setState({overlay: overlays.WALLETOVERLAY, overlayMode: modes.WITHDRAW,});
  }
  onConfirmTxOk = () => {
    this.setState({overlay: -1});
  }
  prettyTxTypes = {mineWithSnek: "Snek", mine: "Snek", eth: "ETH",};
  recvTypes = {mineWithSnek: true, mine: true};

  render() {
    return (
      <ScreenView>
        <ImageBackground source={require('../assets/accounthistory/BG.png')} style={styles.backgroundImage}
                         resizeMode="stretch">
          <View style={styles.headerHolder}>
            <TouchableOpacity onPress={this.props.exit} style={styles.backButtonTouchable}>
              <ImageBackground source={require('../assets/backbutton.png')} style={styles.backButtonIcon}/>
            </TouchableOpacity>
            <View style={styles.profilePicView}>
              <ImageBackground source={require('../assets/accounthistory/medalBG.png')} style={styles.medalImage}
                               resizeMode="stretch">
                <Image source={require('../assets/accounthistory/profilepic.png')} style={styles.profileImage}
                       resizeMode="stretch"/>
              </ImageBackground>
            </View>
            <View style={styles.profileDetailView}>
              <Text style={[this.state.riffic, styles.buttonColorText]}>
                {this.props.user.name}
              </Text>
              <Text style={[this.state.riffic, styles.publicAddText]}>
                {this.props.user.pubkey.substring(0, 7)}...{this.props.user.pubkey.substring(37, 42)}
              </Text>
              <Text style={[this.state.riffic, styles.profileInfoText]}>

              </Text>
            </View>
          </View>
          <ImageBackground style={styles.balancesHolder} source={require('../assets/accounthistory/sendreceiveBG.png')}
                           resizeMode="stretch">
            <View style={[styles.balancesView]}>
              <View style={[styles.balancesNumbersView,]}>
                <Text style={[this.state.riffic, styles.numberTextTop, {paddingTop: 20, flex: 1}]}>
                  SnakeChain
                </Text>
                <Image source={require('../assets/wallet/coin.png')} style={[styles.diamondImage, {flex: 1}]}/>
                <Text style={[this.state.riffic, styles.numberText, {flex: 1}]}>
                  {this.props.user.snek}
                </Text>
                <Text style={[this.state.riffic, styles.numberTextBottom, {paddingBottom: 20, flex: 1}]}>
                  SNK
                </Text>
              </View>
              <View style={[styles.balancesNumbersView]}>
                <Text style={[this.state.riffic, styles.numberTextTop, {paddingTop: 20, flex: 1}]}>
                  Ethereum
                </Text>
                <Image source={require('../assets/wallet/diamond.png')} style={[styles.diamondImage, {flex: 1}]}/>
                <Text style={[this.state.riffic, styles.numberText, {flex: 1}]}>
                  {(this.props.user.eth / CONSTANTS.WEIPERETH).toPrecision(4)}
                </Text>
                <Text style={[this.state.riffic, styles.numberTextBottom, {paddingBottom: 20, flex: 1}]}>
                  ETH
                </Text>
              </View>
            </View>
            <View style={styles.sendRecvView}>
              <View style={styles.sendRecvButtonHolder}>
                <TouchableOpacity onPress={this.onDoReceive}>
                  <ImageBackground source={require('../assets/accounthistory/greenbtn.png')}
                                   style={styles.sendRecvButton} resizeMode="stretch">
                    <Image source={require('../assets/accounthistory/receiveblack.png')}
                           style={styles.buttonIconImage}/>
                    <Text style={[this.state.riffic, styles.buttonColorText]}>RECEIVE</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View style={styles.sendRecvButtonHolder}>
                <TouchableOpacity onPress={this.onDoSend}>
                  <ImageBackground source={require('../assets/accounthistory/yellowbtn.png')}
                                   style={styles.sendRecvButton} resizeMode="stretch">
                    <Image source={require('../assets/accounthistory/sendblack.png')} style={styles.buttonIconImage}/>
                    <Text style={[this.state.riffic, styles.buttonColorText]}>SEND</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          <ImageBackground source={require('../assets/accounthistory/accounthistoryBG.png')} style={styles.txHistory}
                           resizeMode="stretch">
            <ScrollView styles={styles.txHistoryScroll}>
              {this.state.loading ? null :
                this.state.transactions.map((transaction, i) => {
                  // "pubkey": "0x0b48797c3d9C0CF15B14f003d6A60B2F94F1F517",
                  // "txhash": "0x66c78149c875543b666a49e93574f95eea20488157781357b0d6b22cead2499d",
                  // "time": "2019-02-22T07:00:19.666Z",
                  // "type": "snk",
                  // "from": "0x0b48797c3d9C0CF15B14f003d6A60B2F94F1F517",
                  // "to": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
                  // "amount": "70000",
                  // "fee": null
                  return (
                    <ImageBackground key={i} source={require('../assets/accounthistory/historyBG.png')}
                                     style={styles.historyBG} resizeMode="contain">
                      {this.recvTypes[transaction.type]
                        ?
                        <View style={styles.historyLeftView}>
                          <Image source={require('../assets/accounthistory/receiveicon.png')}
                                 style={styles.buttonIconImage}/>
                          <Text style={[styles.buttonText, styles.historyReceiveText]}>RECEIVE</Text>
                          <Text style={[styles.buttonText, styles.dateText]}>15/10/2018</Text>
                        </View>
                        :
                        <View style={styles.historyLeftView}>
                          <Image source={require('../assets/accounthistory/sendicon.png')}
                                 style={styles.buttonIconImage}/>
                          <Text style={[this.state.riffic, styles.historyLabelText]}>SENT</Text>
                          <Text style={[this.state.riffic, styles.dateText]}>15/10/2018</Text>
                        </View>
                      }
                      <Image source={require('../assets/accounthistory/historyseprate.png')}
                             style={styles.historySepImage} resizeMode="contain"/>
                      <View style={styles.historyRightView}>
                        <View style={styles.topRightHistoryView}>
                          <Text style={[this.state.riffic, styles.headerText]}>
                            {transaction.type === "eth"
                              ?
                              (transaction.amount / CONSTANTS.WEIPERETH).toPrecision(4)
                              :
                              transaction.amount
                            }
                          </Text>
                          <Image source={require('../assets/wallet/diamond.png')} style={styles.diamondImage}/>
                          <Text style={[this.state.riffic, styles.headerText]}>
                            {this.state.loading ? null :
                              this.prettyTxTypes[transaction.type]
                            }
                          </Text>
                        </View>
                        <View style={styles.topRightHistoryView}>
                          {!transaction.to ? null :
                            <Text style={[this.state.riffic, styles.historyLabelText]}>
                              to {transaction.to.substring(0, 7)}...{transaction.to.substring(37, 42)}
                            </Text>
                          }
                        </View>
                      </View>
                    </ImageBackground>
                  );
                })
              }
            </ScrollView>
          </ImageBackground>
          <WalletOverlay
            show={this.state.overlay == overlays.WALLETOVERLAY}
            onSend={this.onSend}
            onDoReceive={this.onDoReceive}
            onDoSend={this.onDoSend}
            mode={this.state.overlayMode}
            overlayMode={this.state.overlayMode}
            user={this.props.user}
            closeOverlay={this.closeOverlay}/>
          <LoadingOverlay show={this.state.overlay == overlays.LOADING}/>
          <AreYouSureOverlay
            show={this.state.overlay == overlays.CONFIRMSEND}
            text={`Send ${this.state.confirmAmount} ${this.state.confirmTokenType} to ${this.state.confirmPubkey}.\n\nAre you sure?`}
            onYes={this.onConfirmSend}
            onNo={this.onCancelConfirmSend}/>
          <ConfirmTxOverlay
            show={this.state.overlay == overlays.CONFIRMTX}
            transactionId={this.state.lastTxHash}
            onOk={this.onConfirmTxOk}/>
        </ImageBackground>
      </ScreenView>
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
    marginTop: titleBarHeight * .06 / .757,
    marginLeft: screenWidth * .157 / 3.6,
    aspectRatio: 512 / 392,
  },
  backButtonIcon: {
    aspectRatio: 512 / 392,
    width: "100%",
  },
  headerHolder: {
    marginTop: titleBarHeight * .12 / .757,
    marginBottom: titleBarHeight * .18 / .757,
    flexDirection: 'row',
  },
  medalImage: {
    width: screenWidth * 199 / 1080,
    height: (344 / 393) * screenWidth * 199 / 1080,
  },
  profileImage: {
    width: screenWidth * 134 / 1080,
    height: (272 / 272) * screenWidth * 134 / 1080,
    marginLeft: screenWidth * 25 / 1080,
    marginTop: screenWidth * 20 / 1080,
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
    width: screenWidth * 1005 / 1080,
    height: screenHeight * 0.45,
    flexDirection: 'column',
  },
  balancesView: {
    height: screenHeight * 0.267,
    flexDirection: 'row',
    width: "100%",
  },
  balancesNumbersView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendRecvView: {
    flexDirection: 'row',
  },
  sendRecvButtonHolder: {
    paddingTop: screenWidth * 60 / 1080,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  sendRecvButton: {
    width: screenWidth * 451 / 1080,
    height: (376 / 904) * screenWidth * 451 / 1080,

    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonColorText: {
    color: "#000",
    fontSize: normalize(14),
  },
  buttonIconImage: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  diamondImage: {
    width: 25,
    height: 30,
    resizeMode: 'contain'
  },
  txHistory: {
    width: screenWidth * 1005 / 1080,
    //height: (1500/2022)*screenWidth*1005/1080,
    flex: 1,
    paddingTop: 60,
    marginTop: 10,
    paddingBottom: 10,
    marginBottom: 22,
    flexDirection: 'column',
    alignItems: 'center',
  },
  txHistoryScroll: {
    paddingBottom: 100,
  },
  historyBG: {
    width: screenWidth * 890 / 1080,
    height: (390 / 1784) * screenWidth * 890 / 1080,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: normalize(12)
  },
  profileInfoText: {
    color: "red",
    fontSize: normalize(7),
    opacity: 0.5
  },
  snakeText: {
    color: "#fab523",
    fontSize: normalize(12)
  },
  numberText: {
    color: "#fab523",
    fontSize: normalize(26),
    paddingBottom: 20,
  },
  numberTextTop: {
    color: "#6A534F",
    fontSize: normalize(12),
  },
  numberTextBottom: {
    color: "#6A534F",
    fontSize: normalize(14),
  },
  historyLabelText: {
    color: "#fab523",
    fontSize: normalize(12)
  },
  dateText: {
    color: "#fab523",
    fontSize: normalize(7),
    opacity: 0.5
  },
  historyReceiveText: {
    color: '#10BB1A',
    fontSize: normalize(12)
  },
  headerText: {
    color: "#fab523",
    fontSize: normalize(18)
  },
  buttonText: {},
});
