import React, { Fragment } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { Colors, SCREEN_WIDTH } from '@app/helper';

export default function HomeScreen({ navigation }) {
  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <Image resizeMode="contain" style={styles.topImage} source={require('@app/assets/images/splash_top.png')} />
        <View style={styles.logoContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('@app/assets/images/logo.png')} />
        </View>
        <Image resizeMode="contain" style={styles.topImage} source={require('@app/assets/images/splash_bottom.png')} />
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_WIDTH - 40,
    backgroundColor: Colors.white,
    borderRadius: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  logo: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  topImage: {
    width: SCREEN_WIDTH,
  },
});
