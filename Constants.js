import {StatusBar, Platform, Dimensions} from 'react-native';

//var statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
var dpadButtonSize = 60;
var dpadSize = dpadButtonSize * 2.414;
var dpadAreaHeight = dpadSize + 20;
let screenWidth = require('Dimensions').get('window').width;
//var scoreBoardHeight = screenWidth*.757/3.6;
//var gameAreaHeight = Dimensions.get('window').height - dpadAreaHeight  - scoreBoardHeight + statusBarHeight;

export default CONSTANTS = {
  DPADSTATES: {"NONE": 0, "UP": 1, "DOWN": 2, "LEFT": 3, "RIGHT": 4},
  STATUSBARHEIGHT: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  DEVICEWIDTH: Dimensions.get('window').width,
  DEVICEHEIGHT: Dimensions.get('window').height,
  DPADAREAHEIGHT: dpadAreaHeight,
  //GAMEHEIGHT: gameAreaHeight,
  BOARDCENTERX: Dimensions.get('window').width / 2,
  //BOARDCENTERY: scoreBoardHeight + (gameAreaHeight)/2,
  DPADBUTTONSIZE: dpadButtonSize,
  DPADSIZE: dpadButtonSize * 2.414,
  //SNEKSIZE: 16,
  BOARDSIZEX: 16,
  BOARDWIDTH: 31, // 2*BOARDSIZEX - 1
  BOARDSIZEY: 16,
  BOARDHEIGHT: 31, // 2*BOARDSIZEY - 1
  SNEKCOLOR: "yellow",
  SNEKPARTCOLOR: "#37a90b",
  BOARDCOLOR: "transparent",
  PELLETCOLOR: "black",
  WEIPERETH: 1000000000000000000,
  LEVELS: {"FREE": 0, "WILD": 1, "SCATTER1": 2, "SCATTER2": 3, "SCATTER3": 4, "BLOCK1": 5, "BLOCK2": 6, "BLOCK3": 7,},
  LEVELNAMES: ["FREE", "WILD", "SCATTER1", "SCATTER2", "SCATTER3", "BLOCK1", "BLOCK2", "BLOCK3"],
  SNEKSPEED: 0.07,
  //SCOREBOARDHEIGHT: scoreBoardHeight,
};

CONSTANTS.SNEKSIZE = (CONSTANTS.DEVICEWIDTH * 0.96) / CONSTANTS.BOARDWIDTH;
CONSTANTS.SCOREBOARDHEIGHT = CONSTANTS.DEVICEWIDTH * .757 / 3.6;
CONSTANTS.GAMEWIDTH = CONSTANTS.SNEKSIZE * CONSTANTS.BOARDWIDTH;
CONSTANTS.GAMEHEIGHT = CONSTANTS.SNEKSIZE * CONSTANTS.BOARDHEIGHT;
CONSTANTS.BOARDCENTERY = CONSTANTS.SCOREBOARDHEIGHT + (CONSTANTS.GAMEHEIGHT) / 2;
