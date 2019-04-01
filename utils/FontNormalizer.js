import {Dimensions, Platform, PixelRatio} from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export let normalize = (size) => {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}
//
// export let asyncStore = async (key, value) => {
//   await AsyncStorage.setItem(key, value);
// }
// export let getFromAsyncStore = async (key) => {
//   // TODO add type checking
//   // if (typeof name !== "string") {
//   //   throw TypeError("name must be a string");
//   // }
//   try {
//     const value = await AsyncStorage.getItem(key);
//     return value;
//    } catch (error) {
//      throw error
//    }
// }
