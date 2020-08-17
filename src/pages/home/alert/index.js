import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';

import { Colors } from '@app/helper';

const alert_list = [
  { date: 0, label: 'At time of event' },
  { date: 5, label: '5 minutes before' },
  { date: 10, label: '10 minutes before' },
  { date: 15, label: '15 minutes before' },
  { date: 30, label: '30 minutes before' },
  { date: 1 * 60, label: '1 hour before' },
  { date: 2 * 60, label: '2 hours before' },
  { date: 1 * 60 * 24, label: '1 day before' },
  { date: 2 * 60 * 24, label: '2 days before' },
  { date: 7 * 60 * 24, label: '1 week before' },
];

export default class AlertScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      alerts: [],
    };
  }

  componentDidMount() {
    const { params } = this.props.route;
    if (params.alerts) {
      this.setState({
        alerts: params.alerts.length === 0 ? [] : params.alerts,
      });
    }
  }

  onSelectItem = (item) => {
    const items = item ? [item] : [];
    this.setState({ alerts: items });
    setTimeout(() => {
      this.props.navigation.navigate('New', { alerts: items });
    }, 300);
  };

  render() {
    const { alerts } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <ScrollView contentContainerStyle={styles.scrollContentStyle}>
          <TouchableOpacity style={[styles.eventRow, styles.extraBottom]} onPress={() => this.onSelectItem()}>
            <Text style={styles.labelText}>None</Text>
            {alerts.length === 0 && <Text style={[styles.checkMark, styles.labelText]}>✓</Text>}
          </TouchableOpacity>
          {alert_list.map((item) => (
            <TouchableOpacity style={styles.eventRow} key={item.date} onPress={() => this.onSelectItem(item)}>
              <Text style={styles.labelText}>{item.label}</Text>
              {alerts.map((aItem) => aItem.date).includes(item.date) && <Text style={[styles.checkMark, styles.labelText]}>✓</Text>}
            </TouchableOpacity>
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
    paddingBottom: 50,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    paddingRight: 10,
    paddingVertical: 15,
    borderBottomColor: Colors.lightgreen,
    borderBottomWidth: 1,
  },
  extraBottom: {
    marginBottom: 20,
    marginTop: 20,
  },
  labelText: {
    fontSize: 18,
  },
  checkMark: {
    color: Colors.red,
  },
});
