import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';

import { Colors } from '@app/helper';
import { HELP_TEXT } from '@app/helper/data';
export default class MonthScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      monthData: [],
      selectedDay: null,
      currentMonth: {},
      events: [],
      monthEvents: [],
      currentIndex: null,
    };
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
    this.flatListRef = null;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <ScrollView contentContainerStyle={styles.scrollContentStyle}>
          {HELP_TEXT.map((item, index) => (
            <View key={index} style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>{item.section}</Text>
              <Text style={styles.sectionContent}>{item.content}</Text>
            </View>
          ))}
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
  sectionTitle: {
    paddingVertical: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
