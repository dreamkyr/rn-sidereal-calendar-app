import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainSettingsScreen from './main';

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Settings" component={MainSettingsScreen} />
    </Stack.Navigator>
  );
}
