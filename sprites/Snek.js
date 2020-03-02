import React from 'react';
import { Animated, View, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions, Text } from 'react-native';
import { Audio } from 'expo';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import CONSTANTS from '../Constants.js';

import SnekHead from './SnekHead.js'
import SnekPart from './SnekPart.js'
import WallPart from './WallPart.js'
import ScoreBoard from './ScoreBoard.js'
import Buttons from './Buttons.js';
import Dpad from './Dpad.js';
import { normalize } from '../utils/FontNormalizer.js';
import { doPostFetch } from '../utils/Network.js';
import { getFromAsyncStore } from "../utils/AsyncStore.js";
import { context } from "../utils/Context.js";

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
    console.log("snek constructor")
    super(props);
    this.state = {
      boardX: CONSTANTS.BOARDSIZEX - 1,
      boardY: CONSTANTS.BOARDHEIGHT - 6,
      direction: CONSTANTS.DPADSTATES.UP,
      tailIndex: -1, //TAILINDEX ALWAYS POINTS TO THE END OF THE TAIL. THE ARRAY IS NOT IN THE SAME ORDER AS THE TAIL.
      //tail: [], //DO NOT SET THE TAIL OR TAILINDEX WITHOUT FIXING THE BOARD. USE EXISTING FUNCTIONS.
      // baseScore: 0,
      // multiplier: 1,
      score: 0,
      pelletCount: 0,
      yellowPowerupCount: 0,
      orangePowerupCount: 0,
      redPowerupCount: 0,
      bluePowerupCount: 0,
      lightningPowerupCount: 0,
      lightningFreeMushCount: 0,
      lightningSpeedUpCount: 0,
      lightningSleepyCount: 0,
      lightningMoreTailCount: 0,
      //pelletLocation: null,
      //redPelletLocation: null, //RED PELLET IS NOW PURPLE MUSHROOM!!
      pelletRot: new Animated.Value(0),
      boardShake: new Animated.Value(0),
      alive: true,
      snakeHeadStyle: { transform: [{ rotate: '0deg' }] },
      //walls: [],
      speedEffector: 1.0,
      orangeMode: false,
      //renderTrigger: true, // Flip this to force a render. The cost of React Native for animation. This isn't great, but it helps.
      framerate: 0,
      fpsShow: false,
      headerOpen: true,
    };
    this.nextID = 0;
    this.state.tail = this.makeTail(5, this.state.boardX, this.state.boardY);
    this.state.tailIndex = 4;
    this.state.walls = this.getRandomWalls(props);
    this.boardState = [];
    this.wallComponents = [];
    this.edibles = []; //Managed through helper functions addEdible and removeEdible
    this.numberOfEdibles = 0;
    //this.state = this.copyDefaultState();
    //this.state.toggleReset = props.toggleReset;
    this.resetBoard();
    this.placePellet();
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
    //this.context.loop.subscribe(this.update);
    this.framerateInterval = setInterval(() => {
      this.setState({framerate: this.frame});
      this.frame = 0;
    }, 1000);
  }

  componentWillUnmount() {
    //this.context.loop.unsubscribe(this.update);
    clearInterval(this.framerateInterval)
  }
  countFrame = () => {
    this.frame++;
  }
  // triggerRender = async() => {
  //   await this.setState({renderTrigger: !this.state.renderTrigger});
  // }
  //edibleTypesGraphics = { "GREENMUSH": require('../assets/powerupsoverlay/mushroom_voilet.png'), "LIGHTNINGBOLT": 1, "REDMUSH": 2, "GOLDMUSH": 3, "BLUEMUSH": 4, "SKYBLUEMUSH": 5, "PLATINUMMUSH": 6, "PELLET": 7, };
  eatEdibleEvents = {

    "LIGHTNINGBOLT": async () => {
      // was red pellet
      await this.setState( { lightningPowerupCount: this.state.lightningPowerupCount + 1 } );
      await this.eatLightning();
    },
    "REDPOWERUP": async () => {
      await this.setState({ speedEffector: 0.5, redPowerupCount: this.state.redPowerupCount + 1 });
      setTimeout(() => this.setState({ speedEffector: 1 }), 15000);
    },
    "YELLOWPOWERUP": async () => {
      await this.setState( { yellowPowerupCount: this.state.yellowPowerupCount + 1 } );
      let howLong = this.getRandomInt(5, 10);
      this.reduceTail(howLong);
      console.log("wtf " + this.state.tailIndex)
    },
    "ORANGEPOWERUP": async () => {
      await this.setState({ orangeMode: true, orangePowerupCount: this.state.orangePowerupCount + 1  });
      setTimeout(() => this.setState({ orangeMode: false }), 15000);
    },
    "BLUEPOWERUP": async () => {
      await this.setState( { bluePowerupCount: this.state.bluePowerupCount + 1 } );
      let howMany = this.getRandomInt(3, 5);
      while (howMany > 0) {
        this.placeEdible("PELLET", this.randomLocation());
        howMany--;
      }
    },
    "PELLET": async () => {
      await this.eatPellet();
    },
  }

  // This.state.edibles is an array with nulls on the end. We want maximum speed rendering so it will render until it hit's null.
  // This.state.edibles never shrinks. Nulls from the end are swapped when removing and adding.
  edibleTypes = {
    // "GREENMUSH": {
    //   png: require('../assets/powerupsoverlay/mushroom_yellow.png'),
    // },
    "LIGHTNINGBOLT": {
      png: require('../assets/powerupsoverlay/powerup.png'),
    },
    "REDPOWERUP":  {
      png: require('../assets/powerupsoverlay/mushroom_red.png'),
    },
    "YELLOWPOWERUP": {
      png: require('../assets/powerupsoverlay/mushroom_yellow.png'),
    },
    "ORANGEPOWERUP": {
      png: require('../assets/powerupsoverlay/mushroom_voilet.png'),
    },
    "BLUEPOWERUP": {
      png: require('../assets/powerupsoverlay/mushroom_blue.png'),
    },
    "PELLET": {
      png: "pellet",
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
    this.boardState[y][x] = "EDIBLE";
  }
  removeEdible = async (index) => {
    if (this.numberOfEdibles > 0 &&
        this.edibles[index] !== null &&
        index <= this.numberOfEdibles &&
        this.numberOfEdibles <= this.edibles.length &&
        index <= this.edibles.length) {
      this.boardState[this.edibles[index].y][this.edibles[index].x] = null;
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
        toggleUpdate={true}
        orangeMode={this.state.orangeMode}>
        direction={CONSTANTS.DPADSTATES.UP}></SnekPart>);
    }
    return newTail;
  }

  // copyDefaultState() {
  //   console.log("copyDefaultState")
  //   let startState = {};
  //   // startState.snakePosX = this.defaultState.snakePosX;
  //   // startState.snakePosY = this.defaultState.snakePosY;
  //   startState.direction = this.defaultState.direction;
  //   startState.boardX = this.defaultState.boardX;
  //   startState.boardY = this.defaultState.boardY;
  //   //startState.pelletLocation = this.defaultState.pelletLocation;
  //   //startState.redPelletLocation = this.defaultState.redPelletLocation;
  //   startState.pelletRot = this.defaultState.pelletRot;
  //   startState.boardShake = this.defaultState.boardShake;
  //   //startState.baseScore = this.defaultState.baseScore;
  //   //startState.multiplier = this.defaultState.multiplier;
  //   startState.score = this.defaultState.score;
  //   startState.pelletCount = this.defaultState.pelletCount;
  //   startState.pelletCount = this.defaultState.score;
  //
  //   pelletCount: 0,
  //   powerupCounts: {
  //     yellow: 0,
  //     orange: 0,
  //     red: 0,
  //     blue: 0,
  //     lightning: 0,
  //   },
  //
  //   powerupCounts: {
  //     yellow: 0,
  //     orange: 0,
  //     red: 0,
  //     blue: 0,
  //     lightning: 0,
  //   },
  //
  //
  //   startState.pelletCount = this.defaultState.pelletCount;
  //   startState.alive = this.defaultState.alive;
  //   startState.tail = this.makeTail(5, this.defaultState.boardX, this.defaultState.boardY);
  //   startState.tailIndex = 4;
  //   startState.snakeHeadStyle = { transform: [{ rotate: '0deg' }] };
  //   startState.walls = this.getRandomWalls();
  //   startState.speedEffector = this.defaultState.speedEffector;
  //   startState.orangeMode = this.defaultState.orangeMode;
  //   //startState.toggleReset = this.props.toggleReset;
  //   return startState;
  // }

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
  getRandomWalls = (props) => {
    let newWalls = [];
    if (props.level === CONSTANTS.LEVELS.BLOCK1) {
      for (let i = 0; i < 12; i++) {
        newWalls = this.makeTetrisBlock(4, newWalls);
      }
    } else if (props.level === CONSTANTS.LEVELS.BLOCK2) {
      for (let i = 0; i < 12; i++) {
        newWalls = this.makeTetrisBlock(4, newWalls);
      }
      for (let i = 0; i < 4; i++) {
        newWalls = this.makeTetrisBlock(5, newWalls);
      }
    } else if (props.level === CONSTANTS.LEVELS.BLOCK3) {
      for (let i = 0; i < 8; i++) {
        newWalls = this.makeTetrisBlock(4, newWalls);
      }
      for (let i = 0; i < 4; i++) {
        newWalls = this.makeTetrisBlock(5, newWalls);
      }
      for (let i = 0; i < 4; i++) {
        newWalls = this.makeTetrisBlock(6, newWalls);
      }
    } else if (props.level === CONSTANTS.LEVELS.SCATTER1) {
      for (let i = 0; i < 12; i++) {
        newWalls = this.makeScatterShot(newWalls);
      }
    } else if (props.level === CONSTANTS.LEVELS.SCATTER2) {
      for (let i = 0; i < 24; i++) {
        newWalls = this.makeScatterShot(newWalls);
      }
    } else if (props.level === CONSTANTS.LEVELS.SCATTER3) {
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
    console.log("+++++++++++++++++ die +++++++++++++++++")
    await this.setState({ alive: false });
    await this.playSound(this.sounds.DIE);
    await this.props.onDied({
      score: this.state.score,
      pelletCount: this.state.pelletCount,
      yellowPowerupCount: this.state.yellowPowerupCount,
      orangePowerupCount: this.state.orangePowerupCount,
      redPowerupCount: this.state.redPowerupCount,
      bluePowerupCount: this.state.bluePowerupCount,
      lightningPowerupCount: this.state.lightningPowerupCount,
    });
  }

  // hardReset = async () => {
  //   var startState = this.copyDefaultState();
  //   this.setState(startState);
  //   this.resetBoard();
  //   await this.placePellet();
  // }

  onLeaveBoardTile(boardX, boardY) {
    this.boardState[boardY][boardX] = null;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  placePellet = async() => {
    //await this.setState({pelletLocation: this.randomLocation(),});
    //await this.setState({ redPelletLocation: this.randomLocation(), });
    this.placeEdible("PELLET", this.randomLocation());
    this.placeEdible("LIGHTNINGBOLT", this.randomLocation());
    //this.placeEdible("YELLOWPOWERUP", this.randomLocation());
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
  pickRandomAction = (actions) => {
    // Returns index of randomly chosen action based on weights
    // actions = [ {  name: <string>, weight: <Number>}, {...}, ...]
    let maxWeight = actions
      .map((obj) => { return obj.weight; })
      .reduce((total, weight) => { return total + weight; }); // sum of all weights
    let randomWeight = this.getRandomInt(1, maxWeight);
    let nextAction = 0;
    while (randomWeight > 0.0) {
      randomWeight -= actions[nextAction].weight;
      nextAction++;
    }
    return nextAction - 1;
  }
  eatLightning = async () => {
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
    let actions = [
      { name: "speedup", weight: 20.0 },
      { name: "sleepy", weight: 50.0 },
      { name: "addtail", weight: 30.0 },
      { name: "freemush", weight: 90.0 },
    ];
    let randomActionIndex = this.pickRandomAction(actions);
    switch (actions[randomActionIndex].name) {
      case "speedup":
        this.setState({lightningSpeedUpCount: this.state.lightningSpeedUpCount + 1 });
        this.setState({ speedEffector: 2 });
        setTimeout(() => this.setState({ speedEffector: 1 }), 5000);
        break;
      case "addtail":
        this.setState({lightningMoreTailCount: this.state.lightningMoreTailCount + 1 });
        let howLong2 = this.getRandomInt(3, 10);
        for (var i = 0; i < howLong2; i++) {
          this.growTail();
        }
        break;
      case "sleepy":
        this.setState({lightningSleepyCount: this.state.lightningSleepyCount + 1 });
        this.props.showCowOverlay();
        setTimeout(this.props.hideCowOverlay, 8000);
        break;
      case "freemush":
        this.setState({lightningFreeMushCount: this.state.lightningFreeMushCount + 1 });
        let powerupActions = [
          { name: "YELLOWPOWERUP", weight: 1.0 },
          { name: "REDPOWERUP", weight: 1.0 },
          { name: "ORANGEPOWERUP", weight: 1.0 },
          { name: "BLUEPOWERUP", weight: 1.0 },
        ];
        let randomPowerupIndex = this.pickRandomAction(powerupActions);
        this.usePowerup(powerupActions[randomPowerupIndex].name, this.randomLocation());
        break;
    }
  }

  eatPellet = async () => {
    await this.playSound(this.sounds.EAT_PELLET_1);
    // let growLength = 0;
    // let scoreCountdown = this.state.score;
    // while (scoreCountdown >= 0 && growLength < 5) {
    //   growLength++;
    //   let mult = this.state.orangeMode ? 2.0 : 1.0;
    //   scoreCountdown = scoreCountdown - (10 * CONSTANTS.PELLETMULT * mult);
    // }
    // for (let i = 0; i < growLength; i++) {
    //   this.growTail();
    // }
    let mult = this.state.orangeMode ? CONSTANTS.ORANGEPELLETBONUS : 1.0;
    let score = (CONSTANTS.PELLETMULT * mult);
    this.placePellet();
    this.growTail();
    this.setState({ score: this.state.score + score, pelletCount: this.state.pelletCount + 1 });
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
    if (this.state.tail.length > 1) {
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
    // TailIndex is the last part of the tail. We snip the tail at TailIndex,
    // push a new part into the middle of the array(the end of the tail),
    // and then concat the arrays back together.
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
    return newTailIndex;
    //await this.setState({ tailIndex: newTailIndex, });
  }

  onBoardTile(boardX, boardY) {
    //TODO: THE STATE "EDIBLE" IS NOW STORED IN BOARD, NO NEED TO ITERATE EDIBLES
    if(this.boardState[boardY][boardX] === "EDIBLE") {
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
    }
    this.boardState[boardY][boardX] = "WALL";
  }

  goUp = async() => {
    let newTailIndex = await this.moveTail(CONSTANTS.DPADSTATES.UP);
    await this.setState({tailIndex: newTailIndex, });
    if (this.state.boardY - 1 < 0) {
      await this.die();
    } else if (this.boardState[this.state.boardY - 1][this.state.boardX] === "WALL" && !this.state.orangeMode) {
      await this.die();
    } else {
      this.onBoardTile(this.state.boardX, this.state.boardY - 1);
      await this.setState({
        direction: CONSTANTS.DPADSTATES.UP,
        boardY: this.state.boardY - 1,
        snakeHeadStyle: { transform: [{ rotate: '0deg' }] },
      });
    }
  }

  goDown = async() => {
    let newTailIndex = await this.moveTail(CONSTANTS.DPADSTATES.DOWN);
    await this.setState({tailIndex: newTailIndex, });
    if (this.state.boardY + 1 > CONSTANTS.BOARDHEIGHT - 1) {
      await this.die();
    } else if (this.boardState[this.state.boardY + 1][this.state.boardX] === "WALL" && !this.state.orangeMode) {
      await this.die();
    } else {
      this.onBoardTile(this.state.boardX, this.state.boardY + 1);
      await this.setState({
        direction: CONSTANTS.DPADSTATES.DOWN,
        boardY: this.state.boardY + 1,
        snakeHeadStyle: { transform: [{ rotate: '180deg' }] },
      });
    }
  }

  goLeft = async() => {
    let newTailIndex = await this.moveTail(CONSTANTS.DPADSTATES.LEFT);
    await this.setState({tailIndex: newTailIndex, });
    if (this.state.boardX - 1 < 0) {
      await this.die();
    } else if (this.boardState[this.state.boardY][this.state.boardX - 1] === "WALL" && !this.state.orangeMode) {
      await this.die();
    } else {
      this.onBoardTile(this.state.boardX - 1, this.state.boardY);
      await this.setState({
        direction: CONSTANTS.DPADSTATES.LEFT,
        boardX: this.state.boardX - 1,
        snakeHeadStyle: { transform: [{ rotate: '270deg' }] },
      });
    }
  }

  goRight = async() =>  {
    let newTailIndex = await this.moveTail(CONSTANTS.DPADSTATES.RIGHT);
    await this.setState({tailIndex: newTailIndex, });
    if (this.state.boardX + 1 > CONSTANTS.BOARDWIDTH - 1) {
      await this.die();
    } else if (this.boardState[this.state.boardY][this.state.boardX + 1] === "WALL" && !this.state.orangeMode) {
      await this.die();
    } else {
      this.onBoardTile(this.state.boardX + 1, this.state.boardY);
      await this.setState({
        direction: CONSTANTS.DPADSTATES.RIGHT,
        boardX: this.state.boardX + 1,
        snakeHeadStyle: { transform: [{ rotate: '90deg' }] },
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
  toggleHeader = () => {
    this.setState({ headerOpen: !this.state.headerOpen })
  }
  serverError = async() => {
    await alert("Disconnected");
    //await this.hardReset();
    // TODO: send a reset back from app.js!!!!
    this.props.authorizationError();
  }
  usePowerup = async(powerupName, location) => {
    let powerupNameLower = powerupName.toLowerCase();
    if (this.props.user.powerups[powerupNameLower] > 0) {
      this.placeEdible(powerupName, location);
      this.props.consumePowerup(powerupNameLower);
      try {
        let jwt = await getFromAsyncStore("jwt");
        if(!jwt) {
          this.serverError();
        }
        await doPostFetch(`${context.host}:${context.port}/usePowerup`, jwt, {powerup: powerupNameLower})
      } catch (err) {
        this.serverError();
      }
    }
  }
  yellowPowerup = () => {
    this.usePowerup("YELLOWPOWERUP", this.randomLocation());
  }
  redPowerup = () => {
    this.usePowerup("REDPOWERUP", this.randomLocation());
  }
  orangePowerup = () => {
    this.usePowerup("ORANGEPOWERUP", this.randomLocation());
  }
  bluePowerup = () => {
    this.usePowerup("BLUEPOWERUP", this.randomLocation());
  }
  render() {
    if(CONSTANTS.LOGRENDERMETHODS) {
      var now = Date.now();
      console.log("Snek render " + now);
    }
    // if (this.state.toggleReset !== this.props.toggleReset) { // player reset game
    //   this.hardReset();
    // }
    let redPellet = null;
    let pellet = null;
    //TODO: Move this to an event that triggers when this.state.direction or boardX or boardY changes.

    let snekHeadBack = (
    <View style={[styles.snekHeadBack, {
      left: this.boardXtoPosX(this.state.boardX),
      top: this.boardYtoPosY(this.state.boardY),
    }]}></View>);
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
    return (
      <View
        //renderToHardwareTextureAndroid={true}
        style={[styles.gameBack, {/*transferX: this.boardShakeInterpolate()*/ },]}>
        <ImageBackground source={require('../assets/gameplay/Background.png')} style={[styles.fieldBack]}
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
        <SnekHead
          alive={this.state.alive}
          running={this.props.running}
          direction={this.state.direction}
          boardX={this.state.boardX}
          boardY={this.state.boardY}
          speedEffector={this.state.speedEffector}
          snakeHeadStyle={this.state.snakeHeadStyle}
          pressedButton={this.props.pressedButton}
          countFrame={this.countFrame}
          die={this.die}
          goUp={this.goUp}
          goDown={this.goDown}
          goRight={this.goRight}
          goLeft={this.goLeft}
          boardYtoPosY={this.boardYtoPosY}
          boardXtoPosX={this.boardXtoPosX}
          key={this.props.resetKeyIncrementer}
        />
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
                  {
                    this.edibleTypes[edible.type].png === "pellet" ?
                    <Image source={require('../assets/gameplay/Diamond.png')} style={styles.pellet} resizeMode="stretch" />
                    :
                    <Image source={this.edibleTypes[edible.type].png} style={styles.redPellet} resizeMode="stretch"/>
                  }
                </Animated.View>
              );
            }
          })
        }
        {pellet}
        {(!this.state.fpsShow) ? null :
          <View style={styles.framerateContainer}>
            <Text style={styles.framerateText}>{this.state.framerate} FPS</Text>
          </View>
        }
        {this.wallComponents}
        <View style={styles.controllerOuterContainer}>
          <View style={styles.controllerContainer}>
            <View style={styles.mushroomRow}>
              <TouchableOpacity onPress={this.yellowPowerup} style={styles.powerupButton}>
                <Image source={require("../assets/graphics/gameplay/lemon.png")} style={styles.powerupImage} />
                <ImageBackground source={require("../assets/gameplay/MushroomCountHolder.png")} style={styles.mushroomCountHolder}>
                  <Text style={[styles.mushroomText]}>{this.props.user.powerups.yellowpowerup}</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.bluePowerup} style={styles.powerupButton}>
                <Image source={require("../assets/graphics/gameplay/blueberry.png")} style={styles.powerupImage} />
                <ImageBackground source={require("../assets/gameplay/MushroomCountHolder.png")} style={styles.mushroomCountHolder}>
                  <Text style={[styles.mushroomText]}>{this.props.user.powerups.bluepowerup}</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.orangePowerup} style={styles.powerupButton}>
                <Image source={require("../assets/graphics/gameplay/orange.png")} style={styles.powerupImage} />
                <ImageBackground source={require("../assets/gameplay/MushroomCountHolder.png")} style={styles.mushroomCountHolder}>
                  <Text style={[styles.mushroomText]}>{this.props.user.powerups.orangepowerup}</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.redPowerup} style={styles.powerupButton}>
                <Image source={require("../assets/graphics/gameplay/strawberry.png")} style={styles.powerupImage} />
                <ImageBackground source={require("../assets/gameplay/MushroomCountHolder.png")} style={styles.mushroomCountHolder}>
                  <Text style={[styles.mushroomText]}>{this.props.user.powerups.redpowerup}</Text>
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
    //opacity: 0.4,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  powerupButton: {
  },
  powerupImage: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    resizeMode: 'contain',

  },

  mushroomCountHolder: { position: 'absolute', top: 0, left: (screenWidth * 0.1) - 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  mushroomHolder: { width: screenWidth, height: screenWidth * 0.117, resizeMode: 'contain' },
  mushroomText: {
    fontSize: normalize(12),
    fontFamily: 'riffic-free-bold'
  },
  controllerExtraBtns: {
    height: dpadSize * 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  snekHeadBack: {
    position: "absolute",
    width: CONSTANTS.SNEKSIZE,
    height: CONSTANTS.SNEKSIZE,
    zIndex: 3,
    backgroundColor: CONSTANTS.SNEKPARTCOLOR,
  },

});
