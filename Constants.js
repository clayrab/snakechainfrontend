import { StatusBar, Platform, Dimensions } from 'react-native';

var statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
var dpadButtonSize = 60;
var dpadSize = dpadButtonSize * 2.414;
var dpadAreaHeight = dpadSize + 20;
var scoreBoardHeight = 40;
var gameAreaHeight = Dimensions.get('window').height - dpadAreaHeight  - scoreBoardHeight + statusBarHeight;

export default CONSTANTS = {
  DPADSTATES: { "NONE": 0, "UP": 1, "DOWN": 2, "LEFT": 3, "RIGHT": 4 },
  STATUSBARHEIGHT: statusBarHeight,
  SCOREBOARDHEIGHT: scoreBoardHeight,
  DEVICEWIDTH: Dimensions.get('window').width,
  DEVICEHEIGHT: Dimensions.get('window').height,
  DPADAREAHEIGHT: dpadAreaHeight,
  GAMEHEIGHT: gameAreaHeight,
  BOARDCENTERX: Dimensions.get('window').width/2,
  BOARDCENTERY: scoreBoardHeight + (gameAreaHeight - scoreBoardHeight)/2,
  DPADBUTTONSIZE: dpadButtonSize,
  DPADSIZE: dpadButtonSize * 2.414,
  SNEKSIZE: 16,
  BOARDSIZEX: 11,
  BOARDWIDTH: 21, // 2*BOARDSIZEX - 1
  BOARDSIZEY: 13,
  BOARDHEIGHT: 25, // 2*BOARDSIZEY - 1
  SNEKCOLOR: "#e31",
  SNEKPARTCOLOR: "#c42",
  BOARDCOLOR: "#474",
  PELLETCOLOR: "#34d",
};
