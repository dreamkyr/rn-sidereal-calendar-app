import React, { Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Colors, SCREEN_WIDTH, SCREEN_HEIGHT, isPaidVersion } from '@app/helper';

export default class StartupModal extends React.Component {
  constructor(Props) {
    super(Props);
  }

  onExit = () => {
    this.props.onExit();
  };

  renderListItem = (text) => (
    <View style={styles.listItem}>
      <Text style={styles.listText}>{text}</Text>
    </View>
  );

  renderFreeWelcome = () => (
    <Fragment>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Welcome to the FREE Version of The Kemetic Sidereal Calendar App 420!</Text>
      </View>
      <Text style={styles.subTitle}>Please feel free to explore the calendar.</Text>
      <Text style={styles.subTitle}>*This version has limited functionality.</Text>
      <View style={styles.listContainer}>
        <Text style={styles.listText}>To Unlock:</Text>
        {this.renderListItem('•	Calendar synchronisation')}
        {this.renderListItem('•	Ability to make appointments')}
        {this.renderListItem('•	Instructions on how to use the calendar')}
        {this.renderListItem('•	Information on spiritual days')}
      </View>
      <Text style={styles.subTitle}>Please click UPGRADE button.</Text>
      <TouchableOpacity style={styles.upgradeButton} onPress={this.props.onUpgrade}>
        <Text style={styles.upgradeButtonText}>UPGRADE</Text>
      </TouchableOpacity>
    </Fragment>
  );
  renderPaidWelcome = () => (
    <Fragment>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Welcome to The Kemetic Sidereal Calendar App 420!</Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={[styles.listText, styles.boldText]}>Click on the MENU button in the upper left-hand corner of your screen to:</Text>
        {this.renderListItem('•	Choose calendar view')}
        {this.renderListItem('•	Learn more about the calendar')}
        {this.renderListItem('•	Learn more about Kemetic Culture')}
        {this.renderListItem('•	Get educational resources')}
        <Text style={[styles.listText, styles.boldText]}>Click on “HELP” in the MENU to find:</Text>
        {this.renderListItem('•	instructions on how to use the calendar')}
        {this.renderListItem('•	information on spiritual days')}
        <Text style={[styles.listText, styles.boldText]}>In “Month View” you can:</Text>
        {this.renderListItem('•	Synchronise with your phone’s calendar!')}
        {this.renderListItem('•	Schedule appointments!')}
        <Text style={[styles.listText, styles.thanksText]}>Thank you for supporting The Earth Center mission with your purchase!</Text>
        <Text style={[styles.listText, styles.subTitle, styles.bottomText]}>
          The Earth Center is a multi-faceted 501(c)(3) non-profit organisation dedicated to preserving and promoting humanity's original culture in
          order to sustain the health and well-being of all people.
        </Text>
      </View>
    </Fragment>
  );

  render() {
    const { visible } = this.props;
    return (
      <Modal animationType="fade" transparent visible={visible} supportedOrientations={['portrait']} onRequestClose={this.onExit}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.exit} onPress={this.onExit} />
          <View style={styles.body}>
            <ScrollView contentContainerStyle={styles.bodyScroll}>
              {isPaidVersion() && this.renderPaidWelcome()}
              {!isPaidVersion() && this.renderFreeWelcome()}
            </ScrollView>
            <TouchableOpacity style={styles.closeIcon} onPress={this.onExit}>
              <Text style={styles.closeText}>⤫</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.modalBackground,
  },
  exit: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  body: {
    width: '90%',
    height: !isPaidVersion() ? 550 : 700,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  bodyScroll: {
    paddingTop: 40,
    alignItems: 'center',
  },
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingHorizontal: 20,
    lineHeight: 24,
    color: Colors.main,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    lineHeight: 24,
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    width: 40,
    right: 0,
    top: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 30,
  },
  listContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  listItem: {
    paddingVertical: 10,
  },
  listText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  upgradeButton: {
    borderRadius: 4,
    backgroundColor: Colors.main,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: 200,
  },
  upgradeButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  thanksText: {
    paddingVertical: 20,
    color: Colors.main,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomText: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 16,
    fontWeight: 'bold',
  },
});
