import React from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Loop, Stage, World, Body, Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import Dpad from './sprites/Dpad.js';
import StartButton from './sprites/StartButton.js';
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
      running: true,
      pressedButton: CONSTANTS.DPADSTATES.UP,
      board: board
    };
  }

  onDpadChange(direction) {
    // TODO: not sure about "direction != CONSTANTS.DPADSTATES.NONE".
    // See how it feels.
    if( direction != CONSTANTS.DPADSTATES.NONE && direction != this.state.pressedButton ) {
      this.setState({pressedButton: direction});
    }
  }

  onBoardTile(boardX, boardY) { //fires when snake enters a new tile
    console.log(boardX, boardY);
  }

  onDied(){
    this.setState({running: false});
  }

  start() {
    this.setState({running: true});
  }

  render() {
    return (
      <Loop>
        <Board></Board>
        <Snek
          pressedButton={this.state.pressedButton}
          onBoardTile={this.onBoardTile.bind(this)}
          snekSpeed={1}
          running={this.state.running}
          onDied={this.onDied.bind(this)}>
        </Snek>
        <StartButton start={this.start.bind(this)}></StartButton>
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
