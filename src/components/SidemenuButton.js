import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export const SidemenuButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.openDrawer()}>
    <Image style={styles.menuIcon} source={require('@app/assets/images/menu.png')} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuIcon: {
    width: 45,
    height: 45,
    marginLeft: 10,
  },
});
