import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainSettingsScreen from './main';
import { SidemenuButton } from '@app/components';

const Stack = createStackNavigator();

export default function HomeNavigator({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={MainSettingsScreen}
        options={{
          headerLeft: (props) => <SidemenuButton navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
}
