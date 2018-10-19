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
      posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX - 1),
      posY: this.boardYtoPosY(CONSTANTS.BOARDHEIGHT - 6),
      boardX: CONSTANTS.BOARDSIZEX - 1,
      boardY: CONSTANTS.BOARDHEIGHT - 6,
      direction: CONSTANTS.DPADSTATES.UP,
      tailIndex: -1,
      tail: [],
      pelletLocation: null
    };
    //this.state = this.defaultState;
    this.state = this.copyDefaultState();
    this.state.toggleReset = this.props.toggleReset,
    this.state.alive = true;
    this.state.tail = this.makeTail(3);
    this.state.tailIndex = 2;
    this.resetBoard();

    //console.log(this.state.tail.length);
    this.lastFrameTime;
    this.previousTime = null;
    this.styles = StyleSheet.create({
      snek: {
        position: "absolute",
        width: CONSTANTS.SNEKSIZE,
        height: CONSTANTS.SNEKSIZE,
        backgroundColor: CONSTANTS.SNEKCOLOR,
      },
      snekPart: {
        position: "absolute",
        width: CONSTANTS.SNEKSIZE,
        height: CONSTANTS.SNEKSIZE,
        backgroundColor: CONSTANTS.SNEKPARTCOLOR,
      },
      pellet: {
        position: "absolute",
        width: CONSTANTS.SNEKSIZE,
        height: CONSTANTS.SNEKSIZE,
        backgroundColor: CONSTANTS.PELLETCOLOR,
      }
    });
  }

  makeTail(length) {
    var newTail = [];
    for (var index = 0; index < length; index++) {
      newTail.push(<SnekPart
          key={index}
          running={this.props.running}
          posX={this.boardXtoPosX(this.state.boardX)}
          posY={this.boardYtoPosY(this.state.boardY + 1 + index)}
          boardX={this.state.boardX}
          boardY={this.state.boardY + 1 + index}
          toggleUpdate={true}>
          direction={CONSTANTS.DPADSTATES.UP}></SnekPart>);
    }
    return newTail;
  }
  copyDefaultState(){
    var startState = {};
    startState.posX = this.defaultState.posX;
    startState.posY = this.defaultState.posY;
    startState.boardX = this.defaultState.boardX;
    startState.boardY = this.defaultState.boardY;
    startState.direction = this.defaultState.direction;
    startState.pelletLocation = this.defaultState.pelletLocation;
    startState.tail = this.makeTail(2);
    startState.tailIndex = 2;
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
    return CONSTANTS.BOARDCENTERX + (CONSTANTS.SNEKSIZE*(boardX - CONSTANTS.BOARDSIZEX + 0.5));
  }
  boardYtoPosY(boardY) {
    return CONSTANTS.BOARDCENTERY + (CONSTANTS.SNEKSIZE*(boardY - CONSTANTS.BOARDSIZEY + 0.5));
  }
  die() {
    this.setState({alive: false});
    this.props.onDied();
  }
  reset() {
    var startState = this.copyDefaultState();
    this.setState(startState);
    startState.tail = this.makeTail(3);
    startState.tailIndex = 2;
    startState.alive = true;
    startState.toggleReset = this.props.toggleReset;
    this.setState(startState);
    this.resetBoard();
  }
  onBoardTile(boardX, boardY){
    if (this.state.pelletLocation.x == boardX && this.state.pelletLocation.y == boardY) {
      this.eatPellet();
    }
    this.board[boardY][boardX] = true;
  }
  onLeaveBoardTile(boardX, boardY){
    this.board[boardY][boardX] = false;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  placePellet(){
    var isTail = true;
    while (isTail) {
      var x = this.getRandomInt(0, CONSTANTS.BOARDWIDTH - 1);
      var y = this.getRandomInt(0, CONSTANTS.BOARDHEIGHT - 1);
      isTail = this.board[y][x];
    }
    this.setState({pelletLocation: {x: x, y: y}});
  }
  eatPellet(){
    this.growTail();
    this.placePellet();
  }
  growTail(){
    if (this.state.tail.length > 0) {
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
    // var newTailIndex = this.state.tailIndex==0 ? this.state.tail.length-1 : this.state.tailIndex-1;
    var newPosX = this.boardXtoPosX(this.state.boardX);
    var newPosY = this.boardYtoPosY(this.state.boardY);
    //this.setState( {tailIndex: newTailIndex, tail: newTail, posX: newPosX, posY: newPosY} );
    this.setState( {tailIndex: newTailIndex, posX: newPosX, posY: newPosY} );
  }
  goUp() {
    this.moveTail(CONSTANTS.DPADSTATES.UP);
    if (this.state.boardY - 1 < 0) {
      this.die();
    } else if (this.board[this.state.boardY - 1][this.state.boardX]){
      this.die();
    } else {
      this.onBoardTile(this.state.boardX, this.state.boardY - 1);
      this.setState({direction: CONSTANTS.DPADSTATES.UP, boardY: this.state.boardY - 1});
    }
  }
  goDown() {
    this.moveTail(CONSTANTS.DPADSTATES.DOWN);
    if (this.state.boardY + 1 > CONSTANTS.BOARDHEIGHT - 1) {
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
    if (this.state.boardX - 1 < 0) {
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
    if (this.state.boardX + 1 > CONSTANTS.BOARDWIDTH - 1) {
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
      if (this.state.pelletLocation == null) {
        this.placePellet();
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
    var pellet = null;
    var snek = (<View style={[this.styles.snek, {
      left: this.state.posX,
      top: this.state.posY,
    }]}></View>);
    if(this.state.pelletLocation != null) {
      var pellet = (<View style={[this.styles.pellet, {
        left: this.boardXtoPosX(this.state.pelletLocation.x),
        top: this.boardYtoPosY(this.state.pelletLocation.y),
      }]}></View>);
      //(<View style={[this.styles.pellet, {left: this.state.posX, top: this.state.posY,}]}></View>);
    }
    if(!this.state.alive) {
      snek = (<View style={[this.styles.snek,{
        left: this.state.posX,
        top: this.state.posY,
        backgroundColor: "#000",
      }]}></View>);
    }
    return (
      <View style={{position: "absolute", top: 0, left: 0}}>
        {this.state.tail.map((elem) => {
          return (elem);
        })}
        {snek}
        {pellet}
      </View>
    );
  }
}
