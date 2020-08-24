import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { DAY_IMAGES } from '@app/assets/images/days';
import { Colors, SCREEN_WIDTH } from '@app/helper';
import { getSDayObject } from '@app/helper/data';

export const MonthItem = ({ selectedDay, onSelectDay, currentMonth, monthEvents }) => {
  const hasEvent = (index) => {
    const sDayObject = getSDayObject(index, currentMonth.s_month, currentMonth.s_year) || {};
    const { year, month, day } = sDayObject;
    if (!year || !month || !day) {
      return false;
    }
    const mEvents = monthEvents.map((item) => moment(item.startDate).dayOfYear());
    if (mEvents.includes(moment(`${month}/${day}/${year}`, 'MMMM/D/YYYY').dayOfYear())) {
      return true;
    }
    if (sDayObject.holy_week || sDayObject.holy_year) {
      return true;
    }
    return false;
  };

  const getSDay = (index) => getSDayObject(index, currentMonth.s_month, currentMonth.s_year) || {};

  return (
    <View style={[styles.weekDayContainer, styles.flexWrap]}>
      {[...Array(30).keys()].map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.dayItem, hasEvent(item + 1) && styles.hasEventItem, selectedDay === item + 1 && styles.selectedItem]}
          onPress={() => onSelectDay(item + 1)}>
          <Image
            style={[styles.dayImage, item >= 10 && { height: 15 * 2 }, item >= 20 && { height: 15 * 3 }]}
            resizeMode="contain"
            source={DAY_IMAGES[item]}
          />
          <Text style={styles.dayText}>{item + 1}</Text>
          {!!getSDay(item + 1).key && (
            <Text style={styles.gDayText}>
              {moment(`${getSDay(item + 1).month}/${getSDay(item + 1).day}/${getSDay(item + 1).year}`, 'MMMM/D/YYYY').format('MMM')}{' '}
              {moment(`${getSDay(item + 1).month}/${getSDay(item + 1).day}/${getSDay(item + 1).year}`, 'MMMM/D/YYYY').format('D')}
            </Text>
          )}
          {!getSDay(item + 1).key && <Text style={styles.gDayText}> </Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  calendarContainer: {
    paddingTop: 20,
    marginHorizontal: 5,
    borderBottomColor: Colors.black,
    borderBottomWidth: 3,
  },
  weekDayContainer: {
    width: SCREEN_WIDTH - 10,
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
    minHeight: 50,
    paddingVertical: 10,
    justifyContent: 'space-between',
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
    marginBottom: 10,
  },
  dayText: {
    color: Colors.gray,
  },
  gDayText: {
    color: Colors.gray,
    fontSize: 8,
    fontWeight: 'bold',
  },
  selectedItem: {
    backgroundColor: Colors.green,
    borderRadius: 15,
  },
  hasEventItem: {
    backgroundColor: Colors.lightgreen,
    borderRadius: 15,
  },
});
