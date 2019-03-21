import React from 'react';
import { Loop, Stage, World, Body, Sprite } from 'react-game-kit/native';
import SafeAreaView from 'react-native-safe-area-view';
import SocketIOClient from 'socket.io-client';

import CONSTANTS from './Constants.js';
import {asyncStore, getFromAsyncStore, removeItemValue} from "./utils/AsyncStore.js";
import {context} from "./utils/Context.js";
import {makeRetry} from "./utils/Retry.js";

import Snek from './sprites/Snek.js';

import AreYouSureOverlay from './components/AreYouSureOverlay.js';
import ConfirmTxGameOverOverlay from './components/ConfirmTxGameOverOverlay.js';
import ConfirmTxOverlay from './components/ConfirmTxOverlay.js';
import CowOverlay from './components/CowOverlay.js';
import ErrorOverlay from './components/ErrorOverlay.js';
import GameOverOverlay from './components/GameOverOverlay.js';
import Homepage from './components/Homepage.js';
import Login from './components/Login.js';
import Loading from './components/Loading.js';
import LoadingOverlay from './components/LoadingOverlay.js';
import PauseOverlay from './components/PauseOverlay.js';
import PowerupOverlay from './components/PowerupOverlay.js';
import ScreenView from './components/ScreenView.js';
import SignUp from './components/Signup.js';
import SnakeTown from './components/SnakeTown.js';
import StartGameOverlay from './components/StartGameOverlay.js';
import Wallet from './components/Wallet.js';
import Profile from './components/Profile.js';

// import EditProfile from './components/EditProfile.js';
// import SuccessfulEdit from './components/SuccessfulEdit'
// import UnSuccessfulEdit from './components/UnsucecessfulEdit'
import ViewSponsor from './components/ViewSponsor.js';
import PurchasedTicket from './components/PurchasedTicket.js';
import Success from './components/Success.js';
import Fail from './components/Fail.js';

// components/ChangePassword.js
// components/EditProfile.js
//import GameOverview from './components/GameOverview.js'

// components/GameOverview.js
// components/Paused.js
// components/ViewSponsor.js

const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ['websocket'],
 };

var screens = { "GAME": 0, "HOME": 1, "LOADING": 2, "PREFERENCES": 3, "PROFILE": 4,
    "ACCOUNTHISTORY": 5, "GAMEHISTORY": 6, "LOGIN": 7, "SNAKETOWN": 8, "WALLET": 9, };
var overlays = {"PAUSE": 0, "GAMEOVER": 1, "MINE": 2, "AREYOUSURE": 3, "LOADING": 4,
    "CONFIRMTX": 5, "TRANSACTION": 6, "CONFIRMCONTRACT": 7, "POWERUPS": 8, "STARTGAME": 9,
    "ERROR": 10, "CONFIRMEXIT": 11,};
export default class App extends React.Component {
  constructor(props) {
    super(props);
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
      overlay: overlays.STARTGAME,
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
      loadingUser: true,
      errorTitle: "",
      errorParagraph: "",
    };
    this.loggedIn = this.loggedIn.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
    this.restart = this.restart.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.onSelectLevelPlayPress = this.onSelectLevelPlayPress.bind(this);
    this.onDoContract = this.onDoContract.bind(this);
    this.gameOverDoContract = this.gameOverDoContract.bind(this);
    this.onConfirmTxOk = this.onConfirmTxOk.bind(this);
  }
  async componentDidMount(){
    try{
      var response = await fetch(`${context.host}:${context.port}/getPrices`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
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
    } catch(err){
      console.log("there was an error retreiving prices.");
      console.log(err)
      this.genericNetworkError();
    }
  }
  genericNetworkError = () =>{
    this.setState({
      errorTitle: "Network error",
      errorParagraph: "There was an error connecting to the server. Please check your internet connection.",
      overlay: overlays.ERROR,
    })
  }
  loadUser = async(jwt) => {
    let prom = async() => {
      return await new Promise((resolve, reject) => {
        fetch(`${context.host}:${context.port}/getUser`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Authorization": "JWT " + jwt,
          },
        }).then(async(response) => {
          var resp = await response.json();
          if(!resp.error){
            if(resp) {
              resolve({loadingUser: false, user: resp})
            } else{
              alert("There was an error, no response.");
              resolve({loadingUser: false});
            }
          } else {
            alert(resp.error);
            resolve({loadingUser: false});
          }
        }).catch(err => {
          console.log("there was an error retreiving user.");
          console.log(err)
          reject(err);
        });
      });
    }
    try{
      let state = await prom();
      await this.setState(state);
      this.socket = SocketIOClient(`${context.host}:${context.socketPort}`, {
        //path: '/mypath',
        query: `pubkey=${this.state.user.pubkey}`,
      });
      this.socket.on('connect', () => {
        console.log('connected to server');
      });
      this.socket.on("MINED", async(txid) => {
        console.log("MiNED" + txid);
        let jwt = await getFromAsyncStore("jwt");
        this.loadUser(jwt);
      });
      console.log("SOCKET CREATED");
      console.log(`${context.host}:${context.socketPort}`);
    }catch(err){
      console.log("there was an error retreiving user.");
      console.log(err)
      this.genericNetworkError();
    }
  }

  async loggedIn(jwt) {
    //console.log("LoggedIn")
    await asyncStore("jwt", jwt);
    if(this.state.screen == screens.LOGIN){
      await this.setState({screen: screens.HOME});
    }
    this.loadUser(jwt);
  }
  onDpadChange = async(direction) => {
    if (direction != CONSTANTS.DPADSTATES.NONE && direction != this.state.pressedButton) {
      await this.setState({pressedButton: direction});
    }
  }
  doResetDpad = async() => {
    await this.setState({pressedButton: CONSTANTS.DPADSTATES.NONE});
  }
  onDied = async(score) => {
    await this.setState({running: false, overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    let data = {
      howmany: score,
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
            this.setState({overlay: overlays.GAMEOVER, gameOverInfo: gameOverInfo, loadingScore: false, user: resp.user, lastScore: resp.score});
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

  async onDoContract() {
    console.log("onDoContract")
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
        this.setState({overlay: -1});
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
      await this.setState({
        offerContract: false,
        overlay: overlays.CONFIRMTX,
        lastTxHash: resp.txhash,
        user: resp.user,
      });
    } else {
      alert("Error sending transaction");
      await this.setState({overlay: -1});
    }
  }

  onCancelConfirmContract = () => {
    this.setState({overlay: overlays.GAMEOVER});
  }
  onConfirmExit = () => {
    this.exit();
  }
  onCancelConfirmExit = () => {
    this.setState({overlay: overlays.PAUSE});
  }

  start() {
    this.setState({offerContract: true, running: true, overlay: -1});
  }
  restart() {
    this.setState({toggleReset: !this.state.toggleReset, overlay: overlays.STARTGAME});
  }
  pause() {
    this.setState({running: false, overlay: overlays.PAUSE});
  }
  exit = () => {
    this.setState({running: false, screen: screens.HOME, overlay: overlays.STARTGAME});
  }
  // exitWallet = () => {
  //   this.setState({running: false, screen: screens.HOME, overlay: overlays.STARTGAME});
  // }

  powerUps = () => {
    this.setState({running: false, overlay: overlays.POWERUPS});
  }
  wallet = () => {
    alert("wallet");
  }
  confirmQuit = () => {
    this.setState({overlay: overlays.CONFIRMEXIT});
  }
  onSelectLevel = (levelNumber) => {
    this.setState({ screen: screens.GAME, level: levelNumber });
  }
  onSelectLevelPlayPress() {
    this.setState({screen: screens.GAME});
  }
  gameOverDoContract() {
    this.setState({overlay: overlays.CONFIRMCONTRACT});
  }
  onConfirmTxOk() {
    this.setState({overlay: overlays.GAMEOVER});
    //this.setState({screen: screens.HOMEoverlay: -1});
  }
  onGoToTown = () => {
    this.setState({screen: screens.SNAKETOWN, overlay: -1});
  }
  onProfile = () => {
    this.setState({screen: screens.PROFILE, overlay: -1});
  }
  onWallet = () => {
    this.setState({screen: screens.WALLET, overlay: -1});
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
        <Login loggedIn={this.loggedIn}/>
        //<AccountHistory />
        //<ViewSponsor />
        //<PurchaseTicket />
        //<PurchasedTicket />
        //<Success />
        //<Fail />
        //<GameOverview />
        //<Paused/>
        //<EditProfile/>
        //<ChangePassword/>
      );
    }else if(this.state.screen == screens.WALLET){
      return (
        <Wallet user={this.state.user} exit={this.exit}/>
      );
    }else if(this.state.screen == screens.SIGNUP){
      return (
        <SignUp/>
      );
    }else if(this.state.screen == screens.PROFILE){
      return (
        <Profile loading={this.state.loadingUser} user={this.state.user} exit={this.exit}/>
      );
    }else if(this.state.screen == screens.SNAKETOWN){
      return (
        <SnakeTown exit={this.exit}/>
      );
    }else if(this.state.screen == screens.GAME){
      return (
        <ScreenView>
          <Loop>
            <Snek
              pressedButton={this.state.pressedButton}
              onDpadChange={this.onDpadChange}
              doResetDpad={this.doResetDpad}
              running={this.state.running}
              toggleReset={this.state.toggleReset}
              onDied={this.onDied}
              start={this.start}
              pause={this.pause}
              powerUps={this.powerUps}
              loading={this.state.loadingUser}
              user={this.state.user}
              level={this.state.level}>
            </Snek>
          </Loop>
          <PauseOverlay
            show={this.state.overlay == overlays.PAUSE}
            powerUps={this.powerUps}
            wallet={this.wallet}
            quit={this.confirmQuit}
            closeOverlay={this.closeOverlay}/>
          <GameOverOverlay
            show={this.state.overlay == overlays.GAMEOVER}
            closeOverlay={this.closeOverlay}
            gameOverInfo={this.state.gameOverInfo}
            miningPrice={this.state.prices.mineGamePrice}
            onDoContract={this.onDoContract}
            offerContract={this.state.offerContract}
            restart={this.restart}
            exit={this.exit} />
          <AreYouSureOverlay
            show={this.state.overlay == overlays.CONFIRMCONTRACT}
            text={`Pay ${(this.state.prices.mineGamePrice/CONSTANTS.WEIPERETH).toPrecision(4)} ETH for ${this.state.gameOverInfo.score} Snake Coins.\n\nAre you sure?`}
            onYes={this.onConfirmContract}
            onNo={this.onCancelConfirmContract}/>
          <AreYouSureOverlay
            show={this.state.overlay == overlays.CONFIRMEXIT}
            text={`Are you sure?`}
            onYes={this.onConfirmExit}
            onNo={this.onCancelConfirmExit}/>
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
          <PowerupOverlay
            closeOverlay={this.closeOverlay}
            show={this.state.overlay == overlays.POWERUPS}/>
          <StartGameOverlay
            show={this.state.overlay == overlays.STARTGAME}
            onStart={this.start}/>
          <ErrorOverlay
            closeOverlay={this.closeOverlay}
            show={this.state.overlay == overlays.ERROR}
            title={this.state.errorTitle}
            paragraph={this.state.errorParagraph}/>
          {/*<CowOverlay
            closeOverlay={this.closeOverlay}
            show={this.state.running}/>*/}
        </ScreenView>
      );
    }
  }
}
