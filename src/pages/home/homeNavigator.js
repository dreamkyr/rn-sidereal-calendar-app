import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './main';
import NewScreen from './new';
import DetailScreen from './detail';

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="New" component={NewScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
