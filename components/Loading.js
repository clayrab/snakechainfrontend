import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import ScreenView from '../components/ScreenView.js';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScreenView style={styles.screen}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </ScreenView>
    )
  }
}
let styles = StyleSheet.create({

});
