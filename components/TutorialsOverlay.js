import React from 'react';
import {ImageBackground, StyleSheet, View,} from 'react-native';
import {Font} from 'expo';
import AppIntroSlider from "./AppIntroSlider";
import {Slide1, Slide2, Slide3, Slide4, Slide5} from "./TutorialSlides"

const slides = [
  {
    id: 1,
    comp: <Slide1/>
  },
  {
    id: 2,
    comp: <Slide2/>
  },
  {
    id: 3,
    comp: <Slide3/>
  },
  {
    id: 4,
    comp: <Slide4/>
  },
  {
    id: 5,
    comp: <Slide5/>
  },
];

let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
export default class TutorialsOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDynamicStyle: {},
    };
    this.renderSlide = this.renderSlide.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({
      buttonDynamicStyle: {
        fontFamily: 'riffic-free-bold',
      }
    },);
  }

  renderSlide(slide) {
    return slide.comp;
  }

  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.screen}>
          <ImageBackground source={require("../assets/BG.png")}
                           style={styles.content}
                           resizeMode={'stretch'}>

            <AppIntroSlider
              keyExtractor={(item, index) => `${index}`}
              slides={slides}
              renderItem={this.renderSlide}
              onDone={this.props.closeOverlay}
              showNextButton={false}
              showDoneButton={true}
              width={screenWidth * 0.95}
            />

          </ImageBackground>
        </View>
      );
    }
  }
}
let styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: screenWidth * 0.95,
    height: screenHeight * 0.8,
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 25,
    // paddingHorizontal: 20,
  },
});
