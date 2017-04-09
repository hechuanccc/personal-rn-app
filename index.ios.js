/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  Image,
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Boy from './Boy.js';
import ListViewTest from './ListViewTest'
import setup from './js/pages/setup.js'

AppRegistry.registerComponent('imooc_gp', () => setup);
