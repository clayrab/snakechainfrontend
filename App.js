import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Loop, Stage, World, Body } from 'react-game-kit/native';

export default class App extends React.Component {
  render() {
    return (
      <Loop>
        <Stage>
          <World>
            <Body args={[0,0,75,75]} ref={ (b) => this.body = b.body }>
              // Sprites go here
            </Body>
          </World>
        </Stage>
      </Loop>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
