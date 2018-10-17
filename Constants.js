import { Dimensions } from 'react-native';

export default CONSTANTS = {
  DPADSTATES: { "NONE": 0, "UP": 1, "DOWN": 2, "LEFT": 3, "RIGHT": 4 },
  DEVICEWIDTH: Dimensions.get('window').width,
  DEVICEHEIGHT: Dimensions.get('window').height,
  GAMEHEIGHT: Dimensions.get('window').height - 200,
  SNEKSIZE: 20,
  BOARDCENTERX: Dimensions.get('window').width/2,
  BOARDCENTERY: (Dimensions.get('window').height - 200)/2,
  SNEKCOLOR: "#0c5",
  BOARDSIZEX: 7,
  BOARDWIDTH: 13, // 2*BOARDSIZEX - 1
  BOARDSIZEY: 9,
  BOARDHEIGHT: 17, // 2*BOARDSIZEY - 1
};
