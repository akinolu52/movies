/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar, View
} from 'react-native';
import { Movie } from '@components';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Movie />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
