/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {checkToken, setOauthToken} from './actions';
import NavigatorView from './navigation/AppNavigator';

export default function App() {
  setOauthToken('2a2bd21377bd4cb1a3657052986ebc91');
  checkToken();
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <NavigatorView onNavigationStateChange={() => {}} uriPrefix="/app" />
      </NavigationContainer>
      {/* <Home /> */}
    </SafeAreaView>
  );
}
