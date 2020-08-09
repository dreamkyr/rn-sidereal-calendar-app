import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeNavigator from '@app/pages/home/homeNavigator';
import SettingNavigator from '@app/pages/setting/settingNavigator';

const Drawer = createDrawerNavigator();

export default function MainContainer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="Setting" component={SettingNavigator} />
    </Drawer.Navigator>
  );
}
