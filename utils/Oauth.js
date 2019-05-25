import { Platform } from 'react-native';
import { AppAuth, Constants } from 'expo';
import {context} from "../utils/Context.js";

let environments = {
  "expo-ios": {
    url: "loginGoogleIOSTest",
    signupUrl: "createGoogleUserIOSTest",
    clientId: '620503403501-v46v5kk2gg0p72i6oi0d2e8onm01p6a9.apps.googleusercontent.com',
  },
  "expo-android": {
    url: "loginGoogleAndroidTest",
    signupUrl: "createGoogleUserAndroidTest",
    clientId: '620503403501-d6stchtjia63djtggiaaespeapl0ist3.apps.googleusercontent.com',
  },
  "standalone-ios": {
    url: "loginGoogleIOS",
    signupUrl: "createGoogleUserIOS",
    clientId: '620503403501-k6v8ghht8dr639uhhjr8gpk4p9iogbq2.apps.googleusercontent.com',
  },
  "standalone-android": {
    url: "loginGoogleAndroid",
    signupUrl: "createGoogleUserAndroid",
    clientId: '620503403501-os62lfr7up8q48cpklcvlihd1annvpoi.apps.googleusercontent.com',
  }
};

exports.sendGoogleToken = async(token, signup) => {
  console.log("sendGoogleToken")
  console.log(token)
  if(environments[Constants.appOwnership + "-" + Platform.OS]) {
    let url = environments[Constants.appOwnership + "-" + Platform.OS].url;
    if(signup) {
      url = environments[Constants.appOwnership + "-" + Platform.OS].signupUrl;
    }
    let data = { "id_token": token };
    console.log(`${context.host}:${context.port}/${url}`)
    var response = await fetch(`${context.host}:${context.port}/${url}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var resp = await response.json();
    if(resp.token){
      return resp.token;
    } else {
      throw "no token in response";
    }
  } else {
    throw("Unsupported environment: " + Constants.appOwnership + "-" + Platform.OS)
  }
}

exports.doGoogleOauth = async(signup = false) => {
  // -Expo iOS clientID(host.exp.exponent bundleId):
  // 620503403501-v46v5kk2gg0p72i6oi0d2e8onm01p6a9.apps.googleusercontent.com
  // -Expo Android clientID(host.exp.exponent bundleId):
  // 620503403501-d6stchtjia63djtggiaaespeapl0ist3.apps.googleusercontent.com
  // -iOS Client ID:
  // 620503403501-k6v8ghht8dr639uhhjr8gpk4p9iogbq2.apps.googleusercontent.com
  // -Android Client ID:
  // 620503403501-os62lfr7up8q48cpklcvlihd1annvpoi.apps.googleusercontent.com
  //this.setState({loading: true});
  const config = {
    issuer: 'https://accounts.google.com',
    clientId: null,
    scopes: ['profile', 'email', 'openid'],
  };
  if(environments[Constants.appOwnership + "-" + Platform.OS]) {
    config.clientId = environments[Constants.appOwnership + "-" + Platform.OS].clientId;
    let tokenResponse = await AppAuth.authAsync(config);
    console.log("tokenResponse.idToken")
    console.log(tokenResponse.idToken)
    return await exports.sendGoogleToken(tokenResponse.idToken, signup)
  } else {
    throw("Unsupported environment: " + Constants.appOwnership + "-" + Platform.OS)
  }
}
