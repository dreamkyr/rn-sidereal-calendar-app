import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, DevSettings } from 'react-native';

import {
  Colors,
  SCREEN_WIDTH,
  MONTH_COLORS,
  isPaidVersion,
  showUpgradeDialog,
  isVisitedPaidWelcome,
  requestPurchase,
  savePurchasedOnStorage,
  saveShownPaidWelcome,
  getRestorePayment,
} from '@app/helper';
import { getSMonthList, SMONTH_DATA } from '@app/helper/data';
import { FlatList } from 'react-native-gesture-handler';
import { MONTH_NAMES } from '@app/assets/images/monthNames';
import StartupModal from '@app/components/StartupModal';
import LoadingView from '@app/components/LoadingView';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      showWelcome: false,
      loading: false,
    };
    this.monthList = getSMonthList();
    this.visible_year = 420;
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 5 };
  }

  componentDidMount() {
    if (!isPaidVersion() || (isPaidVersion() && !isVisitedPaidWelcome())) {
      setTimeout(() => {
        this.setState({ showWelcome: true });
      }, 1000);
    }
  }

  componentDidUpdate(prevProps) {
    const { route } = this.props;
    if (prevProps.route !== route && route && route.params && route.params.isUpdateAction) {
      this.onPressUnlock();
    }
    if (prevProps.route !== route && route && route.params && route.params.isRestoreAction) {
      this.onPressRestore();
    }
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
          <Text style={[styles.sectionYear, { color: MONTH_COLORS[item.s_year] }]}>{item.s_year}</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity style={[styles.itemContainer, item.s_month === 'Nwt' && styles.noBottomBorder]} onPress={() => this.gotoMonthlyView(item)}>
        <View style={styles.monthContainer}>
          <Text style={[styles.monthText, { color: MONTH_COLORS[item.s_year] }]}>{item.s_month}</Text>
          <Image style={styles.monthImage} resizeMode="contain" source={MONTH_NAMES[item.s_month]} />
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            ({SMONTH_DATA[item.s_month].nickname}) - {item.from_month} {item.from_day} - {item.to_month} {item.to_day}, {item.year}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  onPressUnlock = async () => {
    if (await showUpgradeDialog()) {
      this.setState({ loading: true });
      const result = await requestPurchase();
      if (result) {
        await savePurchasedOnStorage();
        DevSettings.reload();
      }
      this.setState({ loading: false });
    }
  };

  onPressRestore = async () => {
    this.setState({ loading: true });
    const result = await getRestorePayment();
    if (result) {
      await savePurchasedOnStorage();
      DevSettings.reload();
    }
    this.setState({ loading: false });
  };

  closeWelcome = async () => {
    if (isPaidVersion()) {
      await saveShownPaidWelcome();
    }
    this.setState({ showWelcome: false });
  };

  onUpgradeFromModal = () => {
    this.setState({ showWelcome: false });
    setTimeout(() => {
      this.onPressUnlock();
    }, 1000);
  };

  render() {
    const { showWelcome } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        {!isPaidVersion() && (
          <TouchableOpacity style={styles.purchaseWrapper} onPress={this.onPressUnlock}>
            <Text style={styles.purchaseText}>Upgrade for Calendar Syncing Integration, Future Years and Additional Explainations</Text>
          </TouchableOpacity>
        )}
        <FlatList
          style={styles.listContainer}
          contentContainerStyle={styles.listContentStyle}
          data={this.monthList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderItem(item)}
          viewabilityConfig={this.viewabilityConfig}
          // onViewableItemsChanged={({ viewableItems }) => this.updateTitle(viewableItems[0])}
        />
        <StartupModal visible={showWelcome} onExit={this.closeWelcome} onUpgrade={this.onUpgradeFromModal} />
        <LoadingView visible={this.state.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  listContentStyle: {
    paddingBottom: 200,
    // paddingHorizontal: 10,
  },
  itemContainer: {
    paddingVertical: 10,
    borderBottomColor: Colors.black,
    borderBottomWidth: 3,
  },
  itemSection: {
    width: SCREEN_WIDTH,
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    marginHorizontal: 20,
  },
  monthText: {
    color: Colors.green,
    fontSize: 30,
    width: '60%',
    fontFamily: 'TrajanPro-Bold',
  },
  monthImage: {
    height: 50,
    width: '40%',
  },
  dateContainer: {
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '300',
  },
  sectionYear: {
    fontSize: 30,
    color: Colors.red,
    fontWeight: 'bold',
  },
  purchaseWrapper: {
    borderRadius: 16,
    backgroundColor: Colors.main,
    margin: 16,
    marginBottom: 0,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchaseText: {
    fontSize: 24,
    lineHeight: 36,
    color: Colors.white,
    fontWeight: 'bold',
    paddingVertical: 16,
    textAlign: 'center',
  },
});
