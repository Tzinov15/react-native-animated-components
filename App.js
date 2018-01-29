import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { SettingsRow } from './dist'

export default class App extends React.Component {
  render() {
    return <View style={styles.container} >
      <Text style={{
        color: 'lightgray',
        fontSize: 25,
        padding: 30,
        fontWeight: '100',
        marginBottom: 100,
        textAlign: 'center'
      }}>
        Row Component with Animated Option Icons
      </Text>
      <SettingsRow
        rowBackgroundColor='#c9c9c9'
        rowHeight={60}
        numberOfIcons={3}
        icons={['plus', 'minus', 'equal']}
        circleColor='green'
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20
        }}>
          <Text style={{
            fontSize: 26,
            color: 'green',
          }}>filler icons</Text>
          <Icon size={25} name='fingerprint' style={{ color: 'green' }} />
        </View>
      </SettingsRow>
      <SettingsRow
        rowBackgroundColor='#c9c9c9'
        rowHeight={60}
        numberOfIcons={5}
        icons={['airplane', 'access-point', 'bluetooth', 'crosshairs-gps', 'wifi']}
        circleColor='red'
      >
        <Text style={{
          fontSize: 26,
          color: 'red',
          marginHorizontal: 20
        }}>some filler text</Text>
      </SettingsRow>
      <SettingsRow
        rowBackgroundColor='#c9c9c9'
        rowHeight={60}
        numberOfIcons={6}
        icons={['facebook', 'gmail', 'twitter', 'linkedin', 'yelp', 'tumblr']}
        circleColor='#33a7fa'
      >
        <TouchableOpacity
          style={{
            borderColor: '#33a7fa',
            borderWidth: 2,
            marginHorizontal: 20,
            width: 120,
            borderRadius: 20,
            backgroundColor: 'rgba(0,0,0,.6)',
            padding: 10
          }}
          onPress={() => alert('hello')}>
          <View>
            <Text style={{
              color: '#33a7fa'
            }}>A filler button</Text>
          </View>

        </TouchableOpacity>
      </SettingsRow>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
  },
});
