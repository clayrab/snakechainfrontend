import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {Font} from 'expo';
import CONSTANTS from '../Constants.js';
import {context} from "../utils/Context.js";
import {createTransaction} from '../utils/Transactions.js';
import {normalize} from '../utils/FontNormalizer.js';
import {formatToken} from '../utils/uiHelperFunctions.js';
import {asyncStore, getFromAsyncStore, removeItem} from "../utils/AsyncStore.js";

import AreYouSureOverlay from '../components/AreYouSureOverlay.js';
import ConfirmTxOverlay from '../components/ConfirmTxOverlay.js';
import GameHistoryOverlay from '../components/GameHistoryOverlay.js';
import Header from '../components/Header.js';
import LoadingOverlay from '../components/LoadingOverlay.js';
import PowerupOverlay from '../components/PowerupOverlay.js';
import PurchaseTicketOverlay from '../components/PurchaseTicketOverlay.js';
import SelectLevelOverlay from '../components/SelectLevelOverlay.js';
import ScreenView from '../components/ScreenView.js';
import SnakeTown from '../components/SnakeTown.js';
import CowOverlay from '../components/CowOverlay.js';
import ReceiptOverlay from "./ReceiptOverlay";

let mineImages = [
  require('../assets/homepage/mine/mine0.png'),
  require('../assets/homepage/mine/mine10.png'),
  require('../assets/homepage/mine/mine20.png'),
  require('../assets/homepage/mine/mine30.png'),
  require('../assets/homepage/mine/mine40.png'),
  require('../assets/homepage/mine/mine50.png'),
  require('../assets/homepage/mine/mine60.png'),
  require('../assets/homepage/mine/mine70.png'),
  require('../assets/homepage/mine/mine80.png'),
  require('../assets/homepage/mine/mine90.png'),
  require('../assets/homepage/mine/mine100.png'),
]

var overlays = {
  "MINE": 0,
  "SELECTLEVEL": 1,
  "PURCHASETICKET": 2,
  "CONFIRMTICKET": 3,
  "LOADING": 4,
  "CONFIRMTX": 5,
  "POWERUPS": 6,
  "CONFIRMSNKDYNAMITE": 7,
  "CONFIRMETHDYNAMITE": 8,
  "RECEIPTOVERLAY": 9,
  "CONFIRMPOWERUPBUYOVERLAY": 10,
};
export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: null,
      loading: true,
      riffic: {display: "none",},
      confirmAmount: -1,
      confirmTokenType: "ETH",
      txKey: "",
      confirmPubkey: "",
      powerupsData: null
    };

  }

  static getDerivedStateFromProps(props, state) {
    if (props.user.name != "") {
      return {
        loading: false,
      };
    }
    return null;
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
      });
      this.setState({
        riffic: {
          fontFamily: 'riffic-free-bold',
        },
      });
    } catch (error) {
      alert(error);
    }
  }

  onMinePress = () => {
    this.setState({overlay: overlays.MINE});
  }
  onMineHaul = () => {
    this.setState({overlay: overlays.PURCHASETICKET});
  }
  onPlayPress = () => {
    this.setState({overlay: overlays.SELECTLEVEL});
  }
  onPurchaseTicketSelect = async (ticketType) => {
    console.log('onPurchaseTicketSelect')
    console.log(this.props.prices)
    try {
      if (ticketType == "ETH") {
        await this.setState({overlay: overlays.LOADING});
        let jwt = await getFromAsyncStore("jwt");
        let price = this.props.user.eggs*this.props.prices.mineHaulPrice;
        let txKey = await createTransaction(ticketType, price, jwt);
        this.setState({
          overlay: overlays.CONFIRMTICKET,
          confirmAmount: price,
          confirmTokenType: ticketType,
          txKey: txKey
        });
      } else {
        alert("Error. Ticket type must be ETH.")
      }
    } catch(err) {
      alert("There was an Error.\n" + err.toString());
    }
  }
  onConfirmTicket = async () => {
    console.log('onConfirmTicket')
    console.log(this.props.prices)
    console.log(this.props.user)
    await this.setState({overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    let price = this.props.user.eggs*this.props.prices.mineHaulPrice;
    var data = {
      txkey: this.state.txKey,
      type: this.state.confirmTokenType,
      amount: price,
      pin: "1111",
    };
    var response = await fetch(`${context.host}:${context.port}/mine`, {
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
      await this.props.doUpdateUser(resp.user);
      await this.setState({overlay: overlays.RECEIPTOVERLAY, lastTxHash: resp.txhash});
    } else {
      alert("Error sending transaction");
      await this.setState({overlay: -1});
    }
  }
  onCancelConfirm = () => {
    this.setState({overlay: overlays.PURCHASETICKET});
  }
  goToTown = () => {
    this.props.onGoToTown();
  }
  buySnkDynamite = async () => {
    try {
      let ticketType = "SNK"
      await this.setState({overlay: overlays.LOADING});
      let jwt = await getFromAsyncStore("jwt");
      let price = this.props.prices.tnt;
      let txKey = await createTransaction(ticketType, price, jwt);
      this.setState({
        overlay: overlays.CONFIRMSNKDYNAMITE,
        confirmAmount: price,
        confirmTokenType: ticketType,
        txKey: txKey
      });
    } catch(err) {
      alert("There was an Error.\n" + err.toString());
    }
  }
  // onConfirmDynamite = async () => {
  //   await this.setState({overlay: overlays.LOADING});
  //   let jwt = await getFromAsyncStore("jwt");
  //   let price = this.props.prices.tnt;
  //   let url = "/buyUpgradedMine";
  //   let data = {
  //     txkey: this.state.txKey,
  //     type: this.state.confirmTokenType,
  //     amount: this.state.confirmAmount,
  //   };
  //   var response = await fetch(`${context.host}:${context.port}${url}`, {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     body: JSON.stringify(data), // body data type must match "Content-Type" header
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //       "Authorization": "JWT " + jwt,
  //     },
  //   });
  //   var resp = await response.json();
  //   if (resp.error) {
  //     alert(resp.error);
  //     await this.setState({overlay: -1});
  //   } else if (resp.txhash) {
  //     await this.props.doUpdateUser(resp.user);
  //     this.setState({overlay: overlays.CONFIRMTX, lastTxHash: resp.txhash});
  //   } else {
  //     alert("Error sending transaction");
  //     console.log("transferSnek error")
  //     console.log(resp)
  //     await this.setState({overlay: -1});
  //   }
  // }
  // goToSelectLevel = () => {
  //   this.setState({overlay: overlays.SELECTLEVEL});
  // }
  // onCancelConfirmSnkDynamite = () => {
  //   this.setState({overlay: overlays.SELECTLEVEL});
  // }
  // onCancelConfirmEthDynamite = () => {
  //   this.setState({overlay: overlays.SELECTLEVEL});
  // }
  onPowerups = () => {
    this.setState({overlay: overlays.POWERUPS});
  }
  closeOverlay = () => {
    this.setState({overlay: -1});
  }

  createPowerupsTransaction = async (powerupsData = this.state.powerupsData) => {
    try {
      if (!powerupsData) return null;
      let jwt = await getFromAsyncStore("jwt");
      let txKey = await createTransaction("SNK", powerupsData.amount, jwt);
      this.setState({
        txKey: txKey,
        overlay: overlays.CONFIRMPOWERUPBUYOVERLAY
      });
    } catch(err) {
      alert("There was an Error.\n" + err.toString());
    }
  }

  buyPowerups = async () => {
    const {txKey} = this.state;
    const {amount, powerups} = this.state.powerupsData;
    const jwt = await getFromAsyncStore("jwt");
    const data = {
      type: "SNK",
      txkey: txKey,
      pin: "1111",
      amount,
      ...powerups
    };
    fetch(`${context.host}:${context.port}/buyPowerups`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "JWT " + jwt,
      },
    }).then(async (response) => {
      let resp = await response.json();
      if (!resp.error) {
        if (resp) {
          this.onBuyPowerupsSuccess(resp);
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
    })
      .finally(() => {
        this.setState({
          powerupsData: null
        })
      });
  }

  proceedToAcquire = (powerups, amount) => {
    const powerupsData = {powerups, amount};
    this.setState({powerupsData});
    this.createPowerupsTransaction(powerupsData)
  }

  onConfirmBuyPowerups = async () => {
    this.setState({overlay: overlays.LOADING});
    await this.buyPowerups();
  }

  onDeclineBuyPowerups = () => {
    this.setState({overlay: overlays.POWERUPS, powerupsData: null})
  }

  onBuyPowerupsSuccess = (resp) => {
    alert("Success. ");
    this.props.updatePowerups(resp.powerups.powerups)
    this.powerupsOverlay.initializePowerUpsCount();
    this.setState({overlay: -1});
  }

  render() {
    let mineGraphicIndex = 10 - Math.floor(10 * this.props.user.haul / this.props.prices.mineMax);
    mineGraphicIndex = mineGraphicIndex < 0 ? 0 : mineGraphicIndex; // if user hauls more than the mine max
    let mineTextColorStyle = {};
    if (mineGraphicIndex <= 6) {
      mineTextColorStyle = {color: "#fab523",}
    } else {
      mineTextColorStyle = {color: "#352927",}
    }
    let mineImg = mineImages[mineGraphicIndex];
    let minePercent = (100 - Math.floor((100 * this.props.user.haul / this.props.prices.mineMax)));
    // console.log("homepage render")
    // console.log(minePercent)
    // console.log(this.props.user)
    // console.log(this.props.user.haul)
    // console.log(this.props.prices.mineMax)
    minePercent = minePercent < 0.0 ? 0.0 : minePercent; // if user hauls more than the mine max
    if (minePercent >= 100.0) {
      minePercent = minePercent.toPrecision(3);
    } else if (minePercent < 10.0) {
      minePercent = minePercent.toPrecision(1);
    } else {
      minePercent = minePercent.toPrecision(2);
    }
    return (
      <ScreenView>
        <ImageBackground source={require('../assets/homepage/back.png')} style={styles.backgroundImage}>
          <Header loading={this.props.loading} user={this.props.user} onProfile={this.props.onProfile}
                  onWallet={this.props.onWallet}/>
          <View style={styles.contentHolder}>
            <View style={styles.contentTopMargin}></View>
            <View style={styles.contentTop}>
              <ImageBackground source={require('../assets/homepage/snakechain.png')}
                               style={styles.snakechain}></ImageBackground>
              <View style={styles.iconsHolder}>
                <TouchableOpacity onPress={this.props.onGoToTown}>
                  <ImageBackground source={require('../assets/homepage/town.png')}
                                   style={styles.town}></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPowerups}>
                  <ImageBackground source={require('../assets/homepage/powerups.png')}
                                   style={styles.powerups}></ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.contentBottom}>
              <TouchableOpacity style={styles.mine}
                                onPress={this.onMinePress}>
                {this.state.loading ? null :
                  <ImageBackground style={styles.mineImage} source={mineImg}>
                    <Text style={[mineTextColorStyle, styles.mineText, this.state.riffic, mineTextColorStyle]}>
                      {minePercent}%
                    </Text>
                  </ImageBackground>
                }
              </TouchableOpacity>
              <View style={styles.bottomIconsHolder}>
                <TouchableOpacity style={styles.playnow}
                                  onPress={this.onPlayPress}>
                  <ImageBackground style={styles.playnowImage} source={require('../assets/homepage/playNowButton.png')}>
                    <Text style={[styles.playnowText, this.state.riffic]}>Play Now</Text>
                  </ImageBackground>
                </TouchableOpacity>
                <ImageBackground source={require('../assets/homepage/snakeCart.png')}
                                 style={styles.snakeCart}></ImageBackground>
                <TouchableOpacity
                  onPress={this.onMineHaul}>
                  <ImageBackground source={require('../assets/homepage/gototownButton.png')}
                                   style={styles.gototownButton}>
                    <Text style={[styles.gototownText, this.state.riffic]}>
                      <Text
                        style={[styles.gototownText, this.state.riffic, {fontSize: normalize(20)}]}>{this.props.user.eggs}</Text> Eggs <Image
                      source={require('../assets/wallet/coin.png')} style={[styles.coin]}/>
                    </Text>
                    {/*<Text style={[styles.gototownText, this.state.riffic, {fontSize: normalize(11),}]}>Ship to Snakebank</Text>*/}
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ReceiptOverlay
            show={this.state.overlay == overlays.RECEIPTOVERLAY}
            user={this.props.user}
            prices={this.props.prices}
            transactionId={this.state.lastTxHash}
            //startMining={this.goToSelectLevel}
            closeOverlay={this.closeOverlay}
          />
          <GameHistoryOverlay show={this.state.overlay == overlays.MINE}
                              closeOverlay={this.closeOverlay}
                              user={this.props.user}
                              gototown={this.onMineHaul}
                              games={this.props.games}
                              prices={this.props.prices}/>
          <PurchaseTicketOverlay show={this.state.overlay == overlays.PURCHASETICKET}
                                 closeOverlay={this.closeOverlay}
                                 user={this.props.user}
                                 prices={this.props.prices}
                                 onSelectTicket={this.onPurchaseTicketSelect}
          />
          <AreYouSureOverlay
            show={this.state.overlay == overlays.CONFIRMTICKET}
            text={`Pay ${formatToken(this.state.confirmAmount, this.state.confirmTokenType)} ${this.state.confirmTokenType} for ${this.props.user.haul} Snake Coins.\n\nAre you sure?`}
            onYes={this.onConfirmTicket}
            onNo={this.onCancelConfirm}/>
          <LoadingOverlay show={this.state.overlay == overlays.LOADING}/>
          <ConfirmTxOverlay
            show={this.state.overlay == overlays.CONFIRMTX}
            transactionId={this.state.lastTxHash}
            onOk={this.closeOverlay}/>
          <PowerupOverlay
            ref={ref => this.powerupsOverlay = ref}
            user={this.props.user}
            closeOverlay={this.closeOverlay}
            proceedToAcquire={this.proceedToAcquire}
            prices={this.props.prices}
            show={this.state.overlay == overlays.POWERUPS}/>
          <CowOverlay
            closeOverlay={this.closeOverlay}
            show={false}/>
          <AreYouSureOverlay
            show={this.state.overlay == overlays.CONFIRMPOWERUPBUYOVERLAY}
            text={`Are you sure you want to buy these powerups?`}
            onYes={this.onConfirmBuyPowerups}
            onNo={this.onDeclineBuyPowerups}/>
          <SelectLevelOverlay show={this.state.overlay == overlays.SELECTLEVEL}
                              rushMode={true}
                              closeOverlay={this.closeOverlay}
                              user={this.props.user}
                              onSelectLevel={this.props.onSelectLevel}
                              // buyEthDynamite={this.buyEthDynamite}
                              // buySnkDynamite={this.buySnkDynamite}
            />
            {/*<SelectLevelOverlay show={this.state.overlay == overlays.SELECTLEVEL}
                                rushMode={true}
                                closeOverlay={this.closeOverlay}
                                user={this.props.user}
                                onSelectLevel={this.props.onSelectLevel}
                                buyEthDynamite={this.buyEthDynamite}
                                buySnkDynamite={this.buySnkDynamite}
            />*/}
        </ImageBackground>
      </ScreenView>
    );
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let titleBarHeight = screenWidth * .757 / 3.6;
let diff = screenHeight/screenWidth;
if(diff < 1.8) {
  // 16:9, 17:9, 21:9 are common.
  // 16/9 = 1.77777
  // 17/9 = 1.898888
  // 21/9 = 2.33333333333
  screenWidth = screenHeight * 9/17; // treat everything fatter than 17:9 as 17:9
}

let styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  contentHolder: {
    flex: 1,
    width: screenWidth,
  },
  contentTopMargin: {
    flex: 0.263,
  },
  contentTop: {
    flex: 1.610,
    flexDirection: "row",
    width: "100%",
  },
  contentBottom: {
    flex: 3.783,
    flexDirection: "row",
    width: "100%",
  },
  snakechain: {
    width: screenWidth * 1.65 / 3.6,
    aspectRatio: 1.65 / .917,
    marginLeft: screenWidth * .303 / 3.6,
  },
  iconsHolder: {
    marginLeft: screenWidth * .577 / 3.6,
    flexDirection: "column",
  },
  town: {
    // width: screenWidth*.860/3.6,
    // aspectRatio: .860/.750,
    width: screenWidth * .767 / 3.6,
    aspectRatio: .767 / .753,
  },
  powerups: {
    width: screenWidth * .767 / 3.6,
    aspectRatio: .767 / .753,
    marginTop: screenWidth * .117 / 3.6,
  },
  mine: {
    width: screenWidth * 1.317 / 3.6,
    aspectRatio: 1.317 / 3.047,
    marginLeft: screenWidth * .150 / 3.6,
  },
  mineImage: {
    flex: 1,
    width: screenWidth * 1.317 / 3.6,
    aspectRatio: 1.317 / 3.047,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mineText: {
    fontSize: normalize(16),
    paddingBottom: 90,
    paddingLeft: 20,
    textShadowColor: 'rgba(0, 0, 0, 1.00)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  },
  bottomIconsHolder: {
    flexDirection: "column",
  },
  playnow: {
    width: screenWidth * 1.787 / 3.6,
    aspectRatio: 1.787 / .612,
    marginLeft: screenWidth * .147 / 3.6,
    marginTop: screenWidth * .250 / 3.6,
  },
  playnowImage: {
    flex: 1,
    width: screenWidth * 1.787 / 3.6,
    aspectRatio: 1.787 / .612,
    justifyContent: 'center',
    alignItems: 'center'
  },
  snakeCart: {
    marginTop: screenWidth * .200 / 3.6,
    width: screenWidth * 1.950 / 3.6,
    aspectRatio: 606 / 702,
  },
  gototownButton: {
    marginTop: -screenWidth * .350 / 3.6,
    width: screenWidth * 1.950 / 3.6,
    aspectRatio: 502 / 168,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gototown: {
    width: screenWidth * .950 / 3.6,
    aspectRatio: 316 / 62,
  },
  gototownText: {
    color: "#fab523",
    fontSize: normalize(14),
    textShadowColor: 'rgba(0, 0, 0, 1.00)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  },
  playnowText: {
    //color: "#fab523",
    color: "#FEF75D",
    fontSize: normalize(24),
    textShadowColor: 'rgba(0, 0, 0, 1.00)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 1,
  },
  coin: {height: 15, width: 15 * 168 / 128, resizeMode: 'stretch',}
});
