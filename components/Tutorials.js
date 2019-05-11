import React from "react";
import { Image, SafeAreaView, ImageBackground, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Font } from "expo";
import { normalize } from "../utils/FontNormalizer";

let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;

const ContinueButton = (props) => (
  <TouchableOpacity onPress={props.onPress} style={{ marginBottom: 25 }}>
    <ImageBackground source={require('../assets/tutorials/ContinueBtn.png')}
      resizeMode={'contain'}
      style={styles.continueButton}>
      <Text style={[styles.continueText, props.fontFamily]}>CONTINUE</Text>
    </ImageBackground>
  </TouchableOpacity>
);

const TabIcon = (props) => {
  const imageSource = props.isActive ?
    require('../assets/tutorials/ActiveTab.png') :
    require('../assets/tutorials/InActiveBtn.png');

  return <Image source={imageSource} style={styles.tabIcon} />
};

const TabContainer = (props) => (
  <View style={styles.tabContainer}>
    <TabIcon isActive={props.page === 1} />
    <TabIcon isActive={props.page === 2} />
    <TabIcon isActive={props.page === 3} />
    <TabIcon isActive={props.page === 4} />
  </View>
);

export default class Tutorials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      riffic: {},
      page: 1
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({
      riffic: {
        fontFamily: 'riffic-free-bold',
      }
    });
  }

  getPage() {
    const { page } = this.state;
    switch (page) {
      case 1:
        return this.welcomePage();
      case 2:
        return this.howToPlayPage();
      case 3:
        return this.shipToWalletPage();
      case 4:
        return this.getStarted();
    }
  };

  welcomePage = () => (
    <View style={styles.content}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ImageBackground source={require('../assets/tutorials/TitleBG.png')}
          resizeMode={'contain'}
          style={styles.titleBackground}>
          <Text style={[styles.title, this.state.riffic]}>Welcome</Text>
        </ImageBackground>
        <Text style={[styles.description, this.state.riffic]}>Mine Snakechain by {'\n'}playing Snake!</Text>
        <Image
          source={require("../assets/tutorials/welcome.png")}
          style={styles.welcomeImage}
          resizeMode={'contain'}
        />
      </ScrollView>
      <View style={styles.bottomHighlight}>
        <ContinueButton onPress={() => null} fontFamily={this.state.riffic} style={{ marginBottom: 10 }} />
        <TabContainer page={this.state.page} />
      </View>
    </View>
  );

  howToPlayPage = () => (
    <View style={styles.content}>
      <Text>How to Play</Text>
    </View>
  );

  shipToWalletPage = () => (
    <View style={styles.content}>
      <Text>Shit to Wallet</Text>
    </View>
  );

  getStarted = () => (
    <View style={styles.content}>
      <Text>Get Started</Text>
    </View>
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <ImageBackground source={require("../assets/tutorials/background.png")}
            resizeMode={'cover'}
            style={styles.backgroundImage}>
            {this.getPage()}
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    );
  }

}

const styles = {
  container: {
    flex: 1
  },
  content: {
    position: 'relative',
    alignItems: 'center'
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.1,
  },
  title: {
    color: '#FAB523',
    fontSize: normalize(22)
  },
  description: {
    marginVertical: 15,
    color: '#FAB523',
    fontSize: normalize(18),
    textAlign: 'center',
  },
  continueText: {
    color: "#352927",
    fontSize: normalize(18),
    marginBottom: 5
  },
  scrollView: {
    minHeight: screenHeight
  },
  backgroundImage: {
    position: 'relative',
    width: screenWidth,
    height: screenHeight,
  },
  titleBackground: {
    marginTop: screenWidth * 0.1,
    width: screenWidth * 0.8,
    height: screenHeight * 0.125,
    justifyContent: 'center',
    alignItems: 'center'
  },
  continueButton: {
    width: screenWidth * 0.55,
    height: screenWidth * 0.17,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomHighlight: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(51, 40, 39, 0.87)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabIcon: {
    width: screenWidth * 0.05,
    height: screenWidth * 0.05,
    resizeMode: 'contain',
    marginHorizontal: screenWidth * 0.025
  },
  welcomeImage: {
    resizeMode: 'contain',
    width: screenWidth * 0.8,
    height: screenWidth * 1.57
  }
};