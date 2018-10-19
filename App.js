import React from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Loop, Stage, World, Body, Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import Dpad from './sprites/Dpad.js';
import StartButton from './sprites/StartButton.js';
import ResetButton from './sprites/ResetButton.js';
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
    console.log("render app");
    return (
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
        <StartButton running={this.state.running} start={this.start.bind(this)}></StartButton>
        <ResetButton running={this.state.running} start={this.restart.bind(this)}></ResetButton>
        <Dpad onDpadChange={this.onDpadChange.bind(this)}></Dpad>
      </Loop>
      //
      // <Loop>
      //   <Stage>
      //     <World>
      //       <Body args={[0,0,75,75]} ref={ (b) => this.body = b.body }>
      //         // Sprites go here
      //         <Snek>
      //
      //         </Snek>
      //       </Body>
      //     </World>
      //   </Stage>
      // </Loop>
    );
  }
}
