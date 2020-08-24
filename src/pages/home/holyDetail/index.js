import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import { Colors } from '@app/helper';
import { HOLY_DATA } from '@app/helper/data';
export default class HolyDetailScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      key: 'Default',
    };
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
    this.flatListRef = null;
  }

  componentDidMount() {
    const { setOptions } = this.props.navigation;
    const { params } = this.props.route;
    const key = (params && params.holy_key) || 'Default';
    setOptions({
      title: key,
    });
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      key,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <View style={styles.contentWrapper}>
          <Text style={styles.contentText}>{HOLY_DATA[this.state.key]}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  contentText: {
    backgroundColor: Colors.white,
    borderRadius: 6,
    borderColor: Colors.main,
    borderWidth: 2,
    lineHeight: 30,
    padding: 10,
    fontSize: 18,
  },
});
