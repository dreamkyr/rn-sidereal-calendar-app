import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './main';
import NewScreen from './new';
import DetailScreen from './detail';
import { SidemenuButton, SidemenuAdd } from '@app/components';

const Stack = createStackNavigator();

export default function HomeNavigator({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: 'Kemetic Sidereal Calendar - Year 420',
          headerLeft: (props) => <SidemenuButton navigation={navigation} />,
          headerRight: (props) => <SidemenuAdd navigation={navigation} />,
          headerTitleStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name="New" component={NewScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
