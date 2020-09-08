import React, { Fragment } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Linking, DevSettings } from 'react-native';

import { Colors, isPaidVersion, showUpgradeDialog, requestPurchase, savePurchasedOnStorage } from '@app/helper';
import { HELP_TEXT, HELP_TEXT_PAID } from '@app/helper/data';
import LoadingView from '@app/components/LoadingView';
export default class MonthScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
    this.flatListRef = null;
  }

  onPressUnlock = async () => {
    if (await showUpgradeDialog()) {
      this.setState({ loading: true });
      const result = await requestPurchase();
      if (result) {
        await savePurchasedOnStorage();
        DevSettings.reload();
      }
      this.setState({ loading: false });
    }
  };

  render() {
    const HELP_CONTENT = isPaidVersion() ? HELP_TEXT_PAID : HELP_TEXT;
    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <ScrollView contentContainerStyle={styles.scrollContentStyle}>
          {!isPaidVersion() && (
            <TouchableOpacity style={styles.purchaseWrapper} onPress={this.onPressUnlock}>
              <Text style={styles.purchaseText}>Upgrade for Calendar Syncing Integration, Future Years and Additional Explainations</Text>
            </TouchableOpacity>
          )}
          {HELP_CONTENT.map((item, index) => (
            <View key={index} style={styles.sectionWrapper}>
              {item.section && <Text style={styles.sectionTitle}>{item.section}</Text>}
              {item.title && <Text style={styles.sectionSubTitle}>{item.title}</Text>}
              {item.subContent && <Text style={[styles.sectionSubContent]}>{item.subContent}</Text>}
              {item.content && <Text style={styles.sectionContent}>{item.content}</Text>}
              {item.link && (
                <TouchableOpacity
                  style={styles.sectionLinkWrapper}
                  onPress={() => {
                    Linking.openURL(item.link);
                  }}>
                  <Text style={styles.sectionLink}>{item.link}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          {!isPaidVersion() && (
            <Fragment>
              <Text style={styles.unlockText}>
                TO UNLOCK INSTRUCTIONS ON HOW TO USE THE CALENDAR, PLEASE UPGRADE TO THE PAID VERSION OF THIS APP BY CLICKING ON “UPGRADE” BUTTON
              </Text>
              <TouchableOpacity style={styles.upgradeButton} onPress={this.onPressUnlock}>
                <Text style={styles.upgradeButtonText}>UPGRADE</Text>
              </TouchableOpacity>
            </Fragment>
          )}
        </ScrollView>
        <LoadingView visible={this.state.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  scrollContentStyle: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    paddingTop: 15,
    paddingBottom: 10,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 18,
  },
  sectionContent: {
    marginBottom: 10,
  },
  sectionSubTitle: {
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionLinkWrapper: {
    paddingVertical: 10,
  },
  sectionLink: {
    color: 'blue',
  },
  unlockText: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  upgradeButton: {
    borderRadius: 4,
    backgroundColor: Colors.main,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  upgradeButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  purchaseWrapper: {
    borderRadius: 16,
    backgroundColor: Colors.main,
    margin: 16,
    marginTop: 0,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchaseText: {
    fontSize: 24,
    lineHeight: 36,
    color: Colors.white,
    fontWeight: 'bold',
    paddingVertical: 16,
    textAlign: 'center',
  },
});
