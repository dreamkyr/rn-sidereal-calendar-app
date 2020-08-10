import React from 'react';
import { ScrollView, View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, SCREEN_WIDTH } from '@app/helper';

export const SideMenu = ({ navigation }) => (
  <View style={styles.container}>
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <SafeAreaView style={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('@app/assets/images/logo.png')} />
        </View>
        <TouchableOpacity style={styles.viewContainer} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.titleText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Week')}>
          <Image source={require('@app/assets/images/sidemenu_weekly.png')} />
          <Text style={styles.menuText}>Dekan (Weekly)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Main')}>
          <Image source={require('@app/assets/images/sidemenu_monthly.png')} />
          <Text style={styles.menuText}>Medu (Monthly)</Text>
        </TouchableOpacity>
        <View style={styles.viewContainer}>
          <Text style={styles.titleText}>Reconnecting Back to Nature</Text>
        </View>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.closeDrawer()}>
          <Image source={require('@app/assets/images/sidemenu_help.png')} />
          <Text style={styles.menuText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.closeDrawer()}>
          <Image source={require('@app/assets/images/sidemenu_donate.png')} />
          <Text style={styles.menuText}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.closeDrawer()}>
          <Image source={require('@app/assets/images/sidemenu_join.png')} />
          <Text style={styles.menuText}>Join us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Setting')}>
          <Image source={require('@app/assets/images/sidemenu_setting.png')} />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewContainer}>
          <Text style={styles.titleText}>About The Earth Center</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    width: SCREEN_WIDTH * 0.75 - 40,
    height: SCREEN_WIDTH * 0.75 - 40,
    backgroundColor: Colors.white,
    borderRadius: SCREEN_WIDTH * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: SCREEN_WIDTH * 0.75,
  },
  viewContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  menuItem: {
    width: '100%',
    paddingHorizontal: 22,
    paddingVertical: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  menuText: {
    marginLeft: 20,
    fontSize: 16,
  },
});
