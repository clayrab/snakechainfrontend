import React from 'react';
import { Animated, View, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions, Text } from 'react-native';
import {Sprite} from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

export default class SnekHead extends Sprite {
  constructor(props) {
    super(props);
    this.defaultState = {
      snakePosX: 1.0*props.boardXtoPosX(CONSTANTS.BOARDSIZEX - 1),
      snakePosY: 1.0*props.boardYtoPosY(CONSTANTS.BOARDHEIGHT - 6),
    };
    this.state = {
      snakePosX: props.boardXtoPosX(CONSTANTS.BOARDSIZEX - 1),
      snakePosY: props.boardYtoPosY(CONSTANTS.BOARDHEIGHT - 6),
    };

    this.lastFrameTime = null;
  }
  async componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  update = async () => {
    this.props.countFrame();
    if (this.props.running && this.props.alive) {
      // if (!this.props.alive) { //player tried to start the game without reset
      //   this.props.die();
      // }
      // if (this.state.pelletLocation == null) {
      //   this.placePellet();
      // }
      if (this.props.direction == CONSTANTS.DPADSTATES.UP && (this.state.snakePosY < this.props.boardYtoPosY(this.props.boardY))) {
        await this.setState({ snakePosX: this.props.boardXtoPosX(this.props.boardX), snakePosY: this.props.boardYtoPosY(this.props.boardY), });
        if (this.props.pressedButton == CONSTANTS.DPADSTATES.UP) {
          await this.props.goUp();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.RIGHT) {
          await this.props.goRight();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.LEFT) {
          await this.props.goLeft();
        } else {
          await this.props.goUp();
        }
      } else if (this.props.direction == CONSTANTS.DPADSTATES.DOWN && (this.state.snakePosY > this.props.boardYtoPosY(this.props.boardY))) {
        await this.setState({ snakePosX: this.props.boardXtoPosX(this.props.boardX), snakePosY: this.props.boardYtoPosY(this.props.boardY), });
        if (this.props.pressedButton == CONSTANTS.DPADSTATES.DOWN) {
          await this.props.goDown();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.RIGHT) {
          await this.props.goRight();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.LEFT) {
          await this.props.goLeft();
        } else {
          await this.props.goDown();
        }
      } else if (this.props.direction == CONSTANTS.DPADSTATES.RIGHT && (this.state.snakePosX > this.props.boardXtoPosX(this.props.boardX))) {
        await this.setState({ snakePosX: this.props.boardXtoPosX(this.props.boardX), snakePosY: this.props.boardYtoPosY(this.props.boardY), });
        if (this.props.pressedButton == CONSTANTS.DPADSTATES.RIGHT) {
          await this.props.goRight();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.UP) {
          await this.props.goUp();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.DOWN) {
          await this.props.goDown();
        } else {
          await this.props.goRight();
        }
      } else if (this.props.direction == CONSTANTS.DPADSTATES.LEFT && (this.state.snakePosX < this.props.boardXtoPosX(this.props.boardX))) {
        await this.setState({ snakePosX: this.props.boardXtoPosX(this.props.boardX), snakePosY: this.props.boardYtoPosY(this.props.boardY), });
        if (this.props.pressedButton == CONSTANTS.DPADSTATES.LEFT) {
          await this.props.goLeft();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.UP) {
          await this.props.goUp();
        } else if (this.props.pressedButton == CONSTANTS.DPADSTATES.DOWN) {
          await this.props.goDown();
        } else {
          await this.props.goLeft();
        }
      }
      // animate
      if (this.props.alive) {
        var now = Date.now();
        if (this.lastFrameTime == null) { //first frame
          var speed = 0;
        } else {
          var speed = CONSTANTS.SNEKSPEED * (now - this.lastFrameTime) * this.props.speedEffector;
        }
        this.lastFrameTime = now;
        if (this.props.direction == CONSTANTS.DPADSTATES.UP) {
          this.setState({ snakePosY: this.state.snakePosY - speed });
        } else if (this.props.direction == CONSTANTS.DPADSTATES.DOWN) {
          this.setState({ snakePosY: this.state.snakePosY + speed });
        } else if (this.props.direction == CONSTANTS.DPADSTATES.RIGHT) {
          this.setState({ snakePosX: this.state.snakePosX + speed });
        } else if (this.props.direction == CONSTANTS.DPADSTATES.LEFT) {
          this.setState({ snakePosX: this.state.snakePosX - speed });
        }
      }
    }
  }
  render() {
    if(CONSTANTS.LOGRENDERMETHODS) {
      var now = Date.now();
      console.log("SnekHead render " + now);
    }
    let snek = (<View style={[styles.snekHead, { left: this.state.snakePosX, top: this.state.snakePosY, }]}>
      <Image source={require('../assets/gameplay/headUp.png')} style={[styles.snekHead, this.props.snakeHeadStyle]} resizeMode="stretch" />
    </View>);
    if (!this.props.alive) {
      snek = (<View style={[styles.snekHead, {
        left: this.state.snakePosX,
        top: this.state.snakePosY,
        backgroundColor: "#000",
      }]}></View>);
    }
    return snek;
  }
}
let styles = StyleSheet.create({
  snekHead: {
    position: "absolute",
    width: CONSTANTS.SNEKSIZE,
    height: CONSTANTS.SNEKSIZE,
    zIndex: 3,
  },
  snekHeadBack: {
    position: "absolute",
    width: CONSTANTS.SNEKSIZE,
    height: CONSTANTS.SNEKSIZE,
    zIndex: 3,
    backgroundColor: CONSTANTS.SNEKPARTCOLOR,
  },
});
