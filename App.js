import React from 'react';
import { StatusBar, View } from 'react-native';
import { Loop, Stage, World, Body, Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import Dpad from './sprites/Dpad.js';
import Buttons from './sprites/Buttons.js';
import Snek from './sprites/Snek.js';
import Board from './sprites/Board.js';
import CONSTANTS from './Constants.js';

export default class App extends React.Component {
  _that;
  constructor(props) {
    super(props);
    _that = this;
    var board = [];
    // for (var rowIndex = 0; rowIndex < CONSTANTS.BOARDHEIGHT; rowIndex ++) {
    //   var row = [];
    //    for (var rowIndex = 0; rowIndex < CONSTANTS.BOARDWIDTH; rowIndex ++) {
    //      row.push(false);
    //    }
    //    board.push(row);
    // }
    this.state = {
      running: false,
      pressedButton: CONSTANTS.DPADSTATES.UP,
      toggleReset: true,
    };
  }

  onDpadChange(direction) {
    if( direction != CONSTANTS.DPADSTATES.NONE && direction != this.state.pressedButton ) {
      this.setState({pressedButton: direction});
    }
  }

  onDied(){
    this.setState({running: false});
  }

  start() {
    this.setState({running: true});
  }
  restart() {
    this.setState({toggleReset: !this.state.toggleReset});
  }
  render() {
    return (
      <View>
        <View style={{height: CONSTANTS.STATUSBARHEIGHT, backgroundColor: "#000" }}>
          <StatusBar { ...this.props }  barStyle="light-content"/>
        </View>
        <Loop>
          <Board>
          </Board>
          <Snek
            pressedButton={this.state.pressedButton}
            snekSpeed={0.10}
            running={this.state.running}
            toggleReset={this.state.toggleReset}
            onDied={this.onDied.bind(this)}>
          </Snek>
          <Buttons running={this.state.running} start={this.start.bind(this)} restart={this.restart.bind(this)}></Buttons>
          <Dpad onDpadChange={this.onDpadChange.bind(this)} pressedButton={this.state.pressedButton}></Dpad>
        </Loop>
      </View>

    );
  }
}
