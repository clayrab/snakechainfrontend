import React from 'react';
import {ImageBackground, StyleSheet, View,} from 'react-native';
import {Font} from 'expo';
import {normalize} from '../utils/FontNormalizer.js';
import Tab1 from "./Tutorials/Tab1";
import AppIntroSlider from "./AppIntroSlider";
import Tab2 from "./Tutorials/Tab2";
import Tab3 from "./Tutorials/Tab3";
import Tab4 from "./Tutorials/Tab4";
import Tab5 from "./Tutorials/Tab5";

const tabs = [1, 2, 3, 4, 5];
const slides = [<Tab1/>, <Tab2/>, <Tab3/>, <Tab4/>, <Tab5/>];

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
    return slides[slide - 1];
  }

  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.screen}>
          <ImageBackground source={require("../assets/BG.png")} style={styles.content} resizeMode={'stretch'}>

            <AppIntroSlider slides={tabs}
                            renderItem={this.renderSlide}
                            onDone={this.props.closeOverlay}
                            showNextButton={false}
                            showDoneButton={false}
            />

          </ImageBackground>
        </View>
      );
    }
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
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
  },
  inputStyle: {
    color: "#EBAC26",
    fontSize: normalize(13),
    paddingLeft: '2%',
  },
  headingStyle: {
    color: "#EBAC26",
    fontSize: normalize(33),
    textAlign: "center",
    marginTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: -10,
    zIndex: 100,
  },
  closeButtonImage: {
    height: 50,
    width: 35
  },
  textBox: {
    marginTop: 10,
    padding: 20,
    width: screenWidth * 872 / 1080,
    height: (299 / 818) * screenWidth * 872 / 1080,
  },
  snakeImageView: {
    marginTop: 10,
    flexDirection: 'row',
  },
  leftSnake: {
    width: screenWidth * 467 / 1080,
    height: (444 / 434) * screenWidth * 467 / 1080,
    resizeMode: "stretch",
  },
  rightSnake: {
    width: screenWidth * 330 / 1080,
    height: (994 / 717) * screenWidth * 330 / 1080,
    resizeMode: "stretch",
  },
  txBox: {
    marginTop: 10,
    width: screenWidth * 872 / 1080,
    height: (299 / 818) * screenWidth * 872 / 1080,
    justifyContent: "center",
    alignItems: 'center'
  },
  tableHolder: {
    width: screenWidth * 773 / 1080,
    height: "80%",
  },
  tableHeader: {
    flexDirection: "row",
  },
  tableView: {
    flex: 1,
    borderRightColor: "#EBAC26",
    borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tableViewBottom: {
    flex: 1,
    borderRightColor: "#EBAC26",
    borderRightWidth: 1,
    borderTopColor: "#EBAC26",
    borderTopWidth: 1
  },
  backToCampButton: {
    marginTop: 20,
    width: screenWidth * 709 / 1080,
    height: (182 / 671) * screenWidth * 709 / 1080,
    justifyContent: "center",
    alignItems: 'center'
  },
  backToCampButtonText: {
    color: "#EBAC26",
    fontSize: normalize(16)
  },
});
