import React from 'react';
import { Loop, Stage, World, Body, Sprite } from 'react-game-kit/native';
import SafeAreaView from 'react-native-safe-area-view';
import SocketIOClient from 'socket.io-client';

import CONSTANTS from './Constants.js';
import {asyncStore, getFromAsyncStore, removeItemValue} from "./utils/AsyncStore.js";
import {context} from "./utils/Context.js";

import Dpad from './sprites/Dpad.js';
import Buttons from './sprites/Buttons.js';
import Board from './sprites/Board.js';
import Snek from './sprites/Snek.js';

import Homepage from './components/Homepage.js';
import PauseOverlay from './components/PauseOverlay.js';
import GameOverOverlay from './components/GameOverOverlay.js';
import SelectLevel from './components/SelectLevel.js';
import Wallet from './components/Wallet.js';
import Withdraw from './components/Withdraw.js';
import AccountHistory from './components/AccountHistory.js';
import GameHistory from './components/GameHistory.js';
import SnakeMine from './components/SnakeMine.js';
import Login from './components/Login.js';
import Loading from './components/Loading.js';
import DoMineOverlay from './components/DoMineOverlay.js';

const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ['websocket'], // you need to explicitly tell it to use websockets
 };

var screens = { "GAME": 0, "HOME": 1, "SELECTLEVEL": 2, "WALLET": 3, "PREFERENCES": 4, "PROFILE": 5, "ACCOUNTHISTORY": 6, "GAMEHISTORY": 7, "LOGIN": 8 , "LOADING": 9 };
var overlays = {"PAUSE": 0, "GAMEOVER": 1, "DOMINE": 2, "DOMINEFREE": 3, "MINE": 4};
export default class App extends React.Component {
  constructor(props) {
    super(props);
    //this.socket = SocketIOClient('http://{context.host}:3002');
    this.socket = SocketIOClient('http://192.168.1.5:3002');
    //this.socket = SocketIO('http://localhost:3000',connectionConfig);
    this.socket.on('connect', () => {
      console.log('connected to server');
    });
    this.socket.on("FromAPI", (secs) => {
      console.log(secs);
    })
    var board = [];
    this.state = {
      running: false,
      screen: screens.LOGIN,
      pressedButton: CONSTANTS.DPADSTATES.UP,
      toggleReset: true,
      gameOverScore: -1,
      unredeemedSnekBalance: -1,
      snekBalance: -1,
      ethBalance: -1,
    };
    this.loggedIn = this.loggedIn.bind(this);
    this.onDpadChange = this.onDpadChange.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
    this.restart = this.restart.bind(this);
    this.exit = this.exit.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.onDied = this.onDied.bind(this);
    this.onSelectLevelPlayPress = this.onSelectLevelPlayPress.bind(this);
    this.onPlayPress = this.onPlayPress.bind(this);
    this.doMine = this.doMine.bind(this);
    this.doMineFree = this.doMineFree.bind(this);
    this.doMineConfirm = this.doMineConfirm.bind(this);
    this.doMineBack = this.doMineBack.bind(this);
    this.doMineFreeConfirm = this.doMineConfirm.bind(this);
    this.doMineFreeBack = this.doMineBack.bind(this);
  }
  onDpadChange(direction) {
    if (direction != CONSTANTS.DPADSTATES.NONE && direction != this.state.pressedButton) {
      this.setState({pressedButton: direction});
    }
  }
  doMine() {
    //todo get price
    this.setState({overlay: overlays.DOMINE, price: 50000});
  }
  doMineFree() {
    //this.setState({running: true});
  }
  doMineConfirm() {
    //TODO: mine it!!
    //this.setState({running: true});
  }
  doMineBack() {
    this.setState({overlay: overlays.GAMEOVER});
  }
  doMineFreeConfirm() {
    //this.setState({running: true});
  }
  doMineFreeBack() {
    //this.setState({running: true});
  }
  onDied(){
    this.setState({running: false, overlay: overlays.GAMEOVER});
  }
  start() {
    this.setState({running: true});
  }
  restart() {
    this.setState({toggleReset: !this.state.toggleReset, overlay: -1});
  }
  pause() {
    this.setState({running: false, overlay: overlays.PAUSE});
  }
  exit() {
    this.setState({running: false, screen: screens.HOME, overlay: -1});
  }
  onPausePress(){
    this.setState({running: false, overlay: overlays.PAUSE});
  }
  async onPlayPress() {
    // let jwt = await getFromAsyncStore("jwt");
    // //var data = { user: this.state.username, pw: this.state.pw };
    // var data = {howmany: 1000, price: 30000 };
    // var response = await fetch(`${context.host}/mine`, {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   body: JSON.stringify(data), // body data type must match "Content-Type" header
    //   headers: {
    //       "Content-Type": "application/json; charset=utf-8",
    //       "Authorization": "JWT " + jwt,
    //       //application/x-www-form-urlencoded on Postman... hmmm
    //   },
    // });
    // var resp = await response.json();
    // console.log(resp);
    // if(resp.error){
    //   alert(resp.error);
    //   this.setState({loading: false});
    // }else if(resp.token) {
    //   this.props.loggedIn(resp.token);
    // }
    this.setState({screen: screens.SELECTLEVEL});
  }
  onSelectLevelPlayPress() {
    this.setState({screen: screens.GAME});
  }
  closeOverlay() {
    this.setState({running: true, overlay: -1});
  }
  async loggedIn(jwt) {
    await asyncStore("jwt", jwt);
    if(this.state.screen == screens.LOGIN){
      this.setState({screen: screens.HOME});
    }
    //this.setState({running: true, overlay: -1});
  }
  render() {
    if(this.state.screen == screens.HOME){
      return (
        <Homepage onPlayPress={this.onPlayPress}></Homepage>
      );
    }else if(this.state.screen == screens.LOGIN){
      return (
        // <GameHistory />
        //<AccountHistory />
        // <GameOverOverlay
        //     show={true}
        //   />
        //<Wallet />
        //<Withdraw/>
        //<SnakeMine show={true}/>
        //<Homepage onPlayPress={this.onPlayPress.bind(this)} onPausePress={this.onPausePress.bind(this)}></Homepage>
        //<PauseOverlay show={true} closeOverlay={this.closeOverlay.bind(this)}/>
        //<Homepage onPlayPress={this.onPlayPress}></Homepage>
        <Login loggedIn={this.loggedIn}></Login>
      );
    }else if(this.state.screen == screens.SELECTLEVEL){
      return (
        <SelectLevel onSelectLevelPlayPress={this.onSelectLevelPlayPress}></SelectLevel>
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
            score={this.state.gameOverScore}
            doMine={this.doMine}
            restart={this.restart}
            exit={this.exit} />
          <DoMineOverlay
            show={this.state.overlay == overlays.DOMINE}
            confirm={this.doMineConfirm}
            back={this.doMineBack} />
        </SafeAreaView>
      );
    }else if(this.state.screen == screens.WALLET) {
      return (
        <Wallet />
      );
    }
  }
}
