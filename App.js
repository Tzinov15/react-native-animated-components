import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SettingsRow from './dist/SettingsRow'

export default class App extends React.Component {
  render() {
    return <View style={styles.container} >
      <SettingsRow
        rowBackgroundColor='#3593ff'
        rowHeight={60}
        numberOfIcons={4}
        circleColor='blue'
      />
      <SettingsRow
        rowBackgroundColor='#3593ff'
        rowHeight={60}
        numberOfIcons={7}
        circleColor='lime'
      />
      <SettingsRow
        rowBackgroundColor='#3593ff'
        rowHeight={60}
        numberOfIcons={3}
        circleColor='red'
      />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
