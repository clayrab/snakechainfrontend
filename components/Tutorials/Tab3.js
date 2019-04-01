import React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {Font} from "expo";
import {normalize} from "../../utils/FontNormalizer";

export default class Tab3 extends React.Component {

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
        <Text style={[styles.welcomeText, this.state.buttonDynamicStyle]}>Welcome 3!</Text>
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
    fontSize: normalize(20),
    color: "#EBAC26"
  }
});