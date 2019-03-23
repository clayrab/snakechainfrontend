import React from 'react';
import { Animated, View, StyleSheet, TouchableOpacity, Image, ImageBackground, } from 'react-native';
import { Sprite } from 'react-game-kit/native';
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
    console.log("consructor")
    super(props);
    this.defaultState = {
      posX: this.boardXtoPosX(CONSTANTS.BOARDSIZEX - 1),
      posY: this.boardYtoPosY(CONSTANTS.BOARDHEIGHT - 6),
      boardX: CONSTANTS.BOARDSIZEX - 1,
      boardY: CONSTANTS.BOARDHEIGHT - 6,
      direction: CONSTANTS.DPADSTATES.UP,
      tailIndex: -1,
      tail: [],
      // baseScore: 0,
      // multiplier: 1,
      score: 0,
      pelletLocation: null,
      pelletRot: new Animated.Value(0),
      boardShake: new Animated.Value(0),
      alive: true,
      snakeHead: {transform: [{ rotate: '0deg'}]},
      walls: [],
      mushrooms: {},
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
  copyDefaultState(){
    console.log("copyDefaultState")
    var startState = {};
    startState.posX = this.defaultState.posX;
    startState.posY = this.defaultState.posY;
    startState.boardX = this.defaultState.boardX;
    startState.boardY = this.defaultState.boardY;
    startState.direction = this.defaultState.direction;
    startState.pelletLocation = this.defaultState.pelletLocation;
    startState.pelletRot = this.defaultState.pelletRot;
    startState.boardShake = this.defaultState.boardShake;
    //startState.baseScore = this.defaultState.baseScore;
    //startState.multiplier = this.defaultState.multiplier;
    startState.score = this.defaultState.score;
    startState.alive = this.defaultState.alive;
    startState.tail = this.makeTail(3, this.defaultState.boardX, this.defaultState.boardY);
    startState.tailIndex = 2;
    startState.snakeHead = {transform: [{ rotate: '0deg'}]};
    startState.walls = this.getRandomWalls();
    return startState;
  }

  resetBoard(){
    // Board is false in "safe" spots and true where the snake and walls are
    this.props.doResetDpad();
    var board = [];
    for (var index1 = 0; index1 < CONSTANTS.BOARDHEIGHT; index1++) {
      var row = [];
      for (var index2 = 0; index2 < CONSTANTS.BOARDWIDTH; index2++) {
        row.push(false);
      }
      board.push(row);
    }
    for (var index3 = 0; index3 < this.state.tail.length - 1; index3++) {
      board[this.state.tail[index3].props.boardY][this.state.tail[index3].props.boardX] = true;
    }

    for (var yIndex = 0; yIndex < CONSTANTS.BOARDHEIGHT; yIndex++) {
      for (var xIndex = 0; xIndex < CONSTANTS.BOARDWIDTH; xIndex++) {
        if(this.state.walls[yIndex * 100 + xIndex]){
          board[yIndex][xIndex] = true;
        }
      }
    }
    this.board = board.slice(0); //copy board
    this.setWallComponents();
  }

  hasNeighbor = (x, y, walls) => {
    if(x > 0 && walls[y * 100 + (x-1)]) {
      return true;
    } else if(x < CONSTANTS.BOARDWIDTH-1 && walls[y * 100 + (x+1)]) {
      return true;
    } else if(y > 0 && walls[((y-1) * 100) + x]) {
      return true;
    } else if(y < CONSTANTS.BOARDHEIGHT-1 && walls[((y+1) * 100) + x]) {
      return true;
    }
    return false;
  }
  makeTetrisBlock = (n, walls) => {
    console.log("makeTetrisBlock x and y")
    let x = Math.floor(Math.random() * CONSTANTS.BOARDWIDTH);
    let y = Math.floor(Math.random() * CONSTANTS.BOARDHEIGHT);
    // while it's not already a wall and it's not in the middle column where the snek starts
    while(walls[y * 100 + x] || x == CONSTANTS.BOARDSIZEX-1 || this.hasNeighbor(x, y, walls)){
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
    for(let blockNumber = 0; blockNumber < n-1; blockNumber++){
      let randX = Math.floor((Math.random() * ((maxX+2) - (minX-1))+(minX-1)));
      let randY = Math.floor((Math.random() * ((maxY+2) - (minY-1))+(minY-1)));
      console.log(maxX + "\t" + maxY + "\t" + randX + "\t" + randY)
      //while(walls[randY * 100 + randX] || randX == CONSTANTS.BOARDSIZEX-1 || !this.hasNeighbor(randX, randY, walls)){
      while(
          walls[randY * 100 + randX] ||
          randX == CONSTANTS.BOARDSIZEX-1 ||
          !this.hasNeighbor(randX, randY, walls)
           //  ||
           // randX <= -1 || randX >= CONSTANTS.BOARDSIZEX-1 || randY <= -1 || randY >= CONSTANTS.BOARDSIZEY-1
      ) {
        randX = Math.floor((Math.random() * ((maxX+2) - (minX-1))+(minX-1)));
        randY = Math.floor((Math.random() * ((maxY+2) - (minY-1))+(minY-1)));
      }

      if(randX < minX) {
        minX = randX;
      }
      if(randX > maxX) {
        maxX = randX;
      }
      if(randY < minY) {
        minY = randY;
      }
      if(randY > maxY) {
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
    while(walls[randY * 100 + randX] || randX == CONSTANTS.BOARDSIZEX-1){
      randX = Math.floor(Math.random() * CONSTANTS.BOARDWIDTH);
      randY = Math.floor(Math.random() * CONSTANTS.BOARDHEIGHT);
    }
    walls[randY * 100 + randX] = true;
    return walls;
  }
  getRandomWalls = () => {
    console.log("getRandomWalls")
    let newWalls = [];
    if(this.props.level === CONSTANTS.LEVELS.BLOCK1) {
      for(let i = 0; i < 12; i++){
        newWalls = this.makeTetrisBlock(4, newWalls);
      }
    } else if(this.props.level === CONSTANTS.LEVELS.BLOCK2) {
      for(let i = 0; i < 12; i++){
        newWalls = this.makeTetrisBlock(4, newWalls);
      }
      for(let i = 0; i < 4; i++){
        newWalls = this.makeTetrisBlock(5, newWalls);
      }

    } else if(this.props.level === CONSTANTS.LEVELS.BLOCK3) {
      for(let i = 0; i < 8; i++){
        newWalls = this.makeTetrisBlock(4, newWalls);
      }
      for(let i = 0; i < 4; i++){
        newWalls = this.makeTetrisBlock(5, newWalls);
      }
      for(let i = 0; i < 4; i++){
        newWalls = this.makeTetrisBlock(6, newWalls);
      }
    } else if(this.props.level === CONSTANTS.LEVELS.SCATTER1) {
      for(let i = 0; i < 12; i++){
        newWalls = this.makeScatterShot(newWalls);
      }
    } else if(this.props.level === CONSTANTS.LEVELS.SCATTER2) {
      for(let i = 0; i < 24; i++){
        newWalls = this.makeScatterShot(newWalls);
      }
    } else if(this.props.level === CONSTANTS.LEVELS.SCATTER3) {
      for(let i = 0; i < 30; i++){
        newWalls = this.makeScatterShot(newWalls);
      }
      for(let i = 0; i < 2; i++){
        newWalls = this.makeTetrisBlock(5, newWalls);
      }
      for(let i = 0; i < 2; i++){
        newWalls = this.makeTetrisBlock(6, newWalls);
      }
    }
    return newWalls;
  }

  setWallComponents = () => {
    console.log("setWallComponents");
    this.wallComponents = [];
    for (var yIndex = 0; yIndex < CONSTANTS.BOARDHEIGHT; yIndex++) {
      for (var xIndex = 0; xIndex < CONSTANTS.BOARDWIDTH; xIndex++) {
        if(this.state.walls[yIndex * 100 + xIndex]){
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
    return CONSTANTS.BOARDCENTERX + (CONSTANTS.SNEKSIZE*(boardX - CONSTANTS.BOARDSIZEX + 0.5));
  }
  boardYtoPosY(boardY) {
    return CONSTANTS.BOARDCENTERY + (CONSTANTS.SNEKSIZE*(boardY - CONSTANTS.BOARDSIZEY + 0.5));
  }
  die() {
    console.log("die")
    this.setState({alive: false});
    this.props.onDied(this.state.score);
  }
  reset() {
    var startState = this.copyDefaultState();
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
    while (isTail || isHead) {
      var x = this.getRandomInt(0, CONSTANTS.BOARDWIDTH - 1);
      var y = this.getRandomInt(0, CONSTANTS.BOARDHEIGHT - 1);
      isTail = this.board[y][x];
      isHead = this.state.boardX == x && this.state.boardY == y;
    }
    this.setState({pelletLocation: {x: x, y: y}});
    if ((this.state.baseScore + 2) % 5 == 0) {
      //this.state.pelletRot.setValue(0);
      this.state.shakeBoard.setValue(0);
      //pelletRot
      //this.pelletAnim.start();
      this.boardShakeAnim.start();
    }
  }

  eatPellet(){
    //let growLength = Math.floor(Math.log(this.state.score*2)) + 1;
    let growLength = 1;
    for(let i = 0; i < growLength; i++){
      this.growTail();
    }
    this.placePellet();
    //this.placePellet();
    //var mult = this.state.multiplier;
    // if ((this.state.baseScore + 1) % 5 == 0) {
    //   mult++;
    // }
    //var score = (this.state.baseScore + 1) * mult;
    this.setState({score: this.state.score + 1});
  }
  growTail(){
    if (this.state.tail.length > 0) {
      var newTailStart = this.state.tail.slice(0, this.state.tailIndex);
      var newTailEnd = this.state.tail.slice(this.state.tailIndex, this.state.tail.length);
      var lastPart = this.state.tail[this.state.tailIndex];
      newTailStart.push(
        <SnekPart
          key={this.getNextID()}
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
  }
  moveTail(direction) {
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
    var newPosX = this.boardXtoPosX(this.state.boardX);
    var newPosY = this.boardYtoPosY(this.state.boardY);
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
      this.setState({direction: CONSTANTS.DPADSTATES.UP, boardY: this.state.boardY - 1, snakeHead: {transform: [{ rotate: '0deg'}]}});
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
      this.setState({direction: CONSTANTS.DPADSTATES.DOWN, boardY: this.state.boardY + 1,snakeHead: {transform: [{ rotate: '180deg'}]}});
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
      this.setState({direction: CONSTANTS.DPADSTATES.LEFT, boardX: this.state.boardX - 1,snakeHead: {transform: [{ rotate: '270deg'}]}});
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
      this.setState({direction: CONSTANTS.DPADSTATES.RIGHT, boardX: this.state.boardX + 1, snakeHead: {transform: [{ rotate: '90deg'}]}});
    }
  }
  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }
  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
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
        if(this.lastFrameTime == null) { //first frame
          var speed = 0;
        } else {
          var speed = CONSTANTS.SNEKSPEED * (now - this.lastFrameTime);
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

  easterEgg = async() => {
    easterEggCount = easterEggCount + 1;
    if(easterEggCount > 6) {
      this.setState({score: this.state.score + 1})
    }
  }
  render() {
    var pellet = null;
    var snek = (<View style={[styles.snek, {
      left: this.state.posX,
      top: this.state.posY,
    }]}><Image source={require('../assets/gameplay/headUp.png')} style={[styles.snek, this.state.snakeHead]} resizeMode="stretch"/></View>);
    if(this.state.pelletLocation != null) {
      var pellet = (<Animated.View style={[styles.pellet, {
        left: this.boardXtoPosX(this.state.pelletLocation.x),
        top: this.boardYtoPosY(this.state.pelletLocation.y),
        transform: [{ rotate: this.spin()}],
      }]}>
        <Image source={require('../assets/gameplay/Diamond.png')} style={styles.pellet} resizeMode="stretch"/>
      </Animated.View>);
    }
    if(!this.state.alive) {
      snek = (<View style={[styles.snek,{
        left: this.state.posX,
        top: this.state.posY,
        backgroundColor: "#000",
      }]}></View>);
    }
    //let scoreBoardHeight = screenWidth*.757/3.6;
    return (
      <View style={[styles.gameBack, {/*transferX: this.boardShakeInterpolate()*/}, ]}>
        <ImageBackground source={require('../assets/gameplay/gameAreaBack.png')} style={styles.fieldBack} resizeMode="stretch">
          <ScoreBoard
            score={this.state.score}
            easterEgg={this.easterEgg}
            loading={this.props.loading}
            user={this.props.user} />
        </ImageBackground>
        <ImageBackground source={require('../assets/gameplay/gameArea.png')} style={styles.field} resizeMode="stretch"/>
        {this.state.tail.map((elem) => {
          return (elem);
        })}
        {snek}
        {pellet}
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
  snek: {
    position: "absolute",
    width: CONSTANTS.SNEKSIZE,
    height: CONSTANTS.SNEKSIZE,
    zIndex: 3,
  },
  pellet: {
    position: "absolute",
    width: CONSTANTS.SNEKSIZE + 2,
    height: CONSTANTS.SNEKSIZE + 2,
    zIndex: 3,
  },
  gameBack: {
    position: 'absolute',
    width: CONSTANTS.DEVICEWIDTH,
    height: CONSTANTS.DEVICEHEIGHT - CONSTANTS.STATUSBARHEIGHT,
    backgroundColor: "#FAB523",
    //backgroundColor: "#00F",
  },
  fieldBack: {
    width: CONSTANTS.DEVICEWIDTH,
    height: CONSTANTS.GAMEHEIGHT + CONSTANTS.SCOREBOARDHEIGHT + 6,
  },
  field: {
    width: CONSTANTS.GAMEWIDTH,
    backgroundColor: 'transparent',
    height: CONSTANTS.GAMEHEIGHT,
    position: "absolute",
    top: CONSTANTS.BOARDCENTERY - (0.5 * CONSTANTS.GAMEHEIGHT),
    left: (CONSTANTS.DEVICEWIDTH/2) - (0.5 * CONSTANTS.GAMEWIDTH),
    zIndex: 2,
  },
});
