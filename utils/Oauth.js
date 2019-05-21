import { Platform } from 'react-native';
import { AppAuth, Constants } from 'expo';
import {context} from "../utils/Context.js";

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
  let url = "";
  if(Constants.appOwnership == "expo"){
    if(Platform.OS === 'ios'){
      url = "loginGoogleIOSTest";
      config.clientId = '620503403501-v46v5kk2gg0p72i6oi0d2e8onm01p6a9.apps.googleusercontent.com';
    } else if(Platform.OS === 'android'){
      url = "loginGoogleAndroidTest";
      config.clientId = '620503403501-d6stchtjia63djtggiaaespeapl0ist3.apps.googleusercontent.com';
    }
  } else {
    if(Platform.OS === 'ios'){
      url = "loginGoogleIOS";
      config.clientId = '620503403501-k6v8ghht8dr639uhhjr8gpk4p9iogbq2.apps.googleusercontent.com';
    } else if(Platform.OS === 'android'){
      url = "loginGoogleAndroid";
      config.clientId = '620503403501-os62lfr7up8q48cpklcvlihd1annvpoi.apps.googleusercontent.com';
    }
  }
  if(config.clientId === null){
    throw "Unsupported platform";
  }
  const tokenResponse = await AppAuth.authAsync(config);
  console.log("tokenResponse.idToken");
  console.log(tokenResponse.idToken);
  let data = { "id_token": tokenResponse.idToken };
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
}
