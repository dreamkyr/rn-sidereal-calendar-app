import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';
import { Colors, SCREEN_WIDTH, MONTH_COLORS } from '@app/helper';
import { getSMonthList, SMONTH_DATA } from '@app/helper/data';
import { FlatList } from 'react-native-gesture-handler';
import { MONTH_NAMES } from '@app/assets/images/monthNames';

const monthList = getSMonthList();
export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.visible_year = 420;
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 5 };
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: `${state.params.title}`,
    };
  };

  addEvent = () => {
    this.props.navigation.navigate('New');
  };

  updateTitle = ({ item }) => {
    if (item && this.visible_year !== item.s_year) {
      this.visible_year = item.s_year;
      const { setOptions } = this.props.navigation;
      setOptions({ title: `Kemetic Sidereal Calendar - Year ${item.s_year}` });
    }
  };

  gotoMonthlyView = (item) => {
    this.props.navigation.navigate('Month', { selectedMonth: item });
  };

  renderItem = (item) => {
    if (item.isSection) {
      return (
        <View style={[styles.itemContainer, styles.itemSection]}>
          <Text style={styles.sectionYear}>{item.s_year}</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity style={[styles.itemContainer, item.s_month === 'Nwt' && styles.noBottomBorder]} onPress={() => this.gotoMonthlyView(item)}>
        <View style={styles.monthContainer}>
          <Text style={[styles.monthText, { color: MONTH_COLORS[item.s_month] }]}>{item.s_month}</Text>
          <Image style={styles.monthImage} resizeMode="contain" source={MONTH_NAMES[item.s_month]} />
        </View>
        <View>
          <Text style={styles.dateText}>
            ({SMONTH_DATA[item.s_month].nickname}) - {item.from_month} {item.from_day} - {item.to_month} {item.to_day}, {item.year}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <FlatList
          style={styles.listContainer}
          contentContainerStyle={styles.listContentStyle}
          data={monthList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderItem(item)}
          viewabilityConfig={this.viewabilityConfig}
          onViewableItemsChanged={({ viewableItems }) => this.updateTitle(viewableItems[0])}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  listContentStyle: {
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderBottomColor: Colors.black,
    borderBottomWidth: 3,
  },
  itemSection: {
    width: SCREEN_WIDTH,
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: -10,
    marginTop: 20,
    marginBottom: 5,
  },
  noBottomBorder: {
    borderBottomWidth: 0,
  },
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthText: {
    paddingLeft: 10,
    color: Colors.green,
    fontSize: 30,
    fontWeight: 'bold',
    width: '60%',
    textTransform: 'uppercase',
  },
  monthImage: {
    height: 50,
    width: '40%',
  },
  dateText: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '300',
    paddingLeft: 10,
  },
  sectionYear: {
    fontSize: 30,
    color: Colors.gray,
    fontWeight: '900',
  },
});
