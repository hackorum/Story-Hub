import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import ReadStory from './screens/ReadStory';
import WriteStory from './screens/WriteStory';

const navigator = createBottomTabNavigator({
  Write: {
    screen: WriteStory,
    navigationOptions: {
      tabBarIcon: () => (
        <Image source={require('./assets/write.png')} style={{width: 40, height: 40}} />
      )
    }
  },
  Read: {
    screen: ReadStory,
    navigationOptions: {
      tabBarIcon: () => (
        <Image source={require('./assets/read.png')} style={{width: 40, height: 40}} />
      )
    }
  }
});

export default createAppContainer(navigator);