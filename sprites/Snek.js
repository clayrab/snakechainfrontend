import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';

export default class Snek extends Sprite {

  static contextTypes = {
    loop: PropTypes.object,
    posX: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };

    // console.log("******************************");
    // console.log(this.state);
    // console.log(this.context);
    // console.log(this.offset);
  }
  componentDidMount() {

    // console.log("****************componentDidMount**************");
    // console.log(this.state);
    // console.log(this.context);
    // console.log(this.context.offset);
    // console.log(this.offset);
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }
  render() {
    //console.log(this.state);
    return (
      <View style={{
        width: 50,
        backgroundColor: '#fff',
        height: 50,
      }}>
        <View style={{
          width: 50,
          backgroundColor: '#00f',
          height: 50,
        }}></View>
      </View>
    );
  }

  update() {
  //  offset
    // console.log(this.state);
    //console.log(this.scale);
    // this.state.counter++;
    // if(this.state.counter%0 == 0) {
    // console.log("******************************");
    // console.log(this);
    // console.log("******************************");
    // console.log(this.state);
    // }

    //console.log("update");
  };
}
