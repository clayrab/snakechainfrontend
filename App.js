import React from 'react';
import { Loop, Stage, World, Body, Sprite } from 'react-game-kit/native';
import SafeAreaView from 'react-native-safe-area-view';
import SocketIOClient from 'socket.io-client';

import CONSTANTS from './Constants.js';
import {asyncStore, getFromAsyncStore, removeItemValue} from "./utils/AsyncStore.js";
import {context} from "./utils/Context.js";
import {makeRetry} from "./utils/Retry.js";

import Dpad from './sprites/Dpad.js';
import Buttons from './sprites/Buttons.js';
import Board from './sprites/Board.js';
import Snek from './sprites/Snek.js';

//import AccountHistory from './components/AccountHistory.js';
import AreYouSureOverlay from './components/AreYouSureOverlay.js';
import ConfirmTxGameOverOverlay from './components/ConfirmTxGameOverOverlay.js';
import ConfirmTxOverlay from './components/ConfirmTxOverlay.js';
//import DoMineOverlay from './components/DoMineOverlay.js';
import GameOverOverlay from './components/GameOverOverlay.js';
import Homepage from './components/Homepage.js';
import Login from './components/Login.js';
import Loading from './components/Loading.js';
import LoadingOverlay from './components/LoadingOverlay.js';
import PauseOverlay from './components/PauseOverlay.js';
import SnakeTown from './components/SnakeTown.js';
import SignUp from './components/Signup.js';
import Wallet from './components/Wallet.js';
import Profile from './components/Profile.js';
import SelectLevel from './components/SelectLevel.js';
import SnakeMine from './components/SnakeMine.js';
//import Withdraw from './components/Withdraw.js';


const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ['websocket'],
 };

var screens = { "GAME": 0, "HOME": 1, "LOADING": 2, "WALLET": 3, "PREFERENCES": 4, "PROFILE": 5, "ACCOUNTHISTORY": 6, "GAMEHISTORY": 7, "LOGIN": 8, "SNAKETOWN": 9, "WALLET": 10, };
var overlays = {"PAUSE": 0, "GAMEOVER": 1, "DOMINE": 2, "DOMINEFREE": 3, "MINE": 4, "AREYOUSURE": 5, "LOADING": 6, "CONFIRMTX": 7, "TRANSACTION": 8, "CONFIRMCONTRACT": 9 };
export default class App extends React.Component {
  constructor(props) {
    super(props);
    //this.socket = SocketIOClient('http://{context.host}:3002');
    //this.socket = SocketIOClient('http://192.168.1.5:3002');
    this.socket = SocketIOClient(`{context.host}:{context.socketPort}`);
    //this.socket = SocketIO('http://localhost:3000',connectionConfig);
    this.socket.on('connect', () => {
      console.log('connected to server');
    });
    this.socket.on("FromAPI", (secs) => {
      console.log(secs);
    })
    var board = [];
    this.state = {
      user: {
        eth: 0,
        snek: 0,
        pubkey: "",
        name: "",
        unredeemed: 0,
        mineMax: 1000,
        haul: 0,
        gamecount: 0,
        totalhaul: 0,
      },
      running: false,
      screen: screens.LOGIN,
      pressedButton: CONSTANTS.DPADSTATES.UP,
      toggleReset: true,
      lastScore: -1,
      unredeemedSnekBalance: -1,
      snekBalance: -1,
      ethBalance: -1,
      //miningPrice: -1,
      prices: {
        mineGamePrice: -1,
        mineHaulPrice: -1,
        powerupPrice: -1,
        lvlsnkPrice: -1,
        lvlethPrice: -1,
        gasPrice: -1,
      },
      gameOverInfo: {
        score: 0,
        level: 0,
        time: 0,
      },
      lastTxHash: "",
      confirmAmount: -1,
      confirmTokenType: "ETH",
      txKey: "",
      offerContract: true,
    };
    this.loggedIn = this.loggedIn.bind(this);
    this.onDpadChange = this.onDpadChange.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
    this.restart = this.restart.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.onSelectLevelPlayPress = this.onSelectLevelPlayPress.bind(this);
    this.onSelectLevel = this.onSelectLevel.bind(this);
    this.onDoContract = this.onDoContract.bind(this);
    this.onDontDoContract = this.onDontDoContract.bind(this);
    this.gameOverDoContract = this.gameOverDoContract.bind(this);
    this.onConfirmTxOk = this.onConfirmTxOk.bind(this);
  }
  async componentDidMount(){
    var response = await fetch(`${context.host}:${context.port}/getPrices`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
          //"Content-Type": "application/json; charset=utf-8",
          "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    var resp = await response.json();
    if(resp.error){
      alert(resp.error);
    }else if(resp.prices) {
      this.setState({prices: resp.prices});
    } else {
      alert("error retrieving prices");
    }
  }
  async loggedIn(jwt) {
    //console.log("LoggedIn")
    await asyncStore("jwt", jwt);
    if(this.state.screen == screens.LOGIN){
      this.setState({screen: screens.HOME});
    }
    let prom = async() => {
      return await new Promise((resolve, reject) => {
        //console.log("getuser")
        fetch(`${context.host}:${context.port}/getUser`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              //"Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "JWT " + jwt,
          },
        }).then(async(response) => {
          var resp = await response.json();
          if(!resp.error){
            if(resp) {
              //console.log("set user")
              resolve({loading: false, user: resp})
            } else{
              alert("There was an error, no response.");
              resolve({loading: false});
            }
          } else {
            alert(resp.error);
            resolve({loading: false});
          }
        }).catch(err => {throw err});
      }).catch(err => {throw err});
    }
    let state = await makeRetry("getUser!")(1500, prom);
    this.setState(state);
  }
  onDpadChange(direction) {
    if (direction != CONSTANTS.DPADSTATES.NONE && direction != this.state.pressedButton) {
      this.setState({pressedButton: direction});
    }
  }
  onDied = async(score) => {
    await this.setState({running: false, overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    let data = {
      howmany: 0,
      level: 1,
    };
    fetch(`${context.host}:${context.port}/recordScore`, {
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
          if(resp.status == "OK") {
            let gameOverInfo = {
              score: score,
              level: 1,
              time: 5*60,
            }
            this.setState({overlay: overlays.GAMEOVER, gameOverInfo: gameOverInfo, loading: false, user: resp.user, lastScore: resp.score});
          } else {
            alert("There was an error, malformed response.");
            this.setState({overlay: -1});
          }
        } else{
          alert("There was an error, no response.");
          this.setState({overlay: -1});
        }
      } else {
        alert("Unknown error: " + resp.error);
        this.setState({overlay: -1});
      }
    }).catch(err => {throw err});
  }
  start() {
    this.setState({offerContract: true, running: true});
  }
  restart() {
    this.setState({toggleReset: !this.state.toggleReset, overlay: -1});
  }
  pause() {
    this.setState({running: false, overlay: overlays.PAUSE});
  }
  exit = () => {
    this.setState({running: false, screen: screens.HOME, overlay: -1});
  }
  onPausePress(){
    this.setState({running: false, overlay: overlays.PAUSE});
  }
  async onSelectLevel(levelNumber) {
    this.setState({screen: screens.GAME, level: levelNumber});
  }
  onSelectLevelPlayPress() {
    this.setState({screen: screens.GAME});
  }
  async onDoContract() {
    await this.setState({overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    let price = this.state.prices.mineGamePrice;
    let data = {
      amount: price,
      type: "ETH",
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
              overlay: overlays.CONFIRMCONTRACT,
              confirmAmount: price,
              confirmTokenType: "ETH",
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
  }
  onConfirmContract = async() => {
    await this.setState({overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    let price = this.state.prices.mineGamePrice;
    var data = {
      txkey: this.state.txKey,
      type: "ETH",
      amount: price,
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
    if(resp.error){
      alert(resp.error);
      await this.setState({overlay: -1});
    }else if(resp.txhash) {
      await this.setState({offerContract: false, overlay: overlays.CONFIRMTX, lastTxHash: resp.txhash});
    } else {
      alert("Error sending transaction");
      await this.setState({overlay: -1});
    }
  }

  onDontDoContract() {
    this.setState({overlay: overlays.GAMEOVER});
  }
  onCancelConfirmContract = () => {
    this.setState({overlay: overlays.AREYOUSURE});
  }
  gameOverDoContract() {
    this.setState({overlay: overlays.AREYOUSURE});
  }
  onConfirmTxOk() {
    this.setState({overlay: overlays.GAMEOVER});
    //this.setState({screen: screens.HOMEoverlay: -1});
  }
  onGoToTown = () => {
    this.setState({screen: screens.SNAKETOWN, overlay: -1});
  }
  // onWallet = () => {
  //   this.setState({screen: screens.WALLET, overlay: -1});
  // }
  onProfile = () => {
    this.setState({screen: screens.PROFILE, overlay: -1});
  }
  closeOverlay() {
    this.setState({running: true, overlay: -1});
  }

  render() {
    if(this.state.screen == screens.HOME){
      return (
        <Homepage
          user={this.state.user}
          prices={this.state.prices}
          onSelectLevel={this.onSelectLevel}
          onGoToTown={this.onGoToTown}
          onWallet={this.onWallet}
          onProfile={this.onProfile}
          >
        </Homepage>
      );
    }else if(this.state.screen == screens.LOGIN){
      return (
        <Login loggedIn={this.loggedIn}></Login>
      );
    }else if(this.state.screen == screens.SIGNUP){
      return (
        <SignUp/>
      );
    }else if(this.state.screen == screens.PROFILE){
      return (
        <Profile loading={this.state.loading} user={this.state.user} exit={this.exit}/>
      );
    // }else if(this.state.screen == screens.WALLET){
    //   return (
    //     <Wallet exit={this.exit}/>
    //   );
    }else if(this.state.screen == screens.SNAKETOWN){
      return (
        <SnakeTown exit={this.exit}/>
      );
    }else if(this.state.screen == screens.GAME){
      return (
        <SafeAreaView>
          <Loop>
            <Board/>
            <Snek
              pressedButton={this.state.pressedButton}
              snekSpeed={0.10}
              running={this.state.running}
              toggleReset={this.state.toggleReset}
              onDied={this.onDied}>
            </Snek>
            <Buttons running={this.state.running} start={this.start} pause={this.pause}></Buttons>
            <Dpad onDpadChange={this.onDpadChange} pressedButton={this.state.pressedButton}></Dpad>
          </Loop>
          <PauseOverlay
            show={this.state.overlay == overlays.PAUSE}
            closeOverlay={this.closeOverlay}/>
          <GameOverOverlay
            show={this.state.overlay == overlays.GAMEOVER}
            closeOverlay={this.closeOverlay}
            gameOverInfo={this.state.gameOverInfo}
            miningPrice={this.state.prices.mineGamePrice}
            onDoContract={this.gameOverDoContract}
            offerContract={this.state.offerContract}
            restart={this.restart}
            exit={this.exit} />
          <AreYouSureOverlay
            show={this.state.overlay == overlays.AREYOUSURE}
            text={`Pay ${(this.state.prices.mineGamePrice/CONSTANTS.WEIPERETH).toPrecision(4)} ETH for ${this.state.gameOverInfo.score} Snake Coins.\n\nAre you sure?`}
            onYes={this.onDoContract}
            onNo={this.onDontDoContract}/>
          <AreYouSureOverlay
            show={this.state.overlay == overlays.CONFIRMCONTRACT}
            text={`Pay ${this.state.confirmAmount} ${this.state.confirmTokenType} for ${this.state.user.haul} Snake Coins.\n\nAre you sure?`}
            onYes={this.onConfirmContract}
            onNo={this.onCancelConfirmContract}/>
          <LoadingOverlay
            show={this.state.overlay == overlays.LOADING}/>
          <ConfirmTxOverlay
            show={this.state.overlay == overlays.CONFIRMTX}
            transactionId={this.state.lastTxHash}
            onOk={this.onConfirmTxOk}/>
          <ConfirmTxGameOverOverlay
            show={this.state.overlay == overlays.TRANSACTION}
            gameOverInfo={this.state.gameOverInfo}
            restart={this.restart}
            exit={this.exit} />
        </SafeAreaView>
      );
    }
  }
}
