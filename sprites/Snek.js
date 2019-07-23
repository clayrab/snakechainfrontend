import React from 'react';
import { Animated, View, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions, Text } from 'react-native';
import { Audio, Font } from 'expo';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

import SnekPart from './SnekPart.js'
import WallPart from './WallPart.js'
import ScoreBoard from './ScoreBoard.js'
import Buttons from './Buttons.js';
import Dpad from './Dpad.js';
import { normalize } from '../utils/FontNormalizer.js';

let easterEggCount = 0;
let dpadSize = CONSTANTS.DPADBUTTONSIZE * CONSTANTS.DPADMULT;
export default class Snek extends Sprite {
  // static contextTypes = {
  //   loop: PropTypes.object,
  //   pressedButton: PropTypes.number,
  //   running: PropTypes.bool,
  //   onDied: PropTypes.func,
  //   toggleReset: PropTypes.bool,
  // };
  frame = 0

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
      //redPelletLocation: null, //RED PELLET IS NOW PURPLE MUSHROOM!!
      pelletRot: new Animated.Value(0),
      boardShake: new Animated.Value(0),
      alive: true,
      snakeHead: { transform: [{ rotate: '0deg' }] },
      walls: [],
      mushrooms: {},
      speedEffector: 1,
      //renderTrigger: true, // Flip this to force a render. The cost of React Native for animation. This isn't great, but it helps.
      framerate: 0,
      fontStyle: {},
      fpsShow: false,
      headerOpen: true
    };
    this.boardState = [];
    this.wallComponents = [];
    this.edibles = []; //Managed through helper functions addEdible and removeEdible
    this.numberOfEdibles = 0;
    this.nextID = 0;
    this.state = this.copyDefaultState();
    this.state.toggleReset = props.toggleReset;
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
    this.framerateInterval = setInterval(() => {
      this.setState({framerate: this.frame});
      this.frame = 0;
    }, 1000)
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({
      fontStyle: {
        fontFamily: 'riffic-free-bold',
      }
    });
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
    clearInterval(this.framerateInterval)
  }

  // triggerRender = async() => {
  //   await this.setState({renderTrigger: !this.state.renderTrigger});
  // }
  //edibleTypesGraphics = { "GREENMUSH": require('../assets/powerupsoverlay/mushroom_voilet.png'), "PURPLEMUSH": 1, "REDMUSH": 2, "GOLDMUSH": 3, "BLUEMUSH": 4, "SKYBLUEMUSH": 5, "PLATINUMMUSH": 6, "PELLET": 7, };
  eatEdibleEvents = {
    "GREENMUSH": async () => {
      // bonus pellet chances:
      // 3 pellets : 50%
      // 5 pellets: 15%
      // 10 pellets: 5%
      // 10000 onchain: 1%
      // 1 ticket: 0.5%
      // 1 pellet: leftover %
      //
      // Additionally 20% chance to plant a random powerup mushroom.

      const chances = {
        "ticket": 0.0,
        "eth": 0.0,
        "snk": 1.005,
        "10": 0.05,
        "5": 0.15,
        "3": 0.50,
        "randmush": 0.20,
        //"1"       : 1.0, // Leftover chance. W guarantee to trigger the roll to this state by subtracting full 100%.
      };
      let rewards = Object.keys(chances);
      let roll = Math.random(); // pseudo-random number in the range [0, 1) (inclusive of 0, but not 1)
      let reward = null;
      let rewardsIndex = 0;
      let rollCountDown = roll;
      while (true) {
        if (!rewards[rewardsIndex]) {
          reward = "1";
          break;
        } else {
          rollCountDown = rollCountDown - chances[rewards[rewardsIndex]];
          if (rollCountDown < 0.0) {
            reward = rewards[rewardsIndex];
            break;
          }
          rewardsIndex++;
        }

      }
      console.log(reward)
      if (reward === "ticket") {
        console.log("reward ticket")
        // todo: ticket reward
      } else if (reward === "eth") {
        console.log("reward eth")
        // todo: onchain rewards.
      } else if (reward === "snk") {
        // TODO: THIS SHOULD BE ONCHAIN LIKE ETH REWARD
        // FOR NOW WE ARE JUST REWARDING "SNAKE GOLD"
        await this.setState({score: this.state.score + 10000,});
        // todo: onchain rewards.
      } else {
        await this.setState({score: this.state.score + parseInt(reward),});
      }
    },
    "PURPLEMUSH": async () => {
      // was red pellet
      await this.eatRedPellet();
    },
    "REDMUSH": async () => {
    },
    "GOLDMUSH": async () => {
    },
    "BLUEMUSH": async () => {
    },
    "SKYBLUEMUSH": async () => {
    },
    "PLATINUMMUSH": async () => {
    },
    "PELLET": async () => {
    },
  }

  // This.state.edibles is an array with nulls on the end. We want maximum speed rendering so it will render until it hit's null.
  // This.state.edibles never shrinks. Nulls from the end are swapped when removing and adding.
  edibleTypes = {
    "GREENMUSH": {
      png: require('../assets/powerupsoverlay/mushroom_yellow.png'),
    },
    "PURPLEMUSH": {
      png: require('../assets/powerupsoverlay/mushroom_voilet.png'),
    },
    "REDMUSH": {
      png: require('../assets/powerupsoverlay/mushroom_red.png'),
    },
    "GOLDMUSH": {
      png: require('../assets/powerupsoverlay/mushroom_yellow.png'),
    },
    "BLUEMUSH": {
      png: require('../assets/powerupsoverlay/mushroom_blue.png'),
    },
    "SKYBLUEMUSH": {
      png: require('../assets/powerupsoverlay/mushroom_blue.png'),
    },
    "PLATINUMMUSH": {
      png: require('../assets/powerupsoverlay/mushroom_blue.png'),
    },
    "PELLET": {
      png: "#0d0",
    },
  };
  makeEdibleStruct = (type, x, y) => {
    return {
      type: type,
      x: x,
      y: y,
    };
  }
  addEdible = (type, x, y) => {
    if (this.edibles.length > this.numberOfEdibles) {
      this.edibles[this.numberOfEdibles] = this.makeEdibleStruct(type, x, y);
    } else {
      this.edibles.push(this.makeEdibleStruct(type, x, y));
    }
    this.numberOfEdibles++;
  }
  removeEdible = async (index) => {
    if (this.numberOfEdibles > 0 &&
      this.edibles[index] !== null &&
      index <= this.numberOfEdibles &&
      this.numberOfEdibles <= this.edibles.length &&
      index <= this.edibles.length) {
      this.edibles[index] = this.edibles[this.numberOfEdibles - 1];
      this.edibles[this.numberOfEdibles - 1] = null;
      this.numberOfEdibles--;
    } else {
      throw "Error in edibles"
    }
  }
  eatEdible = async (x, y) => {
    for (let i = 0; i < this.edibles.length; i++) {
      if (x == this.edibles[i].x && y === this.edibles[i].y) {
        removeEdible(i);
        break;
        //component.forceUpdate(callback)
      }
    }
    //await this.triggerRender();
  }
  placeRandomEdible = (type) => {

  }
  placeEdible = async (type, location) => {
    this.addEdible(type, location.x, location.y);
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
    //startState.redPelletLocation = this.defaultState.redPelletLocation;
    startState.pelletRot = this.defaultState.pelletRot;
    startState.boardShake = this.defaultState.boardShake;
    //startState.baseScore = this.defaultState.baseScore;
    //startState.multiplier = this.defaultState.multiplier;
    startState.score = this.defaultState.score;
    startState.pelletCount = this.defaultState.pelletCount;
    startState.alive = this.defaultState.alive;
    startState.tail = this.makeTail(5, this.defaultState.boardX, this.defaultState.boardY);
    startState.tailIndex = 4;
    startState.snakeHead = { transform: [{ rotate: '0deg' }] };
    startState.walls = this.getRandomWalls();
    startState.speedEffector = this.defaultState.speedEffector;
    startState.toggleReset = this.props.toggleReset;
    return startState;
  }

  placeSnake = (board) => {
    for (var index3 = 0; index3 < this.state.tail.length - 1; index3++) {
      board[this.state.tail[index3].props.boardY][this.state.tail[index3].props.boardX] = "WALL";
    }
    return board;
  }

  resetBoard() {
    // Board is false in "safe" spots and true where the snake and walls are
    this.props.doResetDpad();
    let board = this.makeEmptyBoard();
    board = this.placeSnake(board);
    for (var yIndex = 0; yIndex < CONSTANTS.BOARDHEIGHT; yIndex++) {
      for (var xIndex = 0; xIndex < CONSTANTS.BOARDWIDTH; xIndex++) {
        if (this.state.walls[yIndex * 100 + xIndex]) {
          board[yIndex][xIndex] = "WALL";
        }
      }
    }
    this.boardState = board.slice(0); //copy board
    this.setWallComponents();
    this.edibles = [];
    this.numberOfEdibles = 0;
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
    this.setState({ alive: false });
    await this.playSound(this.sounds.DIE);
    await this.props.onDied(this.state.score);
  }

  hardReset = async () => {
    console.log("hardReset")
    var startState = this.copyDefaultState();
    // console.log("hardReset this.state.toggleReset")
    // console.log(this.props.toggleReset)
    // //startState.toggleReset = this.props.toggleReset;
    this.setState(startState);
    this.resetBoard();
    await this.placePellet();
  }

  onLeaveBoardTile(boardX, boardY) {
    this.boardState[boardY][boardX] = null;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  placePellet = async() => {

    console.log("placePellet")
    await this.setState({pelletLocation: this.randomLocation(),});
    //await this.setState({ redPelletLocation: this.randomLocation(), });
    this.placeEdible("PURPLEMUSH", this.randomLocation());
    if (this.props.mode === "SUPER SNAKE") {
      this.placeEdible("GREENMUSH", this.randomLocation());
    }
    // let isTail = true;
    // let isHead = undefined;
    // let x, y;
    // while (isTail || isHead) {
    //   x = this.getRandomInt(0, CONSTANTS.BOARDWIDTH - 1);
    //   y = this.getRandomInt(0, CONSTANTS.BOARDHEIGHT - 1);
    //   isTail = this.board[y][x];
    //   isHead = this.state.boardX === x && this.state.boardY === y;

    //
    // this.setState({
    //   pelletLocation: {x: x, y: y},
    //   redPelletLocation: null,
    // });

    // this.setState({
    //   pelletLocation: { x: x, y: y },
    //   redPelletLocation: this.randomRedPelletGenerate()
    // });

    if ((this.state.baseScore + 2) % 5 === 0) {
      //this.state.pelletRot.setValue(0);
      this.state.shakeBoard.setValue(0);
      //pelletRot
      //this.pelletAnim.start();
      this.boardShakeAnim.start();
    }
    // if ((this.state.baseScore + 2) % 5 === 0) {
    //   //this.state.pelletRot.setValue(0);
    //   this.state.shakeBoard.setValue(0);
    //   //this.pelletAnim.start();
    //   this.boardShakeAnim.start();
    // }
  }

  randomLocation = () => {
    let loc = {x: null, y: null};
    let isEmpty = true;
    let x, y;
    while (isEmpty) {
      x = this.getRandomInt(0, CONSTANTS.BOARDWIDTH - 1);
      y = this.getRandomInt(0, CONSTANTS.BOARDHEIGHT - 1);
      isEmpty = this.boardState[y][x];
    }
    return { x, y };
  }

  eatRedPellet = async () => {
    //this.setState({redPelletLocation: null});
    let addPointsPelletSound = async (howMany) => {
      setTimeout(async () => {
        await this.playSound(this.sounds.EAT_PELLET_1);
        setTimeout(async () => {
          await this.playSound(this.sounds.EAT_PELLET_1);
          setTimeout(async () => {
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
      }, {
        name: "speedup",
        weight: 20.0
      }, {
        name: "slowdown",
        weight: 30.0
      }, {
        name: "removetail",
        weight: 30.0
      }, {
        name: "sleepy",
        weight: 50.0
      }, {
        name: "addtail",
        weight: 30.0
      }, {
        name: "addpoints",
        weight: 30.0
      },
    ];
    const maxWeight = actions
      .map((obj) => { return obj.weight; })
      .reduce((total, weight) => { return total + weight; }); // sum of all weights
    let action = this.getRandomInt(1, maxWeight);
    let nextAction = 0;
    while (action >= 0) {
      action -= actions[nextAction].weight;
      nextAction++;
    }
    switch (actions[nextAction - 1].name) {
      case "die":
        this.die();
        break;
      case "speedup":
        this.setState({ speedEffector: 2 });
        setTimeout(() => this.setState({ speedEffector: 1 }), 5000);
        break;
      case "slowdown":
        this.setState({ speedEffector: 0.5 });
        setTimeout(() => this.setState({ speedEffector: 1 }), 8666);
        break;
      case "removetail":
        let howLong = this.getRandomInt(3, 10);
        this.reduceTail(howLong);
        break;
      case "addtail":
        let howLong2 = this.getRandomInt(3, 10);
        for (var i = 0; i < howLong2; i++) {
          this.growTail();
        }
        break;
      case "addpoints":
        addPointsPelletSound(3);
        this.setState({ score: this.state.score + CONSTANTS.REDPELLETSCOREBONUS * CONSTANTS.PELLETMULT });
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
    while (scoreCountdown >= 0 && growLength < 5) {
      growLength++;
      scoreCountdown = scoreCountdown - (10 * CONSTANTS.PELLETMULT);
    }
    for (let i = 0; i < growLength; i++) {
      this.growTail();
    }
    this.placePellet();
    this.setState({ score: this.state.score + (CONSTANTS.PELLETMULT * growLength), pelletCount: this.state.pelletCount + 1 });
  }

  makeEmptyBoard = () => {
    let board = [];
    for (var index1 = 0; index1 < CONSTANTS.BOARDHEIGHT; index1++) {
      let row = [];
      for (var index2 = 0; index2 < CONSTANTS.BOARDWIDTH; index2++) {
        row.push(null);
      }
      board.push(row);
    }
    return board;
  }

  reduceTail = async (howMuch) => {
    if (this.state.tail.length > 0) {
      howMuch = howMuch > this.state.tail.length - 1 ? this.state.tail.length - 1 : howMuch;
      let newTailStart = this.state.tail.slice(0, this.state.tailIndex + 1);
      let newTailEnd = this.state.tail.slice(this.state.tailIndex + 1, this.state.tail.length);
      //let lastTailPart = this.state.tail[this.state.tailIndex];
      while (howMuch > 0) {
        if (newTailStart.length > 0) {
          let lastPart = newTailStart[newTailStart.length - 1];
          this.boardState[lastPart.props.boardY][lastPart.props.boardX] = null;
          newTailStart = newTailStart.slice(0, -1);
        } else {
          let lastPart = newTailEnd[newTailEnd.length - 1];
          this.boardState[lastPart.props.boardY][lastPart.props.boardX] = null;
          newTailEnd = newTailEnd.slice(0, -1);
        }
        howMuch--;
      }
      let newTailIndex = 0;
      if (newTailStart.length > 0) {
        newTailIndex = newTailStart.length - 1;
      } else {
        newTailIndex = newTailEnd.length - 1;
      }
      let newTail = newTailStart.concat(newTailEnd);
      await this.setState({ tail: newTail, tailIndex: newTailIndex });
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
      this.setState({ tail: newTailStart, tailIndex: newTailIndex });
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
      this.setState({ tail: newTail, tailIndex: newTailIndex });
    }
  }

  moveTail = async (direction) => {
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
    await this.setState({ tailIndex: newTailIndex, posX: newPosX, posY: newPosY });
  }

  onBoardTile(boardX, boardY) {
    if (this.state.pelletLocation) {
      if (this.state.pelletLocation.x == boardX && this.state.pelletLocation.y == boardY) {
        this.eatPellet();
      }
    }
    for (let i = 0; i < this.edibles.length; i++) {
      if (this.edibles[i]) {
        if (this.edibles[i].x === boardX && this.edibles[i].y === boardY) {
          this.eatEdibleEvents[this.edibles[i].type]();
          this.removeEdible(i);
          break;
        }
      } else {
        break;
      }
    }

    // if (this.state.redPelletLocation &&
    //   this.state.redPelletLocation.x === boardX &&
    //   this.state.redPelletLocation.y === boardY) {
    //   this.eatRedPellet();
    // }
    this.boardState[boardY][boardX] = "WALL";
  }

  goUp() {
    this.moveTail(CONSTANTS.DPADSTATES.UP);
    if (this.state.boardY - 1 < 0) {
      this.die();
    } else if (this.boardState[this.state.boardY - 1][this.state.boardX] === "WALL") {
      this.die();
    } else {
      this.onBoardTile(this.state.boardX, this.state.boardY - 1);
      this.setState({
        direction: CONSTANTS.DPADSTATES.UP,
        boardY: this.state.boardY - 1,
        snakeHead: { transform: [{ rotate: '0deg' }] }
      });
    }
  }

  goDown() {
    this.moveTail(CONSTANTS.DPADSTATES.DOWN);
    if (this.state.boardY + 1 > CONSTANTS.BOARDHEIGHT - 1) {
      this.die();
    } else if (this.boardState[this.state.boardY + 1][this.state.boardX] === "WALL") {
      this.die();
    } else {
      this.onBoardTile(this.state.boardX, this.state.boardY + 1);
      this.setState({
        direction: CONSTANTS.DPADSTATES.DOWN,
        boardY: this.state.boardY + 1,
        snakeHead: { transform: [{ rotate: '180deg' }] }
      });
    }
  }

  goLeft() {
    this.moveTail(CONSTANTS.DPADSTATES.LEFT);
    if (this.state.boardX - 1 < 0) {
      this.die();
    } else if (this.boardState[this.state.boardY][this.state.boardX - 1] === "WALL") {
      this.die();
    } else {
      this.onBoardTile(this.state.boardX - 1, this.state.boardY);
      this.setState({
        direction: CONSTANTS.DPADSTATES.LEFT,
        boardX: this.state.boardX - 1,
        snakeHead: { transform: [{ rotate: '270deg' }] }
      });
    }
  }

  goRight() {
    this.moveTail(CONSTANTS.DPADSTATES.RIGHT);
    if (this.state.boardX + 1 > CONSTANTS.BOARDWIDTH - 1) {
      this.die();
    } else if (this.boardState[this.state.boardY][this.state.boardX + 1] === "WALL") {
      this.die();
    } else {
      this.onBoardTile(this.state.boardX + 1, this.state.boardY);
      this.setState({
        direction: CONSTANTS.DPADSTATES.RIGHT,
        boardX: this.state.boardX + 1,
        snakeHead: { transform: [{ rotate: '90deg' }] }
      });
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
    if (easterEggCount === 6) {
      this.setState({ fpsShow: true, });
    }
  }

  update = async () => {
    this.frame++;
    if (this.state.toggleReset !== this.props.toggleReset) { // player reset game
      await this.hardReset();
    }
    if (this.props.running) {
      if (!this.state.alive) { //player tried to start the game without reset
        this.die();
      }
      // if (this.state.pelletLocation == null) {
      //   this.placePellet();
      // }
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
          // let rushEffect = 1.0;
          // if(this.props.mode === "SNAKE RUSH"){
          //   rushEffect += this.state.pelletCount/10.0;
          // }
          var speed = CONSTANTS.SNEKSPEED * (now - this.lastFrameTime) * this.state.speedEffector;
        }
        this.lastFrameTime = now;
        if (this.state.direction == CONSTANTS.DPADSTATES.UP) {
          this.setState({ posY: this.state.posY - speed });
        } else if (this.state.direction == CONSTANTS.DPADSTATES.DOWN) {
          this.setState({ posY: this.state.posY + speed });
        } else if (this.state.direction == CONSTANTS.DPADSTATES.RIGHT) {
          this.setState({ posX: this.state.posX + speed });
        } else if (this.state.direction == CONSTANTS.DPADSTATES.LEFT) {
          this.setState({ posX: this.state.posX - speed });
        }
      }
    }
  }
    // TODO: Maintain the framerate

  toggleHeader = () => {
    this.setState({ headerOpen: !this.state.headerOpen })
  }

  render() {
    let redPellet = null;
    let pellet = null;
    let snek = (<View style={[styles.snek, { left: this.state.posX, top: this.state.posY, }]}>
      <Image source={require('../assets/gameplay/headUp.png')} style={[styles.snek, this.state.snakeHead]} resizeMode="stretch" />
    </View>);
    //TODO: Move this to an event that triggers when this.state.direction or boardX or boardY changes.
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
        transform: [{ rotate: this.spin() }],
      }]}>
        <Image source={require('../assets/gameplay/Diamond.png')} style={styles.pellet} resizeMode="stretch" />
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
        style={[styles.gameBack, {/*transferX: this.boardShakeInterpolate()*/ },]}>
        <ImageBackground source={require('../assets/gameplay/Background.png')} style={styles.fieldBack}
          resizeMode="stretch">
         <ScoreBoard
          score={this.state.score}
          easterEgg={this.easterEgg}
          loading={this.props.loading}
          user={this.props.user} />
        </ImageBackground>
        <ImageBackground source={require('../assets/gameplay/gameArea.png')} style={styles.field} resizeMode="stretch"/>
        {/* <ImageBackground source={require('../assets/gameplay/Background.png')} style={styles.field} resizeMode="stretch" /> */}
        {
          this.state.tail.map((elem) => {
            return (elem);
          })
        }
        {snekHeadBack}
        {snek}
        {!this.edibles ? null :
          this.edibles.map((edible, idx) => {
            if (!edible) {
              return (null);
            } else {
              return (
                <Animated.View key={idx} style={[styles.redPellet, {
                  left: this.boardXtoPosX(this.edibles[idx].x),
                  top: this.boardYtoPosY(this.edibles[idx].y),
                }]}>
                  <Image source={this.edibleTypes[edible.type].png} style={styles.redPellet} resizeMode="stretch"/>
                </Animated.View>
              );
            }
          })
        }
        {pellet}
        { (!this.state.fpsShow) ? null :
          <View style={styles.framerateContainer}>
            <Text style={styles.framerateText}>{this.state.framerate} FPS</Text>
          </View>
        }
        {this.wallComponents}
        <View style={styles.controllerOuterContainer}>
          <View style={styles.controllerContainer}>
            <View style={styles.mushroomRow}>
              <TouchableOpacity>
                <Image source={require("../assets/gameplay/MGold.png")} style={styles.mushroomImage} />
                <ImageBackground source={require("../assets/gameplay/MushroomCountHolder.png")} style={styles.mushroomCountHolder}>
                  <Text style={[this.state.fontStyle, styles.mushroomText]}>1</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require("../assets/gameplay/MBlue.png")} style={styles.mushroomImage} />
                <ImageBackground source={require("../assets/gameplay/MushroomCountHolder.png")} style={styles.mushroomCountHolder}>
                  <Text style={[this.state.fontStyle, styles.mushroomText]}>2</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require("../assets/gameplay/MPink.png")} style={styles.mushroomImage} />
                <ImageBackground source={require("../assets/gameplay/MushroomCountHolder.png")} style={styles.mushroomCountHolder}>
                  <Text style={[this.state.fontStyle, styles.mushroomText]}>3</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require("../assets/gameplay/MRed.png")} style={styles.mushroomImage} />
                <ImageBackground source={require("../assets/gameplay/MushroomCountHolder.png")} style={styles.mushroomCountHolder}>
                  <Text style={[this.state.fontStyle, styles.mushroomText]}>4</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <Image source={require("../assets/gameplay/MushroomsHolder.png")} style={styles.mushroomHolder} />
          </View>
          <View style={styles.controllerExtraBtns}>
            <TouchableOpacity style={{}}>
              <Image source={require("../assets/gameplay/SnowButton.png")} style={styles.snowButton} />
            </TouchableOpacity>
            <Dpad onDpadChange={this.props.onDpadChange} pressedButton={this.props.pressedButton}></Dpad>
            <TouchableOpacity>
              <Image source={require("../assets/gameplay/MushroomButton.png")} style={styles.mushroomButton} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Buttons running={this.props.running} powerUps={this.props.powerUps} pause={this.props.pause}></Buttons> */}
      </View >
    );
  }
}

let borderWidth = 5;
let boardWidth = CONSTANTS.BOARDWIDTH * CONSTANTS.SNEKSIZE + 2 * borderWidth + 2;
let boardHeight = CONSTANTS.BOARDHEIGHT * CONSTANTS.SNEKSIZE + 2 * borderWidth + 2;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height
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
    height: CONSTANTS.DEVICEHEIGHT - CONSTANTS.DPADHEIGHT + 6,
    zIndex: 2,
  },
  field: {
    width: CONSTANTS.GAMEWIDTH,
    backgroundColor: 'transparent',
    height: CONSTANTS.GAMEHEIGHT,
    position: "absolute",
    top: CONSTANTS.BOARDCENTERY - (0.5 * CONSTANTS.GAMEHEIGHT),
    left: (0.5 * CONSTANTS.DEVICEWIDTH) - (0.5 * CONSTANTS.GAMEWIDTH),
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
    transform: [{ rotate: '45deg' }],
  },
  redPellet: {
    position: "absolute",
    width: CONSTANTS.SNEKSIZE + 3,
    height: CONSTANTS.SNEKSIZE + 3,
    zIndex: 4,
    //tintColor: 'red'
  },
  framerateContainer: {
    position: 'absolute',
    top: 70,
    left: 10,
    zIndex: 4000,
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 5
  },
  framerateText: {
    color: "#FFFFFF"
  },
  snowButton: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
  },
  mushroomButton: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
  },
  headerBackground: {
    position: 'absolute',
    width: screenWidth,
    height: 185,
    resizeMode: 'contain'
  },
  dropdown: {
    position: 'absolute',
    top: 155,
    left: (screenWidth / 2) - 20
  },
  dropdownImage: {
    width: 40, height: 40, resizeMode: 'contain',
  },
  timer: { width: screenWidth, position: 'absolute', top: 200, justifyContent: 'center', alignItems: 'center' },
  timerText: { fontSize: normalize(20), color: "#1D1511" },

  contentOpen: {
    flexDirection: 'row', padding: 10, paddingBottom: 0, justifyContent: "space-between", alignItems: 'center',
  },
  pauseButtonImage: { width: screenWidth * 0.13, height: screenWidth * 0.13, resizeMode: 'contain' },
  gameplayHolderImage: {
    width: screenWidth * 0.38,
    height: screenWidth * 0.11,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  amountImage: { width: screenWidth * 0.06, height: screenWidth * 0.06, resizeMode: 'contain' },
  amountText: { fontSize: normalize(16), color: "#F7B324", marginLeft: 10 },
  amountAddTouchable: { position: 'absolute', right: -10, top: -2 },
  amountAdd: { width: screenWidth * 0.1, height: screenWidth * 0.12, resizeMode: 'contain' },

  levelInfoRow: { flexDirection: 'row', padding: 10, justifyContent: "space-between", alignItems: 'center' },
  levelScoreBackground: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.09,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  levelTitle: { color: "#FAB523", fontSize: normalize(15) },
  levelValue: { color: "#FFFFFF", fontSize: normalize(15) },

  levelLastRow: { flexDirection: 'row', paddingHorizontal: 10, justifyContent: "space-between", alignItems: 'center' },
  levelM: { color: "#352927", fontSize: normalize(16) },

  wideHeaderInfoBG: {
    width: screenWidth * 0.75,
    height: screenWidth * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  inlineText: { color: "#FAB523", fontSize: normalize(14) },
  inlineImage: { width: screenWidth * 0.05, height: screenWidth * 0.05, resizeMode: 'contain', marginHorizontal: 5 },
  controllerOuterContainer: {
    zIndex: 10000,
  },
  controllerContainer: {
    position: 'absolute',
    top: screenWidth * -0.117,
    zIndex: 10000,
    alignItems: 'center'
  },
  mushroomRow: {
    bottom: 15,
    zIndex: 10001,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: screenWidth * 0.82,
    position: 'absolute',
    opacity: 0.4,
  },
  mushroomImage: { width: screenWidth * 0.2, height: screenWidth * 0.2, resizeMode: 'contain' },

  mushroomCountHolder: { position: 'absolute', top: 0, left: (screenWidth * 0.1) - 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  mushroomHolder: { width: screenWidth, height: screenWidth * 0.117, resizeMode: 'contain' },
  mushroomText: {
    fontSize: normalize(12)
  },
  controllerExtraBtns: {
    height: dpadSize * 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },


});
