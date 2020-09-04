/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Suspense } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as RNIap from 'react-native-iap';
import SplashScreen from '@app/pages/splash';
import { Colors, IAP_SKUS, syncPurchasedFromStorage, syncShownPaidWelcome, removePurchasedFromStorage, removeShownPaidWelcome } from '@app/helper';

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

  async componentDidMount() {
    try {
      // await removePurchasedFromStorage();
      // await removeShownPaidWelcome();
      await RNIap.clearTransactionIOS();
      await RNIap.initConnection();
      await RNIap.getProducts(IAP_SKUS);
      await syncPurchasedFromStorage();
      await syncShownPaidWelcome();
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <SplashScreen />;
    } else {
      const AppCompnent = React.lazy(() => import('./src/pages/mainNavigator'));
      return (
        <Suspense fallback={<SplashScreen />}>
          <NavigationContainer theme={Theme}>
            <AppCompnent />
          </NavigationContainer>
        </Suspense>
      );
    }
  }
}

export default App;
