import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, TextInput, Image, Switch} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import { Colors } from '@app/helper';

export default class AddEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      allDay: false,
      repeat: false,
    };
  }

  componentDidMount() {
    RNCalendarEvents.checkPermissions().then((result) => {
      if (result !== 'authorized') {
        RNCalendarEvents.requestPermissions();
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

  addEvent = () => {
    console.log('');
  };

  render() {
    const { allDay, repeat } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <ScrollView contentContainerStyle={styles.scrollContentStyle}>
          <View style={styles.titleContainer}>
            <TextInput style={styles.titleText} placeholder="Event title" />
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.eventRow}>
              <View style={styles.clockContainer}>
                <Image style={styles.clockImage} resizeMode="contain" source={require('@app/assets/images/clock.png')} />
                <Text style={styles.labelText}>All day</Text>
              </View>
              <Switch value={allDay} trackColor={{ true: Colors.main }} onValueChange={(value) => this.setState({ allDay: value })} />
            </View>
            <View style={[styles.eventRow, styles.extraPadding]}>
              <Text style={styles.labelText}>Starts</Text>
              <Text style={styles.labelText}>11:00 PM</Text>
            </View>
            <View style={[styles.eventRow, styles.extraPadding]}>
              <Text style={styles.labelText}>Ends</Text>
              <Text style={styles.labelText}>11:00 PM</Text>
            </View>
            <View style={[styles.eventRow, styles.extraPadding]}>
              <Text style={styles.labelText}>Repeat</Text>
              <Switch value={repeat} trackColor={{ true: Colors.main }} onValueChange={(value) => this.setState({ repeat: value })} />
            </View>
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
    marginBottom: 20,
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
