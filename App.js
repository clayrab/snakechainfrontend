import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Loop, Stage, World, Body, Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import Dpad from './sprites/Dpad.js';

import Snek from './sprites/Snek.js';

export default class App extends React.Component {
  static contextTypes = {
    width: PropTypes.object,
    height: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      running: true,
      width: 200,
      height: 200,
    };
  }

  render() {
    return (
      <Loop>

          <Snek offset={[100,100]}></Snek>
          <Dpad></Dpad>
        
      </Loop>
      // <Loop>
      //   <Stage>
      //     <World>
      //       <Body args={[0,0,75,75]} ref={ (b) => this.body = b.body }>
      //         // Sprites go here
      //         <Snek>
      //
      //         </Snek>
      //       </Body>
      //     </World>
      //   </Stage>
      // </Loop>
    );
  }
}
