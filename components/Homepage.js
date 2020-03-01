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

  onMinePress = () => {
    this.setState({overlay: overlays.MINE});
  }
  onMineHaul = () => {
    this.setState({overlay: overlays.PURCHASETICKET});
  }
  onPlayPress = () => {
    this.setState({overlay: overlays.SELECTLEVEL});
  }
  calculatePrice = () => {
    return (parseInt(this.props.user.eggs, 10) * parseInt(this.props.prices.minePerEggPrice, 10)) + parseInt(this.props.prices.mineHaulPrice, 10);
  }
  onPurchaseTicketSelect = async (ticketType) => {
    console.log('onPurchaseTicketSelect')
    console.log(this.props.prices)
    try {
      if (ticketType == "ETH") {
        await this.setState({overlay: overlays.LOADING});
        let jwt = await getFromAsyncStore("jwt");
        let price = this.calculatePrice();
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
    await this.setState({overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    let price = this.calculatePrice();
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
      await this.props.doUpdateUser(resp.user, resp.transactions);
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
  // buySnkDynamite = async () => {
  //   try {
  //     let ticketType = "SNK"
  //     await this.setState({overlay: overlays.LOADING});
  //     let jwt = await getFromAsyncStore("jwt");
  //     let price = this.props.prices.tnt;
  //     let txKey = await createTransaction(ticketType, price, jwt);
  //     this.setState({
  //       overlay: overlays.CONFIRMSNKDYNAMITE,
  //       confirmAmount: price,
  //       confirmTokenType: ticketType,
  //       txKey: txKey
  //     });
  //   } catch(err) {
  //     alert("There was an Error.\n" + err.toString());
  //   }
  // }
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
        alert("buy powerups error\n" + resp.error);
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
    // let mineGraphicIndex = 10 - Math.floor(10 * this.props.user.haul / this.props.prices.coinsPerEgg);
    // mineGraphicIndex = mineGraphicIndex < 0 ? 0 : mineGraphicIndex; // if user hauls more than the mine max
    // let mineTextColorStyle = {};
    // if (mineGraphicIndex <= 6) {
    //   mineTextColorStyle = {color: "#fab523",}
    // } else {
    //   mineTextColorStyle = {color: "#352927",}
    // }
    // let mineImg = CONSTANTS.mineImages[mineGraphicIndex];
    let minePercent = (Math.floor((100 * this.props.user.haul / this.props.prices.coinsPerEgg)));
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
          <Header loading={this.props.loading} transactions={this.props.transactions} user={this.props.user} onProfile={this.props.onProfile}
                  onWallet={this.props.onWallet}/>
          <View style={styles.contentHolder}>
            <View style={styles.contentTopMargin}></View>
            <View style={styles.contentTop}>
              <TouchableOpacity onPress={this.onPowerups} style={styles.powerupsHolder}>
                <ImageBackground source={require('../assets/homepage/powerups.png')} style={styles.powerups}></ImageBackground>
                <ImageBackground source={require('../assets/profile/imageHolder.png')} resizeMode={"stretch"} style={styles.powerupHolderBG}>
                  <View style={styles.powerupIconHolder}>
                    <Image source={require('../assets/graphics/gameplay/lemon.png')} style={[styles.powerupIconLemon, styles.powerupIcon]}/>
                    <Text style={[styles.gototownText, styles.powerupText]}>{this.props.user.powerups.yellowpowerup}</Text>
                  </View>
                  <View style={styles.powerupIconHolder}>
                    <Image source={require('../assets/graphics/gameplay/orange.png')} style={[styles.powerupIconOrange, styles.powerupIcon]}/>
                    <Text style={[styles.gototownText, styles.powerupText]}>{this.props.user.powerups.orangepowerup}</Text>
                  </View>
                  <View style={styles.powerupIconHolder}>
                    <Image source={require('../assets/graphics/gameplay/strawberry.png')} style={[styles.powerupIconStrawberry, styles.powerupIcon]}/>
                    <Text style={[styles.gototownText, styles.powerupText]}>{this.props.user.powerups.redpowerup}</Text>
                  </View>
                  <View style={styles.powerupIconHolder}>
                    <Image source={require('../assets/graphics/gameplay/blueberry.png')} style={[styles.powerupIconBlueberry, styles.powerupIcon]}/>
                    <Text style={[styles.gototownText, styles.powerupText]}>{this.props.user.powerups.bluepowerup}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={styles.contentMid}>
              {/*<Text style={[styles.gototownText, styles.mine]}>
                <Text
                  style={[styles.gototownText, {fontSize: normalize(20)}]}>{this.props.user.eggs}</Text> Ore
              </Text>
                <TouchableOpacity style={styles.mine}
                                  onPress={this.onMinePress}>
                  {this.state.loading ? null :
                    <ImageBackground style={styles.mineImage} source={mineImg}>
                      <Text style={[mineTextColorStyle, styles.mineText, mineTextColorStyle]}>
                        {minePercent}%
                      </Text>
                    </ImageBackground>
                  }
                </TouchableOpacity>
                <ImageBackground source={require('../assets/gameover/collectgoldback.png')} style={styles.oreBG}>
                </ImageBackground>

              <ImageBackground source={require('../assets/gamehistory/trackBgNoSnake.png')} style={styles.snakeCart}>
                <TouchableOpacity style={styles.mine} onPress={this.onMinePress}>
                  <ImageBackground source={require('../assets/homepage/snakeCart.png')} style={styles.snakeCart}></ImageBackground>
                </TouchableOpacity>
              </ImageBackground>  */}
              <Text style={[styles.gototownText, styles.oreText]}>{this.props.user.eggs} Carts of Ore</Text>
              <TouchableOpacity onPress={this.onMineHaul} style={styles.gototownButtonHolder}>
                <ImageBackground source={require('../assets/homepage/gototownButton.png')} style={styles.gototownButton}>
                  <Text style={[styles.gototownText]}>
                    <Text style={[styles.gototownText, {fontSize: normalize(20)}]}>Refine</Text>
                  </Text>
                  {/*<Text style={[styles.gototownText, {fontSize: normalize(11),}]}>Ship to Snakebank</Text>*/}
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mineButtonStyle} onPress={this.onMinePress}>
                <Text style={[styles.gototownText, styles.oreText2]}>Next Cart: {minePercent}%</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentBottom}>
              <ImageBackground source={require('../assets/graphics/character/2.png')} style={styles.characterStyle}></ImageBackground>
              <TouchableOpacity style={[styles.playnow, {}]}
                                onPress={this.onPlayPress}>
                <ImageBackground style={styles.playnowImage} source={require('../assets/homepage/playNowButton.png')}>
                  <Text style={[styles.playnowText]}>Play Now</Text>
                </ImageBackground>
              </TouchableOpacity>
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
                                 calculatePrice={this.calculatePrice}
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
    alignItems: "center",
    justifyContent: "center",
    flex: 1.200,
    flexDirection: "row",
    width: "100%",
  },
  powerupsHolder: {
    width: "100%",
    flexDirection: "row",
    paddingTop: screenWidth * .117 / 3.6,
    justifyContent: "center",
    alignItems: "center",
  },
  powerups: {
    height: screenWidth * .767 / 3.6,
    aspectRatio: .767 / .753,
  },
  powerupHolderBG: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: screenWidth * .767/3.6,
    aspectRatio: .2/.07,
    paddingLeft: screenWidth * .2/3.6,
    paddingRight: screenWidth * .2/3.6,
    marginLeft: "2%",
  },
  powerupIconHolder: {
    paddingTop: "23%",
    paddingBottom: "23%",
    flexDirection: "column",
    alignItems: "center",
    flex: 1.0,
  },
  powerupIcon: {
    resizeMode: "contain",
    //height: "80%",
    flex: 1.0,
    //backgroundColor: "#ff0000",
  },
  powerupText: {
    paddingTop: 2,
    fontSize: normalize(14),
    flex: 0.6,
    //backgroundColor: "#00ff00",
  },
  contentMid: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1.800,
    flexDirection: "column",
    width: "100%",
  },
  oreText: {
    fontSize: normalize(30),
  },
  oreText2: {
    fontSize: normalize(24),
  },
  oreCount: {
    height: screenWidth * .050 / 3.6,
  },
  mineButtonStyle: {
    marginTop: screenWidth * .020 / 3.6,

  },
  contentBottom: {
    alignItems: "center",
    justifyContent: "center",
    flex: 3.600,
    flexDirection: "column",
    width: "100%",
    paddingBottom: screenWidth * 0.25 / 3.6,
  },
  snakeCart: {
    width: screenWidth * 1.250 / 3.6,
    aspectRatio: 2138 / 2128,
  },
  characterStyle: {
    //backgroundColor: "#ff00ff",
    //marginTop: screenWidth * .200 / 3.6,
    width: screenWidth * 1.950 / 3.6,
    aspectRatio: 2138 / 2128,
  },
  playnow: {
    marginTop: screenWidth * 0.05 / 3.6,
    width: screenWidth * 1.787 / 3.6,
    aspectRatio: 1.787 / .612,
  },
  playnowImage: {
    width: screenWidth * 1.787 / 3.6,
    aspectRatio: 1.787 / .612,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playnowText: {
    //color: "#fab523",
    color: "#FEF75D",
    fontSize: normalize(24),
    textShadowColor: 'rgba(0, 0, 0, 1.00)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 1,
    fontFamily: 'riffic-free-bold',
  },
  coin: {
    height: 15, width: 15 * 168 / 128, resizeMode: 'stretch',
  },
  gototownButtonHolder: {

  },
  gototownButton: {
    //marginTop: screenWidth * .050 / 3.6,
    width: screenWidth * 1.2 / 3.6,
    aspectRatio: 502 / 168,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // gototown: {
  //   width: screenWidth * .950 / 3.6,
  //   aspectRatio: 316 / 62,
  // },
  gototownText: {
    color: "#fab523",
    fontSize: normalize(14),
    textShadowColor: 'rgba(0, 0, 0, 1.00)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
    fontFamily: 'riffic-free-bold',
  },

  // powerupIconBG2: {
  //   width: screenWidth * .4 / 3.6,
  //   aspectRatio: .384/.353,
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // powerupIconBG: {
  //   width: screenWidth * .4 / 3.6,
  //   //aspectRatio: .149/.163,
  //   aspectRatio: .612/.602,
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // mineStyle: {
  //   width: screenWidth * 1.317 / 3.6,
  //   aspectRatio: 1.317 / 3.047,
  //   marginLeft: screenWidth * .150 / 3.6,
  // },
  // mineImage: {
  //   flex: 1,
  //   width: screenWidth * 1.317 / 3.6,
  //   aspectRatio: 1.317 / 3.047,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // mineText: {
  //   fontSize: normalize(16),
  //   paddingBottom: 90,
  //   paddingLeft: 20,
  //   textShadowColor: 'rgba(0, 0, 0, 1.00)',
  //   textShadowOffset: {width: -1, height: 1},
  //   textShadowRadius: 1,
  //   fontFamily: 'riffic-free-bold',
  // },
  // bottomIconsHolder: {
  //   flexDirection: "column",
  //   justifyContent: 'flex-start',
  //   backgroundColor: "#00ffff",
  //   //alignItems: 'flex-start'
  // },

});
