import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import { SidemenuAdd } from '@app/components';
import { Colors } from '@app/helper';
import { getSMonthList, getMonthByName, SMONTH_DATA, getSDayObject } from '@app/helper/data';
import { MONTH_NAMES } from '@app/assets/images/monthNames';
import { WEEK_DAY_IMAGES } from '@app/assets/images/weekDays';
import { DAY_IMAGES } from '@app/assets/images/days';

const monthList = getSMonthList();
export default class WeekScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      monthData: [],
      selectedDay: null,
      currentMonth: {},
    };
  }

  componentDidMount() {
    const { setOptions } = this.props.navigation;
    const { params } = this.props.route;
    const item = (params && params.selectedMonth) || monthList[0];
    setOptions({
      title: `${item.s_month} - ${item.s_year}`,
      headerRight: () => <SidemenuAdd onPress={this.addEvent} />,
    });
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ monthData: getMonthByName(item.s_month, item.s_year), currentMonth: item });
  }

  goToDetail = () => {
    this.props.navigation.navigate('Detail', { selectedMonth: this.state.currentMonth });
  };

  addEvent = () => {

  }

  render() {
    const { monthData, selectedDay, currentMonth } = this.state;
    if (monthData.length === 0) {
      return null;
    }
    const sDayObject = getSDayObject(selectedDay, currentMonth.s_month, currentMonth.s_year) || {};
    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="black" />
        <ScrollView contentContainerStyle={styles.scrollContentStyle}>
          <TouchableOpacity style={styles.headerContainer} onPress={this.goToDetail}>
            <Text style={styles.monthText}>{monthData[0].s_month}</Text>
            <Image style={styles.monthImage} resizeMode="contain" source={MONTH_NAMES[monthData[0].s_month]} />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Text style={styles.dateText}>
              ({SMONTH_DATA[monthData[0].s_month].nickname}) - {monthData[0].month} {monthData[0].day} - {monthData[monthData.length - 1].month}{' '}
              {monthData[monthData.length - 1].day}, {monthData[monthData.length - 1].year}
            </Text>
          </View>
          <View style={styles.calendarContainer}>
            <View style={styles.weekDayContainer}>
              {WEEK_DAY_IMAGES.map((item, index) => (
                <View key={index} style={styles.weekDayItem}>
                  <Image style={styles.weekDayImage} resizeMode="contain" source={item} />
                </View>
              ))}
            </View>
            <View style={[styles.weekDayContainer, styles.flexWrap]}>
              {[...Array(30).keys()].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.dayItem,
                    selectedDay === item + 1 && styles.selectedItem,
                    item % 10 === 9 && styles.sunDayItem,
                    selectedDay === item + 1 && item % 10 === 9 && styles.sundaySelectedItem,
                  ]}
                  onPress={() => this.setState({ selectedDay: item + 1 })}>
                  <Image style={styles.dayImage} resizeMode="contain" source={DAY_IMAGES[item % 10]} />
                  <Text>{item + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {selectedDay && (
            <View style={styles.agendaContainer}>
              <Text style={styles.detailText}>Dekan Details</Text>
              <View style={styles.detailContainer}>
                <View style={styles.detailImageContainer}>
                  <Image resizeMode="contain" style={styles.detailImage} source={DAY_IMAGES[(selectedDay - 1) % 10]} />
                </View>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailTitleText}>{sDayObject.holy_year || sDayObject.holy_week || 'Normal'}</Text>
                  <Text>Dekan week: {sDayObject.dekan_day}</Text>
                  <Text>Neteru: {sDayObject.neteru_week}</Text>
                  <Text>{`${sDayObject.weekday || ''} ${sDayObject.month || ''} ${sDayObject.day || ''}`}</Text>
                </View>
              </View>
            </View>
          )}
          <View style={styles.agendaContainer}>
            <Text style={styles.detailText}>Today's Agenda</Text>
            <View style={styles.detailContainer}>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailTitleText}>Holiday Title</Text>
                <Text>Dekan week: ...</Text>
                <Text>Sep 9 Sunday</Text>
              </View>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: Colors.black,
    borderBottomWidth: 3,
    justifyContent: 'center',
  },
  monthText: {
    paddingLeft: 10,
    color: Colors.green,
    fontSize: 30,
    fontWeight: 'bold',
    width: '60%',
    textTransform: 'uppercase',
    flex: 1,
    textAlign: 'center',
  },
  monthImage: {
    height: 50,
    width: '40%',
  },
  dateText: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
  detailText: {
    fontSize: 16,
  },
  calendarContainer: {
    paddingTop: 20,
    marginHorizontal: 5,
    borderBottomColor: Colors.black,
    borderBottomWidth: 3,
  },
  weekDayContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  flexWrap: {
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  weekDayItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayItem: {
    width: '10%',
    alignItems: 'center',
    height: 70,
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  sunDayItem: {
    backgroundColor: Colors.lightpink,
    borderRadius: 0,
  },
  sundaySelectedItem: {
    backgroundColor: Colors.green,
    borderRadius: 0,
  },
  weekDayImage: {
    width: '100%',
    height: 70,
  },
  dayImage: {
    width: '100%',
    height: 15,
  },
  selectedItem: {
    backgroundColor: Colors.green,
    borderRadius: 15,
  },
  agendaContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  agendaTitle: {
    fontSize: 16,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 8,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    marginTop: 20,
  },
  detailImageContainer: {
    backgroundColor: Colors.green,
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 97,
  },
  detailImage: {
    height: 30,
    width: 50,
  },
  detailTextContainer: {
    flex: 0.8,
    paddingHorizontal: 10,
  },
  detailTitleText: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 8,
  },
});
