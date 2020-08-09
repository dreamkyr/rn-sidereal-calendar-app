/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '@app/pages/splash';
import AppContainer from '@app/pages/mainNavigator';

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
    }, 1000);
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <SplashScreen />;
    } else {
      return (
        <NavigationContainer>
          <AppContainer />
        </NavigationContainer>
      );
    }
  }
}

export default App;
