import { Dimensions } from 'react-native';

export default CONSTANTS = {
  DPADSTATES: { "NONE": 0, "UP": 1, "DOWN": 2, "LEFT": 3, "RIGHT": 4 },
  DEVICEWIDTH: Dimensions.get('window').width,
  DEVICEHEIGHT: Dimensions.get('window').height,
  GAMEHEIGHT: Dimensions.get('window').height - 200,
  BOARDCENTERX: Dimensions.get('window').width/2,
  BOARDCENTERY: (Dimensions.get('window').height - 200)/2,
  SNEKSIZE: 12,
  BOARDSIZEX: 15,
  BOARDWIDTH: 29, // 2*BOARDSIZEX - 1
  BOARDSIZEY: 21,
  BOARDHEIGHT: 41, // 2*BOARDSIZEY - 1
  SNEKCOLOR: "#e42",
  BOARDCOLOR: "#474",
};
