import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Font} from 'expo';
import {normalize} from "../utils/FontNormalizer";
import PowerupDetailOverlay from "./PowerupDetailOverlay";

const TotalComp = (props) => (
  <ImageBackground source={require("../assets/powerupsoverlay/brownBG.png")}
                   resizeMode={"contain"}
                   style={styles.bigValueHolder}>
    <Text style={[styles.totalText, props.fontStyle]}>Total</Text>
    <Text style={[styles.totalText, props.fontStyle]}>{props.total}</Text>
  </ImageBackground>
);

const MushroomTotal = (props) => {
  const total = props.count * props.price;
  if (total > 0)
    return (
      <ImageBackground source={require("../assets/powerupsoverlay/brownBG.png")}
                       resizeMode={"contain"} style={styles.bigValueHolder}>
        <Image source={props.image} style={[styles.smallMushroom]}/>
        <Text style={[styles.mushroomValue, props.fontStyle]}>{total}</Text>
      </ImageBackground>
    );
  return <View/>
}

const CircleComp = (props) => (
  <View style={styles.circleView}>
    <Text style={[styles.circleText, props.style]}>{props.value}</Text>
  </View>
);

const PowerupBox = (props) => {
  return (

    <View style={styles.boxContainer}>
      <TouchableOpacity onPress={() => props.onItemPress(props)} style={styles.boxViewContainer}>
        <ImageBackground source={require('../assets/Paused/partionBackground.png')} resizeMode={"stretch"}
                         style={[styles.boxView]}>
          <Text style={[styles.boxText, props.fontStyle]}>{props.heading}</Text>
          <Image source={props.boxImage}
                 style={[styles.boxImageView, props.customImage !== undefined ? props.customImage : null]}/>
          {
            props.circleText > -1 &&
            <CircleComp value={props.circleText} style={props.fontStyle}/>
          }

        </ImageBackground>
      </TouchableOpacity>
      {
        props.boughtCount > 0 &&
        <ImageBackground source={require("../assets/Paused/inputBackground.png")} resizeMode={"stretch"}
                         style={[styles.numberInput, {justifyContent: 'space-between', paddingHorizontal: 20}]}>
          <TouchableOpacity onPress={() => props.changeCount(props.boughtCount - 1)}>
            <Image source={require("../assets/Paused/minus.png")} style={[styles.coinStyle, props.imageStyle]}/>
          </TouchableOpacity>
          <Text style={[styles.coinText, props.buttonStyle]}>{props.boughtCount}</Text>
          <TouchableOpacity onPress={() => props.changeCount(props.boughtCount + 1)}>
            <Image source={require("../assets/Paused/plus.png")} style={[styles.coinStyle, props.imageStyle]}/>
          </TouchableOpacity>
        </ImageBackground>
        ||
        <TouchableOpacity onPress={() => props.changeCount(props.boughtCount + 1)}>
          <ImageBackground source={require("../assets/Paused/inputBackground.png")} resizeMode={"stretch"}
                           style={styles.numberInput}>
            <Image source={require("../assets/Paused/coinIcon.png")} style={[styles.coinStyle, props.imageStyle]}/>
            <Text style={[styles.coinText, props.fontStyle]}>{props.price}</Text>
          </ImageBackground>
        </TouchableOpacity>
      }
    </View>
  );
};
export default class PowerupOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPowerUp: {},
      detailVisible: false,
      yellowPowerUpCount: 0,
      bluePowerUpCount: 0,
      orangePowerUpCount: 0,
      redPowerUpCount: 0,
    }
  }

  initializePowerUpsCount = () => {
    this.setState({
      yellowPowerUpCount: 0,
      bluePowerUpCount: 0,
      orangePowerUpCount: 0,
      redPowerUpCount: 0,
    })
  }

  onGoldCountChange = count => {
    this.setState({yellowPowerUpCount: count})
  }

  onBlueCountChange = count => {
    this.setState({bluePowerUpCount: count})
  }

  onPurpleCountChange = count => {
    this.setState({orangePowerUpCount: count})
  }

  onRedCountChange = count => {
    this.setState({redPowerUpCount: count})
  }

  getTotalCount = () => {
    return (this.state.yellowPowerUpCount * this.props.prices.yellowpowerup) +
      (this.state.bluePowerUpCount * this.props.prices.bluepowerup) +
      (this.state.orangePowerUpCount * this.props.prices.orangepowerup) +
      (this.state.redPowerUpCount * this.props.prices.redpowerup)
  }

  proceedToAcquire = async () => {
    const powerups = {
      yellowpowerup: this.state.yellowPowerUpCount,
      bluepowerup: this.state.bluePowerUpCount,
      orangepowerup: this.state.orangePowerUpCount,
      redpowerup: this.state.redPowerUpCount,
    };
    this.props.proceedToAcquire(powerups, this.getTotalCount())
  }

  onItemPress = (props) => {
    const {name, image, description} = props;
    this.setState({
      detailVisible: true,
      selectedPowerUp: {name, image, description}
    });
  }

  closeDetailOverlay = () => {
    this.setState({detailVisible: false, selectedPowerUp: {}})
  }

  render() {
    if (!this.props.show) {
      return null;
    } else {
      console.log("this.props.prices")
      console.log(this.props.prices)
      return (
        <View style={styles.container}>
          <ImageBackground style={styles.content} source={require('../assets/pauseoverlay/BackgroundBrown.png')}
                           resizeMode={'stretch'}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage}
                     resizeMode="stretch"/>
            </TouchableOpacity>
            <View style={styles.buttonView}>
              <ImageBackground style={styles.brownButton} source={require('../assets/snakemine/title.png')}
                               resizeMode={'stretch'}>
                <Image source={require("../assets/powerupsoverlay/powerup.png")}
                       style={{width: 14, height: 22, resizeMode: 'contain'}}/>
                <Text style={[styles.buttonText, styles.titleText]}>
                  POWER-UPS
                </Text>
              </ImageBackground>
            </View>

            <ScrollView>
              {this.props.prices == null? null :
                <View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-around",
                    flexWrap: 'wrap',
                    paddingTop: 25,
                    paddingBottom: 10,
                    paddingHorizontal: 15
                  }}>

                    <PowerupBox buttonStyle={[styles.buttonText]}
                         fontStyle={styles.buttonText}
                         boxImage={require('../assets/graphics/gameplay/lemon.png')}
                         boughtCount={this.state.yellowPowerUpCount}
                         price={this.props.prices.yellowpowerup}
                         circleText={this.props.user.powerups.yellowpowerup}
                         heading={'Multiplayer (10x)'}
                         changeCount={this.onGoldCountChange}
                         onItemPress={this.onItemPress}
                    />
                    <PowerupBox buttonStyle={[styles.buttonText]}
                         fontStyle={styles.buttonText}
                         boughtCount={this.state.bluePowerUpCount}
                         price={this.props.prices.bluepowerup}
                         boxImage={require('../assets/graphics/gameplay/blueberry.png')}
                         circleText={this.props.user.powerups.bluepowerup}
                         heading={'Shed Tail'}
                         changeCount={this.onBlueCountChange}
                         onItemPress={this.onItemPress}
                    />
                    <PowerupBox buttonStyle={[styles.buttonText]}
                         fontStyle={styles.buttonText}
                         boughtCount={this.state.orangePowerUpCount}
                         price={this.props.prices.orangepowerup}
                         boxImage={require('../assets/graphics/gameplay/orange.png')}
                         circleText={this.props.user.powerups.orangepowerup}
                         heading={'Wildcard'}
                         changeCount={this.onPurpleCountChange}
                         onItemPress={this.onItemPress}
                    />
                    <PowerupBox buttonStyle={[styles.buttonText]}
                         fontStyle={styles.buttonText}
                         boughtCount={this.state.redPowerUpCount}
                         price={this.props.prices.redpowerup}
                         boxImage={require('../assets/graphics/gameplay/strawberry.png')}
                         circleText={this.props.user.powerups.redpowerup}
                         heading={'Nitro Tail'}
                         changeCount={this.onRedCountChange}
                         onItemPress={this.onItemPress}
                    />

                  </View>

                  <MushroomTotal count={this.state.yellowPowerUpCount} price={this.props.prices.yellowpowerup}
                                 image={require("../assets/graphics/gameplay/lemon.png")}
                                 fontStyle={styles.buttonText}/>

                  <MushroomTotal count={this.state.bluePowerUpCount} price={this.props.prices.bluepowerup}
                                 image={require("../assets/graphics/gameplay/blueberry.png")}
                                 fontStyle={styles.buttonText}/>

                  <MushroomTotal count={this.state.orangePowerUpCount} price={this.props.prices.orangepowerup}
                                 image={require("../assets/graphics/gameplay/orange.png")}
                                 fontStyle={styles.buttonText}/>

                  <MushroomTotal count={this.state.redPowerUpCount} price={this.props.prices.redpowerup}
                                 image={require("../assets/graphics/gameplay/strawberry.png")}
                                 fontStyle={styles.buttonText}/>
                  <TotalComp total={this.getTotalCount()} fontStyle={styles.buttonText}/>
                </View>
              }


              <TouchableOpacity style={styles.proceedToAcquireContainer} onPress={this.proceedToAcquire}>
                <ImageBackground source={require("../assets/powerupsoverlay/yellowBG.png")}
                                 resizeMode={"contain"}
                                 style={styles.proceedToAcquireBtn}>
                  <Text style={[styles.proceedToAcquireText, styles.buttonText]}>Confirm</Text>
                </ImageBackground>
              </TouchableOpacity>
            </ScrollView>

          </ImageBackground>
          <PowerupDetailOverlay
            style={{zIndex: 101}}
            closeOverlay={this.closeDetailOverlay}
            show={this.state.detailVisible}
            powerup={{
              name: "Multiplayer (10x)",
              image: require("../assets/powerupsoverlay/yellow_big.png"),
              description: "This mushroom is the Aurea ovaUs. When eatea 30sec 10x pellet multiplayer"
            }}
          />
        </View>
      );
    }
  }
}

let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
const circleSize = screenWidth * 0.06;
const styles = StyleSheet.create({
  container: {
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
    width: screenWidth * 4 / 5,
    height: screenHeight * 4 / 5,
    position: 'relative',
    flexDirection: 'column',
  },
  closeButton: {
    position: 'absolute',
    top: -20,
    right: -15,
    zIndex: 100,
  },
  closeButtonImage: {
    height: 50,
    width: 35
  },
  buttonView: {
    alignItems: 'center',
    marginTop: -15
  },
  brownButton: {
    width: screenWidth * 0.35,
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    flexDirection: 'row'
  },
  titleText: {
    color: "#fab523",
    fontSize: 16
  },
  coinText: {color: "#FDB525", marginHorizontal: "7%", fontSize: normalize(13)},
  smallMushroom: {height: screenWidth * 0.06, width: screenWidth * 0.06, resizeMode: 'contain'},
  coinStyle: {height: screenWidth * 0.04, width: screenWidth * 0.04, resizeMode: "contain"},
  bigValueHolder: {
    marginBottom: 20,
    width: screenWidth * 0.7,
    height: screenWidth * 0.1,
    paddingHorizontal: screenWidth * 0.08,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  numberInput: {
    width: "100%",
    height: screenWidth * 0.09,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  boxContainer: {
    height: screenWidth * 0.4,
    width: screenWidth * 0.3,
    justifyContent: "center",
    marginBottom: 25
  },
  backgroundImage: {flex: 1, marginTop: '2%', marginLeft: '2%', marginRight: '2%',},
  circleText: {color: "#271E11", fontSize: normalize(15)},
  circleView: {
    position: "absolute",
    top: -10,
    borderRadius: (circleSize) / 2,
    height: circleSize,
    width: circleSize,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAB523"
  },
  boxText: {
    color: "#FBBD3E",
    marginTop: '10%',
    textAlign: "center",
    paddingLeft: '4%',
    fontSize: normalize(10),
    marginBottom: "5%"
  },
  boxImageView: {
    resizeMode: "contain",
    height: "40%",
    width: "40%"
  },
  boxViewContainer: {
    height: "70%",
    width: '100%'
  },
  boxView: {height: '100%', width: '100%', justifyContent: "center", alignItems: "center"},
  mushroomValue: {
    fontSize: normalize(16),
    color: "#fab649"
  },
  totalText: {
    color: "#896a66",
    fontSize: normalize(16)
  },
  proceedToAcquireContainer: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  proceedToAcquireBtn: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.13,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
  },
  proceedToAcquireText: {
    color: "#352826",
    fontSize: normalize(14)
  },
  buttonText: {
    fontFamily: 'riffic-free-bold',
  }
});
