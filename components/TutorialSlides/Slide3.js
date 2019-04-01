import React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {Font} from "expo";
import {normalize} from "../../utils/FontNormalizer";

export default class Slide3 extends React.Component {

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
        <Text style={[styles.welcomeText, this.state.buttonDynamicStyle]}>Mint your Snakechain!</Text>
        <Text style={[styles.subText, this.state.buttonDynamicStyle]}>Ship your saved mined</Text>
        <Text style={[styles.subText, this.state.buttonDynamicStyle]}>raw Snakechain to the </Text>
        <Text style={[styles.subText, this.state.buttonDynamicStyle]}>SnakeBank for minfy</Text>
        <Text style={[styles.subText, this.state.buttonDynamicStyle]}>
          A courier will deposit your SnakeChain to your wallet
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