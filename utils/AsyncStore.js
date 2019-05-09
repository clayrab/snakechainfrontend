import {AsyncStorage} from 'react-native';

export let asyncStore = async (key, value) => {
  await AsyncStorage.setItem(key, value);
}
export let getFromAsyncStore = async (key) => {
  // TODO add type checking
  // if (typeof name !== "string") {
  //   throw TypeError("name must be a string");
  // }
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    throw error
  }
}

export let removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (exception) {
    throw exception;
  }
}
