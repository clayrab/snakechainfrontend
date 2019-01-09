import React, { Component } from 'react';
import { SnekContainer } from '../generic/Container';
import styles from './styles';

import {
  Text,
  View,
  ImageBackground,
  Image
} from 'react-native'

export default class AccountHistory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SnekContainer>
        <ImageBackground style={styles.mainCont} resizeMode="contain" source={require('./../../assets/accounthistory/main-bg-final.png')} >
          <View style={styles.headerCont}>
            <ImageBackground style={styles.headerBg} source={require('./../../assets/accounthistory/header-bg.png')}>
              <View style={styles.headDataCont}>
                <View style={styles.profilePic}>
                  <ImageBackground source={require('./../../assets/accounthistory/medalBG.png')} style={[styles.fullBg, styles.profileBgCont]} resizeMode="contain">
                    <Image source={require('./../../assets/accounthistory/profilepic.png')} style={styles.fullBg} resizeMode="contain"/>
                  </ImageBackground>
                </View>
                <View style={styles.profileData}>
                  <Text style={[styles.profileHeading, styles.rifficBoldFont]}>
                    BOBBER SON14
                  </Text>
                  <Text style={[ styles.rifficBoldFont, styles.profileTagline]}>
                    PUBLIC ADDRESS: 0x123124
                  </Text>
                  <Text style={[styles.rifficBoldFont, styles.profileText]}>
                    MORE PROFILE INFO
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.bodyCont}>
            <View style={styles.boxesCont}>
            <View style={styles.exchangeBox}>
              <ImageBackground source={require('./../../assets/accounthistory/ex-main-bg.png')} style={[styles.fullBg, styles.profileBgCont]} resizeMode="contain">
                <View style={styles.ratesCont}>
                  <ImageBackground  source={require('./../../assets/accounthistory/ex-rate-bg.png')} style={styles.fullBg} resizeMode="contain">
                    <View style={styles.amtCont}>
                      <View style={styles.snake}>
                        <ImageBackground  source={require('./../../assets/accounthistory/dark-bg.png')} style={styles.fullBg}>
                          <View style={styles.centerStff}>
                            <Text style={styles.snakeHead}> SNAKE </Text>
                            <Text style={styles.amtText}>3.150</Text>
                          </View>
                        </ImageBackground>
                      </View>
                      <View style={styles.diamond}>
                        <ImageBackground  source={require('./../../assets/accounthistory/dark-bg.png')} style={styles.fullBg}>
                          <View style={styles.centerStff}>
                            <Image style={[styles.diamondHead, styles.fullBg]} source={require('./../../assets/accounthistory/diamond-icon.png')} resizeMode="contain"/>
                            <Text style={styles.amtText}>2.150</Text>
                          </View>
                        </ImageBackground>
                      </View>
                    </View>
                  </ImageBackground>

                </View>
                <View style={styles.btnsCont}>
                  <View style={styles.receBtnCont}>
                    <ImageBackground source={require('./../../assets/accounthistory/greenbtn.png')} style={styles.fullBg} resizeMode="contain">
                      <View style={[styles.centerStff, styles.receBtnInnerCont]}>
                        <Image style={[ styles.fullBg, styles.receIcon]} source={require('./../../assets/accounthistory/receive-black.png')} resizeMode="contain"/>
                        <Text style={styles.btnText}>Receive</Text>
                      </View>
                    </ImageBackground>
                  </View>

                  <View style={styles.sendBtnCont}>
                    <ImageBackground  source={require('./../../assets/accounthistory/yellow-btn-bg.png')} style={styles.fullBg} resizeMode="contain">
                      <View style={[styles.centerStff, styles.sendBtnInnerCont]}>
                        <Image style={[styles.fullBg, styles.sendIcon]} source={require('./../../assets/accounthistory/send-black.png')} resizeMode="contain"/>
                        <Text style={styles.btnText}>Send</Text>
                      </View>
                    </ImageBackground>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.historyBox}>
              <Text> History Box </Text>
            </View>
            </View>
          </View>
        </ImageBackground>
      </SnekContainer>
    )
  }
}
