import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export const SidemenuButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.openDrawer()}>
    <Image resizeMode="contain" style={styles.menuIcon} source={require('@app/assets/images/menu.png')} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuIcon: {
    width: 25,
    height: 20,
    marginLeft: 10,
  },
});
