import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';

import { Colors } from '@app/helper';
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
});
