import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeNavigator from '@app/pages/home/homeNavigator';
import SettingNavigator from '@app/pages/setting/settingNavigator';
import { SideMenu } from '@app/components';
import { SCREEN_WIDTH } from '@app/helper';

const Drawer = createDrawerNavigator();

export default function MainContainer() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={SideMenu} drawerStyle={{ width: SCREEN_WIDTH * 0.7 }}>
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="Setting" component={SettingNavigator} />
    </Drawer.Navigator>
  );
}
