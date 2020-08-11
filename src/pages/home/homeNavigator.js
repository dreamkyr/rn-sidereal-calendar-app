import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './main';
import WeekScreen from './week';
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
          headerLeft: () => <SidemenuButton navigation={navigation} />,
          headerTitleStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Week"
        component={WeekScreen}
        options={{
          headerLeft: () => <SidemenuButton navigation={navigation} />,
          headerRight: () => <SidemenuAdd navigation={navigation} />,
          headerTitleStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name="New" component={NewScreen} options={{ title: 'New Event', headerBackTitleVisible: false, headerTintColor: 'white' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerBackTitleVisible: false, headerTintColor: 'white' }} />
    </Stack.Navigator>
  );
}
