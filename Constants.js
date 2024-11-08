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
  SNEKPARTCOLORORANGE: "#FD9027",
  BOARDCOLOR: "transparent",
  PELLETCOLOR: "black",
  WEIPERETH: 1000000000000000000,
  //LEVELS: {"BASIC": 0, "WILD": 1, "SCATTER1": 2, "SCATTER2": 3, "SCATTER3": 4, "BLOCK1": 5, "BLOCK2": 6, "BLOCK3": 7,},
  LEVELS: {"BASIC": 0, "WILD": 1, "SCATTER1": 2, "SCATTER2": 3, "BLOCK1": 4, "BLOCK2": 5, },
  LEVELCOUNT: 6,
  SNEKSPEED: 0.07,
  //SNEKSPEED: 0.000007,
  REDPELLETSCOREBONUS: 3,
  PELLETMULT: 100,
  ORANGEPELLETBONUS: 2.0,
  //SCOREBOARDHEIGHT: scoreBoardHeight,
  SOCKETINITRETRYTIME: 300,
  SOCKETRETRYMULT: 1.2,
  SOCKETRETRYMAX: 5000,
  LOADUSERINITRETRYTIME: 300,
  LOADUSERRETRYMULT: 1.5,
  LOADUSERRETRYMAX: 5000,
  LOGRENDERMETHODS: false,
};

//let dpadSize = CONSTANTS.DPADBUTTONSIZE * CONSTANTS.DPADMULT;

CONSTANTS.SNEKSIZE = (CONSTANTS.DEVICEWIDTH * 0.96) / CONSTANTS.BOARDWIDTH;
CONSTANTS.SCOREBOARDHEIGHT = CONSTANTS.DEVICEWIDTH * .757 / 3.6;
CONSTANTS.GAMEWIDTH = CONSTANTS.SNEKSIZE * CONSTANTS.BOARDWIDTH;
CONSTANTS.GAMEHEIGHT = CONSTANTS.SNEKSIZE * CONSTANTS.BOARDHEIGHT;
CONSTANTS.DPADSIZE = CONSTANTS.DPADBUTTONSIZE * CONSTANTS.DPADMULT;
CONSTANTS.DPADHEIGHT = CONSTANTS.DPADSIZE * 1.3; //includes padding
CONSTANTS.BOARDCENTERY = CONSTANTS.SCOREBOARDHEIGHT + (CONSTANTS.GAMEHEIGHT / 2);
//CONSTANTS.BOARDCENTERY = CONSTANTS.DEVICEHEIGHT - (CONSTANTS.GAMEHEIGHT / 2) - CONSTANTS.DPADHEIGHT;
//(CONSTANTS.DEVICEHEIGHT - CONSTANTS.DPADSIZE) - (CONSTANTS.GAMEHEIGHT / 2); // INSANE HEIGHT EQUATION FOR DPAD HEIGHT. SORRY.



CONSTANTS.mineImages = [
  require('./assets/homepage/mine/mine0.png'),
  require('./assets/homepage/mine/mine10.png'),
  require('./assets/homepage/mine/mine20.png'),
  require('./assets/homepage/mine/mine30.png'),
  require('./assets/homepage/mine/mine40.png'),
  require('./assets/homepage/mine/mine50.png'),
  require('./assets/homepage/mine/mine60.png'),
  require('./assets/homepage/mine/mine70.png'),
  require('./assets/homepage/mine/mine80.png'),
  require('./assets/homepage/mine/mine90.png'),
  require('./assets/homepage/mine/mine100.png'),
]
