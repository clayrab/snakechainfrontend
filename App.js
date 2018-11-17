import React from 'react';
import { StatusBar, Text, View, StyleSheet, Image, ImageBackground} from 'react-native';
import { Loop, Stage, World, Body, Sprite } from 'react-game-kit/native';
import PropTypes from 'prop-types';
import Dpad from './sprites/Dpad.js';
import Buttons from './sprites/Buttons.js';
import Snek from './sprites/Snek.js';
import Board from './sprites/Board.js';
import CONSTANTS from './Constants.js';
import SafeAreaView from 'react-native-safe-area-view';

export default class App extends React.Component {
  _that;
  constructor(props) {
    super(props);
    _that = this;
    var board = [];
    // for (var rowIndex = 0; rowIndex < CONSTANTS.BOARDHEIGHT; rowIndex ++) {
    //   var row = [];
    //    for (var rowIndex = 0; rowIndex < CONSTANTS.BOARDWIDTH; rowIndex ++) {
    //      row.push(false);
    //    }
    //    board.push(row);
    // }
    this.state = {
      running: false,
      pressedButton: CONSTANTS.DPADSTATES.UP,
      toggleReset: true,
    };
  }

  onDpadChange(direction) {
    if( direction != CONSTANTS.DPADSTATES.NONE && direction != this.state.pressedButton ) {
      this.setState({pressedButton: direction});
    }
  }

  onDied(){
    this.setState({running: false});
  }

  start() {
    this.setState({running: true});
  }
  restart() {
    this.setState({toggleReset: !this.state.toggleReset});
  }
  render() {
    var screenWidth = require('Dimensions').get('window').width;
    var titleBarHeight = screenWidth*.757/3.6;
    const styles = StyleSheet.create({
      screen: {
        width: "100%",
        height: "100%",
        //borderWidth: 20,
      },
      backgroundImage: {
        width: "100%",
        height: "100%",
      },
      contentHolder: {
        flex: 0,
        width: "100%",
      },
      titleBar: {
        flex: 0,
        width: screenWidth,
        height: titleBarHeight,
        flexDirection: "row",
      },
      optionsIcon: {
        flex: 0,
        width: "15.55555555%",
        aspectRatio: 1,
        marginTop: titleBarHeight*.06/.757,
        marginLeft: screenWidth*.157/3.6,
        resizeMode: "contain",
      },
      coinBox: {
        flex: 0,
        width: screenWidth*1.273/3.6,
        height: titleBarHeight*.323/.757,
        marginTop: titleBarHeight*.170/.757,
        marginLeft: screenWidth*.123/3.6,
        resizeMode: "contain",
      },
      coinIcon: {
        flex: 0,
        width: screenWidth*.257/3.6,
        //height: titleBarHeight*.323/.757,
        //marginTop: titleBarHeight*.170/.757,
        //marginLeft: screenWidth*.123/3.6,
        resizeMode: "contain",
      },
      textBox: {
        color: "#fab523"
      }
    });
    return (
      <SafeAreaView style={styles.screen}>
        <ImageBackground source={require('./assets/homepage/back.png')} style={styles.backgroundImage}>
            <View style={styles.contentHolder}>
              <ImageBackground source={require('./assets/homepage/titleback.png')} style={styles.titleBar}>
                <Image source={require('./assets/homepage/options.png')}
                  resizeMethod={"scale"}
                  style={styles.optionsIcon}>
                </Image>
                <ImageBackground source={require('./assets/homepage/coinbox.png')} style={styles.coinBox}>
                  <View style={styles.textBox}>
                    <Text>15</Text>
                  </View>
                </ImageBackground>
              </ImageBackground>
            </View>
        </ImageBackground>
      </SafeAreaView>

      // <View>
      //   <View style={{height: CONSTANTS.STATUSBARHEIGHT, backgroundColor: "#000" }}>
      //     <StatusBar { ...this.props }  barStyle="light-content"/>
      //   </View>
      //   <Loop>
      //     <Board>
      //     </Board>
      //     <Snek
      //       pressedButton={this.state.pressedButton}
      //       snekSpeed={0.10}
      //       running={this.state.running}
      //       toggleReset={this.state.toggleReset}
      //       onDied={this.onDied.bind(this)}>
      //     </Snek>
      //     <Buttons running={this.state.running} start={this.start.bind(this)} restart={this.restart.bind(this)}></Buttons>
      //     <Dpad onDpadChange={this.onDpadChange.bind(this)} pressedButton={this.state.pressedButton}></Dpad>
      //   </Loop>
      // </View>
    );
  }
}
