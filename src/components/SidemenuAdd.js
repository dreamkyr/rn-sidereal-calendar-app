import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export const SidemenuAdd = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image style={styles.menuIcon} source={require('@app/assets/images/new.png')} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
});
