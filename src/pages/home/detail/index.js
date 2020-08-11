import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import { Colors, SCREEN_WIDTH } from '@app/helper';
import { getSMonthList, getMonthByName, SMONTH_DATA } from '@app/helper/data';
import { MONTH_NAMES } from '@app/assets/images/monthNames';
import { GOD_IMAGES } from '@app/assets/images/gods';
import { MONTH_GOD_IMAGES } from '@app/assets/images/godSigns';

const monthList = getSMonthList();
export default class DetailScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      monthData: [],
      selectedDay: null,
    };
  }

  componentDidMount() {
    const { setOptions } = this.props.navigation;
    const { params } = this.props.route;
    const item = (params && params.selectedMonth) || monthList[0];
    setOptions({ title: `${item.s_month} ${item.s_year}` });
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ monthData: getMonthByName(item.s_month, item.s_year) });
  }

  goToDetail = () => {
    this.props.navigation.navigate('Detail');
  };

  render() {
    const { monthData } = this.state;
    if (monthData.length === 0) {
      return null;
    }
    const sMonthObject = SMONTH_DATA[monthData[0].s_month];
    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <ScrollView contentContainerStyle={styles.scrollContentStyle}>
          <View style={styles.headerContainer} onPress={this.goToDetail}>
            <Text style={styles.monthText}>{monthData[0].s_month}</Text>
            <Image style={styles.monthImage} resizeMode="contain" source={MONTH_NAMES[monthData[0].s_month]} />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.dateText}>
              ({sMonthObject.nickname}) - {monthData[0].month} {monthData[0].day} - {monthData[monthData.length - 1].month}{' '}
              {monthData[monthData.length - 1].day}, {monthData[monthData.length - 1].year}
            </Text>
          </View>
          <View style={[styles.headerContainer, styles.noBorder]}>
            <Image style={styles.godImage} resizeMode="contain" source={GOD_IMAGES[sMonthObject.key]} />
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.detailTitleContainer}>
              <View style={styles.titleImageContainer}>
                <Image style={styles.monthGodImage} resizeMode="contain" source={MONTH_GOD_IMAGES[sMonthObject.key]} />
              </View>
              <View style={styles.titleTextContainer}>
                <Text>
                  Goddess governing the month: <Text>{sMonthObject.godName}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <Text>{sMonthObject.description}</Text>
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
  godImage: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  detailContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 6,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  detailTitleContainer: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleImageContainer: {
    backgroundColor: Colors.green,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    height: '100%',
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  descriptionContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 50,
  },
  monthGodImage: {
    width: '80%',
    height: '80%',
  },
});
