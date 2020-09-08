import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, TextInput, Image, Switch, Alert, Platform } from 'react-native';
import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors, isEmpty } from '@app/helper';

export default class AddEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      calendarId: null,
      title: '',
      allDay: false,
      repeat: false,
      sDayObject: {},
      showStartPicker: false,
      showEndPicker: false,
      startDate: Date.now(),
      endDate: Date.now(),
      alerts: [],
    };
  }

  componentDidMount() {
    const { params } = this.props.route;
    if (params.sDayObject) {
      this.setState({
        sDayObject: params.sDayObject,
        startDate: moment(`${params.sDayObject.month}/${params.sDayObject.day}/${params.sDayObject.year}`, 'MMMM/D/YYYY'),
        endDate: moment(`${params.sDayObject.month}/${params.sDayObject.day}/${params.sDayObject.year}`, 'MMMM/D/YYYY').add(1, 'hours'),
      });
    }
    RNCalendarEvents.checkPermissions().then((result) => {
      if (result !== 'authorized') {
        RNCalendarEvents.requestPermissions();
      }
    });
    RNCalendarEvents.findCalendars().then((result) => {
      if (result.length > 0) {
        const cIds = result.filter((item) => item.isPrimary).map((item) => item.id);
        this.setState({ calendarId: cIds[0] });
      }
    });
    const { setOptions } = this.props.navigation;
    setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.headerButton} onPress={this.addEvent}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route.params?.alerts !== this.props.route.params?.alerts) {
      this.setState({ alerts: this.props.route.params?.alerts });
    }
  }

  addEvent = () => {
    const { title, calendarId, startDate, endDate, allDay, alerts } = this.state;
    this.setState({ showStartPicker: false, showEndPicker: false });
    if (isEmpty(title)) {
      Alert.alert('Please input event title.');
      return;
    }
    if (!calendarId) {
      RNCalendarEvents.requestPermissions();
      return;
    }
    RNCalendarEvents.saveEvent(title.trim(), {
      calendarId,
      allDay,
      startDate: moment(startDate).toISOString(),
      endDate: moment(endDate).toISOString(),
      alarms: alerts.map((item) => ({ date: Platform.OS === 'ios' ? -1 * item.date : item.date })),
    })
      .then((result) => {
        this.props.navigation.navigate('Month', { eventId: result });
        Alert.alert('Successfully created event.');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onChangeStartDate = (date) => {
    this.setState({
      startDate: date,
      endDate: moment(date).add(1, 'hours'),
      showStartPicker: Platform.OS === 'ios',
    });
  };

  onChangeEndDate = (date) => {
    this.setState({
      endDate: moment(date).toDate(),
      showEndPicker: Platform.OS === 'ios',
    });
  };

  gotoAlert = () => {
    this.props.navigation.navigate('Alert', { alerts: this.state.alerts });
  };

  render() {
    const { allDay, title, startDate, endDate, showStartPicker, showEndPicker, alerts } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <ScrollView contentContainerStyle={styles.scrollContentStyle}>
          <View style={styles.titleContainer}>
            <TextInput style={styles.titleText} value={title} onChangeText={(text) => this.setState({ title: text })} placeholder="Event title" />
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.eventRow}>
              <View style={styles.clockContainer}>
                <Image style={styles.clockImage} resizeMode="contain" source={require('@app/assets/images/clock.png')} />
                <Text style={styles.labelText}>All day</Text>
              </View>
              <Switch
                value={allDay}
                trackColor={{ true: Colors.main }}
                onValueChange={(value) => this.setState({ allDay: value, showStartPicker: false, showEndPicker: false })}
              />
            </View>
            <TouchableOpacity
              style={[styles.eventRow, styles.extraPadding]}
              onPress={() => this.setState({ showStartPicker: !showStartPicker, showEndPicker: false })}>
              <Text style={styles.labelText}>Starts</Text>
              <Text style={styles.labelText}>{moment(startDate).format('DD / MMM')}</Text>
              {!allDay && <Text style={styles.labelText}>{moment(startDate).format('hh:mm A')}</Text>}
            </TouchableOpacity>
            {!allDay && showStartPicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={moment(startDate).toDate()}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={(e, date) => this.onChangeStartDate(date)}
              />
            )}
            <TouchableOpacity
              style={[styles.eventRow, styles.extraPadding]}
              onPress={() => this.setState({ showEndPicker: !showEndPicker, showStartPicker: false })}>
              <Text style={styles.labelText}>Ends</Text>
              {!allDay && <Text style={styles.labelText}>{moment(endDate).format('hh:mm A')}</Text>}
            </TouchableOpacity>
            {!allDay && showEndPicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={moment(endDate).toDate()}
                mode="time"
                is24Hour={false}
                display="default"
                minimumDate={moment(startDate).toDate()}
                onChange={(e, date) => this.onChangeEndDate(date)}
              />
            )}
            {!allDay && (
              <View style={[styles.eventRow, styles.extraPadding]}>
                <Text style={styles.labelText}>Repeat</Text>
                <Text style={styles.labelText}>Never</Text>
                {/* <Switch value={repeat} trackColor={{ true: Colors.main }} onValueChange={(value) => this.setState({ repeat: value })} /> */}
              </View>
            )}
            <TouchableOpacity style={[styles.eventRow, styles.extraPadding]} onPress={this.gotoAlert}>
              <Text style={styles.labelText}>Alert</Text>
              <Text style={styles.labelText}>{alerts.length === 0 ? 'None' : alerts[0].label}</Text>
            </TouchableOpacity>
          </View>
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
  headerButton: {
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleContainer: {
    marginTop: 30,
    paddingVertical: 20,
    paddingLeft: 80,
  },
  titleText: {
    fontSize: 24,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    marginBottom: 10,
    paddingVertical: 10,
  },
  clockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockImage: {
    width: 25,
    height: 25,
  },
  extraPadding: {
    paddingLeft: 60,
  },
  labelText: {
    fontSize: 16,
    paddingLeft: 20,
  },
});
