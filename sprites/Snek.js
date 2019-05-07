import React from 'react';
import {Animated, View, StyleSheet, TouchableOpacity, Image, ImageBackground,} from 'react-native';
import {Audio} from 'expo';
import {Sprite} from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

import SnekPart from './SnekPart.js'
import WallPart from './WallPart.js'
import ScoreBoard from './ScoreBoard.js'
import Buttons from './Buttons.js';
import Dpad from './Dpad.js';

let easterEggCount = 0;
export default class Snek extends Sprite {
  // static contextTypes = {
  //   loop: PropTypes.object,
  //   pressedButton: PropTypes.number,
  //   running: PropTypes.bool,
  //   onDied: PropTypes.func,
  //   toggleReset: PropTypes.bool,
  // };
  constructor(props) {
    super(props);
    this.defaultState = {
      posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX - 1),
      posY: this.boardYtoPosY(CONSTANTS.BOARDHEIGHT - 6),
      boardX: CONSTANTS.BOARDSIZEX - 1,
      boardY: CONSTANTS.BOARDHEIGHT - 6,
      direction: CONSTANTS.DPADSTATES.UP,
      tailIndex: -1, //TAILINDEX ALWAYS POINTS TO THE END OF THE TAIL. THE ARRAY IS NOT IN THE SAME ORDER AS THE TAIL.
      tail: [], //DO NOT SET THE TAIL OR TAILINDEX WITHOUT FIXING THE BOARD. USE EXISTING FUNCTIONS.
      // baseScore: 0,
      // multiplier: 1,
      score: 0,
      pelletCount: 0,
      pelletLocation: null,
      redPelletLocation: null,
      pelletRot: new Animated.Value(0),
      boardShake: new Animated.Value(0),
      alive: true,
      snakeHead: {transform: [{rotate: '0deg'}]},
      walls: [],
      mushrooms: {},
      speedEffector: 1
    };
    this.board = [];
    this.wallComponents = [];
    this.nextID = 0;
    this.state = this.copyDefaultState();
    this.state.toggleReset = this.props.toggleReset;
    this.resetBoard();
    this.lastFrameTime = null;
    this.pelletAnim = Animated.timing(this.state.pelletRot, {
      toValue: 1,
      duration: 2000,
    });
    this.boardShakeAnim = Animated.timing(this.state.boardShake, {
      toValue: 1,
      duration: 2000,
    });
  }

  async componentWillMount() {
  }

  async componentDidMount() {
    await this.setupAudio();
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  setupAudio = async () => {
    this.audio_sources = {
      RED_PELLET_1: require("../assets/audio/EAT_MUSHROOM.wav"),
      //RED_PELLET_2: require("../assets/audio/EAT_PELLET.wav"),
      EAT_PELLET_1: require("../assets/audio/EAT_PELLET_B.wav"),
      EAT_PELLET_2: require("../assets/audio/EAT_PELLET.wav"),
      DIE: require("../assets/audio/sewageTubeHit.mp3")
    };
    this.sounds = {};
    Object.keys(this.audio_sources).map(async key => {
      this.sounds[key] = new Audio.Sound();
      await this.sounds[key].loadAsync(this.audio_sources[key]);
    });
  };

  playSound = async sound => {
    try {
      await sound.setPositionAsync(0);
      await sound.playAsync()
    } catch (err) {
      console.warn(err)
    }
  };

  getNextID() {
    this.nextID++;
    return this.nextID;
  }

  makeTail(length, startBoardX, startBoardY) {
    var newTail = [];
    for (var index = 0; index < length; index++) {
      newTail.push(<SnekPart
        key={this.getNextID()}
        running={this.props.running}
        posX={this.boardXtoPosX(startBoardX)}
        posY={this.boardYtoPosY(startBoardY + 1 + index)}
        boardX={startBoardX}
        boardY={startBoardY + 1 + index}
        toggleUpdate={true}>
        direction={CONSTANTS.DPADSTATES.UP}></SnekPart>);
    }
    return newTail;
  }

  copyDefaultState() {
    let startState = {};
    startState.posX = this.defaultState.posX;
    startState.posY = this.defaultState.posY;
    startState.boardX = this.defaultState.boardX;
    startState.boardY = this.defaultState.boardY;
    startState.direction = this.defaultState.direction;
    startState.pelletLocation = this.defaultState.pelletLocation;
    startState.redPelletLocation = this.defaultState.redPelletLocation;
    startState.pelletRot = this.defaultState.pelletRot;
    startState.boardShake = this.defaultState.boardShake;
    //startState.baseScore = this.defaultState.baseScore;
    //startState.multiplier = this.defaultState.multiplier;
    startState.score = this.defaultState.score;
    startState.pelletCount = this.defaultState.pelletCount;
    startState.alive = this.defaultState.alive;
    startState.tail = this.makeTail(5, this.defaultState.boardX, this.defaultState.boardY);
    startState.tailIndex = 4;
    startState.snakeHead = {transform: [{rotate: '0deg'}]};
    startState.walls = this.getRandomWalls();
    startState.speedEffector = this.defaultState.speedEffector;
    return startState;
  }

  resetBoard() {
    // Board is false in "safe" spots and true where the snake and walls are
    this.props.doResetDpad();
    let board = this.makeNewBoard();
    for (var index3 = 0; index3 < this.state.tail.length - 1; index3++) {
      board[this.state.tail[index3].props.boardY][this.state.tail[index3].props.boardX] = true;
    }

    for (var yIndex = 0; yIndex < CONSTANTS.BOARDHEIGHT; yIndex++) {
      for (var xIndex = 0; xIndex < CONSTANTS.BOARDWIDTH; xIndex++) {
        if (this.state.walls[yIndex * 100 + xIndex]) {
          board[yIndex][xIndex] = true;
        }
      }
    }
    this.board = board.slice(0); //copy board
    this.setWallComponents();
  }

  hasNeighbor = (x, y, walls) => {
    if (x > 0 && walls[y * 100 + (x - 1)]) {
      return true;
    } else if (x < CONSTANTS.BOARDWIDTH - 1 && walls[y * 100 + (x + 1)]) {
      return true;
    } else if (y > 0 && walls[((y - 1) * 100) + x]) {
      return true;
    } else if (y < CONSTANTS.BOARDHEIGHT - 1 && walls[((y + 1) * 100) + x]) {
      return true;
    }
    return false;
  }
  makeTetrisBlock = (n, walls) => {
    let x = Math.floor(Math.random() * CONSTANTS.BOARDWIDTH);
    let y = Math.floor(Math.random() * CONSTANTS.BOARDHEIGHT);
    // while it's not already a wall and it's not in the middle column where the snek starts
    while (walls[y * 100 + x] || x == CONSTANTS.BOARDSIZEX - 1 || this.hasNeighbor(x, y, walls)) {
      //newWalls[randY * 100 + randX] || randX == CONSTANTS.BOARDSIZEX-1 || !this.hasNeighbor(randX, randY, newWalls)
      x = Math.floor(Math.random() * CONSTANTS.BOARDWIDTH);
      y = Math.floor(Math.random() * CONSTANTS.BOARDHEIGHT);
    }
    walls[y * 100 + x] = true;
    let minX = x;
    let minY = y;
    let maxX = x;
    let maxY = y;
    let neighbors = [];
    for (let blockNumber = 0; blockNumber < n - 1; blockNumber++) {
      let randX = Math.floor((Math.random() * ((maxX + 2) - (minX - 1)) + (minX - 1)));
      let randY = Math.floor((Math.random() * ((maxY + 2) - (minY - 1)) + (minY - 1)));
      while (
        walls[randY * 100 + randX] ||
        randX == CONSTANTS.BOARDSIZEX - 1 ||
        !this.hasNeighbor(randX, randY, walls)
      ) {
        randX = Math.floor((Math.random() * ((maxX + 2) - (minX - 1)) + (minX - 1)));
        randY = Math.floor((Math.random() * ((maxY + 2) - (minY - 1)) + (minY - 1)));
      }

      if (randX < minX) {
        minX = randX;
      }
      if (randX > maxX) {
        maxX = randX;
      }
      if (randY < minY) {
        minY = randY;
      }
      if (randY > maxY) {
        maxY = randY;
      }
      walls[randY * 100 + randX] = true;
    }
    return walls;
  }
  makeScatterShot = (walls) => {
    let randX = Math.floor(Math.random() * CONSTANTS.BOARDWIDTH);
    let randY = Math.floor(Math.random() * CONSTANTS.BOARDHEIGHT);
    // while it's not already a wall and it's not in the middle column where the snek starts
    while (walls[randY * 100 + randX] || randX == CONSTANTS.BOARDSIZEX - 1) {
      randX = Math.floor(Math.random() * CONSTANTS.BOARDWIDTH);
      randY = Math.floor(Math.random() * CONSTANTS.BOARDHEIGHT);
    }
    walls[randY * 100 + randX] = true;
    return walls;
  }
  getRandomWalls = () => {
    let newWalls = [];
    if (this.props.level === CONSTANTS.LEVELS.BLOCK1) {
      for (let i = 0; i < 12; i++) {
        newWalls = this.makeTetrisBlock(4, newWalls);
      }
    } else if (this.props.level === CONSTANTS.LEVELS.BLOCK2) {
      for (let i = 0; i < 12; i++) {
        newWalls = this.makeTetrisBlock(4, newWalls);
      }
      for (let i = 0; i < 4; i++) {
        newWalls = this.makeTetrisBlock(5, newWalls);
      }

    } else if (this.props.level === CONSTANTS.LEVELS.BLOCK3) {
      for (let i = 0; i < 8; i++) {
        newWalls = this.makeTetrisBlock(4, newWalls);
      }
      for (let i = 0; i < 4; i++) {
        newWalls = this.makeTetrisBlock(5, newWalls);
      }
      for (let i = 0; i < 4; i++) {
        newWalls = this.makeTetrisBlock(6, newWalls);
      }
    } else if (this.props.level === CONSTANTS.LEVELS.SCATTER1) {
      for (let i = 0; i < 12; i++) {
        newWalls = this.makeScatterShot(newWalls);
      }
    } else if (this.props.level === CONSTANTS.LEVELS.SCATTER2) {
      for (let i = 0; i < 24; i++) {
        newWalls = this.makeScatterShot(newWalls);
      }
    } else if (this.props.level === CONSTANTS.LEVELS.SCATTER3) {
      for (let i = 0; i < 30; i++) {
        newWalls = this.makeScatterShot(newWalls);
      }
      for (let i = 0; i < 2; i++) {
        newWalls = this.makeTetrisBlock(5, newWalls);
      }
      for (let i = 0; i < 2; i++) {
        newWalls = this.makeTetrisBlock(6, newWalls);
      }
    }
    return newWalls;
  }

  setWallComponents = () => {
    this.wallComponents = [];
    for (var yIndex = 0; yIndex < CONSTANTS.BOARDHEIGHT; yIndex++) {
      for (var xIndex = 0; xIndex < CONSTANTS.BOARDWIDTH; xIndex++) {
        if (this.state.walls[yIndex * 100 + xIndex]) {
          this.wallComponents.push(
            <WallPart
              key={this.getNextID()}
              posX={this.boardXtoPosX(xIndex)}
              posY={this.boardYtoPosY(yIndex)}>
            </WallPart>
          );
        }
      }
    }
  }

  boardXtoPosX(boardX) {
    return CONSTANTS.BOARDCENTERX + (CONSTANTS.SNEKSIZE * (boardX - CONSTANTS.BOARDSIZEX + 0.5));
  }

  boardYtoPosY(boardY) {
    return CONSTANTS.BOARDCENTERY + (CONSTANTS.SNEKSIZE * (boardY - CONSTANTS.BOARDSIZEY + 0.5));
  }

  // async playSound(source) {
  //   try {
  //     await this.soundObject.loadAsync(source);
  //     await this.soundObject.playAsync();
  //   } catch (err) {
  //     console.warn(err)
  //   }
  // }

  die = async () => {
    this.setState({alive: false});
    await this.playSound(this.sounds.DIE);
    await this.props.onDied(this.state.score);
  }

  reset() {
    var startState = this.copyDefaultState();
    startState.toggleReset = this.props.toggleReset;
    this.setState(startState);
    this.resetBoard();
  }

  onBoardTile(boardX, boardY) {
    if (this.state.pelletLocation.x == boardX && this.state.pelletLocation.y == boardY) {
      this.eatPellet();
    }
    if (this.state.redPelletLocation &&
      this.state.redPelletLocation.x === boardX &&
      this.state.redPelletLocation.y === boardY) {
      this.eatRedPellet();
    }
    this.board[boardY][boardX] = true;
  }

  onLeaveBoardTile(boardX, boardY) {
    this.board[boardY][boardX] = false;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  placePellet() {
    let isTail = true;
    let isHead = undefined;
    let x, y;
    while (isTail || isHead) {
      x = this.getRandomInt(0, CONSTANTS.BOARDWIDTH - 1);
      y = this.getRandomInt(0, CONSTANTS.BOARDHEIGHT - 1);
      isTail = this.board[y][x];
      isHead = this.state.boardX === x && this.state.boardY === y;
    }
    //
    // this.setState({
    //   pelletLocation: {x: x, y: y},
    //   redPelletLocation: null,
    // });

    this.setState({
      pelletLocation: {x: x, y: y},
      redPelletLocation: this.randomRedPelletGenerate()
    });

    if ((this.state.baseScore + 2) % 5 === 0) {
      //this.state.pelletRot.setValue(0);
      this.state.shakeBoard.setValue(0);
      //pelletRot
      //this.pelletAnim.start();
      this.boardShakeAnim.start();
    }
  }

  randomRedPelletGenerate() {
    let isTail = true;
    let isHead = undefined;
    let x, y;
    while (isTail || isHead) {
      x = this.getRandomInt(0, CONSTANTS.BOARDWIDTH - 1);
      y = this.getRandomInt(0, CONSTANTS.BOARDHEIGHT - 1);
      isTail = this.board[y][x];
      isHead = this.state.boardX === x && this.state.boardY === y;
    }
    return {x, y};
  }

  eatRedPellet = async () => {
    this.setState({redPelletLocation: null});
    let addPointsPelletSound = async(howMany) => {
      setTimeout(async() => {
        await this.playSound(this.sounds.EAT_PELLET_1);
        setTimeout(async() => {
          await this.playSound(this.sounds.EAT_PELLET_1);
          setTimeout(async() => {
            await this.playSound(this.sounds.EAT_PELLET_1);
          }, 500);
        }, 500);
      }, 500);
    }
    await this.playSound(this.sounds.RED_PELLET_1);

    var actions = [
      {
        name: "die",
        weight: 2.0
      },{
        name: "speedup",
        weight: 20.0
      },{
        name: "slowdown",
        weight: 30.0
      },{
        name: "removetail",
        weight: 30.0
      },{
        name: "sleepy",
        weight: 50.0
      },{
        name: "addtail",
        weight: 30.0
      },{
        name: "addpoints",
        weight: 30.0
      },
    ];
    const maxWeight = actions
      .map((obj) => { return obj.weight;})
      .reduce((total, weight) => { return total + weight;}); // sum of all weights
    let action = this.getRandomInt(1, maxWeight);
    let nextAction = 0;
    while(action >= 0){
      action-=actions[nextAction].weight;
      nextAction++;
    }
    switch(actions[nextAction-1].name){
      case "die":
        this.die();
        break;
      case "speedup":
        this.setState({speedEffector: 2});
        setTimeout(() => this.setState({speedEffector: 1}), 5000);
        break;
      case "slowdown":
        this.setState({speedEffector: 0.5});
        setTimeout(() => this.setState({speedEffector: 1}), 8666);
        break;
      case "removetail":
        let howLong = this.getRandomInt(3, 10);
        this.reduceTail(howLong);
        break;
      case "addtail":
        let howLong2 = this.getRandomInt(3, 10);
        for(var i = 0; i < howLong2; i++){
          this.growTail();
        }
        break;
      case "addpoints":
        addPointsPelletSound(3);
        this.setState({score: this.state.score + CONSTANTS.REDPELLETSCOREBONUS*CONSTANTS.PELLETMULT});
        break;
      case "sleepy":
        this.props.showCowOverlay();
        setTimeout(this.props.hideCowOverlay, 8000);
        break;
    }
  }

  eatPellet = async () => {
    await this.playSound(this.sounds.EAT_PELLET_1);
    let growLength = 0;
    let scoreCountdown = this.state.score;
    while(scoreCountdown >= 0 && growLength < 5){
      growLength++;
      scoreCountdown = scoreCountdown - (10 * CONSTANTS.PELLETMULT);
    }
    for (let i = 0; i < growLength; i++) {
      this.growTail();
    }
    this.placePellet();
    this.setState({score: this.state.score + (CONSTANTS.PELLETMULT * growLength), pelletCount: this.state.pelletCount + 1});
  }
  makeNewBoard = () => {
    let board = [];
    for (var index1 = 0; index1 < CONSTANTS.BOARDHEIGHT; index1++) {
      let row = [];
      for (var index2 = 0; index2 < CONSTANTS.BOARDWIDTH; index2++) {
        row.push(false);
      }
      board.push(row);
    }
    return board;
  }

  reduceTail = async(howMuch) => {
    if (this.state.tail.length > 0) {
      howMuch = howMuch > this.state.tail.length - 1 ? this.state.tail.length - 1 : howMuch;
      let newTailStart = this.state.tail.slice(0, this.state.tailIndex + 1);
      let newTailEnd = this.state.tail.slice(this.state.tailIndex + 1, this.state.tail.length);
      //let lastTailPart = this.state.tail[this.state.tailIndex];
      while(howMuch > 0) {
        if(newTailStart.length > 0) {
          let lastPart = newTailStart[newTailStart.length - 1];
          this.board[lastPart.props.boardY][lastPart.props.boardX] = false;
          newTailStart = newTailStart.slice(0, -1);
        } else {
          let lastPart = newTailEnd[newTailEnd.length - 1];
          this.board[lastPart.props.boardY][lastPart.props.boardX] = false;
          newTailEnd = newTailEnd.slice(0, -1);
        }
        howMuch--;
      }
      let newTailIndex = 0;
      if(newTailStart.length > 0){
        newTailIndex = newTailStart.length - 1;
      } else {
        newTailIndex = newTailEnd.length - 1;
      }
      let newTail = newTailStart.concat(newTailEnd);
      await this.setState({tail: newTail, tailIndex: newTailIndex});
    }
  }
  growTail() {
    // TailIndex is the last part of the tail. We snip the tail TailIndex,
    // push a new part into the middle of the array(the end of the tail),
    // and then concan the arrays back together.
    if (this.state.tail.length > 0) {
      let newTailStart = this.state.tail.slice(0, this.state.tailIndex + 1);
      let newTailEnd = this.state.tail.slice(this.state.tailIndex + 1, this.state.tail.length);
      let lastTailPart = this.state.tail[this.state.tailIndex];
      newTailStart.push(
        <SnekPart
          key={this.getNextID()}
          running={this.props.running}
          posX={this.boardXtoPosX(lastTailPart.props.boardX)}
          posY={this.boardYtoPosY(lastTailPart.props.boardY)}
          boardX={lastTailPart.props.boardX}
          boardY={lastTailPart.props.boardY}
          toggleUpdate={true}
          direction={lastTailPart.props.direction}>
        </SnekPart>
      );
      newTailStart = newTailStart.concat(newTailEnd);
      let newTailIndex = this.state.tailIndex + 1;
      this.setState({tail: newTailStart, tailIndex: newTailIndex});
    } else {
      let newTail = [];
      newTail.push(
        <SnekPart
          key={this.getNextID()}
          running={this.props.running}
          posX={this.boardXtoPosX(this.state.boardX)}
          posY={this.boardYtoPosY(this.state.boardY)}
          boardX={this.state.boardX}
          boardY={this.state.boardY}
          toggleUpdate={true}
          direction={this.state.direction}>
        </SnekPart>
      );
      let newTailIndex = this.state.tailIndex + 1;
      this.setState({tail: newTail, tailIndex: newTailIndex});
    }
  }

  moveTail = async(direction) => {
    if (this.state.tailIndex >= 0) {
      this.onLeaveBoardTile(this.state.tail[this.state.tailIndex].props.boardX, this.state.tail[this.state.tailIndex].props.boardY);
      //cheating here and not using setState. it will be fired below.
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
      console.log("empty tail problem")
      this.onLeaveBoardTile(this.state.boardX, this.state.boardY);
    }
    var newTailIndex = this.state.tailIndex - 1;
    if (newTailIndex == -1) {
      newTailIndex = this.state.tail.length - 1;
    } else if (newTailIndex == -2) { //no tail
      newTailIndex = -1;
    }
    var newPosX = this.boardXtoPosX(this.state.boardX);
    var newPosY = this.boardYtoPosY(this.state.boardY);
    //await this call so that onBoardTile is in the right state
    await this.setState({tailIndex: newTailIndex, posX: newPosX, posY: newPosY});
  }

  goUp() {
    this.moveTail(CONSTANTS.DPADSTATES.UP);
    if (this.state.boardY - 1 < 0) {
      this.die();
    } else if (this.board[this.state.boardY - 1][this.state.boardX]) {
      this.die();
    } else {
      this.onBoardTile(this.state.boardX, this.state.boardY - 1);
      this.setState({
        direction: CONSTANTS.DPADSTATES.UP,
        boardY: this.state.boardY - 1,
        snakeHead: {transform: [{rotate: '0deg'}]}
      });
    }
  }

  goDown() {
    this.moveTail(CONSTANTS.DPADSTATES.DOWN);
    if (this.state.boardY + 1 > CONSTANTS.BOARDHEIGHT - 1) {
      this.die();
    } else if (this.board[this.state.boardY + 1][this.state.boardX]) {
      this.die();
    } else {
      this.onBoardTile(this.state.boardX, this.state.boardY + 1);
      this.setState({
        direction: CONSTANTS.DPADSTATES.DOWN,
        boardY: this.state.boardY + 1,
        snakeHead: {transform: [{rotate: '180deg'}]}
      });
    }
  }

  goLeft() {
    this.moveTail(CONSTANTS.DPADSTATES.LEFT);
    if (this.state.boardX - 1 < 0) {
      this.die();
    } else if (this.board[this.state.boardY][this.state.boardX - 1]) {
      this.die();
    } else {
      this.onBoardTile(this.state.boardX - 1, this.state.boardY);
      this.setState({
        direction: CONSTANTS.DPADSTATES.LEFT,
        boardX: this.state.boardX - 1,
        snakeHead: {transform: [{rotate: '270deg'}]}
      });
    }
  }

  goRight() {
    this.moveTail(CONSTANTS.DPADSTATES.RIGHT);
    if (this.state.boardX + 1 > CONSTANTS.BOARDWIDTH - 1) {
      this.die();
    } else if (this.board[this.state.boardY][this.state.boardX + 1]) {
      this.die();
    } else {
      this.onBoardTile(this.state.boardX + 1, this.state.boardY);
      this.setState({
        direction: CONSTANTS.DPADSTATES.RIGHT,
        boardX: this.state.boardX + 1,
        snakeHead: {transform: [{rotate: '90deg'}]}
      });
    }
  }

  update = () => {
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
        if (this.lastFrameTime == null) { //first frame
          var speed = 0;
        } else {
          let rushEffect = 1.0;
          if(this.props.mode === "SNAKE RUSH"){
            rushEffect += this.state.pelletCount/10.0;
          }
          var speed = CONSTANTS.SNEKSPEED * (now - this.lastFrameTime) * this.state.speedEffector * rushEffect;
        }
        this.lastFrameTime = now;
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

  spin() {
    return this.state.pelletRot.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '1440deg'],
    });
  }

  boardShakeInterpolate() {
    return this.state.boardShake.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200],
    });
  }

  easterEgg = async () => {
    easterEggCount = easterEggCount + 1;
    if (easterEggCount > 6) {
      this.setState({score: this.state.score + CONSTANTS.PELLETMULT})
    }
  }

  render() {
    let redPellet = null;
    let pellet = null;
    let snek = (<View style={[styles.snek, { left: this.state.posX, top: this.state.posY,}]}>
      <Image source={require('../assets/gameplay/headUp.png')} style={[styles.snek, this.state.snakeHead]} resizeMode="stretch"/>
    </View>);

    let snekHeadBack = null;
    if (this.state.direction == CONSTANTS.DPADSTATES.UP) {
      snekHeadBack = (<View style={[styles.snekHeadBack, {
        left: this.boardXtoPosX(this.state.boardX),
        top: this.boardYtoPosY(this.state.boardY + 1),
      }]}></View>);
    } else if (this.state.direction == CONSTANTS.DPADSTATES.DOWN) {
      snekHeadBack = (<View style={[styles.snekHeadBack, {
        left: this.boardXtoPosX(this.state.boardX),
        top: this.boardYtoPosY(this.state.boardY - 1),
      }]}></View>);
    } else if (this.state.direction == CONSTANTS.DPADSTATES.RIGHT) {
      snekHeadBack = (<View style={[styles.snekHeadBack, {
        left: this.boardXtoPosX(this.state.boardX - 1),
        top: this.boardYtoPosY(this.state.boardY),
      }]}></View>);
    } else if (this.state.direction == CONSTANTS.DPADSTATES.LEFT) {
      snekHeadBack = (<View style={[styles.snekHeadBack, {
        left: this.boardXtoPosX(this.state.boardX + 1),
        top: this.boardYtoPosY(this.state.boardY),
      }]}></View>);
    }

    if (this.state.pelletLocation != null) {
      pellet = (<Animated.View style={[styles.pellet, {
        left: this.boardXtoPosX(this.state.pelletLocation.x),
        top: this.boardYtoPosY(this.state.pelletLocation.y),
        transform: [{rotate: this.spin()}],
      }]}>
        <Image source={require('../assets/gameplay/Diamond.png')} style={styles.pellet} resizeMode="stretch"/>
      </Animated.View>);
    }
    if (this.state.redPelletLocation) {
      redPellet = (<Animated.View style={[styles.redPellet, {
        left: this.boardXtoPosX(this.state.redPelletLocation.x),
        top: this.boardYtoPosY(this.state.redPelletLocation.y),
        transform: [{rotate: this.spin()}],
      }]}>
        <Image source={require('../assets/powerupsoverlay/mushroom_voilet.png')} style={styles.redPellet} resizeMode="stretch"/>
      </Animated.View>);
    }
    if (!this.state.alive) {
      snek = (<View style={[styles.snek, {
        left: this.state.posX,
        top: this.state.posY,
        backgroundColor: "#000",
      }]}></View>);
    }
    //let scoreBoardHeight = screenWidth*.757/3.6;
    return (
      <View
      //renderToHardwareTextureAndroid={true}
      style={[styles.gameBack, {/*transferX: this.boardShakeInterpolate()*/},]}>
        <ImageBackground source={require('../assets/gameplay/gameAreaBack.png')} style={styles.fieldBack}
                         resizeMode="stretch">
          <ScoreBoard
            score={this.state.score}
            easterEgg={this.easterEgg}
            loading={this.props.loading}
            user={this.props.user}/>
        </ImageBackground>
        <ImageBackground source={require('../assets/gameplay/gameArea.png')} style={styles.field} resizeMode="stretch"/>
        {this.state.tail.map((elem) => {
          return (elem);
        })}
        {snekHeadBack}
        {snek}
        {pellet}
        {redPellet}
        {this.wallComponents}
        <Dpad onDpadChange={this.props.onDpadChange} pressedButton={this.props.pressedButton}></Dpad>
        <Buttons running={this.props.running} powerUps={this.props.powerUps} pause={this.props.pause}></Buttons>
      </View>
    );
  }
}
let borderWidth = 5;
let boardWidth = CONSTANTS.BOARDWIDTH * CONSTANTS.SNEKSIZE + 2 * borderWidth + 2;
let boardHeight = CONSTANTS.BOARDHEIGHT * CONSTANTS.SNEKSIZE + 2 * borderWidth + 2;
let styles = StyleSheet.create({
  gameBack: {
    position: 'absolute',
    width: CONSTANTS.DEVICEWIDTH,
    height: CONSTANTS.DEVICEHEIGHT - CONSTANTS.STATUSBARHEIGHT,
    backgroundColor: "#FAB523",
  },
  fieldBack: {
    width: CONSTANTS.DEVICEWIDTH,
    //height: CONSTANTS.GAMEHEIGHT + CONSTANTS.SCOREBOARDHEIGHT + 6,
    height: CONSTANTS.DEVICEHEIGHT - CONSTANTS.DPADHEIGHT + 6
  },
  field: {
    width: CONSTANTS.GAMEWIDTH,
    backgroundColor: 'transparent',
    height: CONSTANTS.GAMEHEIGHT,
    position: "absolute",
    top: CONSTANTS.BOARDCENTERY - (0.5 * CONSTANTS.GAMEHEIGHT),
    //bottom: CONSTANTS.DPADMULT,
    left: (CONSTANTS.DEVICEWIDTH / 2) - (0.5 * CONSTANTS.GAMEWIDTH),
    zIndex: 2,
  },
  snek: {
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
  pellet: {
    position: "absolute",
    width: CONSTANTS.SNEKSIZE + 2,
    height: CONSTANTS.SNEKSIZE + 2,
    zIndex: 3,
    transform: [{rotate: '45deg'}],
  },
  redPellet: {
    position: "absolute",
    width: CONSTANTS.SNEKSIZE + 3,
    height: CONSTANTS.SNEKSIZE + 3,
    zIndex: 4,
    //tintColor: 'red'
  },
});
