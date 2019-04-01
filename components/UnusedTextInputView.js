import React from 'react';
import {
  StyleSheet,
  Text, ScrollView,
  TextInput, Image,
  View, ImageBackground,
  TouchableOpacity,
} from 'react-native';

export default TextInputView = ((props) =>
    <View style={styles.textBoxView}>
      <ImageBackground source={require("../assets/edit/input.png")} style={styles.textBoxImage} resizeMode={"stretch"}>
        <TextInput placeholder={props.placeHolder} placeholderTextColor={'#8C6F6B'}
                   style={[styles.textBox, props.dynamicStyle]} underlineColorAndroid={'transparent'}/>
        <Image source={require("../assets/edit/pencil.png")} style={styles.pencilImage}/>
      </ImageBackground>
    </View>
)
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  textBoxView: {marginTop: "2%"},
  textBoxImage: {
    height: screenHeight / 11,
    marginHorizontal: '5%',
    flexDirection: "row",
    alignItems: "center"
  },
  textBox: {
    fontSize: 15,
    paddingLeft: '10%',
    width: "90%",
    color: "#705756",
    height: "100%"
  },
  pencilImage: {height: "36%", width: "5%", resizeMode: "stretch", paddingRight: "6%"},

});