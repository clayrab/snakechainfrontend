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
import {getFromAsyncStore} from "../utils/AsyncStore";
import {context} from "../utils/Context";

const TotalComp = (props) => (
  <ImageBackground source={require("../assets/powerupsoverlay/brownBG.png")}
                   resizeMode={"contain"}
                   style={styles.bigValueHolder}>
    <Text style={[styles.totalText, props.fontStyle]}>Total</Text>
    <Text style={[styles.totalText, props.fontStyle]}>{props.total}</Text>
  </ImageBackground>
);

const MushroomTotal = (props) => {
  const total = props.mushroom.count * props.mushroom.price;
  if (total > 0)
    return (
      <ImageBackground source={require("../assets/powerupsoverlay/brownBG.png")}
                       resizeMode={"contain"} style={styles.bigValueHolder}>
        <Image source={props.image} style={[styles.smallMushroom]}/>
        <Text style={[styles.mushroomValue, styles.fontStyle]}>{props.mushroom.count * props.mushroom.price}</Text>
      </ImageBackground>
    );
  return <View/>
}

const CircleComp = (props) => (
  <View style={styles.circleView}>
    <Text style={[styles.circleText, props.style]}>{props.value}</Text>
  </View>
);

const Box = ((props) =>
    <View style={styles.boxContainer}>
      <TouchableOpacity onPress={() => props.onItemPress(props)} style={styles.boxViewContainer}>
        <ImageBackground source={require('../assets/Paused/partionBackground.png')} resizeMode={"stretch"}
                         style={[styles.boxView]}>
          <Text style={[styles.boxText, props.fontStyle]}>{props.heading}</Text>
          <Image source={props.boxImage}
                 style={[styles.boxImageView, props.customImage !== undefined ? props.customImage : null]}/>
          <CircleComp value={props.circleText} style={props.fontStyle}/>
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

export default class PowerupOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPowerUp: {},
      detailVisible: false,
      goldPowerUp: {
        price: 3000,
        count: 0
      },
      bluePowerUp: {
        price: 1000,
        count: 0
      },
      purplePowerUp: {
        price: 5000,
        count: 0
      },
      redPowerUp: {
        price: 10000,
        count: 0
      }
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    styles.buttonText = {
      fontFamily: 'riffic-free-bold'
    }
  }

  onGoldCountChange = count => {
    this.setState({goldPowerUp: {...this.state.goldPowerUp, count}})
  }

  onBlueCountChange = count => {
    this.setState({bluePowerUp: {...this.state.bluePowerUp, count}})
  }

  onPurpleCountChange = count => {
    this.setState({purplePowerUp: {...this.state.purplePowerUp, count}})
  }

  onRedCountChange = count => {
    this.setState({redPowerUp: {...this.state.redPowerUp, count}})
  }

  getTotalCount = () => {
    const {goldPowerUp, bluePowerUp, purplePowerUp, redPowerUp} = this.state;
    return (goldPowerUp.count * goldPowerUp.price) +
      (bluePowerUp.count * bluePowerUp.price) +
      (purplePowerUp.count * purplePowerUp.price) +
      (redPowerUp.count * redPowerUp.price)
  }

  proceedToAcquire = async () => {
    // TODO: Show confirmation overlay
    await this.createTransaction();
  }

  createTransaction = async () => {
    const amount = this.getTotalCount();

    let jwt = await getFromAsyncStore("jwt");
    let data = {
      amount: amount,
      type: "SNK"
    };
    fetch(`${context.host}:${context.port}/createTransaction`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "JWT " + jwt,
      },
    }).then(async (response) => {
      let resp = await response.json();
      if (!resp.error) {
        if (resp) {
          if (resp.transactionKey) {

            await this.buyPowerups(resp.transactionKey);

          } else {
            alert("There was an error, malformed response.");
            this.setState({overlay: -1});
          }
        } else {
          alert("There was an error, no response.");
          this.setState({overlay: -1});
        }
      } else {
        alert(resp.error);
        this.setState({overlay: -1});
      }
    }).catch(err => {
      throw err
    });
  }

  buyPowerups = async (txkey) => {
    const amount = this.getTotalCount();
    const {goldPowerUp, bluePowerUp, purplePowerUp, redPowerUp} = this.state;
    let jwt = await getFromAsyncStore("jwt");
    let data = {
      txkey,
      type: "SNK",
      amount: amount,
      goldpowerup: goldPowerUp.count,
      bluepowerup: bluePowerUp.count,
      purplepowerup: purplePowerUp.count,
      redpowerup: redPowerUp.count
    };
    fetch(`${context.host}:${context.port}/buyPowerups`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "JWT " + jwt,
      },
    }).then(async (response) => {
      let resp = await response.json();
      if (!resp.error) {
        if (resp) {

          // TODO: Show success modal
          alert("Success!");

        } else {
          alert("There was an error, no response.");
          this.setState({overlay: -1});
        }
      } else {
        alert(resp.error);
        this.setState({overlay: -1});
      }
    }).catch(err => {
      throw err
    });
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

              <View style={{
                flexDirection: 'row',
                justifyContent: "space-around",
                flexWrap: 'wrap',
                paddingTop: 25,
                paddingBottom: 10,
                paddingHorizontal: 15
              }}>

                <Box buttonStyle={[styles.buttonText]}
                     fontStyle={styles.buttonText}
                     boxImage={require('../assets/powerupsoverlay/mushroom_yellow.png')}
                     boughtCount={this.state.goldPowerUp.count}
                     price={this.state.goldPowerUp.price}
                     circleText={'5'}
                     heading={'Multiplayer (10x)'}
                     changeCount={this.onGoldCountChange}
                     onItemPress={this.onItemPress}
                />
                <Box buttonStyle={[styles.buttonText]}
                     fontStyle={styles.buttonText}
                     boughtCount={this.state.bluePowerUp.count}
                     price={this.state.bluePowerUp.price}
                     boxImage={require('../assets/powerupsoverlay/mushroom_blue.png')}
                     circleText={'0'}
                     heading={'Shed Tail'}
                     changeCount={this.onBlueCountChange}
                     onItemPress={this.onItemPress}
                />
                <Box buttonStyle={[styles.buttonText]}
                     fontStyle={styles.buttonText}
                     boughtCount={this.state.purplePowerUp.count}
                     price={this.state.purplePowerUp.price}
                     boxImage={require('../assets/powerupsoverlay/mushroom_voilet.png')}
                     circleText={'5'}
                     heading={'Wildcard'}
                     changeCount={this.onPurpleCountChange}
                     onItemPress={this.onItemPress}
                />
                <Box buttonStyle={[styles.buttonText]}
                     fontStyle={styles.buttonText}
                     boughtCount={this.state.redPowerUp.count}
                     price={this.state.redPowerUp.price}
                     boxImage={require('../assets/powerupsoverlay/mushroom_red.png')}
                     circleText={'5'}
                     heading={'Nitro Tail'}
                     changeCount={this.onRedCountChange}
                     onItemPress={this.onItemPress}
                />

              </View>

              <MushroomTotal mushroom={this.state.goldPowerUp}
                             image={require("../assets/powerupsoverlay/mushroom_yellow.png")}/>

              <MushroomTotal mushroom={this.state.bluePowerUp}
                             image={require("../assets/powerupsoverlay/mushroom_blue.png")}/>

              <MushroomTotal mushroom={this.state.purplePowerUp}
                             image={require("../assets/powerupsoverlay/mushroom_voilet.png")}/>

              <MushroomTotal mushroom={this.state.redPowerUp}
                             image={require("../assets/powerupsoverlay/mushroom_red.png")}/>

              <TotalComp total={this.getTotalCount()} fontStyle={styles.buttonText}/>

              <TouchableOpacity style={styles.proceedToAcquireContainer} onPress={this.proceedToAcquire}>
                <ImageBackground source={require("../assets/powerupsoverlay/yellowBG.png")}
                                 resizeMode={"contain"}
                                 style={styles.proceedToAcquireBtn}>
                  <Text style={[styles.proceedToAcquireText, styles.buttonText]}>Proceed to Acquire</Text>
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
});
