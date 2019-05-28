import React from 'react';
import {AsyncStorage, Linking} from 'react-native';
import {Loop, Stage, World, Body, Sprite} from 'react-game-kit/native';
import SocketIOClient from 'socket.io-client';

import CONSTANTS from './Constants.js';
import {asyncStore, getFromAsyncStore, removeItem} from "./utils/AsyncStore.js";
import {context} from "./utils/Context.js";
import {makeRetry} from "./utils/Retry.js";
import {formatToken} from './utils/uiHelperFunctions.js';
import {createTransaction} from './utils/Transactions.js';

import Snek from './sprites/Snek.js';

import AreYouSureOverlay from './components/AreYouSureOverlay.js';
import ConfirmTxGameOverOverlay from './components/ConfirmTxGameOverOverlay.js';
import ConfirmTxOverlay from './components/ConfirmTxOverlay.js';
import CowOverlay from './components/CowOverlay.js';
import ErrorOverlay from './components/ErrorOverlay.js';
import GameOverOverlay from './components/GameOverOverlay.js';
import Homepage from './components/Homepage.js';
import Login from './components/Login.js';
import LoginChoose from './components/LoginChoose.js';
import Loading from './components/Loading.js';
import LoadingOverlay from './components/LoadingOverlay.js';
import PauseOverlay from './components/PauseOverlay.js';
import PowerupOverlay from './components/PowerupOverlay.js';
import ScreenView from './components/ScreenView.js';
import Signup from './components/Signup.js';
import SignupChoose from './components/SignupChoose.js';
import SnakeTown from './components/SnakeTown.js';
import StartGameOverlay from './components/StartGameOverlay.js';
import Wallet from './components/Wallet.js';
import Profile from './components/Profile.js';

// import EditProfile from './components/EditProfile.js';
// import SuccessfulEdit from './components/SuccessfulEdit'
// import UnSuccessfulEdit from './components/UnsucecessfulEdit'
import ViewSponsor from './components/ViewSponsor.js';
import PurchasedTicket from './components/PurchasedTicket.js';
import Success from './components/Success.js';
import Fail from './components/Fail.js';
import SelectLevel from "./components/SelectLevel";
import Tutorials from "./components/Tutorials";

// components/ChangePassword.js
// components/EditProfile.js
//import GameOverview from './components/GameOverview.js'

// components/GameOverview.js
// components/Paused.js
// components/ViewSponsor.js

let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;

const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ['websocket'],
};

var screens = {
  "GAME": 0, "HOME": 1, "LOADING": 2, "PREFERENCES": 3, "PROFILE": 4,
  "ACCOUNTHISTORY": 5, "GAMEHISTORY": 6, "LOGIN": 7, "SNAKETOWN": 8, "WALLET": 9,
  "SELECTLEVEL": 10, "SIGNUP": 11, "TUTORIALS": 12, "LOGINCHOOSE": 13, "SIGNUPCHOOSE": 14, "SIGNUP": 15,
};
var overlays = {
  "PAUSE": 0, "GAMEOVER": 1, "MINE": 2, "AREYOUSURE": 3, "LOADING": 4,
  "CONFIRMTX": 5, "TRANSACTION": 6, "CONFIRMCONTRACT": 7, "POWERUPS": 8, "STARTGAME": 9,
  "ERROR": 10, "CONFIRMEXIT": 11, "COWOVERLAY": 12,
};
const snakes = ["TRADITIONAL", "SUPER_SNAKE", "SNAKE_RUSH"];
const snakesData = {
  "TRADITIONAL": {
    name: "TRADITIONAL",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod",
    background: {
      top: require("./assets/selectlevel/levels/traditional/background_top.png"),
      bottom: require("./assets/selectlevel/levels/traditional/bottom.png"),
    },
    snake: require('./assets/selectlevel/levels/traditional/snake.png'),
    style: {
      snakeImageView: {
        left: screenWidth * 0.07,
        bottom: screenWidth * 0.32
      },
      snakeImage: {
        width: screenWidth * 0.52,
        height: screenWidth * 0.36,
      }
    },
    weapon: require('./assets/selectlevel/levels/traditional/weapon.png'),
  },
  "SUPER_SNAKE": {
    name: "SUPER SNAKE",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod",
    background: {
      top: require("./assets/selectlevel/levels/snake_rush/background_top.png"),
      bottom: require("./assets/selectlevel/levels/snake_rush/bottom.png"),
    },
    style: {
      snakeImageView: {
        left: screenWidth * 0.2,
        bottom: screenWidth * 0.27
      },
      snakeImage: {
        width: screenWidth * 0.38,
        height: screenWidth * 0.5
      }
    },
    snake: require('./assets/selectlevel/levels/super_snake/snake.png'),
    weapon: require('./assets/selectlevel/levels/super_snake/weapon.png'),
  },
  "SNAKE_RUSH": {
    name: "SNAKE RUSH",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod",
    background: {
      top: require("./assets/selectlevel/levels/super_snake/background_top.png"),
      bottom: require("./assets/selectlevel/levels/super_snake/bottom.png"),
    },
    style: {
      snakeImageView: {
        left: screenWidth * 0.1,
        bottom: screenWidth * 0.36
      },
      snakeImage: {
        width: screenWidth * 0.4,
        height: screenWidth * 0.45
      }
    },
    snake: require('./assets/selectlevel/levels/snake_rush/snake.png'),
    weapon: require('./assets/selectlevel/levels/snake_rush/weapon.png'),
  },

};
export default class App extends React.Component {
  constructor(props) {
    super(props);
    var board = [];
    this.state = {
      user: {
        eth: 0,
        snek: 0,
        pubkey: "",
        name: "",
        unredeemed: 0,
        mineMax: 1000,
        haul: 0,
        gamecount: 0,
        totalhaul: 0,
        powerups: {
          bluepowerup: -1,
          goldpowerup: -1,
          purplepowerup: -1,
          redpowerup: -1
        }
      },
      running: false,
      screen: screens.LOGINCHOOSE,
      overlay: overlays.STARTGAME,
      level: 0,
      mode: "",
      pressedButton: CONSTANTS.DPADSTATES.UP,
      toggleReset: true,
      lastScore: -1,
      unredeemedSnekBalance: -1,
      snekBalance: -1,
      ethBalance: -1,
      //miningPrice: -1,
      prices: {
        mineGamePrice: -1,
        mineHaulPrice: -1,
        powerupPrice: -1,
        lvlsnkPrice: -1,
        lvlethPrice: -1,
        gasPrice: -1,
      },
      gameOverInfo: {
        score: 0,
        level: 0,
        time: 0,
      },
      lastTxHash: "",
      confirmAmount: -1,
      confirmTokenType: "ETH",
      txKey: "",
      offerContract: true,
      loadingUser: true,
      errorTitle: "",
      errorParagraph: "",
      currentSnakeIndex: 0,
      currentSnake: snakesData[snakes[0]],

      //powerups: null
    };
    //this.loggedIn = this.loggedIn.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
    this.restart = this.restart.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.onSelectLevelPlayPress = this.onSelectLevelPlayPress.bind(this);
    this.onDoContract = this.onDoContract.bind(this);
    this.gameOverDoContract = this.gameOverDoContract.bind(this);
    this.onConfirmTxOk = this.onConfirmTxOk.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.signedUp = this.signedUp.bind(this);
  }

  async componentDidMount() {
    try {
      var response = await fetch(`${context.host}:${context.port}/getPrices`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      var resp = await response.json();
      if (resp.error) {
        alert(resp.error);
      } else if (resp.prices) {
        this.setState({prices: resp.prices});
      } else {
        alert("error retrieving prices");
      }
    } catch (err) {
      console.log("there was an error retreiving prices.");
      console.log(err)
      this.genericNetworkError();
    }
    Linking.addEventListener('url', (event) => {
      console.log("Linking.addEventListener");
      console.log(event.url);
    });
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('Initial url is: ' + url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  genericNetworkError = () => {
    this.setState({
      errorTitle: "Network error",
      errorParagraph: "There was an error connecting to the server. Please check your internet connection.",
      overlay: overlays.ERROR,
    })
  }
  loadUser = async (jwt) => {
    try{
      let response = await fetch(`${context.host}:${context.port}/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "JWT " + jwt,
        },
      });
      var resp = await response.json();
      if (!resp.error) {
        if (resp) {
          await this.setState({loadingUser: false, user: resp});
        } else {
          alert("There was an error, no response.");
          await this.setState({loadingUser: false});
        }
      } else {
        alert(resp.error);
        await this.setState({loadingUser: false});
      }
    }catch(err){
      console.log("****** error loading user ******")
      //console.log(err)
    }
  }

  loggedIn = async(jwt, username) => {
    await asyncStore("jwt", jwt);
    if (this.state.screen == screens.LOGINCHOOSE || this.state.screen == screens.LOGIN) {
      let firstLogin = await AsyncStorage.getItem("LAST_REGISTERED");
      let screen = firstLogin && firstLogin == username ? screens.TUTORIALS : screens.HOME;
      await this.setState({screen});
    }
    this.loadUser(jwt);
    try {
      this.socket = SocketIOClient(`${context.host}:${context.socketPort}`, {
        //path: '/mypath',
        query: `pubkey=${this.state.user.pubkey}`,
      });
      this.socket.on('connect', () => {
        console.log('connected to server');
      });
      this.socket.on("MINED", async (txid) => {
        let latestJwt = await getFromAsyncStore("jwt");
        this.loadUser(latestJwt);
      });
    } catch (err) {
      this.genericNetworkError();
    }
  }

  doUpdateUser = async (user) => {
    this.setState({user: user})
  }
  onDpadChange = async (direction) => {
    if (direction != CONSTANTS.DPADSTATES.NONE && direction != this.state.pressedButton) {
      await this.setState({pressedButton: direction});
    }
  }
  doResetDpad = async () => {
    await this.setState({pressedButton: CONSTANTS.DPADSTATES.NONE});
  }
  onDied = async (score) => {
    await this.setState({running: false, overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    let data = {
      howmany: score,
      level: 1,
    };
    fetch(`${context.host}:${context.port}/recordScore`, {
      method: "POST",
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "JWT " + jwt,
      },
    }).then(async (response) => {
      var resp = await response.json();
      if (!resp.error) {
        if (resp) {
          if (resp.status == "OK") {
            let gameOverInfo = {
              score: score,
              level: 1,
              time: 5 * 60,
            }
            this.setState({
              overlay: overlays.GAMEOVER,
              gameOverInfo: gameOverInfo,
              loadingScore: false,
              user: resp.user,
              lastScore: resp.score
            });
          } else {
            alert("There was an error, malformed response.");
            this.setState({overlay: -1});
          }
        } else {
          alert("There was an error, no response.");
          this.setState({overlay: -1});
        }
      } else {
        alert("Unknown error: " + resp.error);
        this.setState({overlay: -1});
      }
    }).catch(err => {
      throw err
    });
  }

  async onDoContract() {
    console.log("onDoContract")
    try {
      await this.setState({overlay: overlays.LOADING});
      let jwt = await getFromAsyncStore("jwt");
      let price = this.state.prices.mineGamePrice;
      let txKey = await createTransaction("ETH", price, jwt);
      this.setState({
        overlay: overlays.CONFIRMCONTRACT,
        confirmAmount: price,
        confirmTokenType: "ETH",
        txKey: txKey
      });
    } catch(err) {
      alert("There was an Error.\n" + err.toString());
      this.setState({overlay: -1});
    }
  }

  onConfirmContract = async () => {
    await this.setState({overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    let price = this.state.prices.mineGamePrice;
    var data = {
      txkey: this.state.txKey,
      type: "ETH",
      amount: price,
    };
    var response = await fetch(`${context.host}:${context.port}/mine`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "JWT " + jwt,
      },
    });
    var resp = await response.json();
    if (resp.error) {
      alert(resp.error);
      await this.setState({overlay: -1});
    } else if (resp.txhash) {
      await this.setState({
        offerContract: false,
        overlay: overlays.CONFIRMTX,
        lastTxHash: resp.txhash,
        user: resp.user,
      });
    } else {
      alert("Error sending transaction");
      await this.setState({overlay: -1});
    }
  }


  start() {
    this.setState({offerContract: true, running: true, overlay: -1});
  }

  restart() {
    this.setState({toggleReset: !this.state.toggleReset, overlay: overlays.STARTGAME});
  }

  pause() {
    this.setState({running: false, overlay: overlays.PAUSE});
  }

  exit = () => {
    this.setState({running: false, screen: screens.HOME, overlay: overlays.STARTGAME});
  }
  // exitWallet = () => {
  //   this.setState({running: false, screen: screens.HOME, overlay: overlays.STARTGAME});
  // }

  powerUps = () => {
    this.setState({running: false, overlay: overlays.POWERUPS});
  }
  showCowOverlay = () => {
    this.setState({overlay: overlays.COWOVERLAY})
  }
  hideCowOverlay = () => {
    this.setState({overlay: -1})
  }
  wallet = () => {
    alert("wallet");
  }
  confirmQuit = () => {
    this.setState({overlay: overlays.CONFIRMEXIT});
  }
  onConfirmExit = () => {
    this.exit();
  }
  onCancelConfirmContract = () => {
    this.setState({overlay: overlays.GAMEOVER});
  }
  onCancelConfirmExit = () => {
    this.setState({overlay: overlays.PAUSE});
  }
  onSelectLevel = (levelNumber, mode) => {
    this.setState({screen: screens.GAME, level: levelNumber, mode: mode});
  }

  onSelectLevelPlayPress() {
    this.setState({screen: screens.GAME});
  }

  gameOverDoContract() {
    this.setState({overlay: overlays.CONFIRMCONTRACT});
  }

  onConfirmTxOk() {
    this.setState({overlay: overlays.GAMEOVER});
    //this.setState({screen: screens.HOMEoverlay: -1});
  }

  onGoToTown = () => {
    this.setState({screen: screens.SNAKETOWN, overlay: -1});
  }
  onProfile = () => {
    this.setState({screen: screens.PROFILE, overlay: -1});
  }
  onWallet = () => {
    this.setState({screen: screens.WALLET, overlay: -1});
  }
  goToLogin = () => {
    this.setState({screen: screens.LOGIN, overlay: -1});
  }
  goToSignup = () => {
    this.setState({screen: screens.SIGNUP, overlay: -1});
  }
  goToSignupChoose = () => {
    this.setState({screen: screens.SIGNUPCHOOSE, overlay: -1});
  }
  closeOverlay() {
    this.setState({running: true, overlay: -1});
  }
  onLogin = () => {
    this.setState({screen: screens.LOGIN, overlay: -1});
  }
  signedUp = () => {
    this.setState({screen: screens.LOGIN, overlays: -1});
  }

  updatePowerups = powerups => {
    this.setState({
      user: {
        ...this.state.user,
        powerups
      }
    })
  }

  onPlayPress = () => {
    this.setState({screen: screens.SELECTLEVEL});
  };

  backToHomepage = () => {
    this.setState({screen: screens.HOME})
  };

  onPreviousSnake = () => {
    let {currentSnakeIndex} = this.state;
    currentSnakeIndex--;
    this.setState({
      currentSnakeIndex,
      currentSnake: snakesData[snakes[currentSnakeIndex]]
    })
  };

  onNextSnake = () => {
    let {currentSnakeIndex} = this.state;
    currentSnakeIndex++;
    this.setState({
      currentSnakeIndex,
      currentSnake: snakesData[snakes[currentSnakeIndex]]
    })
  };
  logOut = async () => {
    await removeItem("jwt");
    this.setState({screen: screens.LOGIN});
  }

  onHomePage = async () => {
    this.setState({screen: screens.HOME});
  }

  render() {
    if (this.state.screen == screens.HOME) {
      return (
        <Homepage
          user={this.state.user}
          prices={this.state.prices}
          onPlayPress={this.onPlayPress}
          onSelectLevel={this.onSelectLevel}
          onGoToTown={this.onGoToTown}
          onWallet={this.onWallet}
          onProfile={this.onProfile}
          doUpdateUser={this.doUpdateUser}
          updatePowerups={this.updatePowerups}
        >
        </Homepage>
      );
    } else if (this.state.screen == screens.TUTORIALS) {
      return (
        <Tutorials
          onDone={this.onHomePage}
        />
      )
    } else if (this.state.screen == screens.SELECTLEVEL) {
      return (
        <SelectLevel
          snakes={snakes}
          snakesData={snakesData}
          currentSnake={this.state.currentSnake}
          snakeIndex={this.state.currentSnakeIndex}
          onPreviousSnake={this.onPreviousSnake}
          onNextSnake={this.onNextSnake}

          onSelectLevel={this.onSelectLevel}
          user={this.state.user}
          onWallet={this.onWallet}
          exit={this.backToHomepage}
        />
      );
    } else if (this.state.screen == screens.LOGIN) {
      return (
        <Login loggedIn={this.loggedIn}/>
        //<AccountHistory />
        //<ViewSponsor />
        //<PurchaseTicket />
        //<PurchasedTicket />
        //<Success />
        //<Fail />
        //<GameOverview />
        // <Paused/>
        //<EditProfile/>
        //<ChangePassword/>
      );
    } else if (this.state.screen == screens.LOGINCHOOSE) {
      return (
        <LoginChoose goToLogin={this.goToLogin} goToSignupChoose={this.goToSignupChoose} loggedIn={this.loggedIn}/>
      );
    } else if (this.state.screen == screens.WALLET) {
      return (
        <Wallet user={this.state.user} exit={this.exit}/>
      );
    } else if (this.state.screen == screens.SIGNUP) {
      return (
        <SignUp exit={this.onLogin} signedUp={this.signedUp}/>
      )
    } else if (this.state.screen == screens.WALLET) {
      return (
        <Wallet user={this.state.user} exit={this.exit}/>
      );
    } else if (this.state.screen == screens.SIGNUPCHOOSE) {
      return (
        <SignupChoose goToSignup={this.goToSignup}/>
      );
    } else if (this.state.screen == screens.PROFILE) {
      return (
        <Profile
          loading={this.state.loadingUser}
          user={this.state.user}
          exit={this.exit}
          logOut={this.logOut}/>
      );
    } else if (this.state.screen == screens.SNAKETOWN) {
      return (
        <SnakeTown exit={this.exit}/>
      );
    } else if (this.state.screen == screens.GAME) {
      return (
        <ScreenView>
          <Loop>
            <Snek
              pressedButton={this.state.pressedButton}
              onDpadChange={this.onDpadChange}
              doResetDpad={this.doResetDpad}
              running={this.state.running}
              toggleReset={this.state.toggleReset}
              onDied={this.onDied}
              start={this.start}
              pause={this.pause}
              powerUps={this.powerUps}
              showCowOverlay={this.showCowOverlay}
              hideCowOverlay={this.hideCowOverlay}
              loading={this.state.loadingUser}
              user={this.state.user}
              level={this.state.level}
              mode={this.state.mode}>
            </Snek>
          </Loop>
          <PauseOverlay
            show={this.state.overlay == overlays.PAUSE}
            powerUps={this.powerUps}
            wallet={this.wallet}
            quit={this.confirmQuit}
            closeOverlay={this.closeOverlay}/>
          <GameOverOverlay
            show={this.state.overlay == overlays.GAMEOVER}
            closeOverlay={this.closeOverlay}
            gameOverInfo={this.state.gameOverInfo}
            miningPrice={this.state.prices.mineGamePrice}
            onDoContract={this.onDoContract}
            offerContract={this.state.offerContract}
            restart={this.restart}
            exit={this.exit}/>
          <AreYouSureOverlay
            show={this.state.overlay == overlays.CONFIRMCONTRACT}
            text={`Pay ${(this.state.prices.mineGamePrice / CONSTANTS.WEIPERETH).toPrecision(4)} ETH for ${this.state.gameOverInfo.score} Snake Coins.\n\nAre you sure?`}
            onYes={this.onConfirmContract}
            onNo={this.onCancelConfirmContract}/>
          <AreYouSureOverlay
            show={this.state.overlay == overlays.CONFIRMEXIT}
            text={`Are you sure?`}
            onYes={this.onConfirmExit}
            onNo={this.onCancelConfirmExit}/>
          <LoadingOverlay
            show={this.state.overlay == overlays.LOADING}/>
          <ConfirmTxOverlay
            show={this.state.overlay == overlays.CONFIRMTX}
            transactionId={this.state.lastTxHash}
            onOk={this.onConfirmTxOk}/>
          {/*<ConfirmTxGameOverOverlay
              show={true}
              gameOverInfo={this.state.gameOverInfo}
              restart={this.restart}
              exit={this.exit} />*/}
          <PowerupOverlay
            closeOverlay={this.closeOverlay}
            prices={this.state.prices}
            user={this.props.user}
            show={this.state.overlay == overlays.POWERUPS}/>
          <StartGameOverlay
            show={this.state.overlay == overlays.STARTGAME}
            onStart={this.start}/>
          <ErrorOverlay
            closeOverlay={this.closeOverlay}
            show={this.state.overlay == overlays.ERROR}
            title={this.state.errorTitle}
            paragraph={this.state.errorParagraph}/>
          <CowOverlay
            closeOverlay={this.closeOverlay}
            show={this.state.overlay == overlays.COWOVERLAY}/>
        </ScreenView>
      );
    }
  }
}
