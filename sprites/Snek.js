import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class Snek extends Sprite {

  static contextTypes = {
    loop: PropTypes.object,
    pressedButton: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.defaultState = {
      posX: CONSTANTS.BOARDCENTERX - (CONSTANTS.SNEKSIZE/2),
      posY: CONSTANTS.BOARDCENTERY - (CONSTANTS.SNEKSIZE/2),
      boardX: CONSTANTS.BOARDSIZEX,
      boardY: CONSTANTS.BOARDSIZEY - 1,
      direction: CONSTANTS.DPADSTATES.UP,
      alive: true,
    };
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
    //CONSTANTS.BOARDCENTERY - (CONSTANTS.SNEKSIZE/2)
    return CONSTANTS.BOARDCENTERX + (CONSTANTS.SNEKSIZE*(boardX - CONSTANTS.BOARDSIZEX)) - (CONSTANTS.SNEKSIZE/2);
  }
  boardYtoPosY(boardY) {
    return CONSTANTS.BOARDCENTERY + (CONSTANTS.SNEKSIZE*(boardY - CONSTANTS.BOARDSIZEY)) - (CONSTANTS.SNEKSIZE/2);
  }
  die() {
    this.setState({alive: false});
    this.props.onDied();
  }

  live() {
    //this.styles.snek.backgroundColor = CONSTANTS.SNEKCOLOR;
    this.setState(this.defaultState);
  }

  goUp() {
    if (this.state.posY < this.boardYtoPosY(0)) {
      this.die();
    }
    this.props.onBoardTile(this.state.boardX, this.state.boardY - 1);
    this.setState({direction: CONSTANTS.DPADSTATES.UP, boardY: this.state.boardY - 1});
  }
  goDown() {
    if (this.state.posY > this.boardYtoPosY(CONSTANTS.BOARDHEIGHT)) {
      this.die();
    }
    this.props.onBoardTile(this.state.boardX, this.state.boardY + 1);
    this.setState({direction: CONSTANTS.DPADSTATES.DOWN, boardY: this.state.boardY + 1});
  }
  goLeft() {
    if (this.state.posX < this.boardXtoPosX(0)) {
      this.die();
    }
    this.props.onBoardTile(this.state.boardX - 1, this.state.boardY);
    this.setState({direction: CONSTANTS.DPADSTATES.LEFT, boardX: this.state.boardX - 1,});
  }
  goRight() {
    if (this.state.posX > this.boardXtoPosX(CONSTANTS.BOARDHEIGHT)) {
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
      if (this.state.direction == CONSTANTS.DPADSTATES.UP) {
        this.setState({posY: this.state.posY - this.props.snekSpeed});
      } else if (this.state.direction == CONSTANTS.DPADSTATES.DOWN) {
        this.setState({posY: this.state.posY + this.props.snekSpeed});
      } else if (this.state.direction == CONSTANTS.DPADSTATES.RIGHT) {
        this.setState({posX: this.state.posX + this.props.snekSpeed});
      } else if (this.state.direction == CONSTANTS.DPADSTATES.LEFT) {
        this.setState({posX: this.state.posX - this.props.snekSpeed});
      }
    }
  }
  render() {
    let deadStyle = {};
    if (!this.state.alive) {
      deadStyle.backgroundColor = "#000";
    }
    return (
      <View style={[this.styles.snek, {left: this.state.posX, top: this.state.posY,}, deadStyle]}>
      </View>
    );
  }

}
