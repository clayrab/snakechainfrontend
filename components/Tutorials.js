import React from "react";
import { Image, SafeAreaView, ImageBackground, ScrollView, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { normalize } from "../utils/FontNormalizer";

let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;

const ContinueButton = (props) => (
  <TouchableOpacity onPress={props.onPress} style={{ marginBottom: 25, marginTop: 20 }}>
    <ImageBackground source={require('../assets/tutorials/ContinueBtn.png')}
      resizeMode={'contain'}
      style={styles.continueButton}>
      <Text style={[styles.continueText]}>CONTINUE</Text>
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
      page: 1
    };
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
        <View style={styles.scrollViewContent}>
          <ImageBackground source={require('../assets/tutorials/TitleBG.png')}
            resizeMode={'contain'}
            style={styles.titleBackground}>
            <Text style={[styles.title]}>Welcome</Text>
          </ImageBackground>
          <Text style={[styles.description]}>Mine Snakechain by {'\n'}playing Snake!</Text>
          <Image
            source={require("../assets/tutorials/welcome.png")}
            style={styles.welcomeImage}
            resizeMode={'contain'}
          />
          <View style={styles.bottomHighlight}>
            <ContinueButton onPress={() => this.setState({ page: 2 })}
              style={{ marginBottom: 10 }} />
            <TabContainer page={this.state.page} />
          </View>
        </View>
      </ScrollView>
    </View>
  );

  howToPlayPage = () => (
    <View style={styles.content}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollViewContent}>
          <ImageBackground source={require('../assets/tutorials/TitleBG.png')}
            resizeMode={'contain'}
            style={styles.titleBackground}>
            <Text style={[styles.title]}>HOW TO PLAY</Text>
          </ImageBackground>
          <Text style={[styles.description]}>
            Choose your tunnel, and collect each SnakeGold to add to your haul!
          </Text>
          <Image
            source={require("../assets/tutorials/howToPlay.png")}
            style={styles.howToPlayImage}
            resizeMode={'contain'}
          />
          <ContinueButton onPress={() => this.setState({ page: 3 })}
            style={{ marginBottom: 10 }} />
          <TabContainer page={this.state.page} />
        </View>
      </ScrollView>
    </View>
  );

  shipToWalletPage = () => (
    <View style={styles.content}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollViewContent}>
          <ImageBackground source={require('../assets/tutorials/TitleBG.png')}
            resizeMode={'contain'}
            style={styles.titleBackground}>
            <Text style={[styles.title]}>SHIP TO WALLET</Text>
          </ImageBackground>
          <Text style={[styles.description]}>
            Purchase a Trolly Rental ticket, and ship your SnakeGold to your SNakeBank Wallet
          </Text>
          <Image
            source={require("../assets/tutorials/shipToWallet.png")}
            style={styles.shipToWalletImage}
            resizeMode={'contain'}
          />
          <View style={styles.bottomHighlight}>
            <ContinueButton onPress={() => this.setState({ page: 4 })}
              style={{ marginBottom: 10 }} />
            <TabContainer page={this.state.page} />
          </View>
        </View>
      </ScrollView>
    </View>
  );

  getStarted = () => (
    <View style={styles.content}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollViewContent}>
          <ImageBackground source={require('../assets/tutorials/TitleBG.png')}
            resizeMode={'contain'}
            style={styles.titleBackground}>
            <Text style={[styles.title]}>GET STARTED</Text>
          </ImageBackground>
          <ImageBackground source={require('../assets/tutorials/TextBackground.png')}
            resizeMode={'contain'} style={styles.getStartedTextContainer}>
            <Text style={[styles.description]}>
              Go to your mine and start playing now!
            </Text>
          </ImageBackground>
          <TouchableOpacity onPress={this.onDone} style={styles.playNowContainer}>
            <Image source={require("../assets/tutorials/PlayNow.png")}
              style={styles.playNowImage} />
          </TouchableOpacity>
          <TabContainer page={this.state.page} />
        </View>
      </ScrollView>
    </View>
  );

  onDone = async () => {
    await AsyncStorage.removeItem("LAST_REGISTERED");
    this.props.onDone();
  }

  render() {
    const background = this.state.page === 4 ?
      require('../assets/tutorials/GetStartedBackground.png') :
      require("../assets/tutorials/background.png");
    const backgroundStyle = this.state.page === 4 ? { height: screenWidth * 2.1 } : {}

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <ImageBackground source={background}
            resizeMode={'cover'}
            style={[styles.backgroundImage, backgroundStyle]}>
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
    minHeight: screenHeight,
    width: screenWidth
  },
  scrollViewContent: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: '#FAB523',
    fontSize: normalize(22),
    fontFamily: 'riffic-free-bold'
  },
  description: {
    maxWidth: screenWidth * 0.8,
    marginVertical: 15,
    color: '#FAB523',
    fontSize: normalize(18),
    textAlign: 'center',
    fontFamily: 'riffic-free-bold'
  },
  continueText: {
    color: "#352927",
    fontSize: normalize(18),
    marginBottom: 5,
    fontFamily: 'riffic-free-bold'
  },
  backgroundImage: {
    position: 'relative',
    width: screenWidth,
    height: screenHeight,
  },
  titleBackground: {
    marginTop: screenWidth * 0.1,
    alignSelf: 'center',
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
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  tabIcon: {
    width: screenWidth * 0.05,
    height: screenWidth * 0.05,
    resizeMode: 'contain',
    marginHorizontal: screenWidth * 0.025
  },
  welcomeImage: {
    width: screenWidth * 0.8,
    height: screenWidth * 1.57
  },
  howToPlayImage: {
    width: screenWidth * 0.8,
    height: screenWidth * 1.1,
  },
  shipToWalletImage: {
    width: screenWidth * 0.8,
    height: screenWidth * 1.6
  },
  getStartedTextContainer: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.36,
    padding: 20,
    marginTop: screenWidth * 0.95,
    justiyContent: 'center',
    alignItems: 'center'
  },
  playNowContainer: {
    marginTop: 25,
    marginBottom: 40,
  },
  playNowImage: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.2,
    resizeMode: 'contain'
  }
};