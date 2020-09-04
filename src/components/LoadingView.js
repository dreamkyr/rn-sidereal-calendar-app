/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, StyleSheet, View, Modal } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@app/helper';

export default class LoadingView extends React.Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
      }}>
        <View style={[
          styles.container,
          // {display: this.props.visible ? 'flex' : 'none'}
        ]}>
          <ActivityIndicator/>
        </View>
     </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    flexDirection: 'column',
    backgroundColor: '#000000A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
