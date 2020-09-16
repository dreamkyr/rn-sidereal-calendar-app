import { Platform, Alert } from 'react-native';
import * as RNIap from 'react-native-iap';

const defaultPurchaseMessage =
  'Please unlock additional calendar features. Do you want to buy the product to access all calendar features at cost $3.99?';

export const IAP_SKUS = Platform.select({
  ios: ['com.sidereal.calendar.paid'],
  android: ['com.sidereal.calendar.paid'],
});

export const showUpgradeDialog = async (message = defaultPurchaseMessage, title = 'Purchase Product') =>
  new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Buy',
          onPress: () => {
            resolve(true);
          },
        },
        { text: 'No', style: 'cancel' },
      ],
      { cancelable: false },
    );
  });

export const requestPurchase = async () => {
  try {
    return await RNIap.requestPurchase('com.sidereal.calendar.paid', false);
  } catch (err) {
    Alert.alert(err.message);
  }
};

export const getRestorePayment = async () => {
  try {
    return await RNIap.getAvailablePurchases();
  } catch (err) {
    Alert.alert(err.message);
  }
};
