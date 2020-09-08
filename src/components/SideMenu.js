import React from 'react';
import { ScrollView, View, Image, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, SCREEN_WIDTH, DONATE_URL, JOIN_URL, ABOUT_URL, isPaidVersion, SUBSCRIBE_URL, RESOURCE_URL, BUY_P_CALENDAR_URL } from '@app/helper';

export const SideMenu = ({ navigation }) => {
  const onPressUnlock = () => {
    navigation.navigate('Main', { isUpdateAction: true });
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <SafeAreaView style={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Image resizeMode="contain" style={styles.logo} source={require('@app/assets/images/logo.png')} />
          </View>
          <TouchableOpacity style={[styles.viewContainer, { width: 'auto' }]} onPress={() => navigation.navigate('Main')}>
            <Text style={[styles.titleText, styles.versionText]}>{!isPaidVersion() ? 'Free Version' : 'Paid Version'}</Text>
          </TouchableOpacity>
          {!isPaidVersion() && (
            <TouchableOpacity style={styles.upgradeWrapper} onPress={onPressUnlock}>
              <Text style={styles.upgradeText}>Upgrade</Text>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Week')}>
          <Image source={require('@app/assets/images/sidemenu_weekly.png')} />
          <Text style={styles.menuText}>Dekan (Weekly)</Text>
        </TouchableOpacity> */}
          <View style={styles.viewContainer}>
            <Text style={styles.titleText}>App View</Text>
          </View>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Month')}>
            <Image style={styles.menuImage} source={require('@app/assets/images/sidemenu/calendar.png')} />
            <Text style={styles.menuText}>Monthly View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Main')}>
            <Image style={styles.menuImage} source={require('@app/assets/images/sidemenu/calendar.png')} />
            <Text style={styles.menuText}>Yearly View</Text>
          </TouchableOpacity>
          <View style={styles.viewContainer}>
            <Text style={styles.titleText}>About the Calendar</Text>
          </View>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate('Help');
            }}>
            <Image style={styles.menuImage} source={require('@app/assets/images/sidemenu/help.png')} />
            <Text style={styles.menuText}>Help- How to Use</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate('PrintedCalendarDetail');
            }}>
            <Image style={styles.menuImage} source={require('@app/assets/images/sidemenu/calendar.png')} />
            <Text style={styles.menuText}>The Printed Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.closeDrawer();
              Linking.openURL(RESOURCE_URL);
            }}>
            <Image style={styles.menuImage} source={require('@app/assets/images/sidemenu/resources.png')} />
            <Text style={styles.menuText}>Resources & Spritiual Tools</Text>
          </TouchableOpacity>
          <View style={styles.viewContainer}>
            <Text style={styles.titleText}>The Earth Center</Text>
          </View>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.closeDrawer();
              Linking.openURL(ABOUT_URL);
            }}>
            <Image style={styles.menuImage} source={require('@app/assets/images/sidemenu/help.png')} />
            <Text style={styles.menuText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.closeDrawer();
              Linking.openURL(DONATE_URL);
            }}>
            <Image style={styles.menuImage} source={require('@app/assets/images/sidemenu/donate.png')} />
            <Text style={styles.menuText}>Donate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.closeDrawer();
              Linking.openURL(JOIN_URL);
            }}>
            <Image
              style={[styles.menuImage, { height: 30, width: 30, marginHorizontal: 3 }]}
              source={require('@app/assets/images/sidemenu/join_us.png')}
            />
            <Text style={styles.menuText}>Join us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.closeDrawer();
              Linking.openURL(SUBSCRIBE_URL);
            }}>
            <Image
              style={[styles.menuImage, { height: 20, width: 30, marginHorizontal: 3 }]}
              source={require('@app/assets/images/sidemenu/email.png')}
            />
            <Text style={styles.menuText}>{'Subscribe - Horoscopes & \nE-Magazine'}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.menuItem} onPress={() => navigation.closeDrawer()}>
          <Image source={require('@app/assets/images/sidemenu_setting.png')} />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity> */}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

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
    marginTop: 20,
    width: SCREEN_WIDTH * 0.3 - 20,
    height: SCREEN_WIDTH * 0.3 - 20,
    backgroundColor: Colors.white,
    borderRadius: SCREEN_WIDTH * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: SCREEN_WIDTH * 0.3,
  },
  viewContainer: {
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 22,
  },
  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  versionText: {
    fontSize: 17,
    color: Colors.main,
    fontWeight: 'bold',
  },
  menuItem: {
    width: '100%',
    paddingHorizontal: 22,
    paddingVertical: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
  },
  noIconText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.main,
  },
  noIconMenuItem: {
    borderWidth: 2,
    borderRadius: 2,
    borderColor: Colors.main,
    paddingHorizontal: 10,
    width: 'auto',
  },
  upgradeWrapper: {
    backgroundColor: Colors.main,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  upgradeText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  menuImage: {
    width: 36,
    height: 36,
  },
});
