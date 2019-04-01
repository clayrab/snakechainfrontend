import React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {Font} from "expo";
import {normalize} from "../../utils/FontNormalizer";

export default class Slide1 extends React.Component {

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
        <Text style={[styles.welcomeText, this.state.buttonDynamicStyle]}>Welcome!</Text>
        <Text style={[styles.subText, this.state.buttonDynamicStyle]}>Mine Snakechain</Text>
        <Text style={[styles.subText, this.state.buttonDynamicStyle]}>by planing Snake!</Text>

      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  slide: {
    flex: 1,
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