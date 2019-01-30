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

import AreYouSureOverlay from '../components/AreYouSureOverlay.js';
import ConfirmTxOverlay from '../components/ConfirmTxOverlay.js';
import GameHistoryOverlay from '../components/GameHistoryOverlay.js';
import LoadingOverlay from '../components/LoadingOverlay.js';
import PowerupOverlay from '../components/PowerupOverlay.js';
import PurchageATicketOverlay from '../components/PurchageATicketOverlay.js';
import SelectLevelOverlay from '../components/SelectLevelOverlay.js';
import SnakeTown from '../components/SnakeTown.js';

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
var overlays = { "MINE": 0, "SELECTLEVEL": 1, "PURCHASETICKET": 2, "CONFIRMTICKET": 3, "LOADING": 4, "CONFIRMTX": 5, "POWERUPS": 6, };
export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: -1,
      loading: true,
      mineTextStyle: { display: "none",},
      titleBarTextStyle: { display: "none",},
      confirmAmount: -1,
      confirmTokenType: "ETH",
      txKey: "",
    };
    this.closeOverlay = this.closeOverlay.bind(this);
    // this.onConfirm = this.onConfirm.bind(this);
    // this.onCancelConfirm = this.onCancelConfirm.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    //let ethBal = (props.user.eth/CONSTANTS.WEIPERETH).toPrecision(4);
    if(props.user.name != "") {
      return {
        loading: false,
      };
    }
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
  onMinePress = () => {
    this.setState({overlay: overlays.MINE });
  }
  onMineHaul = () => {
    this.setState({overlay: overlays.PURCHASETICKET });
  }
  onPlayPress = () => {
    this.setState({overlay: overlays.SELECTLEVEL });
  }
  onPurchaseTicketSelect = async(ticketType) => {
    if(ticketType == "ETH" || ticketType == "SNK") {
      await this.setState({overlay: overlays.LOADING});
      let jwt = await getFromAsyncStore("jwt");
      let price = this.props.prices.mineGamePrice;
      if(ticketType == "SNK") {
        price = this.props.prices.mineHaulPrice;
      }
      let data = {
        amount: price,
        type: ticketType,
      };
      fetch(`${context.host}:${context.port}/createTransaction`, {
        method: "POST",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
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
                overlay: overlays.CONFIRMTICKET,
                confirmAmount: price,
                confirmTokenType: ticketType,
                txKey: resp.transactionKey
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
          resolve({loading: false});
        }
      }).catch(err => {throw err});
    } else {
      alert("Error. Ticket type must be ETH or SNK.")
    }
  }
  onConfirm = async() => {
    await this.setState({overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    //var data = { user: this.state.username, pw: this.state.pw };
    let price = this.props.prices.mineGamePrice;
    let url = "/mine"
    if(this.state.confirmTokenType == "SNK") {
      price = this.props.prices.minehaulPrice;
      url = "/mineWithSnek"
    }
    var data = {
      txkey: this.state.txKey,
      type: this.state.confirmTokenType,
      amount: this.state.confirmAmount,
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
  onCancelConfirm = () => {
    this.setState({overlay: overlays.PURCHASETICKET });
  }
  onConfirmTxOk = () => {
    this.setState({overlay: -1 });
  }
  goToTown = () => {
    this.props.onGoToTown();
  }
  onPowerups = () => {
    console.log("onPowerups")
    this.setState({overlay: overlays.POWERUPS });
  }
  closeOverlay() {
    this.setState({overlay: -1});
  }
  render() {
    let mineGraphicIndex = Math.floor(10*this.props.user.haul/this.props.user.mineMax);
    let mineTextColorStyle = {};
    if(mineGraphicIndex > 6){
      mineTextColorStyle = { color: "#6A534F", }
    }
    let mineImg = mineImages[mineGraphicIndex];
    let minePercent = (100*this.props.user.haul/this.props.user.mineMax).toPrecision(2);
    if(this.props.user.haul == this.props.user.mineMax){
        minePercent = 100;
    }
    return (
      <SafeAreaView style={styles.screen}>
        <ImageBackground source={require('../assets/homepage/back.png')} style={styles.backgroundImage}>
          /***** TITLE BAR START *****/
          <ImageBackground source={require('../assets/homepage/titleback.png')} style={styles.titleBar}>
            <TouchableOpacity style={styles.optionsTouchable} onPress={this.props.onProfile}>
              <ImageBackground source={require('../assets/homepage/options.png')} style={styles.optionsIcon}>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.onWallet}>
              <ImageBackground source={require('../assets/homepage/coinbox.png')} style={styles.coinBox}>
                <View style={styles.titleBarSnekTextHolder}>
                  <View style={styles.top}></View>
                  {this.state.loading ? null :
                    <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.titleBarText, this.state.titleBarTextStyle]}>
                      {this.props.user.snek}
                    </Text>
                  }
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.onWallet}>
              <ImageBackground source={require('../assets/homepage/ethbox.png')} style={styles.coinBox}>
                <View style={styles.titleBarEthTextHolder}>
                  {this.state.loading ? null :
                    <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.titleBarText, this.state.titleBarTextStyle]}>
                      {(this.props.user.eth/CONSTANTS.WEIPERETH).toPrecision(4)}
                    </Text>
                  }
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </ImageBackground>
          /***** TITLE BAR END *****/
          <View style={styles.contentHolder}>
            <View style={styles.contentTopMargin}></View>
            <View style={styles.contentTop}>
              <ImageBackground source={require('../assets/homepage/snakechain.png')} style={styles.snakechain}></ImageBackground>
              <View style={styles.iconsHolder}>
                <TouchableOpacity onPress={this.props.onGoToTown}>
                  <Text style={styles.profile}>Town</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPowerups}>
                  <ImageBackground source={require('../assets/homepage/powerups.png')} style={styles.powerups}></ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.contentBottom}>
              <TouchableOpacity style={styles.mine}
                onPress={this.onMinePress}>
                {this.state.loading ? null :
                  <ImageBackground style={styles.mineImage} source={mineImg}>
                    <Text style={[styles.mineText, this.state.mineTextStyle, mineTextColorStyle]}>
                      {minePercent}%
                    </Text>
                  </ImageBackground>
                }
              </TouchableOpacity>
              <View style={styles.bottomIconsHolder}>
                <TouchableOpacity style={styles.playnow}
                  onPress={this.onPlayPress}>
                  <Image style={styles.playnowImage} source={require('../assets/homepage/playnow.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.onMineHaul}>
                  <ImageBackground source={require('../assets/homepage/gototown.png')} style={styles.gototown}></ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <GameHistoryOverlay show={this.state.overlay == overlays.MINE}
            closeOverlay={this.closeOverlay}
            user={this.props.user} />
          <SelectLevelOverlay show={this.state.overlay == overlays.SELECTLEVEL}
            closeOverlay={this.closeOverlay}
            onSelectLevel={this.props.onSelectLevel}/>
          <PurchageATicketOverlay show={this.state.overlay == overlays.PURCHASETICKET}
            closeOverlay={this.closeOverlay}
            user={this.props.user}
            prices={this.props.prices}
            onSelectTicket={this.onPurchaseTicketSelect}
            />
          <AreYouSureOverlay
            show={this.state.overlay == overlays.CONFIRMTICKET}
            text={`Pay ${this.state.confirmAmount} ${this.state.confirmTokenType} for ${this.props.user.haul} Snake Coins.\n\nAre you sure?`}
            onYes={this.onConfirm}
            onNo={this.onCancelConfirm}/>
          <LoadingOverlay show={this.state.overlay == overlays.LOADING}/>
          <ConfirmTxOverlay
            show={this.state.overlay == overlays.CONFIRMTX}
            transactionId={this.state.lastTxHash}
            onOk={this.onConfirmTxOk}/>
          <PowerupOverlay
            closeOverlay={this.closeOverlay}
            show={this.state.overlay == overlays.POWERUPS}/>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
let screenWidth = require('Dimensions').get('window').width;
let titleBarHeight = screenWidth*.757/3.6;
let styles = StyleSheet.create({
  screen: {
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  titleBar: {
    flex: 0,
    width: screenWidth,
    height: titleBarHeight,
    flexDirection: "row",
  },
  optionsTouchable: {
    flex: 0,
    width: "15.55555555%",
    marginTop: titleBarHeight*.06/.757,
    marginLeft: screenWidth*.157/3.6,
    //backgroundColor: "#333333",
    aspectRatio: 1,
  },
  optionsIcon: {
    aspectRatio: 1,
    resizeMode: "contain",
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
    marginTop: titleBarHeight*.170/.757,
    marginLeft: screenWidth*.103/3.6,
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
  contentHolder: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
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
    width: screenWidth*1.65/3.6,
    aspectRatio: 1.65/.917,
    marginLeft: screenWidth*.303/3.6,
  },
  iconsHolder: {
    marginLeft: screenWidth*.577/3.6,
    flexDirection: "column",
  },
  profile: {
    width: screenWidth*.860/3.6,
    aspectRatio: .860/.750,
  },
  powerups: {
    width: screenWidth*.767/3.6,
    aspectRatio: .767/.753,
    marginTop: screenWidth*.117/3.6,
  },
  mine: {
    width: screenWidth*1.317/3.6,
    aspectRatio: 1.317/3.047,
    marginLeft: screenWidth*.150/3.6,
  },
  mineImage: {
    flex: 1,
    width: screenWidth*1.317/3.6,
    aspectRatio: 1.317/3.047,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mineText: {
    fontSize: 18,
    paddingBottom: 90,
    paddingLeft: 20,
  },
  bottomIconsHolder: {
    flexDirection: "column",
  },
  playnow: {
    width: screenWidth * 1.787/3.6,
    aspectRatio: 1.787/.612,
    marginLeft: screenWidth*.147/3.6,
    marginTop: screenWidth*.270/3.6,
  },
  playnowImage: {
    flex: 1,
    width: screenWidth * 1.787/3.6,
    aspectRatio: 1.787/.612,
    resizeMode: "contain",
  },
  gototown: {
    width: screenWidth*1.950/3.6,
    aspectRatio: 1.950/2.547,
    marginTop: screenWidth*.220/3.6,
  },
});
