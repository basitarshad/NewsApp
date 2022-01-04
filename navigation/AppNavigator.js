import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import NewsDetails from '../screens/NewsDetails';

const Stack = createStackNavigator();

export default function NavigatorView() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name={'Home'} component={Home} />
      <Stack.Screen
        name={'NewsDetails'}
        component={NewsDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
