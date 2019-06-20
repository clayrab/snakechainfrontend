import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { Font } from 'expo';
import { normalize } from '../utils/FontNormalizer.js';

import Header from '../components/Header.js';
import ScreenView from '../components/ScreenView.js';

export default class SnakeUpgrade extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      overlay: null,
      loading: true,
      riffic: { display: "none", },
      confirmAmount: -1,
      confirmTokenType: "ETH",
      txKey: "",
      confirmPubkey: "",
      powerupsData: null
    };
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
      });
      this.setState({
        riffic: {
          fontFamily: 'riffic-free-bold',
        },
      });
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const { snake, onLeftPress, onRightPress } = this.props;
    return (
      <ScreenView>
        <ImageBackground source={require('../assets/snakeupgrade/Background.png')}
          style={styles.backgroundImage} resizeMode="cover">
          <Header loading={this.props.loading} user={this.props.user} onProfile={this.props.onProfile}
            onWallet={this.props.onWallet} style={styles.head} />

          <ScrollView>

            <View style={styles.contentHolder}>

              <ImageBackground source={require('../assets/snakeupgrade/CowboyBackground.png')}
                style={styles.cowboyback} resizeMode="cover">
                <View style={styles.snakeStageContainer}>
                  <Text style={[styles.snakeText, this.state.riffic]}>{snake.name}</Text>
                  <View style={styles.scroll}>
                    <TouchableOpacity onPress={onLeftPress}>
                      <Image source={require('../assets/snakeupgrade/LeftArrow.png')}
                        style={styles.arrow} />
                    </TouchableOpacity>
                    <View style={styles.stageAndSnake}>
                      <Image source={snake.image} style={styles.snakeImg} />
                      <ImageBackground source={require('../assets/snakeupgrade/SnakeStage.png')}
                        style={styles.snakeStage} resizeMode={'contain'} />
                    </View>
                    <TouchableOpacity onPress={onRightPress}>
                      <Image source={require('../assets/snakeupgrade/RightArrow.png')}
                        style={styles.arrow} />
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>

              <View style={styles.bottomIconsHolder}>
                <ImageBackground
                  source={require('../assets/snakeupgrade/MushroomDetailBackground.png')}
                  style={styles.mashdetailback} resizeMode={'contain'}>
                  <View style={styles.mushroomView}>
                    <View style={styles.mushroomItem}>
                      <Image
                        source={require('../assets/snakeupgrade/BlueMushroom.png')}
                        style={styles.mushroompic} />
                      <Text style={[styles.mushroomText, this.state.riffic]}>02 BLUE
                            MUSHROOM</Text>
                    </View>
                    <View style={styles.mushroomItem}>
                      <Image
                        source={require('../assets/snakeupgrade/RedMushroom.png')}
                        style={styles.mushroompic} />
                      <Text style={[styles.mushroomText, this.state.riffic]}>02 RED
                            MUSHROOM</Text>
                    </View>
                  </View>
                </ImageBackground>

                <ImageBackground
                  source={require('../assets/snakeupgrade/EthValueBackground.png')}
                  style={styles.ethButton} resizeMode={'contain'}>
                  <Text style={[styles.purchaseText, this.state.riffic]}>0.00012 ETH</Text>
                  <ImageBackground source={require('../assets/snakeupgrade/purchasebtn.png')}
                    style={styles.purchaseButton} resizeMode={'contain'}>
                  </ImageBackground>
                </ImageBackground>

              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </ScreenView >

    );
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;

let styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  head: {
    position: 'absolute',
    zIndex: 2
  },
  contentHolder: {
    flex: 1,
    width: screenWidth,
    zIndex: 4,
    marginTop: screenWidth * 0.21,
    alignItems: "center",
    justifyContent: 'center'
  },
  cowboyback: {
    zIndex: 1,
    width: screenWidth,
    height: screenWidth * 1.1,
    marginBottom: screenWidth * 0.1,
    // position: 'absolute',
    top: screenWidth * 0.2 * -1
  },
  snakeStageContainer: {
    width: screenWidth,
    height: screenWidth * 1.1,
    justifyContent: 'center',
    // backgroundColor: 'yellow'
  },
  bottomIconsHolder: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -screenWidth * 0.2
  },
  snakeImg: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.6,
    resizeMode: 'contain',
    zIndex: 4,
    top:20,
    marginLeft: screenWidth * 0.04
  },
  snakeStage: {
    height: screenWidth * 0.35,
    width: screenWidth * 0.8,
    position: 'absolute',
    bottom: screenWidth * -0.25
  },
  mashdetailback: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.35,
    // marginTop: screenWidth * 0.03,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mushroompic: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: screenWidth * 0.05,
  },
  ethButton: {
    marginTop: -screenWidth * 0.05,
    width: 261,
    height: 150,
    marginBottom: screenWidth * 0.1
  },
  purchaseButton: {
    marginTop: -screenWidth * 0.11,
    width: 170,
    height: 150,
    marginLeft: screenWidth * 0.12,
  },
  snakeText: {
    color: "#1E1717",
    fontSize: normalize(22),
    top: 35,
    textAlign: 'center',
  },
  purchaseText: {
    fontSize: normalize(26),
    marginTop: screenWidth * 0.15,
    textAlign: 'center',
    color: "#FAB523"
  },
  mushroomText: {
    color: "#000",
    fontSize: normalize(21),
  },
  scroll: {
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: screenWidth * 0.1
  },
  arrow: {
    width: screenWidth * 0.16,
    height: screenWidth * 0.16,
    resizeMode: 'contain',
    marginHorizontal: screenWidth * 0.02,
  },
  mushroomView: {

  },
  mushroomItem: {
    flexDirection: 'row',
    marginVertical: screenWidth * 0.018
  },
  coin: { height: 15, width: 15 * 168 / 128, resizeMode: 'stretch', },
  stageAndSnake: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
