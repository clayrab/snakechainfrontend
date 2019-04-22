import {StatusBar, Platform, Dimensions} from 'react-native';

//var statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
//var dpadButtonSize = 60;
//var dpadSize = dpadButtonSize * 2.414;
//var dpadAreaHeight = dpadSize + 20;
//let screenWidth = require('Dimensions').get('window').width;
//var scoreBoardHeight = screenWidth*.757/3.6;
//var gameAreaHeight = Dimensions.get('window').height - dpadAreaHeight  - scoreBoardHeight + statusBarHeight;

export default CONSTANTS = {
  DPADSTATES: {"NONE": 0, "UP": 1, "DOWN": 2, "LEFT": 3, "RIGHT": 4},
  STATUSBARHEIGHT: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  DEVICEWIDTH: Dimensions.get('window').width,
  DEVICEHEIGHT: Dimensions.get('window').height,
  BOARDCENTERX: Dimensions.get('window').width / 2,
  DPADBUTTONSIZE: 60,
  //DPADAREAHEIGHT: dpadAreaHeight,
  DPADMULT: 2.414,
  //SNEKSIZE: 16,
  BOARDSIZEX: 15,
  BOARDWIDTH: 29, // 2*BOARDSIZEX - 1
  BOARDSIZEY: 15,
  BOARDHEIGHT: 29, // 2*BOARDSIZEY - 1
  SNEKCOLOR: "yellow",
  SNEKPARTCOLOR: "#37a90b",
  BOARDCOLOR: "transparent",
  PELLETCOLOR: "black",
  WEIPERETH: 1000000000000000000,
  LEVELS: {"FREE": 0, "WILD": 1, "SCATTER1": 2, "SCATTER2": 3, "SCATTER3": 4, "BLOCK1": 5, "BLOCK2": 6, "BLOCK3": 7,},
  SNEKSPEED: 0.07,
  REDPELLETSCOREBONUS: 3,
  PELLETMULT: 10,
  //SCOREBOARDHEIGHT: scoreBoardHeight,
};

//let dpadSize = CONSTANTS.DPADBUTTONSIZE * CONSTANTS.DPADMULT;

CONSTANTS.SNEKSIZE = (CONSTANTS.DEVICEWIDTH * 0.96) / CONSTANTS.BOARDWIDTH;
CONSTANTS.SCOREBOARDHEIGHT = CONSTANTS.DEVICEWIDTH * .757 / 3.6;
CONSTANTS.GAMEWIDTH = CONSTANTS.SNEKSIZE * CONSTANTS.BOARDWIDTH;
CONSTANTS.GAMEHEIGHT = CONSTANTS.SNEKSIZE * CONSTANTS.BOARDHEIGHT;
CONSTANTS.DPADSIZE = CONSTANTS.DPADBUTTONSIZE * CONSTANTS.DPADMULT;
CONSTANTS.DPADHEIGHT = CONSTANTS.DPADSIZE * 1.3; //includes padding
CONSTANTS.BOARDCENTERY = CONSTANTS.DEVICEHEIGHT - (CONSTANTS.GAMEHEIGHT / 2) - CONSTANTS.DPADHEIGHT;//(CONSTANTS.DEVICEHEIGHT - CONSTANTS.DPADSIZE) - (CONSTANTS.GAMEHEIGHT / 2); // INSANE HEIGHT EQUATION FOR DPAD HEIGHT. SORRY.
