import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    )
  }
}
let styles = StyleSheet.create({
  screen: {
  },
});
