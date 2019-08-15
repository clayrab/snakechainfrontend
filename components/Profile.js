import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image
} from 'react-native';

import AreYouSureOverlay from '../components/AreYouSureOverlay.js';
import ScreenView from '../components/ScreenView.js';
import Header from '../components/Header.js';

import {context} from "../utils/Context.js";
import {createTransaction} from '../utils/Transactions.js';
import {asyncStore, getFromAsyncStore, removeItem} from "../utils/AsyncStore.js";
import {normalize} from '../utils/FontNormalizer.js';
import {formatToken} from '../utils/uiHelperFunctions.js';

let overlays = {"CONFIRMDELETE": 0};
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: -1,
      confirmAmount: -1,
      confirmTokenType: null,
    }
  }

  deleteAccount = async() => {
    console.log("deleteAccount");
    let jwt = await getFromAsyncStore("jwt");
    let txKey = await createTransaction("DELETE", -1, jwt);
    this.setState({
      overlay: overlays.CONFIRMDELETE,
      confirmAmount: -1,
      confirmTokenType: "DELETE",
      txKey: txKey,
    });
  };

  onConfirmDelete = async () => {
    await this.setState({overlay: overlays.LOADING});
    let jwt = await getFromAsyncStore("jwt");
    let data = {
      txkey: this.state.txKey,
      type: this.state.confirmTokenType,
      amount: this.state.confirmAmount,
    };
    var response = await fetch(`${context.host}:${context.port}/deleteUser`, {
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
    } else {
      this.setState({overlay: -1});
      await this.props.logOut();
    }
  };

  onCancel = async() => {
    console.log("onCancel")
    this.setState({overlay: -1});
  };

  render() {
    return (
      <ScreenView style={{ backgroundColor: '#6B534E', }}>
        <Header loading={this.props.loading} transactions={this.props.transactions} user={this.props.user} onProfile={this.props.onProfile}
                onWallet={this.props.onWallet} hasBackButton={true} exit={this.props.exit}/>
        <ImageBackground source={require('../assets/profile/imageHolderBG.png')} style={styles.profileDetailsBG}
                         resizeMode="stretch">
          <ImageBackground source={require('../assets/profile/imageHolder.png')} style={styles.profileImageBG}
                           resizeMode="stretch">
          </ImageBackground>
          <View style={styles.profileInfoView}>
            <View style={styles.nameView}>
              <Image source={require('../assets/profile/greenIcon.png')} style={styles.iconImage}/>
              <Text style={styles.profileName}>
                {this.props.user.name}
              </Text>
            </View>
            <View style={styles.numbersView}>
              <ImageBackground source={require('../assets/profile/iconBG.png')} style={styles.iconBG}
                               resizeMode="stretch">
                <Image source={require('../assets/withdraw/DiamondIcom.png')} style={[styles.iconImage, {height: 25}]}
                       resizeMode="stretch"/>
                <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.numberText, this.state.titleBarTextStyle]}>
                  {formatToken(this.props.user.eth, "ETH")}
                </Text>
              </ImageBackground>
              <ImageBackground source={require('../assets/profile/iconBG.png')} style={styles.iconBG}
                               resizeMode="stretch">
                <Image source={require('../assets/profile/coinIcon.png')} style={styles.iconImage}
                       resizeMode="stretch"/>
                <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.numberText, this.state.titleBarTextStyle]}>
                  {this.props.user.snek}
                </Text>
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.contentView}>
          <ImageBackground source={require('../assets/profile/rankBox.png')} style={styles.rankBoxBG}
                           resizeMode="stretch">
            <View style={styles.rankChildView}>
              <View style={styles.childView}>
                <Text style={styles.keyText}>
                  Total Winnings:
                </Text>
              </View>
              <View style={styles.childView}>
                <Text style={styles.valueText}>
                  ????
                </Text>
              </View>
            </View>
          </ImageBackground>
          <ImageBackground source={require('../assets/profile/rankBox.png')} style={styles.rankBoxBG}
                           resizeMode="stretch">
            <View style={styles.rankChildView}>
              <View style={styles.childView}>
                <Text style={styles.keyText}>
                  Rank
                </Text>
              </View>
              <View style={styles.childView}>
                <Text style={styles.valueText}>
                  ????
                </Text>
              </View>
            </View>
          </ImageBackground>
          {/*<TouchableOpacity style={{marginTop: 10}}>
            <ImageBackground source={require('../assets/profile/button.png')} style={styles.buttonBG} resizeMode="stretch">
              <Text style={styles.buttonBig}>
                EDIT PROFILE PAGE
              </Text>
            </ImageBackground>
          </TouchableOpacity>*/}
          <TouchableOpacity onPress={this.props.logOut}>
            <ImageBackground source={require('../assets/profile/button.png')} style={styles.buttonBG}
                             resizeMode="stretch">
              <Text style={styles.buttonBig}>
                LOG OUT
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.deleteAccount}>
            <ImageBackground source={require('../assets/profile/button.png')} style={styles.buttonBG}
                             resizeMode="stretch">
              <Text style={styles.buttonBig}>
                DELETE ACCOUNT
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <AreYouSureOverlay
          show={this.state.overlay == overlays.CONFIRMDELETE}
          text={`Are you sure you want to delete your account?`}
          onYes={this.onConfirmDelete}
          onNo={this.onCancel}/>
      </ScreenView>
    )
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  backgroundImage: {
    width: screenWidth,
    height: screenHeight / 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileDetailsBG: {
    width: screenWidth,
    height: screenHeight / 5,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  profileImageBG: {
    width: screenWidth / 4,
    height: screenHeight / 5 - 30,
    marginLeft: 30,
  },
  profileInfoView: {
    flex: 1,
    flexDirection: 'column'
  },
  iconImage: {
    width: 20,
    height: 20
  },
  profileName: {
    fontSize: normalize(20),
    color: '#F0C747',
    marginLeft: 20,
    fontFamily: 'riffic-free-bold'
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  numbersView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconBG: {
    width: screenWidth / 5,
    height: screenHeight / 10,
    marginLeft: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  numberText: {
    fontSize: normalize(16),
    color: '#F0C747',
  },
  rankBoxBG: {
    width: screenWidth - 40,
    height: screenHeight / 10,
    marginTop: 10
  },
  buttonBG: {
    width: screenWidth / 1.5,
    height: screenHeight / 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentView: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonBig: {
    fontSize: normalize(18),
    color: '#F0C747',
    fontFamily: 'riffic-free-bold'
  },
  rankChildView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  childView: {
    flex: 1,
    alignItems: 'center'
  },
  keyText: {
    color: '#6B534E',
    fontSize: normalize(16),
    fontFamily: 'riffic-free-bold'
  },
  valueText: {
    color: '#F0C747',
    fontSize: normalize(20),
    fontFamily: 'riffic-free-bold'
  },
  diamondBG: {
    width: screenWidth / 3,
    height: 30,
    marginLeft: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerText: {
    color: '#F0C747',
    fontSize: normalize(14),
    marginLeft: screenWidth / 9
  }
});
