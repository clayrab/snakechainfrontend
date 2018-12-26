import React from 'react';
import { Loop, Stage, World, Body, Sprite } from 'react-game-kit/native';
import SafeAreaView from 'react-native-safe-area-view';

import CONSTANTS from './Constants.js';
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

var screens = { "GAME": 0, "HOME": 1, "SELECTLEVEL": 2, "WALLET": 3, "PREFERENCES": 4, "PROFILE": 5, "ACCOUNTHISTORY": 6, "GAMEHISTORY": 7 };
var overlays = {"PAUSE": 0, "GAMEOVER": 1};
export default class App extends React.Component {
  constructor(props) {
    super(props);
    var board = [];
    this.state = {
      running: false,
      screen: screens.HOME,
      pressedButton: CONSTANTS.DPADSTATES.UP,
      toggleReset: true,
    };
  }
  onDpadChange(direction) {
    if (direction != CONSTANTS.DPADSTATES.NONE && direction != this.state.pressedButton) {
      this.setState({pressedButton: direction});
    }
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
  onPlayPress() {
    this.setState({screen: screens.GAME});
  }
  onPausePress(){
    this.setState({running: false, overlay: overlays.PAUSE});
  }
  onSelectLevelPlayPress() {
    this.setState({screen: screens.GAME});
  }
  closeOverlay() {
    this.setState({running: true, overlay: -1});
  }
  render() {
    if(this.state.screen == screens.HOME){
      return (
        // <GameHistory />
        //<AccountHistory />
        // <GameOverOverlay 
        //     show={true}
        //   />
        //<Wallet />
        //<Withdraw/>
        //<SnakeMine show={true}/>
        <Homepage onPlayPress={this.onPlayPress.bind(this)} onPausePress={this.onPausePress.bind(this)}></Homepage>
        //<PauseOverlay show={true} closeOverlay={this.closeOverlay.bind(this)}/>
      );
    }else if(this.state.screen == screens.SELECTLEVEL){
      return (
        <SelectLevel onSelectLevelPlayPress={this.onSelectLevelPlayPress.bind(this)}></SelectLevel>
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
              onDied={this.onDied.bind(this)}>
            </Snek>
            <Buttons running={this.state.running} start={this.start.bind(this)} pause={this.pause.bind(this)}></Buttons>
            <Dpad onDpadChange={this.onDpadChange.bind(this)} pressedButton={this.state.pressedButton}></Dpad>
          </Loop>
          <PauseOverlay
            show={this.state.overlay == overlays.PAUSE}
            closeOverlay={this.closeOverlay.bind(this)}/>
          <GameOverOverlay
            show={this.state.overlay == overlays.GAMEOVER}
            closeOverlay={this.closeOverlay.bind(this)}
            restart={this.restart.bind(this)}
            exit={this.exit.bind(this)} />
        </SafeAreaView>
      );
    }else if(this.state.screen == screens.WALLET) {
      return (
        <Wallet />
      );
    }
  }
}
