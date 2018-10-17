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
      tail: [{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 13),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY + 13,
      },{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 12),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY + 12,
      },{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 11),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY + 11,
      },{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 10),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY + 10,
      },{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 9),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY + 9,
      },{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 8),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY + 8,
      },{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 7),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY + 7,
      },{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 6),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY + 6,
      },{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 5),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY + 5,
      },{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 4),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY + 4,
      },{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 3),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY + 3,
      },{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 2),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY + 2,
      },{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY + 1),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY + 1,
      },{
        direction: CONSTANTS.DPADSTATES.UP,
        posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX),
        posY: this.boardYtoPosY(CONSTANTS.BOARDSIZEY),
        boardX: CONSTANTS.BOARDSIZEX,
        boardY: CONSTANTS.BOARDSIZEY,
      }],
    };
    // back of tail is tail[0].
    // head gets pushed onto tail
    // end of tail gets shift() off
    this.state = this.defaultState;
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
    var newTail = this.state.tail;
    var newPiece = this.state.tail[0];
    if (newPiece.direction == CONSTANTS.DPADSTATES.UP) {
      newPiece.boardY = newPiece.boardY + 1;
    } else if (newPiece.direction == CONSTANTS.DPADSTATES.DOWN) {
      newPiece.boardY = newPiece.boardY - 1;
    } else if (newPiece.direction == CONSTANTS.DPADSTATES.RIGHT) {
      newPiece.boardX = newPiece.boardX - 1;
    } else if (newPiece.direction == CONSTANTS.DPADSTATES.LEFT) {
      newPiece.boardX = newPiece.boardX + 1;
    }
    newTail.push(newPiece);
    newTail.push(this.state.tail)
    this.setState({tail: newTail})
  }
  turnTail(direction) {
    this.state.posX = this.boardXtoPosX(this.state.boardX);
    this.state.posY = this.boardYtoPosY(this.state.boardY);
    var newTail =[];
    //var oldTail = this.state.tail;
    //this.setState({tail: newTail});
    for (var index = 0; index < this.state.tail.length; index++) {
      var newPiece = this.state.tail[index];
      if (index == this.state.tail.length - 1) {
        newPiece.direction = direction;
        if(direction == CONSTANTS.DPADSTATES.UP) {
          newPiece.boardX = this.state.boardX;
          newPiece.boardY = this.state.boardY;
        } else if(direction == CONSTANTS.DPADSTATES.DOWN) {
          newPiece.boardX = this.state.boardX;
          newPiece.boardY = this.state.boardY;
        } else if(direction == CONSTANTS.DPADSTATES.RIGHT) {
          newPiece.boardX = this.state.boardX;
          newPiece.boardY = this.state.boardY;
        } else if(direction == CONSTANTS.DPADSTATES.LEFT) {
          newPiece.boardX = this.state.boardX;
          newPiece.boardY = this.state.boardY;
        }
      } else {
        newPiece.direction = this.state.tail[index + 1].direction;
        newPiece.boardX = this.state.tail[index + 1].boardX;
        newPiece.boardY = this.state.tail[index + 1].boardY;
      }
      newPiece.posX = this.boardXtoPosX(newPiece.boardX);
      newPiece.posY = this.boardYtoPosY(newPiece.boardY);
      //console.log(newPiece.boardX + ":" + newPiece.posX + ":" + this.boardXtoPosX(newPiece.boardX));
      newTail.push(newPiece);
    }
    this.setState({tail: newTail});
  }
  goUp() {
    this.turnTail(CONSTANTS.DPADSTATES.UP);
    if (this.state.posY < this.boardYtoPosY(1)) {
      this.die();
    }
    this.props.onBoardTile(this.state.boardX, this.state.boardY - 1);
    this.growTail();
    this.setState({direction: CONSTANTS.DPADSTATES.UP, boardY: this.state.boardY - 1});
  }
  goDown() {
    this.turnTail(CONSTANTS.DPADSTATES.DOWN);
    if (this.state.posY > this.boardYtoPosY(CONSTANTS.BOARDHEIGHT)) {
      this.die();
    }
    this.props.onBoardTile(this.state.boardX, this.state.boardY + 1);
    this.setState({direction: CONSTANTS.DPADSTATES.DOWN, boardY: this.state.boardY + 1});
  }
  goLeft() {
    this.turnTail(CONSTANTS.DPADSTATES.LEFT);
    if (this.state.posX < this.boardXtoPosX(1)) {
      this.die();
    }
    this.props.onBoardTile(this.state.boardX - 1, this.state.boardY);
    this.setState({direction: CONSTANTS.DPADSTATES.LEFT, boardX: this.state.boardX - 1,});
  }
  goRight() {
    this.turnTail(CONSTANTS.DPADSTATES.RIGHT);
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
        if (this.state.direction == CONSTANTS.DPADSTATES.UP) {
          newPosY = this.state.posY - this.props.snekSpeed;
        } else if (this.state.direction == CONSTANTS.DPADSTATES.DOWN) {
          newPosY = this.state.posY + this.props.snekSpeed;
        } else if (this.state.direction == CONSTANTS.DPADSTATES.RIGHT) {
          newPosX = this.state.posX + this.props.snekSpeed;
        } else if (this.state.direction == CONSTANTS.DPADSTATES.LEFT) {
          newPosX = this.state.posX - this.props.snekSpeed;
        }
        var newTail = [];
        for (var index = 0; index < this.state.tail.length; index++) {
          var tailPiece = {
            posX: this.state.tail[index].posX,
            posY: this.state.tail[index].posY,
            direction: this.state.tail[index].direction,
            boardX: this.state.tail[index].boardX,
            boardY: this.state.tail[index].boardY,
          };
          if (this.state.tail[index].direction == CONSTANTS.DPADSTATES.UP) {
            tailPiece.posY = this.state.tail[index].posY- this.props.snekSpeed;
          } else if (this.state.tail[index].direction == CONSTANTS.DPADSTATES.DOWN) {
            tailPiece.posY = this.state.tail[index].posY + this.props.snekSpeed;
          } else if (this.state.tail[index].direction == CONSTANTS.DPADSTATES.RIGHT) {
            tailPiece.posX = this.state.tail[index].posX + this.props.snekSpeed;
          } else if (this.state.tail[index].direction == CONSTANTS.DPADSTATES.LEFT) {
            tailPiece.posX = this.state.tail[index].posX - this.props.snekSpeed;
          }
          newTail.push(tailPiece);
        }
        this.setState({tail: newTail, posX: newPosX, posY: newPosY});
      }
    }
  }
  render() {
    let deadStyle = {};
    if (!this.state.alive) {
      deadStyle.backgroundColor = "#000";
    }
    var snekParts = [
      (<View key={-1} style={[this.styles.snek, {left: this.state.posX, top: this.state.posY,}, deadStyle]}></View>)
    ];
    for (var index = 0; index < this.state.tail.length; index++) {
      var part = (<View key={index} style={[this.styles.snek, {left: this.state.tail[index].posX, top: this.state.tail[index].posY,}, deadStyle]}></View>)
      snekParts.push(part);
    }
    var rootView = React.createElement(
      View,
      {style: {position: "absolute", top: 0, left: 0}},
      snekParts
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
