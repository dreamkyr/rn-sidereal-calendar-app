/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import SplashScreen from '@app/pages/splash';
import AppContainer from '@app/pages/mainNavigator';
import { Colors } from '@app/helper';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: Colors.main,
    text: Colors.white,
    background: Colors.background,
  },
};
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 100);
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <SplashScreen />;
    } else {
      return (
        <NavigationContainer theme={Theme}>
          <AppContainer />
        </NavigationContainer>
      );
    }
  }
}

export default App;
