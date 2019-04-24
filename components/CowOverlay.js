import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground
} from 'react-native';
import {Font} from 'expo';
import CONSTANTS from '../Constants.js';

let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;

/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) {
    return t
  },
  // accelerating from zero velocity
  easeInQuad: function (t) {
    return t * t
  },
  // decelerating to zero velocity
  easeOutQuad: function (t) {
    return t * (2 - t)
  },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  },
  // accelerating from zero velocity
  easeInCubic: function (t) {
    return t * t * t
  },
  // decelerating to zero velocity
  easeOutCubic: function (t) {
    return (--t) * t * t + 1
  },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  },
  // accelerating from zero velocity
  easeInQuart: function (t) {
    return t * t * t * t
  },
  // decelerating to zero velocity
  easeOutQuart: function (t) {
    return 1 - (--t) * t * t * t
  },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) {
    return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
  },
  // accelerating from zero velocity
  easeInQuint: function (t) {
    return t * t * t * t * t
  },
  // decelerating to zero velocity
  easeOutQuint: function (t) {
    return 1 + (--t) * t * t * t * t
  },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t) {
    return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
  }
}
let mode = 0;
// 0 == opacity
// 0 == y-gradient?
// 1 == time-sin-gradient
let gradientHeight = 3;
let staticData = Array.from({length: gradientHeight});
let gradientBackground = '#000';
export default class CowOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      riffic: {},
      data: [],
    }
    //this.gradientBackground  = 'purple';
  }

  async componentDidMount() {
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({
      riffic: {
        fontFamily: 'riffic-free-bold',
      }
    });
    let c = 0;
    let easingFuncs = ["linear", "easeInQuad", "easeInCubic", "easeInQuart", "easeInQuint", "easeInQuart", "easeInCubic", "easeInQuad"];
    let easingFuncsWave = ["linear", "easeInQuad", "easeOutQuad", "easeInOutQuad", "easeInCubic", "easeOutCubic", "easeInOutCubic", "easeInQuart", "easeOutQuart", "easeInOutQuart", "easeInQuint", "easeOutQuint"];
    let easingOutFuncs = ["easeOutQuad", "easeOutCubic", "easeOutQuart", "easeInOutQuart", "easeOutQuint"];
    let easingOutFuncsWave = ["easeOutQuad", "easeOutCubic", "easeOutQuart", "easeInOutQuart", "easeOutQuint", "easeInOutQuart", "easeOutQuart", "easeOutCubic", "easeOutQuad",];
    //let easingFuncs = ["easeInOutQuad" "easeInOutCubic"];
    //let easingFuncs = ["linear","easeInCubic","easeInQuint","easeInCubic"]//,

    this.interval = setInterval(() => {
      // THIS IS A BAD WAY TO DO ANIMATION! THIS CODE IS AN EASTEREGG. IT IS HEAVY TO INCLUDE.
      c++;
      if (c % 3 == 0 || true) {
        for (let i = 0; i < staticData.length; i++) {
          //console.log(easingOutFuncsWave[c%easingOutFuncsWave.length])
          if (c % 200 >= 100) {
            staticData[i] = ((c % 25) * 0.04) + 0.1;
          } else {
            staticData[i] = ((c % 25) * 0.04) + 0.1;
            //staticData[i] = ((4-c%25)*0.04)+0.1;
          }

          //staticData[i] = EasingFunctions[easingOutFuncsWave[c%easingOutFuncsWave.length]]((c%10)*0.1)
          //* EasingFunctions[easingOutFuncsWave[c%easingOutFuncsWave.length]]((i / gradientHeight));
          //staticData[i] = EasingFunctions["linear"]((c%10)*0.1)
          //staticData[i] = EasingFunctions["linear"]((c%10)*0.1);
          //staticData[i] = EasingFunctions["linear"](i / gradientHeight);
          //staticData[i] = EasingFunctions[easingFuncsWave[c%easingFuncsWave.length]]((i / gradientHeight));
        }
      } else if (c % 3 == 1) {
        for (let i = 0; i < staticData.length; i++) {
          //console.log(easingOutFuncsWave[c%easingOutFuncsWave.length])
          staticData[i] = EasingFunctions[easingOutFuncsWave[c % easingOutFuncsWave.length]]((c % 100) * 0.01);
        }
      } else {
        for (let i = 0; i < staticData.length; i++) {
          //console.log(easingFuncsWave[c%easingFuncsWave.length])
          staticData[i] = EasingFunctions[easingFuncsWave[c % easingFuncsWave.length]]((i / gradientHeight));
        }
      }
      this.setState({data: staticData});
    }, 60);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getOpacity = (gradh, i) => {
    return (1 / gradh) * (i + 1);
  }

  render() {
    if (!this.props.show) {
      return null;
    } else {
      let view = (
        <View style={styles.container} pointerEvents="none">
          {this.state.data.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  backgroundColor: gradientBackground,
                  height: (screenHeight / gradientHeight),
                  width: screenWidth,
                  top: ((screenHeight / gradientHeight) * i),
                  left: 0,
                  zIndex: 2,
                  opacity: item,
                }}/>)
          })}
        </View>
      );
      return view;
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    //backgroundColor:  'rgba(0,0,0,0.6)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
