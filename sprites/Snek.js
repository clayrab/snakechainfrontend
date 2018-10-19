import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';
import SnekPart from './SnekPart.js'

export default class Snek extends Sprite {

  static contextTypes = {
    loop: PropTypes.object,
    pressedButton: PropTypes.number,
    snekSpeed: PropTypes.number,
    running: PropTypes.bool,
    onDied: PropTypes.func,
    toggleReset: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.defaultState = {
      posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
      posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY - 1),
      boardX: CONSTANTS.BOARDSIZEX,
      boardY: CONSTANTS.BOARDSIZEY - 1,
      direction: CONSTANTS.DPADSTATES.UP,
      tailIndex: -1,
      tail: []
    };
    //this.state = this.defaultState;
    this.state = this.copyDefaultState();
    this.resetBoard();
    this.state.toggleReset = this.props.toggleReset,
    this.state.alive = true;

    this.lastFrameTime;
    this.previousTime = null;
    this.styles = StyleSheet.create({
      snek: {
        position: "absolute",
        width: CONSTANTS.SNEKSIZE,
        height: CONSTANTS.SNEKSIZE,
        backgroundColor: CONSTANTS.SNEKCOLOR,
      },
    });
  }

  createTail(){
    // [
    //   (<SnekPart
    //     key={0}
    //     running={this.props.running}
    //     posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
    //     posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY)}
    //     boardX={CONSTANTS.BOARDSIZEX}
    //     boardY={CONSTANTS.BOARDSIZEY}
    //     toggleUpdate={true}>
    //     direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
    //   (<SnekPart
    //     key={1}
    //     running={this.props.running}
    //     posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
    //     posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 1)}
    //     boardX={CONSTANTS.BOARDSIZEX}
    //     boardY={CONSTANTS.BOARDSIZEY + 1}
    //     toggleUpdate={true}>
    //     direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
    //   (<SnekPart
    //     key={2}
    //     running={this.props.running}
    //     posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
    //     posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 2)}
    //     boardX={CONSTANTS.BOARDSIZEX}
    //     boardY={CONSTANTS.BOARDSIZEY + 2}
    //     toggleUpdate={true}>
    //     direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
    //   (<SnekPart
    //     key={3}
    //     running={this.props.running}
    //     posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
    //     posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 3)}
    //     boardX={CONSTANTS.BOARDSIZEX}
    //     boardY={CONSTANTS.BOARDSIZEY + 3}
    //     toggleUpdate={true}>
    //     direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
    //   (<SnekPart
    //     key={4}
    //     running={this.props.running}
    //     posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
    //     posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 4)}
    //     boardX={CONSTANTS.BOARDSIZEX}
    //     boardY={CONSTANTS.BOARDSIZEY + 4}
    //     toggleUpdate={true}>
    //     direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
    //   (<SnekPart
    //     key={5}
    //     running={this.props.running}
    //     posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
    //     posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 5)}
    //     boardX={CONSTANTS.BOARDSIZEX}
    //     boardY={CONSTANTS.BOARDSIZEY + 5}
    //     toggleUpdate={true}>
    //     direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
    //   (<SnekPart
    //     key={6}
    //     running={this.props.running}
    //     posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
    //     posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 6)}
    //     boardX={CONSTANTS.BOARDSIZEX}
    //     boardY={CONSTANTS.BOARDSIZEY + 6}
    //     toggleUpdate={true}>
    //     direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
    //   (<SnekPart
    //     key={7}
    //     running={this.props.running}
    //     posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
    //     posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 7)}
    //     boardX={CONSTANTS.BOARDSIZEX}
    //     boardY={CONSTANTS.BOARDSIZEY + 7}
    //     toggleUpdate={true}>
    //     direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
    //   (<SnekPart
    //     key={8}
    //     running={this.props.running}
    //     posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
    //     posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 8)}
    //     boardX={CONSTANTS.BOARDSIZEX}
    //     boardY={CONSTANTS.BOARDSIZEY + 8}
    //     toggleUpdate={true}>
    //     direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
    // ]
  }

  copyDefaultState(){
    console.log("copyDefaultState : " + this.defaultState.tail.length);
    var startState = {};
    startState.posX = this.defaultState.posX;
    startState.posY = this.defaultState.posY;
    startState.boardX = this.defaultState.boardX;
    startState.boardY = this.defaultState.boardY;
    startState.direction = this.defaultState.direction;
    startState.tailIndex = -1;
    startState.tail = [];
    // var defaultTail = [];
    // for(var index = 0; index < this.defaultState.tail.length; index++) {
    //   defaultTail.push(this.defaultState.tail[index]);
    // }
    //startState.tail = this.defaultState.tail.slice(0);
    //startState.tail = defaultTail;
    console.log(startState.tail.length);
    return startState;
  }
  resetBoard(){
    var board = [];
    for (var index1 = 0; index1 < CONSTANTS.BOARDHEIGHT; index1++) {
      var row = [];
      for (var index2 = 0; index2 < CONSTANTS.BOARDWIDTH; index2++) {
        row.push(false);
      }
      board.push(row)
    }
    for (var index3 = 0; index3 < this.state.tail.length - 1; index3++) {
      board[this.state.tail[index3].props.boardY][this.state.tail[index3].props.boardX] = true;
    }
    this.board = board.slice(0);
  }
  boardXtoPosX(boardX) {
    return CONSTANTS.BOARDCENTERX + (CONSTANTS.SNEKSIZE*(boardX - CONSTANTS.BOARDSIZEX - 0.5));
  }
  boardYtoPosY(boardY) {
    return CONSTANTS.BOARDCENTERY + (CONSTANTS.SNEKSIZE*(boardY - CONSTANTS.BOARDSIZEY - 0.5));
  }
  die() {
    this.setState({alive: false});
    this.props.onDied();
  }
  reset() {
    var startState = this.copyDefaultState();
    startState.alive = true;
    startState.toggleReset = this.props.toggleReset;
    this.setState(startState);
    this.resetBoard();
  }
  onBoardTile(boardX, boardY){
    this.board[boardY][boardX] = true;
  }
  onLeaveBoardTile(boardX, boardY){
    this.board[boardY][boardX] = false;
  }
  growTail(){
    if (this.state.tail.length > 0) {
      console.log("grow tail: " + this.state.tailIndex + " : " + this.state.tail.length);
      var newTailStart = this.state.tail.slice(0, this.state.tailIndex);
      var newTailEnd = this.state.tail.slice(this.state.tailIndex, this.state.tail.length);
      var lastPart = this.state.tail[this.state.tailIndex];
      newTailStart.push(
        <SnekPart
          key={this.state.tail.length}
          running={this.props.running}
          posX={this.boardXtoPosX(lastPart.props.boardX)}
          posY={this.boardYtoPosY(lastPart.props.boardY)}
          boardX={lastPart.props.boardX}
          boardY={lastPart.props.boardY}
          toggleUpdate={true}
          direction={lastPart.props.direction}>
        </SnekPart>
      );
      newTailStart = newTailStart.concat(newTailEnd);
      var newTailIndex = this.state.tailIndex+1;;
      this.setState({tail: newTailStart, tailIndex: newTailIndex});
    } else {
      console.log("grow tail from zero: " + this.state.tailIndex + " : " + this.state.tail.length);
      var newTail = [];
      newTail.push(
        <SnekPart
          key={this.state.tail.length}
          running={this.props.running}
          posX={this.boardXtoPosX(this.state.boardX)}
          posY={this.boardYtoPosY(this.state.boardY)}
          boardX={this.state.boardX}
          boardY={this.state.boardY}
          toggleUpdate={true}
          direction={this.state.direction}>
        </SnekPart>
      );
      var newTailIndex = this.state.tailIndex+1;;
      this.setState({tail: newTail, tailIndex: newTailIndex});
    }

    //
    // this.state.tail.splice(this.state.tailIndex, 0, (
    //   <SnekPart
    //     key={this.state.tail.length}
    //     running={this.props.running}
    //     posX={this.boardXtoPosX(this.state.tail[this.state.tailIndex].props.boardX)}
    //     posY={this.boardYtoPosY(this.state.tail[this.state.tailIndex].props.boardY)}
    //     boardX={this.state.tail[this.state.tailIndex].props.boardX}
    //     boardY={this.state.tail[this.state.tailIndex].props.boardY}
    //     toggleUpdate={true}
    //     direction={this.state.tail[this.state.tailIndex].props.direction}>
    //   </SnekPart>
    // ));
    //this.setState({tailIndex: newTailIndex});
  }
  moveTail(direction) {
    //var newTail = this.state.tail.slice(0);
    //var oldTip = this.state.tail[this.state.tailIndex];
    console.log("movetail: " + this.state.tailIndex + " : " + this.state.tail.length);
    if(this.state.tailIndex >= 0){
      this.onLeaveBoardTile(this.state.tail[this.state.tailIndex].props.boardX,this.state.tail[this.state.tailIndex].props.boardY);
      this.state.tail[this.state.tailIndex] = React.cloneElement(
          this.state.tail[this.state.tailIndex],
          {
            direction: this.state.direction,
            boardX: this.state.boardX,
            boardY: this.state.boardY,
            posX: this.boardXtoPosX(this.state.boardX),
            posY: this.boardYtoPosY(this.state.boardY),
            toggleUpdate: !this.state.tail[this.state.tailIndex].props.toggleUpdate,
          });
    } else {
      this.onLeaveBoardTile(this.state.boardX, this.state.boardY);
    }
    var newTailIndex = this.state.tailIndex-1;
    if(newTailIndex == -1) {
      newTailIndex = this.state.tail.length-1;
    } else if (newTailIndex == -2) { //no tail
      newTailIndex = -1;
    }
    console.log("newTailIndex: " + newTailIndex);
    // var newTailIndex = this.state.tailIndex==0 ? this.state.tail.length-1 : this.state.tailIndex-1;
    var newPosX = this.boardXtoPosX(this.state.boardX);
    var newPosY = this.boardYtoPosY(this.state.boardY);
    //this.setState( {tailIndex: newTailIndex, tail: newTail, posX: newPosX, posY: newPosY} );
    this.setState( {tailIndex: newTailIndex, posX: newPosX, posY: newPosY} );
  }
  goUp() {
    this.moveTail(CONSTANTS.DPADSTATES.UP);
    if (this.state.posY < this.boardYtoPosY(1)) {
      this.die();
    } else if (this.state.boardY > 0 && this.board[this.state.boardY - 1][this.state.boardX]){
      this.die();
    } else {
      this.onBoardTile(this.state.boardX, this.state.boardY - 1);
      this.setState({direction: CONSTANTS.DPADSTATES.UP, boardY: this.state.boardY - 1});
    }
  }
  goDown() {
    this.moveTail(CONSTANTS.DPADSTATES.DOWN);
    //this.growTail();
    if (this.state.posY > this.boardYtoPosY(CONSTANTS.BOARDHEIGHT)) {
      this.die();
    } else if (this.board[this.state.boardY + 1][this.state.boardX]){
      this.die();
    } else {
      this.onBoardTile(this.state.boardX, this.state.boardY + 1);
      this.setState({direction: CONSTANTS.DPADSTATES.DOWN, boardY: this.state.boardY + 1});
    }
  }
  goLeft() {
    this.moveTail(CONSTANTS.DPADSTATES.LEFT);
    //this.growTail();
    if (this.state.posX < this.boardXtoPosX(1)) {
      this.die();
    } else if (this.board[this.state.boardY][this.state.boardX - 1]){
      this.die();
    } else {
      this.onBoardTile(this.state.boardX - 1, this.state.boardY);
      this.setState({direction: CONSTANTS.DPADSTATES.LEFT, boardX: this.state.boardX - 1,});
    }
  }
  goRight() {
    this.moveTail(CONSTANTS.DPADSTATES.RIGHT);
    //this.growTail();
    if (this.state.posX > this.boardXtoPosX(CONSTANTS.BOARDWIDTH)) {
      this.die();
    } else if (this.board[this.state.boardY][this.state.boardX + 1]){
      this.die();
    } else {
      this.onBoardTile(this.state.boardX + 1, this.state.boardY);
      this.setState({direction: CONSTANTS.DPADSTATES.RIGHT, boardX: this.state.boardX + 1,});
    }
  }
  // 16ms game loop

  componentDidMount() {
    this.context.loop.subscribe(this.update.bind(this));
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update.bind(this));
  }

  update() {
    if (this.state.toggleReset == !this.props.toggleReset) { // player reset game
      this.reset();
    }
    if (this.props.running) {
      if (!this.state.alive) { //player tried to start the game without reset
        this.die();
      }
      if (this.state.direction == CONSTANTS.DPADSTATES.UP && (this.state.posY < this.boardYtoPosY(this.state.boardY))) {
        if (this.props.pressedButton == CONSTANTS.DPADSTATES.UP) {
          this.goUp();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.RIGHT) {
          this.goRight();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.LEFT) {
          this.goLeft();
        } else {
          this.goUp();
        }
      } else if (this.state.direction == CONSTANTS.DPADSTATES.DOWN && (this.state.posY > this.boardYtoPosY(this.state.boardY))) {
        if (this.props.pressedButton == CONSTANTS.DPADSTATES.DOWN) {
          this.goDown();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.RIGHT) {
          this.goRight();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.LEFT) {
          this.goLeft();
        } else {
          this.goDown();
        }
      } else if (this.state.direction == CONSTANTS.DPADSTATES.RIGHT && (this.state.posX > this.boardXtoPosX(this.state.boardX))) {
        if (this.props.pressedButton == CONSTANTS.DPADSTATES.RIGHT) {
          this.goRight();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.UP) {
          this.goUp();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.DOWN) {
          this.goDown();
        } else {
          this.goRight();
        }
      } else if (this.state.direction == CONSTANTS.DPADSTATES.LEFT && (this.state.posX < this.boardXtoPosX(this.state.boardX))) {
        if (this.props.pressedButton == CONSTANTS.DPADSTATES.LEFT) {
          this.goLeft();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.UP) {
          this.goUp();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.DOWN) {
          this.goDown();
        } else {
          this.goLeft();
        }
      }
      // animate
      if (this.state.alive) {
        var now = new Date().getTime();
        if(this.previousTime == null) { //first frame
          var speed = 0;
        } else {
          var speed = this.props.snekSpeed * (now - this.previousTime);
        }
        this.previousTime = now;
        if (this.state.direction == CONSTANTS.DPADSTATES.UP) {
          this.setState({posY: this.state.posY - speed});
        } else if (this.state.direction == CONSTANTS.DPADSTATES.DOWN) {
          this.setState({posY: this.state.posY + speed});
        } else if (this.state.direction == CONSTANTS.DPADSTATES.RIGHT) {
          this.setState({posX: this.state.posX + speed});
        } else if (this.state.direction == CONSTANTS.DPADSTATES.LEFT) {
          this.setState({posX: this.state.posX - speed});
        }
      }
    }
  }
  render() {
    console.log("this.state.tail.length: " + this.state.tail.length);
    if(this.state.alive) {
      return (
        <View style={{position: "absolute", top: 0, left: 0}}>
          {this.state.tail.map((elem) => {
            return (elem);
          })}
          <View style={[this.styles.snek, {left: this.state.posX, top: this.state.posY,}]}></View>
        </View>
      );
    } else {
      return (
        <View style={{position: "absolute", top: 0, left: 0}}>
          {this.state.tail.map((elem) => {
            return (elem);
          })}
          <View style={[this.styles.snek,{left: this.state.posX, top: this.state.posY, backgroundColor: "#000"}]}></View>
        </View>
      );
    }
  }
}
