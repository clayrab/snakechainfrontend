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
  };
  constructor(props) {
    super(props);
    this.defaultState = {
      posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
      posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY - 1),
      boardX: CONSTANTS.BOARDSIZEX,
      boardY: CONSTANTS.BOARDSIZEY - 1,
      direction: CONSTANTS.DPADSTATES.UP,
      alive: true,
      tailIndex: 4,
      tail: [
        (<SnekPart
          key={0}
          running={this.props.running}
          posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
          posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY)}
          boardX={CONSTANTS.BOARDSIZEX}
          boardY={CONSTANTS.BOARDSIZEY}
          direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
        (<SnekPart
          key={1}
          running={this.props.running}
          posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
          posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 1)}
          boardX={CONSTANTS.BOARDSIZEX}
          boardY={CONSTANTS.BOARDSIZEY + 1}
          direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
        (<SnekPart
          key={2}
          running={this.props.running}
          posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
          posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 2)}
          boardX={CONSTANTS.BOARDSIZEX}
          boardY={CONSTANTS.BOARDSIZEY + 2}
          direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
        (<SnekPart
          key={3}
          running={this.props.running}
          posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
          posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 3)}
          boardX={CONSTANTS.BOARDSIZEX}
          boardY={CONSTANTS.BOARDSIZEY + 3}
          direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
        (<SnekPart
          key={4}
          running={this.props.running}
          posX={this.boardXtoPosX(CONSTANTS.BOARDSIZEX)}
          posY={this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 4)}
          boardX={CONSTANTS.BOARDSIZEX}
          boardY={CONSTANTS.BOARDSIZEY + 4}
          direction={CONSTANTS.DPADSTATES.UP}></SnekPart>),
      ]
    };
    // back of tail is tail[0].
    // head gets pushed onto tail
    // end of tail gets shift() off
    this.state = this.defaultState;
    this.lastFrameTime;
    this.styles = StyleSheet.create({
      snek: {
        position: "absolute",
        width: CONSTANTS.SNEKSIZE,
        height: CONSTANTS.SNEKSIZE,
        backgroundColor: CONSTANTS.SNEKCOLOR,
      },
    });
  }

  componentDidMount() {
    this.context.loop.subscribe(this.update.bind(this));
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update.bind(this));
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

  live() {
    //this.styles.snek.backgroundColor = CONSTANTS.SNEKCOLOR;
    this.setState(this.defaultState);
  }
  growTail(){
    var lastPart = this.state.tail[this.state.tailIndex];
    var newTailStart = this.state.tail.slice(0, this.state.tailIndex);
    var newTailEnd = this.state.tail.slice(this.state.tailIndex, this.state.tail.length);
    newTailStart.push(
      <SnekPart
        key={this.state.tail.length}
        running={this.props.running}
        posX={this.boardXtoPosX(lastPart.props.boardX)}
        posY={this.boardYtoPosY(lastPart.props.boardY)}
        boardX={lastPart.props.boardX}
        boardY={lastPart.props.boardY}
        direction={lastPart.props.direction}></SnekPart>
    );
    newTailStart = newTailStart.concat(newTailEnd);
    var newTailIndex = this.state.tailIndex+1;;
    //var newTailIndex = this.state.tailIndex;
    this.setState({tail: newTailStart, tailIndex: newTailIndex});

  }
  moveTail(direction) {
    var newTail = this.state.tail.slice(0);
    //var oldTip = this.state.tail[this.state.tailIndex];
    newTail[this.state.tailIndex] = React.cloneElement(
        newTail[this.state.tailIndex],
        {
          direction: this.state.direction,
          boardX: this.state.boardX,
          boardY: this.state.boardY,
          posX: this.boardXtoPosX(this.state.boardX),
          posY: this.boardYtoPosY(this.state.boardY),
        });
    var newTailIndex = this.state.tailIndex==0 ? this.state.tail.length-1 : this.state.tailIndex-1;
    this.setState({tailIndex: newTailIndex, tail: newTail});
  }
  goUp() {
    this.moveTail(CONSTANTS.DPADSTATES.UP);
    this.growTail();
    if (this.state.posY < this.boardYtoPosY(1)) {
      this.die();
    }
    this.props.onBoardTile(this.state.boardX, this.state.boardY - 1);
    this.setState({direction: CONSTANTS.DPADSTATES.UP, boardY: this.state.boardY - 1});
  }
  goDown() {
    this.moveTail(CONSTANTS.DPADSTATES.DOWN);
    if (this.state.posY > this.boardYtoPosY(CONSTANTS.BOARDHEIGHT)) {
      this.die();
    }
    this.props.onBoardTile(this.state.boardX, this.state.boardY + 1);
    this.setState({direction: CONSTANTS.DPADSTATES.DOWN, boardY: this.state.boardY + 1});
  }
  goLeft() {
    this.moveTail(this.state.tail[0].props.direction);
    if (this.state.posX < this.boardXtoPosX(1)) {
      this.die();
    }
    this.props.onBoardTile(this.state.boardX - 1, this.state.boardY);
    this.setState({direction: CONSTANTS.DPADSTATES.LEFT, boardX: this.state.boardX - 1,});
  }
  goRight() {
    this.moveTail(CONSTANTS.DPADSTATES.RIGHT);
    if (this.state.posX > this.boardXtoPosX(CONSTANTS.BOARDWIDTH)) {
      this.die();
    }
    this.props.onBoardTile(this.state.boardX + 1, this.state.boardY);
    this.setState({direction: CONSTANTS.DPADSTATES.RIGHT, boardX: this.state.boardX + 1,});
  }
  // 16ms game loop
  update() {
    if (this.props.running) {
      if (!this.state.alive) { // player restarted game
        this.live();
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
        var newPosX = this.state.posX;
        var newPosY = this.state.posY;
        var now = new Date().getMilliseconds();
        //console.log(now);
        if (this.state.direction == CONSTANTS.DPADSTATES.UP) {
          newPosY = this.state.posY - this.props.snekSpeed;
        } else if (this.state.direction == CONSTANTS.DPADSTATES.DOWN) {
          newPosY = this.state.posY + this.props.snekSpeed;
        } else if (this.state.direction == CONSTANTS.DPADSTATES.RIGHT) {
          newPosX = this.state.posX + this.props.snekSpeed;
        } else if (this.state.direction == CONSTANTS.DPADSTATES.LEFT) {
          newPosX = this.state.posX - this.props.snekSpeed;
        }
        this.setState({posX: newPosX, posY: newPosY});
      }
    }
  }
  render() {
    let deadStyle = {};
    if (!this.state.alive) {
      deadStyle.backgroundColor = "#000";
    }
    // var snekParts = [
    //   (<View key={-1} style={[this.styles.snek, {left: this.state.posX, top: this.state.posY,}, deadStyle]}></View>)
    // ];
    // for (var index = 0; index < this.state.tail.length; index++) {
    //   var part = (<View key={index} style={[this.styles.snek, {left: this.state.tail[index].posX, top: this.state.tail[index].posY,}, deadStyle]}></View>)
    //   snekParts.push(part);
    // }
    var rootView = React.createElement(
      View,
      {style: {position: "absolute", top: 0, left: 0}},
      [(<View key={-1} style={[this.styles.snek, {left: this.state.posX, top: this.state.posY,}, deadStyle]}></View>), this.state.tail]
    );
    //   width: CONSTANTS.DEVICEWIDTH,
    //   backgroundColor: '#0f0',
    //   height: CONSTANTS.GAMEHEIGHT,
    //   position: "absolute",
    // }}, this.tileRows);
    return rootView;
    // return (
    //   <View style={{position: "absolute", top: 0, left: 0}}>
    //     <View style={[this.styles.snek, {left: this.state.posX, top: this.state.posY,}, deadStyle]}></View>
    //   </View>
    // );
  }

}
