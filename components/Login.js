import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Platform
} from 'react-native';
import ScreenView from '../components/ScreenView.js';
import {Font} from 'expo';
import {context} from "../utils/Context.js";
import Loading from './Loading.js';
import {normalize} from '../utils/FontNormalizer.js';

let loginPlaceHolder = 'Login/Phone';
let passwordPlaceHolder = 'Password';
let easterEggCount = 0;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginPlaceHolder: true,
      showPasswordPlaceHolder: true,
      remember: true,
      buttonDynamicStyle: {},
      username: "",
      pw: "",
      loading: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({
      buttonDynamicStyle: {
        fontFamily: 'riffic-free-bold',
      }
    });
  }

  loginFocus = async () => {
    await this.setState({showLoginPlaceHolder: false});
  }
  passwordFocus = async () => {
    await this.setState({showPasswordPlaceHolder: false});
  }
  loginChange = async (value) => {
    await this.setState({username: value});
  }
  passwordChange = async (value) => {
    await this.setState({pw: value});
  }
  easterEgg = async () => {
    easterEggCount = easterEggCount + 1;
    if (easterEggCount >= 0) {
      if (easterEggCount % 6 === 1) {
        await this.setState({
          username: "clayrab",
          pw: "asdf",
          showLoginPlaceHolder: false,
          showPasswordPlaceHolder: false,
        });
      } else if (easterEggCount % 6 === 2) {
        await this.setState({
          username: "ZB423",
          pw: "1234",
          showLoginPlaceHolder: false,
          showPasswordPlaceHolder: false,
        });
      } else if (easterEggCount % 6 === 3) {
        await this.setState({
          username: "testuser1",
          pw: "asdf",
          showLoginPlaceHolder: false,
          showPasswordPlaceHolder: false,
        });
      } else if (easterEggCount % 6 === 4) {
        await this.setState({
          username: "testuser2",
          pw: "asdf",
          showLoginPlaceHolder: false,
          showPasswordPlaceHolder: false,
        });
      } else if (easterEggCount % 6 === 5) {
        await this.setState({
          username: "testuser3",
          pw: "asdf",
          showLoginPlaceHolder: false,
          showPasswordPlaceHolder: false,
        });
      } else if (easterEggCount % 6 === 0) {
        await this.setState({
          username: "clayrab",
          pw: "asdf",
          showLoginPlaceHolder: false,
          showPasswordPlaceHolder: false,
        });
      }
    }
  }
  rememberPress = () => {
    this.setState({remember: !this.state.remember})
    this.easterEgg();
  }
  sendLoginCreds = async () => {
    console.log("sendLoginCreds");
    try {
      this.setState({loading: true});
      var data = {user: this.state.username, pw: this.state.pw};
      var response = await fetch(`${context.host}:${context.port}/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          //application/x-www-form-urlencoded on Postman... hmmm
        },
      });
      var resp = await response.json();
      if (resp.error) {
        if (resp.error.startsWith("Object not found in model")) {
          alert("User not found");
        } else if (resp.error.startsWith("did not pass")) {
          alert("Incorrect password");
        } else {
          alert("Unknown error:\n\n" + resp.error);
        }
        this.setState({loading: false});
      } else if (resp.token) {
        this.props.loggedIn(resp.token);
      }
    } catch (error) {
      alert(error);
      this.setState({loading: false});
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading></Loading>
      );
    } else {
      console.log(this.state.showPasswordPlaceHolder)
      let usernameValue = loginPlaceHolder;
      if (!this.state.showLoginPlaceHolder) {
        usernameValue = this.state.username
      }
      let passwordValue = passwordPlaceHolder;
      if (!this.state.showPasswordPlaceHolder) {
        passwordValue = this.state.pw;
      }
      return (

        <ScreenView style={styles.screen}>
          <ImageBackground source={require('../assets/login/background.png')} style={styles.backgroundImage}
                           resizeMode="stretch"
                           onClick={this.easterEgg}>
            <TouchableOpacity
              onPress={this.easterEgg}
              style={{height: 100, width: 100,}}
            >
            </TouchableOpacity>
            <View style={[styles.halfView, styles.topView]}>
              <ImageBackground source={require('../assets/login/textBox.png')} style={styles.loginInput}
                               resizeMode="stretch">
                <TextInput style={[styles.textInput, this.state.buttonDynamicStyle]} underlineColorAndroid="transparent"
                           onFocus={this.loginFocus}
                           onChangeText={this.loginChange}
                           value={usernameValue}>
                </TextInput>
              </ImageBackground>
            </View>
            <View style={[styles.halfView, styles.bottomView]}>
              <ImageBackground source={require('../assets/login/textBox.png')}
                               style={[styles.loginInput, styles.passwordInput]} resizeMode="stretch">
                <Image source={require('../assets/login/passwordIcon.png')} style={styles.lockImage}
                       resizeMode="stretch"/>
                <TextInput style={[styles.textInput, this.state.buttonDynamicStyle]} underlineColorAndroid="transparent"
                           secureTextEntry={true}
                           onFocus={this.passwordFocus}
                           onChangeText={this.passwordChange}
                           value={passwordValue}/>
              </ImageBackground>
              <TouchableOpacity
                onPress={this.sendLoginCreds}>
                <ImageBackground source={require('../assets/login/button.png')}
                                 style={[styles.loginButton, styles.passwordInput]} resizeMode="stretch">
                  <Text style={[styles.loginText, this.state.buttonDynamicStyle]}>LOGIN</Text>
                </ImageBackground>
              </TouchableOpacity>
              {/*<View style={styles.rememberView}>
                <TouchableOpacity onPress={this.rememberPress}>
                  <Image source={ this.state.remember ? require('../assets/login/checkBox.png') : require('../assets/login/checkBox-1.png')} style={styles.checkBoxImage} resizeMode="stretch"/>
                </TouchableOpacity>
                <Text style={[styles.checkboxText, this.state.buttonDynamicStyle]}>Remember me</Text>
              </View>*/}
            </View>
          </ImageBackground>
        </ScreenView>
      );
    }
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  screen: {
    marginTop: 20
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
    flexDirection: 'column'
  },
  halfView: {
    flex: 1,
  },
  topView: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  bottomView: {
    alignItems: 'center'
  },
  textInput: {
    width: screenWidth - 80,
    height: 40,
    marginLeft: 20,
    fontSize: normalize(22),
    color: '#fab523'
  },
  loginInput: {
    backgroundColor: 'transparent',
    width: screenWidth - 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  lockImage: {
    width: 20,
    height: 20,
    marginLeft: 40
  },
  passwordInput: {
    marginTop: 20
  },
  loginButton: {
    width: screenWidth / 1.5,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    fontSize: normalize(18),
    color: '#352927'
  },
  rememberView: {
    flexDirection: 'row',
    marginTop: 10
  },
  checkBoxImage: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  checkboxText: {
    fontSize: normalize(14),
    color: '#352927'
  },
});
