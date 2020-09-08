import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Linking } from 'react-native';

import { Colors, BUY_P_CALENDAR_URL } from '@app/helper';
import { PRINTED_CALENDAR_DETAIL } from '@app/helper/data';
export default class PrintedCalendarDetailScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <ScrollView contentContainerStyle={styles.scrollContentStyle}>
          {PRINTED_CALENDAR_DETAIL.map((item, index) => (
            <View key={index} style={styles.sectionWrapper}>
              {item.title && <Text style={styles.sectionSubTitle}>{item.title}</Text>}
              {item.content && <Text style={styles.sectionContent}>{item.content}</Text>}
            </View>
          ))}
          <TouchableOpacity
            style={styles.viewContainer}
            onPress={() => {
              Linking.openURL(BUY_P_CALENDAR_URL);
            }}>
            <Text style={styles.buyText}>Buy Printed Calendar</Text>
          </TouchableOpacity>
        </ScrollView>
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
  sectionSubTitle: {
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionContent: {
    marginBottom: 10,
  },
  buyText: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    color: 'blue',
  },
});
