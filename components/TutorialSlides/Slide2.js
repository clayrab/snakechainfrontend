import React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {Font} from "expo";
import {normalize} from "../../utils/FontNormalizer";

export default class Slide2 extends React.Component {

  state = {
    buttonDynamicStyle: {},
  };

  async componentDidMount() {
    await Font.loadAsync({
      'riffic-free-bold': require('../../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({
      buttonDynamicStyle: {
        fontFamily: 'riffic-free-bold'
      }
    })
  }

  render() {
    return (
      <View style={styles.slide}>
        <Text style={[styles.welcomeText, this.state.buttonDynamicStyle]}>How to Play!</Text>
        <Text style={[styles.subText, this.state.buttonDynamicStyle]}>Select your level</Text>
        <Text style={[styles.subText, this.state.buttonDynamicStyle]}>
          Play, and the pellets your miner snake collects
          are Snakechain!
        </Text>
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 25,
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: normalize(24),
    color: "#EBAC26",
    marginBottom: 10
  },
  subText: {
    fontSize: normalize(14),
    color: "#EBAC26",
    textAlign: 'center'
  }
});